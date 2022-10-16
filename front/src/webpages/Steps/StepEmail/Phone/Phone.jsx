import React, { useState } from "react";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import styles from "../StepEmail.module.css";

const Phone = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <Card title="Enter Phone Number" icon="phone">
      <TextInput
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button text="Next" />
        </div>
        <p className={styles.bottomParagraph}>
          You'll recieve an OTP on your phone which you can use to easily log in
          to your account.
        </p>
      </div>
    </Card>
  );
};

export default Phone;
