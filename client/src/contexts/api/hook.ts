import {
    CreateTRPCClient,
    createTRPCClient,
    createWSClient,
    wsLink,
} from "@trpc/client";
import { useContext, useEffect, useRef } from "react";
import SuperJSON from "superjson";
import { ApiProviderContext } from "~/client/contexts/api/context";
import type { webSocketRouterType } from "~/server/router/ws";

export const useApi = () => {
    const context = useContext(ApiProviderContext);

    if (context === undefined)
        throw new Error("useApi must be used within an ApiProvider");

    return context;
};

export const useWebSocket = (url: string) => {
    const ws = useRef<ReturnType<typeof createWSClient> | null>(null);
    const webSocketClient =
        useRef<CreateTRPCClient<webSocketRouterType> | null>(null);

    useEffect(() => {
        if (!ws.current) {
            ws.current = createWSClient({
                url,
            });
            webSocketClient.current = createTRPCClient({
                links: [
                    wsLink<webSocketRouterType>({
                        client: ws.current,
                        transformer: SuperJSON,
                    }),
                ],
            });
        }

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [url]);

    return {
        webSocket: () => webSocketClient.current!,
        webSocketReconnect: () => ws.current?.close(),
    };
};
