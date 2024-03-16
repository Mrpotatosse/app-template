import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LoadingComponent from "~/client/components/custom/Loading";
import { useApi } from "~/client/contexts/api/hook";
import { useAppState } from "~/client/contexts/state/hook";
import HeaderLayout from "~/client/layouts/Header";
import { cn } from "~/client/libs/utils";

export default function AppLayout() {
    const app = useAppState();
    const { api } = useApi();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api["user/auto"]
            .mutate({})
            .then((r) => {
                app.user = r.user;
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return loading ? (
        <LoadingComponent />
    ) : (
        <div
            className={cn(
                "flex flex-wrap w-full h-full min-h-0 min-w-0 overflow-auto gap-1 p-1 flex-col-reverse",
                "md:flex-col"
            )}
        >
            <HeaderLayout />
            <div className={cn("w-full flex-1 min-h-0 min-w-0 overflow-auto")}>
                <Outlet />
            </div>
        </div>
    );
}
