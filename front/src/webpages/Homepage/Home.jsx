import React from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import Card from "../../components/shared/Card/Card";
import Button from "../../components/shared/Button/Button";

const Home = () => {
  const history = useNavigate();

  function startRegister() {
    history("/authenticate");
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
          <Button onClick={startRegister} text="Let's Begin 🙂" />
        </div>
        <div className={styles.signinInfo}>
          <span className={styles.inviteTxt}>Got an invite text?</span>
        </div>
      </Card>
    </div>
  );
};

export default Home;
