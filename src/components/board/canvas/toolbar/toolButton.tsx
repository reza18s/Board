"use client";

import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/global/hint";
import { cn } from "@/lib/utils";

interface ToolButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

export const ToolButton = ({
  label,
  icon: Icon,
  onClick,
  isDisabled,
  isActive,
}: ToolButtonProps) => (
  <Hint label={label} side="right" sideOffset={14}>
    <Button
      disabled={isDisabled}
      onClick={onClick}
      size="icon"
      className={cn(
        "bg-transparent [&>*]:hover:stroke-white",
        isActive && "bg-primary",
      )}
    >
      <Icon className={cn("stroke-primary ", isActive && "stroke-white ")} />
    </Button>
  </Hint>
);
