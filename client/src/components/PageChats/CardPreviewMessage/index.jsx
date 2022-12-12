import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./index.module.css";

function CardPreviewMessage({ id, image, message, name }) {
  return (
    <NavLink
      to={`/message/${id}`}
      style={({ isActive }) =>
        isActive
          ? {
              backgroundColor: "rgb(99, 99, 22)",
              position: "relative",
              borderRadius: "8px",
              transform: "translateX(15%)",
              transition: "2s",
            }
          : { backgroundColor: "#242424" }
      }
    >
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
    </NavLink>
  );
}

export default CardPreviewMessage;
