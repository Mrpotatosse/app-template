import { router } from "~/server/lib/trpc";
import file5529a39cdb71c1a70a2240aebd1134e7 from "~/server/route/ws/onTest";
import file098f6bcd4621d373cade4e832627b4f6 from "~/server/route/ws/test";

export const webSocketRouter = router({
    "onTest": file5529a39cdb71c1a70a2240aebd1134e7,
    "test": file098f6bcd4621d373cade4e832627b4f6,
});

export type webSocketRouterType = typeof webSocketRouter;