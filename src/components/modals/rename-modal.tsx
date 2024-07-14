"use client";

import { FormEventHandler, useEffect, useState } from "react";
import { toast } from "sonner";

import { DialogClose, DialogFooter } from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useStore from "@/stores/useStore";
import { useModal } from "@/stores/useModal";
import { useApiMutation } from "@/hooks/queries/use-api-mutation";
import { api } from "../../../convex/_generated/api";
import CustomModal from "./CustomModal";

export const RenameModal = () => {
  const { mutate, pending } = useApiMutation(api.board.update);

  const model = useStore(useModal, (state) => state);

  const [title, setTitle] = useState(model?.data.BoardCard?.title || "");

  useEffect(() => {
    setTitle(model?.data.BoardCard?.title || "");
  }, [model?.data.BoardCard?.title]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    mutate({
      id: model?.data.BoardCard?.id,
      title,
    })
      .then(() => {
        toast.success("Board renamed");
        model?.setClose();
      })
      .catch(() => toast.error("Failed to rename board"));
  };

  return (
    <CustomModal
      title="Rename board"
      subheading="Enter a new title for this board"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          disabled={pending}
          required
          maxLength={60}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Board title"
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={pending} type="submit">
            Save
          </Button>
        </DialogFooter>
      </form>
    </CustomModal>
  );
};
