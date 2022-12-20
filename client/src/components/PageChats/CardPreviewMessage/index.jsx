import React from "react";
import { NavLink } from "react-router-dom";
import logoMatch from "../../../assets/coheteHenry.png";
import { timeHours } from "../utils";
import styles from "./index.module.css";

function CardPreviewMessage({
  id,
  image,
  name,
  lastName,
  message,
  time,
  sender,
}) {
  const timeHour = time ? timeHours(time) : null;
  let senderMessage = id !== sender;
  return (
    <NavLink
      to={`/message/chat/${id}`}
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
          <span className="block leading-5">{`${name} ${lastName}`}</span>

          <span className={styles.textMessage}>
            <b>{senderMessage ? "Tu: " : ""} </b> {message}
          </span>
          {!senderMessage ? (
            <span className="absolute flex items-center justify-center text-xs text-black bottom-1 right-0 mr-4 m-2 bg-amber-300 w-4 h-4 rounded-full">
              1
            </span>
          ) : null}
          {timeHour && (
            <span className="m-1 mr-2 mt-3.5 absolute -top-2 right-0 text-xs ">
              {timeHour}
            </span>
          )}

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
