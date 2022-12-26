import React from "react";
import { Link } from "react-router-dom";

function AvatarStack({ avatars, openModalFriends , show }) {
  return (
    <div className="flex -space-x-1 overflow-hidden">
      {avatars.length &&
        avatars
          .map((avatar, index) => (
            <Link key={index} to={"/profile/639b57d15871ad62a8b88c2d"}>

              <img
                
                className="inline-block h-6 w-6 rounded-full ring-2 cursor-pointer border-2 border-yellow"
                src={avatar}
                alt="user Avatar"
              />
            </Link>
          ))
          .slice(0, 5)}
      {avatars.length > 5 && (
        <div
          onClick={() => openModalFriends(!show)}
          className="flex justify-center items-center w-6 h-6 text-xs text-white  bg-gray-700 rounded-full border-2 border-yellow hover:bg-gray-600 dark:border-gray-800 "
        >
          +{avatars.length - 5}
        </div>
      )}
    </div>
  );
}

export default AvatarStack;
