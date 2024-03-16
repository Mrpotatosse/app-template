import type { CookieSerializeOptions } from "cookie";
import dayjs from "dayjs";
import { CookieKey } from "~/server/lib/const/key";

export const CookieOptions: Record<CookieKey, CookieSerializeOptions> = {
    [CookieKey.ACCESS]: {
        expires: dayjs().add(1, "month").toDate(),
        httpOnly: true,
        path: "/",
        sameSite: "none",
        secure: true,
        partitioned: true,
    },
};
