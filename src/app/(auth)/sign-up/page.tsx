import ButtonHandler from "@/components/Auth/buttonHandler";
import HighLightBar from "@/components/Auth/HighlightBar";
import SignUpFormProvider from "@/components/Auth/SignUpFormProvider";
import RegistrationFormStep from "@/components/forms/sign-up/registration-step";

import React from "react";

type Props = {};

const SignUp = (props: Props) => {
  return (
    <div className="w-full flex-1 py-36 md:px-16">
      <div className="flex h-full flex-col gap-3">
        <SignUpFormProvider>
          <div className="flex flex-col gap-3">
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
