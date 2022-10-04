import React, { useState } from "react";
import StepEmail from "../Steps/StepEmail/StepEmail";
import StepOTP from "../Steps/StepOTP/StepOTP";

const steps = {
  1: StepEmail,
  2: StepOTP,
};

const Authenticate = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  function onNext() {
    setStep(step + 1);
  }

  return <Step onNext={onNext} />;
};
export default Authenticate;
