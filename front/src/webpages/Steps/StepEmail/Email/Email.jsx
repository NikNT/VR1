import React, { useState } from "react";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import styles from "../StepEmail.module.css";

const Email = () => {
  const [email, setEmail] = useState("");
  return (
    <Card title="Enter Email ID" icon="email-emoji">
      <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button text="Next" />
        </div>
        <p className={styles.bottomParagraph}>
          You'll recieve an OTP on your Email which you can use to easily log in
          to your account.
        </p>
      </div>
    </Card>
  );
};

export default Email;
