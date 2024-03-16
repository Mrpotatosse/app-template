import { Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSnapshot } from "valtio";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/client/components/ui/popover";
import { useAppState } from "~/client/contexts/state/hook";

export default function HeaderLayout() {
    const app = useAppState();
    const appSnap = useSnapshot(app, { sync: true });
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full h-12 flex justify-between">
            <div>logo</div>
            <Popover
                open={open}
                onOpenChange={appSnap.user ? setOpen : undefined}
            >
                <PopoverTrigger asChild>
                    <div className="h-full aspect-square border rounded overflow-hidden cursor-pointer">
                        {appSnap.user ? (
                            <img src={appSnap.user.ProfilePicture} />
                        ) : (
                            <Link
                                to={import.meta.env.VITE_GOOGLE_AUTH_URL}
                                className="w-full h-full stroke-1 stroke-foreground"
                            >
                                <Plus className="w-full h-full stroke-1 stroke-foreground" />
                            </Link>
                        )}
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    collisionPadding={4}
                    className="rounded shadow-none w-[calc(100vw-0.5rem)] md:w-64 p-0"
                >
                    content
                </PopoverContent>
            </Popover>
        </div>
    );
}
