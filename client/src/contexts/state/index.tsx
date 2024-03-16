import { proxy } from "valtio";
import {
    AppStateProviderContext,
    AppStateProviderState,
} from "~/client/contexts/state/context";

type AppStateProviderProps = {
    children: React.ReactNode;
};

export function AppStateProvider({
    children,
    ...props
}: AppStateProviderProps) {
    const appState = proxy<AppStateProviderState>({});

    return (
        <AppStateProviderContext.Provider {...props} value={appState}>
            {children}
        </AppStateProviderContext.Provider>
    );
}
