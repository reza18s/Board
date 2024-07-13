"use client";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";
import TypeSelectionForm from "./TypeSelectionForm";
import { Spinner } from "../../loader/Spinner";
import { useStore } from "zustand";
import { useLocalStore } from "@/stores/useLocalStore";

const DetailForm = dynamic(() => import("./AccountDetailsForm"), {
  ssr: false,
  // @ts-ignore
  loading: Spinner,
});

const OTPForm = dynamic(() => import("./OtpForm"), {
  ssr: false,
  // @ts-ignore
  loading: Spinner,
});

const RegistrationFormStep = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const store = useStore(useLocalStore, (state) => state);
  const [onOTP, setOnOTP] = useState<string>("");
  const [onUserType, setOnUserType] = useState<"owner" | "student">("owner");

  setValue("otp", onOTP);

  switch (store.signUpStep) {
    case 1:
      return (
        <TypeSelectionForm
          register={register}
          userType={onUserType}
          setUserType={setOnUserType}
        />
      );
    case 2:
      return <DetailForm errors={errors} register={register} />;
    case 3:
      return <OTPForm onOTP={onOTP} setOTP={setOnOTP} />;
  }

  return <div>RegistrationFormStep</div>;
};

export default RegistrationFormStep;
