import { type TokenPayload } from "google-auth-library";
import { jwtDecode } from "jwt-decode";
import { z } from "zod";
import GoogleClient from "~/server/lib/client/google";
import { apiPublicProcedure } from "~/server/lib/trpc";

const Input = z
    .object({
        code: z.string(),
    })
    .strict();

export default apiPublicProcedure
    .input(Input)
    .mutation(async ({ ctx, input }) => {
        const { tokens } = await GoogleClient.getToken(input);
        const client = jwtDecode<TokenPayload>(tokens.id_token ?? "");

        return {
            hello: "world",
        };
    });
