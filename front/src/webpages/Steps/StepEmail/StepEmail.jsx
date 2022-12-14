import React, { useState } from "react";
import Phone from "./Phone/Phone";
import Email from "./Email/Email";
import styles from "./StepEmail.module.css";

const phoneMap = {
  phone: Phone,
  email: Email,
};

const StepEmail = ({ onNext }) => {
  const [type, setType] = useState("phone");
  const Component = phoneMap[type];
  // function onNext() {
  //   // setStep(step + 1);
  // }

  return (
    <>
      <div className={styles.cardWrapper}>
        <div>
          <div className={styles.buttonWrap}>
            <button
              className={`${styles.tabButton} ${
                type === "phone" ? styles.active : ""
              }`}
              onClick={() => setType("phone")}
            >
              <img src="/images/phone-white.png" alt="phone" />
            </button>
            <button
              className={`${styles.tabButton} ${
                type === "email" ? styles.active : ""
              }`}
              onClick={() => setType("email")}
            >
              <img src="/images/mail-white.png" alt="email" />
            </button>
          </div>
          <Component onNext={onNext} />;
        </div>
      </div>
    </>
  );
};

export default StepEmail;
