import React from "react";
import styles from "./TextInput.module.css";

const TextInput = ({ props, onChange, fullwidth }) => {
  return (
    <div>
      <input
        type="text"
        className={styles.input}
        style={{ width: fullwidth === "true" ? "100%" : "inherit" }}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default TextInput;
