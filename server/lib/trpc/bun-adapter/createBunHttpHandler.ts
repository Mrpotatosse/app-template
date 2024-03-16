import type { AnyTRPCRouter } from "@trpc/server";
import {
    fetchRequestHandler,
    type FetchHandlerRequestOptions,
} from "@trpc/server/adapters/fetch";
import type { Server } from "bun";

export type CreateBunContextOptions = { req: Request };

export type BunHttpHandlerOptions<TRouter extends AnyTRPCRouter> =
    FetchHandlerRequestOptions<TRouter> & {
        wsEndpoint?: string;
    };

export function createBunHttpHandler<TRouter extends AnyTRPCRouter>(
    opts: BunHttpHandlerOptions<TRouter>
) {
    return (request: Request, server: Server) => {
        const url = new URL(request.url);

        if (request.method.toUpperCase() === "OPTIONS") {
            return new Response("success", {
                status: 200,
                headers: {
                    "Access-Control-Allow-Origin":
                        request.headers.get("origin") ?? "*",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Methods": "OPTIONS",
                    "Access-Control-Allow-Headers": "content-type",
                },
            });
        }

        if (opts.wsEndpoint && url.pathname.startsWith(opts.wsEndpoint)) {
            if (server.upgrade(request, { data: { req: request } })) {
                return;
            }

            return new Response("upgrade failed", { status: 404 });
        }

        return fetchRequestHandler({ ...opts, req: request });
    };
}
