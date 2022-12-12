import React from "react";
import styles from "./index.module.css";
const idUserDB = 2;
function CardMessage({ image, name, message, id, idUser }) {
  const DBName = idUserDB == idUser ? "Diego Apolo" : name;
  const DBImage =
    idUserDB == idUser
      ? "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s64-c-mo"
      : image;
  return (
    <div
      className={`${styles.containerMessage} ${
        idUserDB == idUser && styles.containerMessageStaff
      } `}
    >
      <img className={styles.imageCard} src={DBImage} alt={"user message"} />
      <div className={styles.textContainerMessage}>
        <span className={styles.nameTextMessage}>{DBName}</span>
        <span className={styles.textMessage}>{message}</span>
      </div>
    </div>
  );
}

export default CardMessage;
