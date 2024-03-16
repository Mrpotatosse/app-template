import { observable } from "@trpc/server/observable";
import { webSocketPublicProcedure } from "~/server/lib/trpc";

export default webSocketPublicProcedure.subscription(() => {
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