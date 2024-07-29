"use client";

import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/global/hint";

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
}: ToolButtonProps) => (
  <Hint label={label} side="right" sideOffset={14}>
    <Button disabled={isDisabled} onClick={onClick} size="icon">
      <Icon />
    </Button>
  </Hint>
);
