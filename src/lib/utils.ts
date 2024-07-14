import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export interface ICssGlobal {
  "--background"?: string;
  "--foreground"?: string;
  "--muted"?: string;
  "--muted-foreground"?: string;
  "--popover"?: string;
  "--popover-foreground"?: string;
  "--card"?: string;
  "--card-foreground"?: string;
  "--border"?: string;
  "--input"?: string;
  "--primary"?: string;
  "--primary-foreground"?: string;
  "--secondary"?: string;
  "--secondary-foreground"?: string;
  "--accent"?: string;
  "--accent-foreground"?: string;
  "--destructive"?: string;
  "--destructive-foreground"?: string;
  "--ring"?: string;
}
