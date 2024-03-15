import EventEmitter from "events";
import { tRPCServer } from "~/server/lib/server";
import { apiRouter } from "~/server/router/api";
import { webSocketRouter } from "~/server/router/ws";

declare global {
    var MainServer: tRPCServer;
    var MainEventEmitter: EventEmitter;
}

global.MainEventEmitter = new EventEmitter();
global.MainServer = new tRPCServer({
    apiEndpoint: "/api",
    apiRouter,

    webSocketEndpoint: "/ws",
    webSocketRouter,
}).serve();
