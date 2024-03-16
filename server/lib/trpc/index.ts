import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";
import { logger } from "~/server/lib/log";
import type { Context, CorsContext } from "~/server/lib/trpc/context";

const apiTRPC = initTRPC.context<CorsContext>().create({
    transformer: SuperJSON,
});

const webSocketTRPC = initTRPC.context<Context>().create({
    transformer: SuperJSON,
});

export const apiTRPCRouter = apiTRPC.router;
export const apiPublicProcedure = apiTRPC.procedure.use((opts) => {
    const url = new URL(opts.ctx.req?.url ?? "");
    logger.info(`request ${url.pathname} ${opts.path}`);
    return opts.next(opts);
});

export const webSocketTRPCRouter = webSocketTRPC.router;
export const webSocketPublicProcedure = webSocketTRPC.procedure.use((opts) => {
    const url = new URL(opts.ctx.req?.url ?? "");
    logger.info(`request ${url.pathname} ${opts.path}`);
    return opts.next(opts);
});