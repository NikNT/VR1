import React from "react";
import Card from "../Card/Card";
import styles from "./Loader.module.css";

const Loader = ({ message }) => {
  return (
    <div className="cardWrapper">
      <Card>
        <svg
          className={styles.spinner}
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 392.138 392.138"
          viewBox="0 0 392.1 392.1"
          height="42"
          width="42"
          fill="none"
        >
          <path
            fill="#2488ff"
            d="M290.8 295.3l5.9 5.9-91 91h181.5L319 323.6a187.4 187.4 0 0059.6-136.8C378.7 83.9 295 0 191.8 0a187 187 0 00-81.6 355l17.5-36a147 147 0 0164.1-279 147 147 0 0199 255.3z"
          ></path>
          <path
            fill="#005ece"
            d="M296.7 301.2l-5.9-5.9-85.1-85.5v182.3z"
          ></path>
        </svg>
        <span className={styles.message}>{message}</span>
      </Card>
    </div>
  );
};

export default Loader;
