"use client";
import { useOthers } from "@liveblocks/react/suspense";
import Participants from "./Participants";
import { Info } from "./Info";
import { Toolbar } from "./toolbar";

export function Canvas({ boardId }: { boardId: string }) {
  const others = useOthers();
  const userCount = others.length;
  console.log(others);
  return (
    <div className="relative size-full touch-none">
      <Info boardId={boardId}></Info>
      {/* <Toolbar ></Toolbar> */}
      <Participants></Participants>
    </div>
  );
}
