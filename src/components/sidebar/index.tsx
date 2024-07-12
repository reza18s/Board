"use client";
import { List } from "./list";
import { NewButton } from "./new-button";

export const Sidebar = () => {
  return (
    <div className="h-full w-[60px] flex-col gap-y-4 bg-card p-3 text-white lg:hidden ">
      <List />
      <NewButton />
    </div>
  );
};
