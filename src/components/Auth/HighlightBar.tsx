"use client";
import { useAuthContextHook } from "@/context/useAuthContext";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {};

const HighLightBar = (props: Props) => {
  const { currentStep } = useAuthContextHook();

  return (
    <div className="grid grid-cols-3 gap-3">
      <div
        className={cn(
          "col-span-1 h-2 rounded-full",
          currentStep == 1 ? "bg-orange" : "bg-platinum",
        )}
      ></div>
      <div
        className={cn(
          "col-span-1 h-2 rounded-full",
          currentStep == 2 ? "bg-orange" : "bg-platinum",
        )}
      ></div>
      <div
        className={cn(
          "col-span-1 h-2 rounded-full",
          currentStep == 3 ? "bg-orange" : "bg-platinum",
        )}
      ></div>
    </div>
  );
};

export default HighLightBar;
