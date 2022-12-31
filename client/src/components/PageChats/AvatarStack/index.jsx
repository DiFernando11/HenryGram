import React from "react";
import { Link } from "react-router-dom";

function AvatarStack({ avatars, openModalFriends, show }) {
  // console.log(avatars);
  return (
    <div className="flex -space-x-1 overflow-hidden">
      {avatars.length
        ? avatars
            .map((avatar, index) => (
              <Link key={index} to={`/profile/${avatar._id}`}>
                <img
                  className="inline-block h-8 w-8 rounded-full border cursor-pointer"
                  src={avatar.avatar}
                  alt="user Avatar"
                  title={`${avatar.firstName} ${avatar.lastName} `}
                />
              </Link>
            ))
            .slice(0, 5)
        : null}
      {avatars.length > 5 && (
        <div
          onClick={() => openModalFriends(!show)}
          className="flex justify-center hover:cursor-pointer items-center w-8 h-8 text-xs text-white  bg-gray-700 rounded-full border-2 border-yellow hover:bg-gray-800 dark:border-gray-800 "
        >
          +{avatars.length - 5}
        </div>
      )}
    </div>
  );
}

export default AvatarStack;
