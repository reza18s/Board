"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import FormGenerator from "../../global/FormGenerator";
import { USER_LOGIN_FORM } from "@/constants/forms";

const LoginForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <h2 className="text-gravel font-bold md:text-4xl">Login</h2>
      <p className="text-iridium md:text-sm">
        You will receive a one time password
      </p>
      {USER_LOGIN_FORM.map((field) => (
        <FormGenerator
          key={field.id}
          {...field}
          errors={errors}
          register={register}
          name={field.name}
          label={field.name}
        />
      ))}
    </>
  );
};

export default LoginForm;
