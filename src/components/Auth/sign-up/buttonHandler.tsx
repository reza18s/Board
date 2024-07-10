"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useSignUpForm } from "@/hooks/auth/useSignUp";
import { useLocalStore } from "@/lib/stores/useLocalStore";
import useStore from "@/lib/stores/useStore";
import Link from "next/link";
import React from "react";
import { useFormContext } from "react-hook-form";

const ButtonHandler = () => {
  const { toast } = useToast();
  const { formState, getFieldState, getValues } = useFormContext();
  const { onGenerateOTP } = useSignUpForm();
  const store = useStore(useLocalStore, (state) => state);
  const { isDirty: isName } = getFieldState("fullname", formState);
  const { isDirty: isEmail } = getFieldState("email", formState);
  const { isDirty: isPassword } = getFieldState("password", formState);

  if (store?.signUpStep === 3) {
    return (
      <div className="flex w-full flex-col items-center gap-3">
        <Button type="submit" className="w-full">
          Create an account
        </Button>
        <p>
          Already have an account?
          <Link href="/sign-in" className="font-bold">
            Sign In
          </Link>
        </p>
      </div>
    );
  }

  if (store?.signUpStep === 2) {
    return (
      <div className="flex w-full flex-col items-center gap-3">
        <Button
          className="w-full"
          {...(isName &&
            isEmail &&
            isPassword && {
              onClick: () => {
                if (
                  !getValues("email") ||
                  !getValues("password") ||
                  !getValues("fullname") ||
                  !getValues("confirmPassword")
                ) {
                  toast({
                    title: "Please fill all the fields",
                    variant: "destructive",
                  });
                  return;
                }
                if (getValues("password") !== getValues("confirmPassword")) {
                  toast({
                    title: "Password not match",
                    variant: "destructive",
                  });
                  return;
                }

                onGenerateOTP(
                  getValues("email"),
                  getValues("password"),
                  getValues("fullname"),
                );
              },
            })}
        >
          Continue
        </Button>
        <p>
          Already have an account?{" "}
          <Link href="/sign-in" className="font-bold">
            Sign In
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <Button
        type="submit"
        className="w-full"
        onClick={() => store?.setSignUpStep(() => 2)}
      >
        Continue
      </Button>
      <p>
        Already have an account?{" "}
        <Link href="/sign-in" className="font-bold">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default ButtonHandler;
