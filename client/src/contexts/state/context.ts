import { createContext } from "react";
import { UserPrivate } from "~/client/libs/api";

export type AppStateProviderState = {
    user?: UserPrivate;
};

const initialState: AppStateProviderState = {};

export const AppStateProviderContext =
    createContext<AppStateProviderState>(initialState);
