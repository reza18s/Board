"use client";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";

export type UserRegistrationProps = {
  type: string;
  fullname: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  otp: string;
};

export const UserRegistrationSchema: ZodType<UserRegistrationProps> = z
  .object({
    type: z.string().min(1),
    fullname: z
      .string()
      .min(4, { message: "your full name must be atleast 4 characters long" }),
    email: z.string().email({ message: "Incorrect email format" }),
    confirmEmail: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Your password must be atleast 8 characters long" })
      .max(64, {
        message: "Your password can not be longer then 64 characters long",
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
        "password should contain only alphabets and numbers",
      ),
    confirmPassword: z.string(),
    otp: z.string().min(6, { message: "You must enter a 6 digit code" }),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((schema) => schema.email === schema.confirmEmail, {
    message: "Your emails not match",
    path: ["confirmEmail"],
  });
export const useSignUpForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const { signUp, isLoaded, setActive } = useSignUp();
  const router = useRouter();
  const methods = useForm<UserRegistrationProps>({
    resolver: zodResolver(UserRegistrationSchema),
    defaultValues: {
      type: "owner",
    },
    mode: "onChange",
  });

  const onGenerateOTP = async (
    email: string,
    password: string,
    onNext: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: email,
        password: password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      onNext((prev) => prev + 1);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.errors[0].longMessage,
      });
    }
  };

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserRegistrationProps) => {
      if (!isLoaded) {
        return;
      }

      try {
        setLoading(true);
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: values.otp,
        });

        if (completeSignUp.status !== "complete") {
          return { message: "Something went wrong!" };
        }

        if (completeSignUp.status == "complete") {
          if (!signUp.createdUserId) {
            return;
          }

          // const registered = await onCompleteUserRegistration(
          //   values.fullname,
          //   signUp.createdUserId,
          //   values.type,
          // );

          //   if (registered?.status == 200 && registered.user) {
          //     await setActive({
          //       session: completeSignUp.createdSessionId,
          //     });

          //     setLoading(false);
          //     router.push("/dashboard");
          //   }

          //   if (registered?.status == 400) {
          //     toast({
          //       title: "Error",
          //       description: "Something went wrong!",
          //     });
          //   }
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.errors[0].longMessage,
        });
      }
    },
  );
  return {
    methods,
    onHandleSubmit,
    onGenerateOTP,
    loading,
  };
};
