import { serialize } from "cookie";
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
    await DatabaseClient.access.update({
        where: {
            Id: accessId,
        },
        data: {
            Enabled: false,
        },
    });

    ctx.resHeaders?.append(
        RequestHeader.SetCookie,
        serialize(CookieKey.ACCESS, "", CookieOptions[CookieKey.ACCESS])
    );

    return {};
});
