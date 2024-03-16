import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { Component } from "react";
import SuperJSON from "superjson";
import {
    ApiProviderContext,
    ApiProviderState,
} from "~/client/contexts/api/context";
import { useWebSocket } from "~/client/contexts/api/hook";
import type { apiRouterType } from "~/server/router/api";

type ApiProviderProps = {
    children: React.ReactNode;
    apiUrl: string;
    webSocketUrl: string;
};

export class Test extends Component {
    constructor({
        children,
        apiUrl,
        webSocketUrl,
        ...props
    }: ApiProviderProps) {
        super(props);
    }
}

export function ApiProvider({
    children,
    apiUrl,
    webSocketUrl,
    ...props
}: ApiProviderProps) {
    const api = createTRPCClient<apiRouterType>({
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

    const { webSocket, webSocketReconnect } = useWebSocket(webSocketUrl);

    const value: ApiProviderState = {
        api,
        webSocket,
        webSocketReconnect,
    };

    return (
        <ApiProviderContext.Provider {...props} value={value}>
            {children}
        </ApiProviderContext.Provider>
    );
}
