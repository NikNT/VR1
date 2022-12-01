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
        VR1 - Minimalistic and Aesthetic Drop-in Audio Chat Platform 🎙️
          <br />
          <br />

          By leveraging WebRTC Protocols, VR1 implements a Peer-to-Peer Connection to allow different end users to join specific rooms and audio chat with efficacy! 
          
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
