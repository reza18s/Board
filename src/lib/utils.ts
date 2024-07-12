import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const orgSwitchTheme = (theme?: string) => {
  return {
    variables: {
      colorPrimary: "#ffbf42",
      colorAlphaShade: "#ffbf42",
    },
    elements: {
      rootBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        maxWidth: "376px",
        backgroundColor: ` ${theme === "dark" ? "#0e030e" : ""} `,
      },
      organizationSwitcherRoot: {
        width: "100%",
        borderRadius: "8px",
        // border: `1px solid ${theme === "dark" ? "#d600d6" : "#341556"}`,
      },
      organizationSwitcherTrigger: {
        padding: "6px",
        width: "100%",
        borderRadius: "8px",
        background: ` ${theme === "dark" ? "#140814" : "#ffffff"} `,
        border: `1px solid ${theme === "dark" ? "#301030" : "#7c3aed"}`,
        justifyContent: "space-between",
        color: ` ${theme === "dark" ? "white" : "#000000"} `,
        "&:hover": {
          background: ` ${theme === "dark" ? "#301030" : "#e9e1fa"} `,
          color: ` ${theme === "dark" ? "white" : "#000000"} `,
          border: `1px solid ${theme === "dark" ? "#d600d6" : "#9400d3"}`,
        },
        "&:focus": {
          background: ` ${theme === "dark" ? "#301030" : "#e9e1fa"} `,
          color: ` ${theme === "dark" ? "white" : "#000000"} `,
          border: `1px solid ${theme === "dark" ? "#d600d6" : "#9400d3"}`,
        },
      },
    },
  };
};
