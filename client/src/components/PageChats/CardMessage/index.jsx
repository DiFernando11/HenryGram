import React from "react";
import { useSelector } from "react-redux";
import { timeHours } from "../utils";
import styles from "./index.module.css";

function CardMessage({ image, name, lastName, message, fromSelf, time }) {
  const userInformation = useSelector((state) => state.userInformation);
  const timesHours = timeHours(time);

  // const timeMessage = timeDate.split(",");
  const DBName = fromSelf
    ? `${userInformation.firstName} ${userInformation.lastName}`
    : `${name} ${lastName}`;
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
          <span className={styles.textHours}>{timesHours}</span>
        </div>
        <span className={styles.textMessage}>{message}</span>
      </div>
    </div>
  );
}

export default CardMessage;
