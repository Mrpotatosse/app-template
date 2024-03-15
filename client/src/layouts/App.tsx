import { Outlet } from "react-router-dom";
import HeaderLayout from "~/client/layouts/Header";
import { cn } from "~/client/libs/utils";

export default function AppLayout() {
    return (
        <div
            className={cn(
                "md:container md:flex-col",
                "flex flex-wrap w-full h-full min-h-0 min-w-0 overflow-auto gap-1 p-1 flex-col-reverse"
            )}
        >
            <HeaderLayout />
            <div className={cn("w-full flex-1 min-h-0 min-w-0 overflow-auto")}>
                <Outlet />
            </div>
        </div>
    );
}
