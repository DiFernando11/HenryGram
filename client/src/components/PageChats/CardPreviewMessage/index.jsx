import React from "react";
import { NavLink } from "react-router-dom";
import logoMatch from "../../../assets/coheteHenry.png";
import styles from "./index.module.css";

function CardPreviewMessage({ id, image, name }) {
  return (
    <NavLink
      to={`/message/chat/${id}`}
      state={{ id, image, name }}
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
        <div className="relative mr-2 flex items-center">
          <img className={styles.imageCard} src={image} alt={"user message"} />
          <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
        </div>

        <div className="items-center self-center font-bold">
          <span className="block leading-5">{name}</span>
          <span className={styles.textMessage}>message Predeterminado</span>
          {/* <span className="m-1 mr-2 mt-3.5 absolute top-0 right-0 text-xs ">
            {time}
          </span> */}
          {/* {time ? (
            <i className="bi bi-check2-all m-1 mr-3 absolute bottom-0 right-0"></i>
          ) : (
            <img
              src={logoMatch}
              className="m-1 mr-3 mb-4 absolute bottom-0 right-0 w-8 h-8"
              alt="button match"
            />
          )} */}
        </div>
      </div>
    </NavLink>
  );
}

export default CardPreviewMessage;
