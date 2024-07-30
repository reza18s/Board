"use client";
import { useOthers } from "@liveblocks/react/suspense";
import { Info } from "./Info";
import { Toolbar } from "./toolbar";
import { Participants } from "./participants";

export function Canvas({ boardId }: { boardId: string }) {
  const others = useOthers();
  const userCount = others.length;
  console.log(others);
  return (
    <div className="relative size-full touch-none">
      <Participants></Participants>
      <Info boardId={boardId}></Info>
      {/* <Toolbar ></Toolbar> */}
    </div>
  );
}
