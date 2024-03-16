import { z } from "zod";
import { apiPublicProcedure } from "~/server/lib/trpc";

const Input = z.object({});

export default apiPublicProcedure.input(Input).mutation(async ({ ctx, input }) => {
    return {
        hello: "world",
    };
});