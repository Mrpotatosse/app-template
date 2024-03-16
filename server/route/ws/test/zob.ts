import { z } from "zod";
import { webSocketPublicProcedure } from "~/server/lib/trpc";

const Input = z.object({});

export default webSocketPublicProcedure
    .input(Input)
    .query(async ({ ctx, input }) => {
        console.log(ctx.req.headers);
        return {
            hello: "world",
        };
    });