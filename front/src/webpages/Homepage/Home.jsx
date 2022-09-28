import React from "react";
import styles from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/shared/Card/Card";
import Button from "../../components/shared/Button/Button";

const Home = () => {
  const linkStyle = {
    color: "#0077ff",
    fontWeight: "bold",
    textDecoration: "none",
    marginLeft: "5px",
  };

  const history = useNavigate();

  function startRegister() {
    history("/register");
  }

  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome to VR1!" icon="logo">
        <p className={styles.infoText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          possimus animi, sed, iure iste nihil quas aperiam nesciunt eveniet,
          sunt tenetur? Voluptatum consectetur minima velit aliquam animi
          aliquid excepturi accusantium.
        </p>
        <div>
          <Button onClick={startRegister} text="Get Username" />
        </div>
        <div className={styles.signinInfo}>
          <span className={styles.inviteTxt}>Got an invite text?</span>
          <Link style={linkStyle} to="/login">
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Home;
