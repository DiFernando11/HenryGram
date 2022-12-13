import React from "react";
import { NavLink } from "react-router-dom";
import logoMatch from "../../../assets/coheteHenry.png";
import styles from "./index.module.css";

function CardPreviewMessage({ id, image, message, name, time }) {
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
      <div
        className={`flex gap-1 relative p-2.5 border-slate-200 my-0.5 ${styles.backgroundCardUser}`}
      >
        <div className={styles.avatar}>
          {image.length &&
            image
              .map((img, index) => (
                <img
                  key={index}
                  className={`${
                    image.length > 1 ? styles.imageCardGroup : styles.imageCard
                  } ${image.length > 1 && styles[`imageGroup${index + 1}`]}`}
                  src={img}
                  alt={"user message"}
                />
              ))
              .slice(0, 3)}
        </div>
        <div className="items-center self-center font-bold">
          <span className="block leading-5">{name}</span>
          <span className={styles.textMessage}>{message}</span>
          <span className="m-1 mr-2 mt-3.5 absolute top-0 right-0 text-xs ">
            {time}
          </span>
          {time ? (
            <i className="bi bi-check2-all m-1 mr-3 absolute bottom-0 right-0"></i>
          ) : (
            <img
              src={logoMatch}
              className="m-1 mr-3 mb-4 absolute bottom-0 right-0 w-8 h-8"
              alt="button match"
            />
          )}
        </div>
      </div>
    </NavLink>
  );
}

export default CardPreviewMessage;
