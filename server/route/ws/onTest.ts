import { observable } from "@trpc/server/observable";
import { publicProcedure } from "~/server/lib/trpc";

export default publicProcedure.subscription(() => {
    return observable((emit) => {
        const onSend = (data: any) => {
            emit.next(data);
        };

        global.MainEventEmitter.on("test", onSend);
        return () => {
            global.MainEventEmitter.off("test", onSend);
        };
    });
});