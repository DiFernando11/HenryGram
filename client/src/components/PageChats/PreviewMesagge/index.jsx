import React, { useState } from "react";
import SearchBar from "../../SearchBar";
import CardPreviewMessage from "../CardPreviewMessage";
import logoMatch from "../../../assets/coheteHenry.png";
import styles from "./index.module.css";

function PreviewMesagge({ title, messages, messagesGroup }) {
  const [isChat, setIsChat] = useState(true);
  return (
    <section className={styles.container_preview_message}>

      {/* <SearchBar /> */}
      <span className={styles.textMessagePreview}>{title}</span>
      <div className={styles.containerAllMessage}>
        {isChat
          ? messages.length &&
            messages.map((message, index) => (
              <CardPreviewMessage
                key={index}
                id={message.id}
                image={message.image}
                message={message.message}
                time={message.time}
                name={message.name}
              />
            ))
          : messagesGroup.length &&
            messagesGroup.map((message, index) => (
              <CardPreviewMessage
                key={index}
                id={message.id}
                image={message.image}
                message={message.message}
                time={message.time}
                name={message.name}
              />
            ))}
      </div>
    </section>
  );
}

export default PreviewMesagge;
