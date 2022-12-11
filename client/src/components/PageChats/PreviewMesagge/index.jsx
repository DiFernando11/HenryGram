import React from "react";
import CardPreviewMessage from "../CardPreviewMessage";
import styles from "./index.module.css";

function PreviewMesagge() {
  return (
    <section className={styles.container_preview_message}>
      <form className="flex items-center">
        <label for="simple-search" class="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
          />
        </div>
      </form>
      <span className={styles.textMessagePreview}>Messages</span>
      <div className={styles.containerAllMessage}>
        {messagess.length &&
          messagess.map((message) => (
            <CardPreviewMessage
              key={message.id}
              image={message.image}
              message={message.message}
              name={message.name}
            />
          ))}
      </div>
    </section>
  );
}

const messagess = [
  {
    id: 1,
    image:
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s64-c-mo",
    message: "poquito",
    name: "Diego Apolo",
  },
  {
    id: 2,
    image:
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s64-c-mo",
    message: "poquito",
    name: "Diego",
  },
  {
    id: 3,
    image:
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s64-c-mo",
    message: "poquito",
    name: "Diego",
  },
  {
    id: 4,
    image:
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s64-c-mo",
    message: "poquito",
    name: "Diego",
  },
  {
    id: 5,
    image:
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s64-c-mo",
    message: "poquito",
    name: "Diego",
  },
  {
    id: 6,
    image:
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s64-c-mo",
    message: "poquito",
    name: "Diego",
  },
  {
    id: 7,
    image:
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s64-c-mo",
    message: "poquito",
    name: "Diego",
  },
];

export default PreviewMesagge;
