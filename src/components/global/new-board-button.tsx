"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { useApiMutation } from "@/hooks/queries/use-api-mutation";
import { api } from "../../../convex/_generated/api";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.board.create);

  const onClick = () => {
    mutate({
      orgId,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board created");
        // router.push(`/board/${id}`);
      })
      .catch(() => toast.error("Failed to create board"));
  };

  return (
    <button
      disabled={pending || disabled}
      onClick={onClick}
      className={cn(
        "bg-gra col-span-1 flex aspect-[100/127] flex-col items-center justify-center gap-2 rounded-lg bg-gradient-to-bl from-primary to-primary/60 py-6 transition-opacity delay-500 hover:from-primary/90 hover:to-primary/50",
        (pending || disabled) &&
          "cursor-not-allowed opacity-75 hover:bg-primary",
      )}
    >
      <Plus className="size-12 stroke-1 text-white" />
      <p className="text-base font-medium text-white">New board</p>
    </button>
  );
};
