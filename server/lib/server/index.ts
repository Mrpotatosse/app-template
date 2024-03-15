import type { AnyTRPCRouter } from "@trpc/server";
import type { Server } from "bun";
import { createBunHttpHandler, createBunWSHandler } from "trpc-bun-adapter";
import { CustomError, CustomErrorCode } from "~/server/lib/error";
import { logger } from "~/server/lib/log";
import { createContext } from "~/server/lib/trpc/context";

export type tRPCServerOptions = {
    webSocketRouter: AnyTRPCRouter;
    webSocketEndpoint: string;
    apiRouter: AnyTRPCRouter;
    apiEndpoint: string;
};

export class tRPCServer {
    private readonly _webSocketRouter: AnyTRPCRouter;
    private readonly _webSocketEndpoint: string;
    private readonly _apiRouter: AnyTRPCRouter;
    private readonly _apiEndpoint: string;
    private _server?: Server;

    constructor({
        webSocketRouter,
        webSocketEndpoint,
        apiRouter,
        apiEndpoint,
    }: tRPCServerOptions) {
        this._webSocketRouter = webSocketRouter;
        this._webSocketEndpoint = webSocketEndpoint;
        this._apiRouter = apiRouter;
        this._apiEndpoint = apiEndpoint;
    }

    get server(): Server {
        if (!this._server)
            throw new CustomError(
                CustomErrorCode.NotInitialized,
                "server not initialized"
            );
        return this._server;
    }

    serve(): this {
        this._server = Bun.serve({
            fetch: (request, server) => {
                const url = new URL(request.url);

                if (url.pathname.startsWith(this._webSocketEndpoint)) {
                    if (server.upgrade(request, { data: { req: request } })) {
                        return;
                    }

                    return new Response("upgrade failed", { status: 404 });
                }

                return createBunHttpHandler({
                    router: this._apiRouter,
                    endpoint: this._apiEndpoint,
                    allowBatching: true,
                    createContext,
                })(request, server);
            },
            websocket: createBunWSHandler({
                router: this._webSocketRouter,
                allowBatching: true,
                createContext,
            }),
        });
        logger.info(
            `server started on ${this._server.hostname}:${this._server.port}`
        );
        return this;
    }
}
