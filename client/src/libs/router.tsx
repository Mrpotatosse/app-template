import { createBrowserRouter } from "react-router-dom";
import AppLayout from "~/client/layouts/App";
import ErrorPage from "~/client/pages/Error";
import GoogleCallbackPage from "~/client/pages/GoogleCallback";
import GoogleLeavePage from "~/client/pages/GoogleLeave";
import HomePage from "~/client/pages/Home";
import MarketPage from "~/client/pages/Market";
import ProfilePage from "~/client/pages/Profile";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/profile/:id",
                element: <ProfilePage />,
            },
            {
                path: "/market/:pair?",
                element: <MarketPage />,
            },
        ],
    },
    {
        path: "/google/callback",
        element: <GoogleCallbackPage />,
    },
    {
        path: "/google/leave",
        element: <GoogleLeavePage />,
    },
]);
