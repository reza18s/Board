import React from "react";
import { InputOTP, InputOTPSlot } from "../ui/OTPInput";

type Props = {
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  field?: number;
};

const OTPInput = ({ otp, setOtp, field = 6 }: Props) => {
  return (
    <InputOTP maxLength={6} value={otp} onChange={(otp) => setOtp(otp)}>
      <div className="flex gap-3">
        {Array.from(Array(field).keys()).map((_, i) => (
          <div key={i}>
            <InputOTPSlot index={i} />
          </div>
        ))}
      </div>
    </InputOTP>
  );
};

export default OTPInput;
