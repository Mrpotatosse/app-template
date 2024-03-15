import type { CreateBunContextOptions } from "trpc-bun-adapter";

export const createContext: (opts: CreateBunContextOptions) => {
    req: Request;
} = (opts) => opts;

export type Context = typeof createContext;
