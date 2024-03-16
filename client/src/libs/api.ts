import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { apiRouterType } from "~/server/router/api";
import type { webSocketRouterType } from "~/server/router/ws";

export type ApiRouterInput = inferRouterInputs<apiRouterType>;
export type ApiRouterOutput = inferRouterOutputs<apiRouterType>;

export type WebSocketRouterInput = inferRouterInputs<webSocketRouterType>;
export type WebSocketRouterOutput = inferRouterOutputs<webSocketRouterType>;

export type UserPrivate = ApiRouterOutput["user/auth"]["user"];
