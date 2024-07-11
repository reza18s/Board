"use client";
import { useToast } from "@/components/ui/use-toast";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
export type UserLoginProps = {
  email: string;
  password: string;
};
export const UserLoginSchema: ZodType<UserLoginProps> = z.object({
  email: z.string().email({ message: "You did not enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Your password must be atleast 8 characters long" })
    .max(64, {
      message: "Your password can not be longer then 64 characters long",
    }),
});
export const useSignInForm = () => {
  const { isLoaded, setActive, signIn } = useSignIn();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  const methods = useForm<UserLoginProps>({
    resolver: zodResolver(UserLoginSchema),
    mode: "onChange",
  });
  const onHandleSubmit = methods.handleSubmit(
    async ({ email, password }: UserLoginProps) => {
      if (!isLoaded) {
        return;
      }
      try {
        setLoading(true);
        const authenticated = await signIn.create({
          identifier: email,
          password,
        });

        if (authenticated.status === "complete") {
          await setActive({ session: authenticated.createdSessionId });
          toast({
            title: "Success",
            description: "Welcome back!",
          });
          router.push("/dashboard");
        }
      } catch (error: any) {
        setLoading(false);
        // eslint-disable-next-line no-console
        console.error("error useSignin:", JSON.stringify(error, null, 2));
        if (
          // eslint-disable-next-line eqeqeq
          error.errors[0].code == "form_password_incorrect" ||
          // eslint-disable-next-line eqeqeq
          error.errors[0].code == "form_identifier_not_found"
        ) {
          return toast({
            title: "Error",
            description: "email/password is incorrect try again",
            variant: "destructive",
          });
        }
        return toast({
          title: "Error",
          description: "something went wrong please try again!",
          variant: "destructive",
        });
      }
    },
  );

  return {
    methods,
    onHandleSubmit,
    loading,
  };
};
