import React from "react";

function CardFriends() {
  return (
    <div className=" flex items-center justify-between p-2 bg-neutral-800 my-1 ">
      <div className=" flex items-center gap-3  ">
        <img
          className="rounded-full w-10 h-10 border "
          src="https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo"
          alt="avatar user"
        />
        <span className="uppercase">Diego Apolo</span>
      </div>
      <span>Amigos</span>
    </div>
  );
}

export default CardFriends;
