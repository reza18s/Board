"use client";
import React from "react";
import { FormProvider } from "react-hook-form";
import { Loader } from "../loader";
import { useSignInForm } from "@/hooks/auth/useSignIn";
import { AuthContextProvider } from "@/context/useAuthContext";

type Props = {
  children: React.ReactNode;
};

const SignInFormProvider = ({ children }: Props) => {
  const { methods, onHandleSubmit, loading } = useSignInForm();

  return (
    <AuthContextProvider>
      <FormProvider {...methods}>
        <form onSubmit={onHandleSubmit} className="h-full">
          <div className="flex h-full flex-col justify-between gap-3">
            <Loader loading={loading}>{children}</Loader>
          </div>
        </form>
      </FormProvider>
    </AuthContextProvider>
  );
};

export default SignInFormProvider;
