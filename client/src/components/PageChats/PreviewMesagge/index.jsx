import React from "react";
import CardPreviewMessage from "../CardPreviewMessage";
import styles from "./index.module.css";

function PreviewMesagge({ title, messages }) {
  return (
    <section className={styles.container_preview_message}>
      <form className="flex items-center ">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-8 pointer-events-none">
            <i className="bi bi-search text-gray-500  "></i>
          </div>
          <input
            type="text"
            id="simple-search"
            className="block w-11/12 p-2 pl-12 text-sm text-white border rounded-2xl  bg-zinc-900 border-amber-200 m-auto"
            placeholder="Search"
            required
          />
        </div>
      </form>
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
