import {
    callTRPCProcedure,
    getErrorShape,
    getTRPCErrorFromUnknown,
    transformTRPCResponse,
    TRPCError,
    type AnyTRPCRouter,
} from "@trpc/server";

import type { BaseHandlerOptions } from "@trpc/server/http";
import { isObservable, type Unsubscribable } from "@trpc/server/observable";
import {
    parseTRPCMessage,
    type JSONRPC2,
    type TRPCClientOutgoingMessage,
    type TRPCResponseMessage,
} from "@trpc/server/rpc";
import type { ServerWebSocket, WebSocketHandler } from "bun";

export type BunWSAdapterOptions<TRouter extends AnyTRPCRouter> =
    BaseHandlerOptions<TRouter, Request>;

export type BunWSClientCtx = {
    req: Request;
    handleRequest: (msg: TRPCClientOutgoingMessage) => Promise<void>;
    unsubscribe(): void;
};

export function createBunWSHandler<TRouter extends AnyTRPCRouter>(
    opts: BunWSAdapterOptions<TRouter>
): WebSocketHandler<BunWSClientCtx> {
    const { router } = opts;

    const respond = (
        client: ServerWebSocket<unknown>,
        untransformedJSON: TRPCResponseMessage
    ) => {
        client.send(
            JSON.stringify(
                transformTRPCResponse(
                    opts.router._def._config,
                    untransformedJSON
                )
            )
        );
    };

    return {
        async open(client) {
            Object.freeze(client.data.req.headers);
            const { req } = client.data;

            const clientSubscriptions = new Map<
                string | number,
                Unsubscribable
            >();

            const stopSubscription = (
                subscription: Unsubscribable,
                {
                    id,
                    jsonrpc,
                }: JSONRPC2.BaseEnvelope & { id: JSONRPC2.RequestId }
            ) => {
                subscription.unsubscribe();

                respond(client, {
                    id,
                    jsonrpc,
                    result: {
                        type: "stopped",
                    },
                });
            };

            client.data.handleRequest = async (
                msg: TRPCClientOutgoingMessage
            ) => {
                const { id, jsonrpc } = msg;
                if (id === null) {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: "`id` is required",
                    });
                }
                if (msg.method === "subscription.stop") {
                    const sub = clientSubscriptions.get(id);
                    if (sub) {
                        stopSubscription(sub, { id, jsonrpc });
                    }
                    clientSubscriptions.delete(id);
                    return;
                }
                const { path, input } = msg.params;
                const type = msg.method;
                try {
                    const result = await callTRPCProcedure({
                        procedures: router._def.procedures,
                        path,
                        input,
                        getRawInput: () => Promise.resolve(input),
                        ctx: { req },
                        type,
                    });

                    if (type === "subscription") {
                        if (!isObservable(result)) {
                            throw new TRPCError({
                                message: `Subscription ${path} did not return an observable`,
                                code: "INTERNAL_SERVER_ERROR",
                            });
                        }
                    } else {
                        // send the value as data if the method is not a subscription
                        respond(client, {
                            id,
                            jsonrpc,
                            result: {
                                type: "data",
                                data: result,
                            },
                        });
                        return;
                    }

                    const observable = result;
                    const sub = observable.subscribe({
                        next(data) {
                            respond(client, {
                                id,
                                jsonrpc,
                                result: {
                                    type: "data",
                                    data,
                                },
                            });
                        },
                        error(err) {
                            const error = getTRPCErrorFromUnknown(err);
                            opts.onError?.({
                                error,
                                path,
                                type,
                                ctx: { req },
                                req,
                                input,
                            });
                            respond(client, {
                                id,
                                jsonrpc,
                                error: getErrorShape({
                                    config: router._def._config,
                                    error,
                                    type,
                                    path,
                                    input,
                                    ctx: client.data,
                                }),
                            });
                        },
                        complete() {
                            respond(client, {
                                id,
                                jsonrpc,
                                result: {
                                    type: "stopped",
                                },
                            });
                        },
                    });

                    if (client.readyState !== WebSocket.OPEN) {
                        // if the client got disconnected whilst initializing the subscription
                        // no need to send stopped message if the client is disconnected
                        sub.unsubscribe();
                        return;
                    }

                    if (clientSubscriptions.has(id)) {
                        // duplicate request ids for client
                        stopSubscription(sub, { id, jsonrpc });
                        throw new TRPCError({
                            message: `Duplicate id ${id}`,
                            code: "BAD_REQUEST",
                        });
                    }
                    clientSubscriptions.set(id, sub);

                    respond(client, {
                        id,
                        jsonrpc,
                        result: {
                            type: "started",
                        },
                    });
                } catch (cause) {
                    // procedure threw an error
                    const error = getTRPCErrorFromUnknown(cause);
                    opts.onError?.({
                        error,
                        path,
                        type,
                        ctx: { req },
                        req,
                        input,
                    });
                    respond(client, {
                        id,
                        jsonrpc,
                        error: getErrorShape({
                            config: router._def._config,
                            error,
                            type,
                            path,
                            input,
                            ctx: { req },
                        }),
                    });
                }
            };

            client.data.unsubscribe = () => {
                for (const sub of clientSubscriptions.values()) {
                    sub.unsubscribe();
                }
                clientSubscriptions.clear();
            };
        },

        async close(client) {
            client.data.unsubscribe?.();
        },

        async message(client, message) {
            try {
                const msgJSON: unknown = JSON.parse(message.toString());
                const msgs: unknown[] = Array.isArray(msgJSON)
                    ? msgJSON
                    : [msgJSON];

                const promises = msgs
                    .map((raw) =>
                        parseTRPCMessage(raw, router._def._config.transformer)
                    )
                    .map(async (msg) => await client.data.handleRequest(msg));

                await Promise.all(promises);
            } catch (cause) {
                const error = new TRPCError({
                    code: "PARSE_ERROR",
                    cause,
                });

                respond(client, {
                    id: null,
                    error: getErrorShape({
                        config: router._def._config,
                        error,
                        type: "unknown",
                        path: undefined,
                        input: undefined,
                        ctx: undefined,
                    }),
                });
            }
        },
    };
}
