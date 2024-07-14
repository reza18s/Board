import React from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ModalData = {
  BoardCard: {
    id: string;
    title: string;
    authorName?: string;
    authorId?: string;
    createdAt?: number;
    imageUrl?: string;
    orgId?: string;
    isFavorite?: boolean;
  } | null;
};
interface IModal {
  data: ModalData;
  isOpen: boolean;
  modal: React.ReactNode;
}
export type Actions = {
  setOpen: (modal: React.ReactNode, data?: ModalData) => void;
  setClose: () => void;
};
export type Store = IModal & Actions;
const defaultValues: IModal = {
  data: { BoardCard: null },
  modal: null,
  isOpen: false,
};
export const useModal = create<Store>()(
  devtools(
    (set, get) => ({
      ...defaultValues,
      setOpen: (modal, data) => {
        set({ modal, isOpen: true, data: { ...get().data, ...data } });
      },
      setClose: () => {
        set(defaultValues);
      },
    }),
    { name: "modals" },
  ),
);
