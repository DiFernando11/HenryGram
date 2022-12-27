import React,  { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import EditAbout from "./EditAbout/editAbout";

function aboutYou({profileId}) {

  const [editAbout, setEditAbout] = useState(false);
  const about = useSelector((state) => state.userInformation?.description);

  useEffect(() => {
  }, [about]);

  return (
    editAbout ? (
      <EditAbout />
    ) : (
      <div className="flex w-full h-about mb-4 bg-blacker  dark:bg-gray-700 dark:border-gray-600">
        {
          about ? (
            <div className="flex flex-col w-full">
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

export default aboutYou;
