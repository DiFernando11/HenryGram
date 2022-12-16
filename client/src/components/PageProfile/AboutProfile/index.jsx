import React from "react";
import { useSelector } from "react-redux";
import AvatarStack from "../../PageChats/AvatarStack";
import FavoriteActivities from "../FavoriteActivities";
import OverYou from "../OverYou";

function AboutProfile({ userInformation, isFriend }) {
  return (
    <section className="w-2/5 border-r  border-zinc-700 p-4 calcViewHeightPageProfile">
      <div className="flex items-center mb-8 ml-2 justify-between ">
        <div className="flex gap-2 items-center">
          <h1 className="text-white text-lg">
            {userInformation?.firstName} {userInformation?.lastName}
          </h1>
          {userInformation?.gender === "male" ? (
            <i className="bi bi-gender-male text-blue-500"></i>
          ) : (
            <i className="bi bi-gender-female text-pink-500"></i>
          )}
        </div>
        {isFriend && (
          <div className="flex gap-6 items-center">
            <i
              className="bi bi-chat-dots-fill text-yellow text-2xl"
              title="Send message"
            ></i>
            <span className="text-yellow cursor-pointer">+ Seguir</span>
          </div>
        )}
      </div>
      <div className="flex justify-between mb-3">
        <span className="text-sm">Friends</span>
        <span className="text-sm">Matchs</span>
      </div>
      <div className="flex justify-between ">
        <AvatarStack avatars={avatars} />
        <AvatarStack avatars={avatars} />
      </div>
      {!isFriend && (
        <div>
          <h2 className="text-white text-center  mt-5 mb-3">About Me</h2>
          <OverYou />
          <h4 className="text-white text-center  mt-5 mb-4">Preferences</h4>
          <FavoriteActivities />
        </div>
      )}
    </section>
  );
}
const avatars = [
  "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
];

export default AboutProfile;
