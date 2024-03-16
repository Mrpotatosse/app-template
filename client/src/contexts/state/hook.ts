import { useContext } from "react";
import { AppStateProviderContext } from "~/client/contexts/state/context";

export const useAppState = () => {
    const context = useContext(AppStateProviderContext);

    if (context === undefined)
        throw new Error("useAppState must be used within a AppStateProvider");

    return context;
};
