import React from "react";
import RoomCard from "../../components/RoomCard/RoomCard";
import styles from "./Rooms.module.css";

const rooms = [
  {
    id: 1,
    topic: "Best FrontEnd Frameworks",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/images/default-profile-icon.png",
      },
      {
        id: 2,
        name: "Jane Doe",
        avatar: "/images/default-profile-icon.png",
      },
    ],
    totalPeople: 40,
  },

  {
    id: 2,
    topic: "Best BackEnd Frameworks",
    speakers: [
      {
        id: 3,
        name: "John Doe",
        avatar: "/images/default-profile-icon.png",
      },
      {
        id: 4,
        name: "Jane Doe",
        avatar: "/images/default-profile-icon.png",
      },
    ],
    totalPeople: 20,
  },

  {
    id: 3,
    topic: "Best Frameworks",
    speakers: [
      {
        id: 5,
        name: "John Doe",
        avatar: "/images/default-profile-icon.png",
      },
      {
        id: 6,
        name: "Jane Doe",
        avatar: "/images/default-profile-icon.png",
      },
    ],
    totalPeople: 20,
  },

  {
    id: 4,
    topic: "Best React Frameworks",
    speakers: [
      {
        id: 3,
        name: "John Doe",
        avatar: "/images/default-profile-icon.png",
      },
      {
        id: 4,
        name: "Jane Doe",
        avatar: "/images/default-profile-icon.png",
      },
    ],
    totalPeople: 20,
  },
];

const Rooms = () => {
  return (
    <>
      <div className="container">
        <div className={styles.roomsHeader}>
          <div className={styles.left}>
            <span className={styles.heading}> All Voice Rooms</span>
            <div className={styles.searchBox}>
              <img
                className={styles.searchIcon}
                src="/images/search-icon.png"
                alt="Search Icon"
              />
              <input type="text" className={styles.searchInput} />
            </div>
          </div>
          <div className={styles.right}>
            <button className={styles.startRoomButton}>
              <img
                className={styles.addRoomIcon}
                src="/images/add-room-icon.png"
                alt="Start Room Button"
              />
              <span>Start Room</span>
            </button>
          </div>
        </div>
        <div className={styles.roomList}>
          {rooms.map((room) => (
            <>
              <RoomCard key={room.id} room={room} />
              <RoomCard key={room.id} room={room} />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Rooms;
