import {
    createTRPCClient,
    createWSClient,
    httpBatchLink,
    wsLink,
} from "@trpc/client";
import SuperJSON from "superjson";
import {
    ApiProviderContext,
    ApiProviderState,
} from "~/client/contexts/api/context";
import type { apiRouterType } from "~/server/router/api";
import type { webSocketRouterType } from "~/server/router/ws";

type ApiProviderProps = {
    children: React.ReactNode;
    apiUrl: string;
    webSocketUrl: string;
};

export function ApiProvider({
    children,
    apiUrl,
    webSocketUrl,
    ...props
}: ApiProviderProps) {
    const apiClient = createTRPCClient<apiRouterType>({
        links: [
            httpBatchLink({
                url: apiUrl,
                fetch: (url, opts) => {
                    return fetch(url, {
                        ...opts,
                        credentials: "include",
                    });
                },
                transformer: SuperJSON,
            }),
        ],
    });

    const ws = createWSClient({
        url: webSocketUrl,
    });

    const webSocketClient = createTRPCClient({
        links: [
            wsLink<webSocketRouterType>({
                client: ws,
                transformer: SuperJSON,
            }),
        ],
    });

    const value: ApiProviderState = {
        api: apiClient,
        webSocket: webSocketClient,
        webSocketReconnect: () => ws.close(),
    };

    return (
        <ApiProviderContext.Provider {...props} value={value}>
            {children}
        </ApiProviderContext.Provider>
    );
}
