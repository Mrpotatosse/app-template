import { logger } from "~/server/lib/log";
import { routerBuild } from "~/server/lib/trpc/builder";

await routerBuild({
    inputPath: "./route/api",
    inputAlias: "~/server/route/api",
    outputPath: "./router/api.ts",
    routerName: "apiRouter",
    routerType: "apiTRPCRouter",
});

await routerBuild({
    inputPath: "./route/ws",
    inputAlias: "~/server/route/ws",
    outputPath: "./router/ws.ts",
    routerName: "webSocketRouter",
    routerType: "webSocketTRPCRouter",
});

logger.info("v0build");
// to do add build for prod
