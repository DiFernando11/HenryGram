import React from "react";
import SearchBar from "../../SearchBar";
import CardPreviewMessage from "../CardPreviewMessage";
import styles from "./index.module.css";

function PreviewMesagge({ title, messages }) {
  return (
    <section className={styles.container_preview_message}>
      <SearchBar />
      <span className={styles.textMessagePreview}>{title}</span>
      <div className={styles.containerAllMessage}>
        {messages.length &&
          messages.map((message) => (
            <CardPreviewMessage
              key={message.messageid}
              id={message.id}
              image={message.image}
              message={message.message}
              name={message.name}
            />
          ))}
      </div>
    </section>
  );
}

export default PreviewMesagge;
