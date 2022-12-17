import React from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.css";

function CardMessage({ image, name, message, fromSelf, time }) {
  const userInformation = useSelector((state) => state.userInformation);
  const timeDate = time.split("T");
  const dateTime = timeDate[1].split(".");
  const date = dateTime[0].slice(0, 5);


  // const timeMessage = timeDate.split(",");
  const DBName = fromSelf
    ? `${userInformation.firstName} ${userInformation.lastName}`
    : name;
  const DBImage = fromSelf ? userInformation.avatar : image;
  return (
    <div
      className={`${styles.containerMessage} ${
        fromSelf && styles.containerMessageStaff
      } `}
    >
      <img className={styles.imageCard} src={DBImage} alt={"user message"} />
      <div className={styles.textContainerMessage}>
        <div className={styles.flexHeaderMessage}>
          <span className={styles.nameTextMessage}>{DBName}</span>
          <span className={styles.textHours}>{date}</span>
        </div>
        <span className={styles.textMessage}>{message}</span>
      </div>
    </div>
  );
}

export default CardMessage;
