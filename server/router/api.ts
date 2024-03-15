import { router } from "~/server/lib/trpc";
import file098f6bcd4621d373cade4e832627b4f6 from "~/server/route/api/test";

export const apiRouter = router({
    "test": file098f6bcd4621d373cade4e832627b4f6,
});

export type apiRouterType = typeof apiRouter;