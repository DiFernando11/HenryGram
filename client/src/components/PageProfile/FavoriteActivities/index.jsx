import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfileAction } from "../../../redux/actions/index";
import AddModal from "./AddModal/AddModal";
import { Transition } from "@headlessui/react";
function FavoriteActivities({ id }) {
  const dispatch = useDispatch();

  const profileTechnologies = useSelector(
    (state) => state.userProfileFriend?.technologies
  );
  const profilePreferences = useSelector(
    (state) => state.userProfileFriend?.preferences
  );
  const userInformation = useSelector((state) => state.userInformation);

  const [show, setShow] = useState(false);

  const handleAdd =  (technologies, preferences) => {
    const data = {
      technologies: technologies,
      preferences: preferences,
      id: id,
    };
   dispatch(editProfileAction(data));
  };

  return (
    <section className="p-2  h-auto ">
      <div className="flex md:flex-row flex-col justify-between md:gap-10 mt-3">
        <div className="flex flex-col justify-start w-full  gap-5 ">
          <h2 className="font-extrabold">Tecnologías</h2>
          <div className="flex flex-wrap items-center md:justify-start gap-1 justify-center">
            {profileTechnologies && profileTechnologies.length > 0 ? (
              profileTechnologies.map((technology , index) => {
                return (
                  <div key={index} className=" bg-blueTw h-fit w-fit px-2 py-1 rounded-full flex flex-row items-center">
                    <p className="text-sm">{technology}</p>
                  </div>
                );
              })
            ) : (
              <div className="">
                <p className="text-xs">No hay tecnologías</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-start w-full gap-5 truncate">
          <h2 className="md:mt-0 mt-5 md:text-end font-extrabold truncate ">
            Actividades Favoritas
          </h2>
          <div className="flex flex-wrap items-center  gap-1 md:justify-end md:mb-0 mb-5 justify-center">
            {profilePreferences && profilePreferences.length > 0 ? (
              profilePreferences.map((preference , index) => {
                return (
                  <div key={index} className=" bg-blueTw h-fit w-fit px-2 py-1 rounded-full flex flex-row items-center">
                    <p className=" text-sm">{preference}</p>
                  </div>
                );
              })
            ) : (
              <div className="w-full">
                <p className="md:text-end text-xs">No hay Actividades</p>
              </div>
            )}
          </div>
        </div>

        {show ? (
          <Transition
            appear
            show={show}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <AddModal
              technologies={profileTechnologies}
              favourites={profilePreferences}
              show={setShow}
              add={handleAdd}
            />
          </Transition>
        ) : null}
      </div>
      {userInformation?._id === id ? (
        <button
          onClick={() => setShow(true)}
          className="bg-zinc-800  transition-all duration:100 hover:scale-125 text-white rounded-full h-8 w-8 flex items-center justify-center  m-auto inset-x-0"
        >
          <p className="text-md z-10">+</p>
        </button>
      ) : null}
    </section>
  );
}

export default FavoriteActivities;
