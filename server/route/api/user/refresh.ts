import { serialize } from "cookie";
import dayjs from "dayjs";
import { UserRefreshClient } from "google-auth-library";
import { z } from "zod";
import DatabaseClient from "~/server/lib/client/database";
import { CookieKey, RequestHeader } from "~/server/lib/const/key";
import { CookieOptions } from "~/server/lib/const/object";
import { CustomError, CustomErrorCode } from "~/server/lib/error";
import { apiPublicProcedure } from "~/server/lib/trpc";
import { getAccess } from "~/server/lib/utils";

const Input = z.object({});

export default apiPublicProcedure.input(Input).query(async ({ ctx, input }) => {
    if (!ctx.req)
        throw new CustomError(
            CustomErrorCode.PropertyNotFound,
            "request not found"
        );

    const accessId = getAccess(ctx.req);
    const { User } = await DatabaseClient.access.findUniqueOrThrow({
        where: {
            Id: accessId,
        },
        select: {
            User: {
                select: {
                    Id: true,
                    RefreshToken: true,
                },
            },
        },
    });

    const { credentials } = await new UserRefreshClient(
        Bun.env.GOOGLE_ID,
        Bun.env.GOOGLE_SECRET,
        User.RefreshToken
    ).refreshAccessToken();

    if (!credentials.access_token)
        throw new CustomError(
            CustomErrorCode.PropertyNotFound,
            "access token not found"
        );

    await DatabaseClient.user.update({
        where: {
            Id: User.Id,
        },
        data: {
            Accesses: {
                upsert: {
                    where: {
                        Id: credentials.access_token ?? "",
                    },
                    create: {
                        Id: credentials.access_token ?? "",
                        DateOfExpiration: dayjs(
                            credentials.expiry_date
                        ).toDate(),
                    },
                    update: {},
                },
            },
        },
    });

    ctx.resHeaders?.append(
        RequestHeader.SetCookie,
        serialize(
            CookieKey.ACCESS,
            credentials.access_token,
            CookieOptions[CookieKey.ACCESS]
        )
    );

    return {
        expiryDate: dayjs(credentials.expiry_date).toDate(),
    };
});
