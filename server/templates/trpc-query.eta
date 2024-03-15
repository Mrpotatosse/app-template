import { z } from "zod";
import { publicProcedure } from "~/server/lib/trpc";

const Input = z.object({});

export default publicProcedure.input(Input).query(async ({ ctx, input }) => {
    return {
        hello: "world",
    };
});