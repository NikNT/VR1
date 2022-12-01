import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../http";
import styles from "./Navigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";
// import { setAvatar } from "../../../store/activateSlice";

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
  const { isAuth, user } = useSelector((state) => state.auth);
  // const { avatar } = useSelector((state) => state.activate);

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
      <div className={styles.navRight}>
        {isAuth && <h3>{user.name}</h3>}
        <Link to="/">
          {isAuth && (
            <img
              className={styles.avatar}
              src={
                user.avatar ? user.avatar : "/images/default-profile-icon.png"
              }
              width="40"
              height="40"
              alt="User Profile Icon"
            />
          )}
        </Link>
        {isAuth && (
          <button className={styles.logoutButton} onClick={logoutUser}>
            <img
              className={styles.logoutIcon}
              src="/images/logout.png"
              alt="Logout Button"
            />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
