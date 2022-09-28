import React, { useState } from "react";
import styles from "./Register.module.css";
import StepEmail from "../Steps/StepEmail/StepEmail";
import StepOTP from "../Steps/StepOTP/StepOTP";
import StepName from "../Steps/StepName/StepName";
import StepProfileAvatar from "../Steps/StepProfileAvatar/StepProfileAvatar";
import StepUserName from "../Steps/StepUserName/StepUserName";

const steps = {
  1: StepEmail,
  2: StepOTP,
  3: StepName,
  4: StepProfileAvatar,
  5: StepUserName,
};

const Register = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  function onNext() {
    setStep(step + 1);
  }

  return (
    <div>
      <Step onNext={onNext} />
    </div>
  );
};

export default Register;
