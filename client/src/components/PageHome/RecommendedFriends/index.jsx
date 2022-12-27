import React from "react";
import CardPreviewMessage from "../../PageChats/CardPreviewMessage";
import logoMatch from "../../../assets/coheteHenry.png";
import SkeletonUser from "../../Skeletons/skeletonUser";

function RecommendedFriends() {
  return (
    <section className="w-2/6 bg-neutral-800 hidden lg:block">
      <div className="flex items-center h-16 justify-center gap-2 ">
        <h3 className="text-white">People you can match</h3>
        <img src={logoMatch} className="w-6 h-6" alt="logo match" />
      </div>
      <div className="calcViewHeightRecommendedeFriends">
        {messages.length
          ? messages.map((message, index) => (
              <CardPreviewMessage
                key={index}
                id={message.id}
                image={message.image}
                name={message.name}
                message={message.message}
              />
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
              <SkeletonUser key={value} />
            ))}
      </div>
    </section>
  );
}

export default RecommendedFriends;
const messages = [
  // {
  //   id: 1,
  //   image:
  //     "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
  //   name: "Reunion con amigos",
  //   message: "23 de Julio",
  // },
];
