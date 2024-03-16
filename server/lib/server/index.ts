import type { AnyTRPCRouter } from "@trpc/server";
import type { Server } from "bun";
import { CustomError, CustomErrorCode } from "~/server/lib/error";
import { logger } from "~/server/lib/log";
import {
    createBunHttpHandler,
    createBunWSHandler,
} from "~/server/lib/trpc/bun-adapter";
import { createCorsContext } from "~/server/lib/trpc/context";

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
                return createBunHttpHandler({
                    req: request,
                    router: this._apiRouter,
                    endpoint: this._apiEndpoint,
                    allowBatching: true,
                    createContext: createCorsContext,
                    wsEndpoint: this._webSocketEndpoint,
                })(request, server);
            },
            websocket: createBunWSHandler({
                router: this._webSocketRouter,
                allowBatching: true,
            }),
        });
        logger.info(
            `server started on ${this._server.hostname}:${this._server.port}`
        );
        return this;
    }
}
