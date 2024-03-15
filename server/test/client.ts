import { createTRPCClient, createWSClient, wsLink } from "@trpc/client";
import SuperJSON from "superjson";
import type { webSocketRouterType } from "~/server/router/ws";

const wsClient = createWSClient({
    url: "ws://localhost:3030/ws",
});

const tRPCClient = createTRPCClient<webSocketRouterType>({
    links: [
        wsLink<webSocketRouterType>({
            client: wsClient,
            transformer: SuperJSON,
        }),
    ],
});

await tRPCClient.test.mutate({});
