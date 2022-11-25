import React, { useEffect, useState } from "react";
import { useWebRTC } from "../../hooks/useWebRTC";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Room.module.css";
import { getRoom } from "../../http";

const Room = () => {
  const { id: roomId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const { clients, provideRef, handleMute } = useWebRTC(roomId, user);
  const history = useNavigate();
  const [room, setRoom] = useState(null);
  const [isMute, setMute] = useState(true);

  useEffect(() => {
    handleMute(isMute, user.id);
  }, [isMute]);

  const handleManualLeave = () => {
    history("/rooms");
  };

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await getRoom(roomId);
      console.log(data);
      setRoom((prev) => data);
    };

    fetchRoom();
  }, [roomId]);

  const handleMuteClick = (clientId) => {
    console.log("Click", clientId);
    if (clientId !== user.id) return;
    setMute((prev) => !prev);
  };

  // const [numberOfClients, setNumberOfClients] = useState(clients);

  // useEffect(() => {
  //   setNumberOfClients(() => {
  //     return [...new Set(clients)];
  //   });
  // }, [clients]);

  return (
    <div>
      <div className="container">
        <button onClick={handleManualLeave} className={styles.goBack}>
          ⬅️
          <span>All Voice Rooms</span>
        </button>
      </div>
      <div className={styles.clientsWrap}>
        <div className={styles.header}>
          <h2 className={styles.topic}>{room?.topic}</h2>
          <div className={styles.actions}>
            <button className={styles.actionBtn}>✋🏼</button>
            <button onClick={handleManualLeave} className={styles.actionBtn}>
              🤫 <span>Leave Quietly</span>
            </button>
          </div>
        </div>
        <div className={styles.clientsList}>
          {clients.map((client) => {
            return (
              <div className={styles.client} key={client.id}>
                <div className={styles.userHead} key={client.id}>
                  <audio
                    ref={(instance) => provideRef(instance, client.id)}
                    // controls
                    autoPlay
                  ></audio>
                  <img
                    className={styles.userAvatar}
                    // src={client.avatar}
                    src="/images/default-profile-icon.png"
                    alt="Client Avatar"
                  />
                  <button
                    onClick={() => handleMuteClick(client.id)}
                    className={styles.micBtn}
                  >
                    {client.muted ? (
                      <img src="/images/mic-mute.png" alt="mic-mute-icon" />
                    ) : (
                      <img src="/images/mic.png" alt="mic-icon" />
                    )}
                  </button>
                  <h4>{client.name}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Room;
