import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { CreateBunContextOptions } from "~/server/lib/trpc/bun-adapter";
import { cors } from "~/server/lib/trpc/cors";

export const createContext: (opts: CreateBunContextOptions) => {
    req: Request;
} = (opts) => opts;

export type Context = typeof createContext;

export const createCorsContext: (
    opts: CreateBunContextOptions & Partial<FetchCreateContextFnOptions>
) => Partial<FetchCreateContextFnOptions> = (opts) => cors(opts);

export type CorsContext = typeof createCorsContext;
