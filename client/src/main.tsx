import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "~/client/assets/css/custom.css";
import "~/client/assets/css/globals.css";
import { ApiProvider } from "~/client/contexts/api";
import { AppStateProvider } from "~/client/contexts/state";
import { ThemeProvider } from "~/client/contexts/theme";
import "~/client/i18n";
import { router } from "~/client/libs/router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <ApiProvider
        apiUrl="http://localhost:3030/api"
        webSocketUrl="ws://localhost:3030/ws"
    >
        <AppStateProvider>
            <ThemeProvider storageKey="app-theme" defaultTheme="light">
                <RouterProvider router={router} />
            </ThemeProvider>
        </AppStateProvider>
    </ApiProvider>
);
