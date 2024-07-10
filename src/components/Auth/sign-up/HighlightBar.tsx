"use client";
import { useLocalStore } from "@/lib/stores/useLocalStore";
import { cn } from "@/lib/utils";
import React from "react";
import { useStore } from "zustand";

const HighLightBar = () => {
  const store = useStore(useLocalStore, (state) => state);

  return (
    <div className="grid grid-cols-3 gap-3">
      <div
        className={cn(
          "col-span-1 h-2 rounded-full",
          store.signUpStep == 1 ? "bg-orange-400" : "bg-gray-400",
        )}
      ></div>
      <div
        className={cn(
          "col-span-1 h-2 rounded-full",
          store.signUpStep == 2 ? "bg-orange-400" : "bg-gray-400",
        )}
      ></div>
      <div
        className={cn(
          "col-span-1 h-2 rounded-full",
          store.signUpStep == 3 ? "bg-orange-400" : "bg-gray-400",
        )}
      ></div>
    </div>
  );
};

export default HighLightBar;
