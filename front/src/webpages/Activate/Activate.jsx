import React, { useState } from "react";
import StepProfileAvatar from "../Steps/StepProfileAvatar/StepProfileAvatar";
import StepUserName from "../Steps/StepUserName/StepUserName";

const steps = {
  1: StepUserName,
  2: StepProfileAvatar,
};

const Activate = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  function onNext() {
    setStep(step + 1);
  }

  return (
    <div className="cardWrapper">
      <Step onNext={onNext}></Step>
    </div>
  );
};

export default Activate;
