import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../http";
import styles from "./Navigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";

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

  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);

  async function logoutUser() {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={navStyle} to="/">
        <img style={logoImg} src="/images/logo.png" alt="Logo" />
        <span style={logoText}>VR1</span>
      </Link>
      {isAuth && <button onClick={logoutUser}> Logout </button>}
    </nav>
  );
};

export default Navigation;
