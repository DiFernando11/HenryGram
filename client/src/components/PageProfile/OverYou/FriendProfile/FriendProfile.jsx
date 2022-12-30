import React from "react";
import { useSelector } from "react-redux";

function FriendProfile({profileId}) {

  const about = useSelector((state) => state.userProfileFriend?.description);
  const name = useSelector((state) => state.userProfileFriend?.firstName);
  return (
      <div className=" h-full w-full p-4 gap-3 flex flex-col rounded-lg">
        <h1 className="text-2xl font-black">
          Acerca de
        </h1>
        {
          about ? (
            <div className="flex flex-col w-full py-4 px-3">
              <p>
                {about}
              </p>
            </div>
          ) : (
            <div className="flex flex-col w-full ">
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
