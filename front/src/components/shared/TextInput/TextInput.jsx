import React from "react";
import styles from "./TextInput.module.css";

const TextInput = ({ props, onChange }) => {
  return (
    <div>
      <input
        type="text"
        className={styles.input}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default TextInput;
