import React,  { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import EditAbout from "../EditAbout/editAbout";
import { BsPencilSquare } from "react-icons/bs";

function YourProfile({profileId}) {

  const [editAbout, setEditAbout] = useState(false);
  const about = useSelector((state) => state.userProfileFriend?.description);
  const userId = useSelector((state) => state.userInformation?._id);

  useEffect(() => {
  }, [about, editAbout]);

  return (
    editAbout ? (
      <EditAbout  editAbout = { editAbout } setEditAbout = { setEditAbout } userId = { profileId } currentAbout = { about } />
    ) : (
      <div className="flex w-full h-about my-4 bg-blacker rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 text-white dark:bg-gray-700 dark:border-gray-600 relative">
        <BsPencilSquare className="absolute bottom-2 right-2 text-amber-300 cursor-pointer" onClick={() => setEditAbout(true)} />
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
                Completa tu perfil, describe quien eres y que te gusta...
              </p> 
            </div>
          )
        }
      </div>
    )
  );
}

export default YourProfile;
