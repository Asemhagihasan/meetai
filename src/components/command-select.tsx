import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronsDownIcon } from "lucide-react";

import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "./ui/command";
import { Button } from "./ui/button";

interface Props {
  options: Array<{
    id: string;
    value: string;
    children: React.ReactNode;
  }>;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string;
  placeholder?: string;
  className?: string;
}
export const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  placeholder,
  className,
}: Props) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  const handleOpenChange = (open: boolean) => {
    onSearch?.("");
    setOpen(open);
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className={cn(
          "h-9 justify-between px-2 font-normal",
          !selectedOption && "text-muted-foreground",
          className,
        )}
        onClick={() => setOpen(true)}
      >
        <div>{selectedOption?.children || placeholder}</div>
        <ChevronsDownIcon />
      </Button>
      <CommandResponsiveDialog
        open={open}
        onOpenChange={handleOpenChange}
        shouldFilter={!onSearch}
      >
        <CommandInput placeholder="Search..." onValueChange={onSearch} />

        <CommandList>
          <CommandEmpty className="text-muted-foreground text-sm">
            <span>No options found</span>
          </CommandEmpty>
          {options.map((option) => (
            <CommandItem
              key={option.id}
              onSelect={() => {
                onSelect(option.value);
                setOpen(false);
              }}
            >
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};
