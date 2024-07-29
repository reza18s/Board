"use client";
import { useOthers } from "@liveblocks/react/suspense";
import Participants from "./canvas/Participants";
import { Info } from "./canvas/Info";

export default function Canvas({ boardId }: { boardId: string }) {
  const others = useOthers();
  const userCount = others.length;
  console.log(others);
  return (
    <div className="relative size-full touch-none">
      <Info boardId={boardId}></Info>
      <Participants></Participants>
    </div>
  );
}
