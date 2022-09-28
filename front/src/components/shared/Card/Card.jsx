import React from "react";
import styles from "./Card.module.css";

const Card = ({ title, icon, children }) => {
  const logoImg = {
    height: "30px",
    width: "30px",
    borderRadius: "15%",
  };
  return (
    <div className={styles.card}>
      <div className={styles.headingWrapper}>
        <img style={logoImg} src={`/images/${icon}.png`} alt="Logo" />
        <h1 className={styles.heading}>{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default Card;
