import { type CreateTRPCClient } from "@trpc/client";
import { createContext } from "react";
import type { apiRouterType } from "~/server/router/api";
import type { webSocketRouterType } from "~/server/router/ws";

export type ApiProviderState = {
    api: CreateTRPCClient<apiRouterType>;
    webSocket: () => CreateTRPCClient<webSocketRouterType>;
    webSocketReconnect: () => void;
};

export const ApiProviderContext = createContext<ApiProviderState | undefined>(
    undefined
);
