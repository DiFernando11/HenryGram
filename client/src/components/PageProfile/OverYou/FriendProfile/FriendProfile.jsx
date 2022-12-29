import React from "react";
import { useSelector } from "react-redux";

function FriendProfile({profileId}) {

  const about = useSelector((state) => state.userProfileFriend?.description);
  const name = useSelector((state) => state.userProfileFriend?.firstName);
  return (
      <div className="flex w-full h-about my-4  text-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 dark:bg-gray-700 dark:border-gray-600 relative">


        {
          about ? (
            <div className="flex flex-col w-full py-4 px-3">
              <p>
                {about}
              </p>
            </div>
          ) : (
            <div className="flex flex-col w-full py-4 px-3">
              <p>
                {name} aun no ha completado su perfil...
              </p> 
            </div>
          )
        }
      </div>
    )
}

export default FriendProfile;
