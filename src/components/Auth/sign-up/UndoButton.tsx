"use client";
import { useLocalStore } from "@/stores/useLocalStore";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { useStore } from "zustand";

const UndoButton = () => {
  const store = useStore(useLocalStore, (state) => state);
  if (store.signUpStep == 1) {
    return null;
  }
  return (
    <div className="">
      <ArrowLeft
        color="orange"
        onClick={() =>
          store.setSignUpStep((prev: number) => {
            if (prev == 1) {
              return prev;
            }
            return prev - 1;
          })
        }
      ></ArrowLeft>
    </div>
  );
};

export default UndoButton;
