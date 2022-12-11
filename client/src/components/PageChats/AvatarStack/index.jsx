import React from "react";

function AvatarStack({ avatars }) {
  return (
    <div class="flex -space-x-1 overflow-hidden">
      {avatars.length &&
        avatars
          .map((avatar) => (
            <img
              className="inline-block h-6 w-6 rounded-full ring-2 cursor-pointer"
              src={avatar}
              alt="user Avatar"
            />
          ))
          .slice(0, 5)}
      {avatars.length > 5 && (
        <div className="inline-block h-6 w-6 rounded-full ring-2 bg-white text-xs font-bold leading-6 text-center ">
          +{avatars.length - 5}
        </div>
      )}
    </div>
  );
}

export default AvatarStack;
