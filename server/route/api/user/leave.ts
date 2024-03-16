import { z } from "zod";
import { apiPublicProcedure } from "~/server/lib/trpc";

const Input = z.object({});

export default apiPublicProcedure.input(Input).query(async ({ ctx, input }) => {
    return {
        hello: "world",
    };
});