import { parse } from "cookie";
import { CookieKey, RequestHeader } from "~/server/lib/const/key";

export function getCookies(request: Request) {
    return parse(request.headers.get(RequestHeader.Cookie) ?? "");
}

export function getAuthorization(request: Request) {
    const bearer = "Bearer ";
    const auth = request.headers.get(RequestHeader.Authorization) ?? "";
    if (auth?.startsWith(bearer)) {
        return auth.slice(bearer.length);
    }
}

export function getAccess(request: Request) {
    return (
        getAuthorization(request) ?? getCookies(request)[CookieKey.ACCESS] ?? ""
    );
}
