import React from "react";
import styles from "./index.module.css";

function CardPreviewMessage({ image, message, name }) {
  return (
    <div className={styles.containerMessage}>
      <img className={styles.imageCard} src={image} alt={"user message"} />
      <div className={styles.textContainerMessage}>
        <span>{name}</span>
        <span className={styles.textMessage}>{message}</span>
        <span className={styles.timePreview}>8:25</span>
        <i className={`bi bi-check2-all ${styles.viewedMessage}`}></i>
      </div>
    </div>
  );
}

export default CardPreviewMessage;
