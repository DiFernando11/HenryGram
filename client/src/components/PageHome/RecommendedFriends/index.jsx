import React from "react";
import CardPreviewMessage from "../../PageChats/CardPreviewMessage";
import logoMatch from "../../../assets/coheteHenry.png";

function RecommendedFriends() {
  return (
    <section className="w-2/6 bg-neutral-800">
      <div className="flex items-center h-16 justify-center gap-2 ">
        <h3 className="text-white">People you can match</h3>
        <img src={logoMatch} className="w-6 h-6" alt="logo match" />
      </div>
      <div className="calcViewHeight">
        {messages.map((message, index) => (
          <CardPreviewMessage
            key={index}
            id={message.id}
            image={message.image}
            name={message.name}
            message={message.message}
          />
        ))}
      </div>
    </section>
  );
}

export default RecommendedFriends;
const messages = [
  {
    id: 1,
    image: [
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
    ],
    name: "Reunion con amigos",
    message: "23 de Julio",
  },
  {
    id: 1,
    image: [
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
    ],
    name: "Reunion con amigos",
    message: "23 de Julio",
  },
  {
    id: 1,
    image: [
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
    ],
    name: "Reunion con amigos",
    message: "23 de Julio",
  },
  {
    id: 1,
    image: [
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
    ],
    name: "Reunion con amigos",
    message: "23 de Julio",
  },
  {
    id: 1,
    image: [
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
    ],
    name: "Reunion con amigos",
    message: "23 de Julio",
  },
  {
    id: 1,
    image: [
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
    ],
    name: "Reunion con amigos",
    message: "23 de Julio",
  },
  {
    id: 1,
    image: [
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
    ],
    name: "Reunion con amigos",
    message: "23 de Julio",
  },
  {
    id: 1,
    image: [
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
    ],
    name: "Reunion con amigos",
    message: "23 de Julio",
  },
  {
    id: 1,
    image: [
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
    ],
    name: "Reunion con amigos",
    message: "23 de Julio",
  },
  {
    id: 1,
    image: [
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
    ],
    name: "Reunion con amigos",
    message: "23 de Julio",
  },
  {
    id: 1,
    image: [
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
    ],
    name: "Reunion con amigos",
    message: "23 de Julio",
  },
  {
    id: 1,
    image: [
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
    ],
    name: "Reunion con amigos",
    message: "23 de Julio",
  },
  {
    id: 1,
    image: [
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
    ],
    name: "Reunion con amigos",
    message: "23 de Julio",
  },
];
