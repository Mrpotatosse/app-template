import { routerBuild } from "~/server/lib/trpc/builder";

await routerBuild({
    inputPath: "./route/api",
    inputAlias: "~/server/route/api",
    outputPath: "./router/api.ts",
    routerName: "apiRouter",
});

await routerBuild({
    inputPath: "./route/ws",
    inputAlias: "~/server/route/ws",
    outputPath: "./router/ws.ts",
    routerName: "webSocketRouter",
});

// to do add build for prod
