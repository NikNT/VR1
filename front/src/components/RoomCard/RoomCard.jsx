import React from "react";
import styles from "./RoomCard.module.css";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {
  const history = useNavigate();
  return (
    <div
      onClick={() => {
        history(`/room/${room.id}`);
      }}
      className={styles.card}
    >
      <h3 className={styles.topic}>{room.topic}</h3>
      <div
        className={`${styles.speakers} ${
          room.speakers.length === 1 ? styles.singleSpeaker : ""
        }`}
      >
        <div className={styles.avatars}>
          {room.speakers.map((speaker) => (
            <img
              key={speaker.id}
              // className={styles.avatar}
              src={speaker.avatar}
              alt="Speaker Icon"
            />
          ))}
        </div>
        <div className={styles.names}>
          {room.speakers.map((speaker) => (
            <div key={speaker.id} className={styles.nameWrapper}>
              <span>{speaker.name}</span>
              <img
                className={styles.chatBubble}
                src="/images/chat-bubble.png"
                alt="chat bubble"
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.peopleCount}>
        <span>{room.totalPeople}</span>
        <img
          className={styles.chatBubble}
          src="/images/people-count.png"
          alt="User Icon"
        />
      </div>
    </div>
  );
};

export default RoomCard;
