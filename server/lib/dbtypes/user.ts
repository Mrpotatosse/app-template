import { Prisma } from "@prisma/client";

export const UserPrivateDefaultSelector =
    Prisma.validator<Prisma.UserDefaultArgs>()({
        select: {
            Id: true,
            DateOfCreation: true,
            Email: true,
        },
    });
