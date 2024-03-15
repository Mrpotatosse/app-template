import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "~/client/components/ui/button";
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "~/client/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/client/components/ui/popover";
import { cn } from "~/client/libs/utils";

export type Pair = {
    value: string;
    label: string;
    disabled?: true;
};

export type PairSelectorComponentProps = {
    onPairSelected?: (pair?: Pair) => void;
    pairs: Array<Pair>;
    defaultPair?: string;
};

export default function PairSelectorComponent({
    onPairSelected,
    pairs,
    defaultPair,
}: PairSelectorComponentProps) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Pair | undefined>(
        defaultPair
            ? pairs.find((pair) => pair.value === defaultPair)
            : undefined
    );
    const { t } = useTranslation();
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between border-none rounded-none shadow-none"
                >
                    {selected ? selected.label : t("app.select_pair")}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="shadow-none w-[calc(100vw-0.5rem)] md:w-[330px] p-0 rounded">
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {pairs.map((pair) => (
                                <CommandItem
                                    key={pair.label}
                                    value={pair.value}
                                    onSelect={(currentValue) => {
                                        setSelected(
                                            currentValue === selected?.value
                                                ? undefined
                                                : pair
                                        );
                                        setOpen(false);
                                        onPairSelected?.(
                                            currentValue === selected?.value
                                                ? undefined
                                                : pair
                                        );
                                    }}
                                    disabled={pair.disabled}
                                >
                                    {pair.label}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            selected?.value === pair.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
