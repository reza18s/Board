/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IStore {
  UserData: {
    email?: string;
    fullname?: string;
    type?: string;
  };
  signUpStep: number;
}
export type Actions = {
  setUserData: (data: IStore["UserData"]) => void;
  setSignUpStep: (step: ((prev: number) => number) | number) => void;
};

export type Store = IStore & Actions;

export const defaultInitState: IStore = {
  UserData: {
    email: "",
    fullname: "",
    type: "",
  },
  signUpStep: 1,
};

export const useLocalStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        ...defaultInitState,
        setUserData: (data) =>
          set((state) => (state.UserData = { ...state, ...data })),
        setSignUpStep: (step) => {
          return set((state) => ({
            ...state,
            signUpStep:
              typeof step === "function" ? step(state.signUpStep) : step,
          }));
        },
      }),

      { name: "cobraCase" },
    ),
  ),
);
