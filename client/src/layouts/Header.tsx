import { Plus } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSnapshot } from "valtio";
import { Button } from "~/client/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/client/components/ui/dropdown-menu";
import { useAppState } from "~/client/contexts/state/hook";

export default function HeaderLayout() {
    const app = useAppState();
    const appSnap = useSnapshot(app, { sync: true });
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();

    return (
        <div className="w-full h-12 flex justify-between">
            <div>logo</div>
            <DropdownMenu
                open={open}
                onOpenChange={appSnap.user ? setOpen : undefined}
            >
                <DropdownMenuTrigger asChild>
                    <div className="h-full aspect-square border rounded overflow-hidden cursor-pointer">
                        {appSnap.user ? (
                            <img src={appSnap.user.ProfilePicture} />
                        ) : (
                            <Link
                                to={import.meta.env.VITE_GOOGLE_AUTH_URL}
                                className="w-full h-full stroke-1 stroke-foreground"
                            >
                                <Button
                                    className="w-full h-full p-0"
                                    variant="ghost"
                                >
                                    <Plus className="w-full h-full stroke-[0.5] stroke-foreground" />
                                </Button>
                            </Link>
                        )}
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    collisionPadding={4}
                    className="rounded shadow-none w-[calc(100vw-0.5rem)] md:w-64"
                >
                    <DropdownMenuGroup>
                        <DropdownMenuItem>test</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link to="/google/leave">{t("app.logout")}</Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
