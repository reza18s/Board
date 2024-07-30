"use client";
import { useOthers } from "@liveblocks/react/suspense";
import { Info } from "./Info";
import { Toolbar } from "./toolbar";
import { Participants } from "./participants";
import { useState } from "react";
import { CanvasMode, CanvasState } from "@/types/canvas";

export function Canvas({ boardId }: { boardId: string }) {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const others = useOthers();
  const userCount = others.length;
  console.log(others);
  return (
    <div className="relative size-full min-w-[400px] touch-none">
      <Participants></Participants>
      <Info boardId={boardId}></Info>
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={false}
        canUndo={false}
        undo={() => {}}
        redo={() => {}}
      ></Toolbar>
    </div>
  );
}
