import React from "react";
import styles from "./index.module.css";

function CardPreviewMessage({ image, message, name }) {
  return (
    <div className={styles.containerMessage}>
      <div className={styles.avatar}>
        {image.length &&
          image
            .map((img, index) => (
              <img
                className={`${
                  image.length > 1 ? styles.imageCardGroup : styles.imageCard
                } ${image.length > 1 && styles[`imageGroup${index + 1}`]}`}
                src={img}
                alt={"user message"}
              />
            ))
            .slice(0, 3)}
      </div>
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
