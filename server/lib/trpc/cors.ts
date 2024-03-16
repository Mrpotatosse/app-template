import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export function cors(ctx: Partial<FetchCreateContextFnOptions>) {
    ctx.resHeaders?.append(
        "Access-Control-Allow-Origin",
        ctx.req?.headers.get("origin") ?? "*"
    );
    ctx.resHeaders?.append("Access-Control-Allow-Credentials", "true");
    ctx.resHeaders?.append(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, TRACE, CONNECT"
    );
    ctx.resHeaders?.append(
        "Access-Control-Allow-Headers",
        "x-csrf-token, x-requested-with, accept, accept-version, content-length, content-md5, content-type, date, x-api-version"
    );
    return ctx;
}
