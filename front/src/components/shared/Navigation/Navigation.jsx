import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const navStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };

  const logoText = {
    marginLeft: "10px",
  };

  const logoImg = {
    height: "30px",
    width: "30px",
    borderRadius: "15%",
  };

  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={navStyle} to="/">
        <img style={logoImg} src="/images/logo.png" alt="Logo" />
        <span style={logoText}>VR1</span>
      </Link>
    </nav>
  );
};

export default Navigation;
