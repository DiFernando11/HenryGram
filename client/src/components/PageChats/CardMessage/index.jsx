import React from "react";
import styles from "./index.module.css";
const idUser = 2;
function CardMessage({ image, name, message, id }) {
  return (
    <div
      className={`${styles.containerMessage} ${
        idUser == id && styles.containerMessageStaff
      } `}
    >
      <img className={styles.imageCard} src={image} alt={"user message"} />
      <div className={styles.textContainerMessage}>
        <span className={styles.nameTextMessage}>{name}</span>
        <span className={styles.textMessage}>{message}</span>
      </div>
    </div>
  );
}

export default CardMessage;
