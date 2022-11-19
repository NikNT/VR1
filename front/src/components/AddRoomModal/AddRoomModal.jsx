import React, { useState } from "react";
import styles from "./AddRoomModal.module.css";
import TextInput from "../shared/TextInput/TextInput";
import { createRoom as create } from "../../http";
import { useNavigate } from "react-router-dom";

const AddRoomModal = ({ onClose }) => {
  const history = useNavigate();

  const [roomType, setRoomType] = useState("open");
  const [topic, setTopic] = useState("");

  async function createRoom() {
    try {
      if (!topic) return;
      const { data } = await create({ topic, roomType });
      history(`/room/${data.id}`);
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        <button className={styles.closeButton} onClick={onClose}>
          ❌
        </button>
        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>Enter The Topic To Be Discussed</h3>
          <TextInput
            fullwidth="true"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <h2 className={styles.subHeading}>Room Types</h2>
          <div className={styles.roomTypes}>
            <div
              onClick={() => setRoomType("open")}
              className={`${styles.typeBox} ${
                roomType === "open" ? styles.active : ""
              }`}
            >
              <img
                className={styles.roomTypesIcons}
                src="/images/globe.png"
                alt="Globes"
              />
              <span>Open</span>
            </div>
            <div
              onClick={() => setRoomType("social")}
              className={`${styles.typeBox} ${
                roomType === "social" ? styles.active : ""
              }`}
            >
              <img
                className={styles.roomTypesIcons}
                src="/images/social.png"
                alt="Social"
              />
              <span>Social</span>
            </div>
            <div
              onClick={() => setRoomType("private")}
              className={`${styles.typeBox} ${
                roomType === "private" ? styles.active : ""
              }`}
            >
              <img
                className={styles.roomTypesIcons}
                src="/images/lock.png"
                alt="Private"
              />
              <span>Private</span>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <h2>Start a Room, Open to Everyone!</h2>
          <button onClick={createRoom} className={styles.footerButton}>
            <span>🎈 Let's Go</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
