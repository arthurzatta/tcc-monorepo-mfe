import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ComboboxProps = {
  items: { value: string; label: string }[];
  onApply: (value: string[]) => void;
  placeholder: string;
  emptyMsg?: string;
};

export const Combobox = ({
  placeholder,
  items,
  onApply,
  emptyMsg = "Item not found",
}: ComboboxProps) => {
  const [open, setOpen] = React.useState(false);
  const [initialValue, setInitialValue] = React.useState<string[]>([]);
  const [value, setValue] = React.useState<string[]>([]);

  const onSelect = (currentValue: string) => {
    if (value.includes(currentValue)) {
      setValue(value.filter((v) => v !== currentValue));
    } else {
      setValue([...value, currentValue]);
    }
  };

  const onApplySelection = () => {
    onApply(value);
    setInitialValue(value);
    setOpen(false);
  };

  React.useEffect(() => {
    if (open) setValue(initialValue);
  }, [open, initialValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="xs"
          role="combobox"
          aria-expanded={open}
          className="w-fit justify-between"
        >
          {placeholder}
          <ChevronsUpDown className="ml-2 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-2" align="start">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>{emptyMsg}</CommandEmpty>
            <CommandGroup className="first:mt-0">
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={onSelect}
                  className="[&:has([data-state=checked])]:bg-green-100 mt-1 text-xs"
                >
                  <Checkbox
                    checked={value.includes(item.value)}
                    className="rounded-sm border-green-300 data-[state=checked]: text-red-300 data-[state=checked]:bg-white"
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <div className="w-full">
          <Button
            size="xs"
            variant="default"
            className="w-full"
            onClick={onApplySelection}
          >
            Aplicar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
