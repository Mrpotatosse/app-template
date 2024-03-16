import { User } from "lucide-react";

export default function HeaderLayout() {
    return (
        <div className="w-full h-12 flex justify-between">
            <div>logo</div>
            <div className="h-full aspect-square border rounded">
                <User className="w-full h-full stroke-1 stroke-foreground/10" />
            </div>
        </div>
    );
}
