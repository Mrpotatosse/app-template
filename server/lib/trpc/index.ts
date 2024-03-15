import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";
import { logger } from "~/server/lib/log";
import type { Context } from "~/server/lib/trpc/context";

const tRPC = initTRPC.context<Context>().create({
    transformer: SuperJSON,
});

export const router = tRPC.router;
export const publicProcedure = tRPC.procedure.use((opts) => {
    const url = new URL(opts.ctx.req.url);
    logger.info(`request ${url.pathname} ${opts.path}`);
    return opts.next(opts);
});
