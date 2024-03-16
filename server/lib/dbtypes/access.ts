import { Prisma } from "@prisma/client";
import dayjs from "dayjs";

export const AccessDefaultSelector =
    Prisma.validator<Prisma.AccessDefaultArgs>()({
        select: {
            Id: true,
            UserId: true,
            DateOfExpiration: true,
            DateOfCreation: true,
            Enabled: true,
            Type: true,
        },
    });

export const AccessRequired = (accessId: string) =>
    Prisma.validator<Prisma.AccessWhereInput>()({
        Id: accessId,
        DateOfExpiration: {
            gt: dayjs().toDate(),
        },
        Enabled: true,
    });
