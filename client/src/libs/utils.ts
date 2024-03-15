import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function generateTicks(min: number, max: number, numTicks: number) {
    const interval = (max - min) / (numTicks - 1);
    const ticks = [];
    for (let i = 0; i < numTicks; i++) {
        ticks.push(Math.round(min + interval * i));
    }
    return ticks;
}
