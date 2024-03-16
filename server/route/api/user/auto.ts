import { z } from "zod";
import DatabaseClient from "~/server/lib/client/database";
import { AccessRequired } from "~/server/lib/dbtypes/access";
import { UserPrivateDefaultSelector } from "~/server/lib/dbtypes/user";
import { CustomError, CustomErrorCode } from "~/server/lib/error";
import { apiPublicProcedure } from "~/server/lib/trpc";
import { getAccess } from "~/server/lib/utils";

const Input = z.object({});

export default apiPublicProcedure
    .input(Input)
    .mutation(async ({ ctx, input }) => {
        if (!ctx.req)
            throw new CustomError(
                CustomErrorCode.PropertyNotFound,
                "request not found"
            );

        const accessId = getAccess(ctx.req);

        const user = await DatabaseClient.user.findFirst({
            where: {
                Accesses: {
                    some: AccessRequired(accessId),
                },
            },
            select: UserPrivateDefaultSelector.select,
        });

        return {
            user: user ?? undefined,
        };
    });
