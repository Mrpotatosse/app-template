import { serialize } from "cookie";
import dayjs from "dayjs";
import { type TokenPayload } from "google-auth-library";
import { jwtDecode } from "jwt-decode";
import { z } from "zod";
import DatabaseClient from "~/server/lib/client/database";
import { GoogleClient } from "~/server/lib/client/google";
import { CookieKey, RequestHeader } from "~/server/lib/const/key";
import { CookieOptions } from "~/server/lib/const/object";
import { UserPrivateDefaultSelector } from "~/server/lib/dbtypes/user";
import { CustomError, CustomErrorCode } from "~/server/lib/error";
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

        if (!tokens.id_token)
            throw new CustomError(
                CustomErrorCode.PropertyNotFound,
                "id token not found"
            );

        if (!tokens.access_token)
            throw new CustomError(
                CustomErrorCode.PropertyNotFound,
                "access token not found"
            );

        const client = jwtDecode<TokenPayload>(tokens.id_token);

        if (!client.email)
            throw new CustomError(
                CustomErrorCode.PropertyNotFound,
                "client email not found"
            );

        const user = await DatabaseClient.user.upsert({
            where: {
                Email: client.email,
            },
            update: {
                ProfilePicture: client.picture ?? "",
                RefreshToken: tokens.refresh_token ?? "",
                Accesses: {
                    upsert: {
                        where: {
                            Id: tokens.access_token,
                        },
                        create: {
                            Id: tokens.access_token,
                            DateOfExpiration: dayjs(
                                tokens.expiry_date
                            ).toDate(),
                        },
                        update: {},
                    },
                },
            },
            create: {
                Email: client.email,
                ProfilePicture: client.picture ?? "",
                RefreshToken: tokens.refresh_token ?? "",
                Accesses: {
                    create: {
                        Id: tokens.access_token,
                        DateOfExpiration: dayjs(tokens.expiry_date).toDate(),
                    },
                },
            },
            select: UserPrivateDefaultSelector.select,
        });

        ctx.resHeaders?.append(
            RequestHeader.SetCookie,
            serialize(
                CookieKey.ACCESS,
                tokens.access_token,
                CookieOptions[CookieKey.ACCESS]
            )
        );

        return {
            user,
            expiryDate: dayjs(tokens.expiry_date).toDate(),
        };
    });
