import ButtonHandler from "@/components/Auth/sign-up/buttonHandler";
import HighLightBar from "@/components/Auth/sign-up/HighlightBar";
import RegistrationFormStep from "@/components/Auth/sign-up/RegistrationStep";
import SignUpFormProvider from "@/components/Auth/sign-up/SignUpFormProvider";
import UndoButton from "@/components/Auth/sign-up/UndoButton";

import React from "react";

const SignUp = () => {
  return (
    <div className="w-full flex-1 py-36 md:px-16">
      <div className="flex h-full flex-col gap-3">
        <SignUpFormProvider>
          <div className="flex flex-col gap-3">
            <UndoButton></UndoButton>
            <RegistrationFormStep />
            <ButtonHandler />
          </div>
          <HighLightBar />
        </SignUpFormProvider>
      </div>
    </div>
  );
};

export default SignUp;
