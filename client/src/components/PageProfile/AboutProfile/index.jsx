import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
// import { Dropdown } from "flowbite";
import { addChatBackAction } from "../../../redux/actions";
import DropDownSelect from "../../DropDownSelect";
import AvatarStack from "../../PageChats/AvatarStack";
import FavoriteActivities from "../FavoriteActivities";
import ModalFriends from "../ModalFriends";
import OverYou from "../OverYou";

function AboutProfile({ userInformation, isFriend }) {
  const [statusFriend, setStatusFriend] = useState("seguir");
  const [show, setShow] = useState(false);
  const friendsByUser = useSelector((state) => state.friendsByUser);
  const friendsAccepted = friendsByUser.filter(
    (friend) => Number(friend.status) === 3
  );
  const { id } = useParams();
  const applicationStatus = friendsByUser.find(
    (friend) => friend.recipient == id || friend.requester == id
  );

  const handle = () => {
    if (applicationStatus) {
      if (Number(applicationStatus.status) === 1) setStatusFriend("Enviada");
      else if (Number(applicationStatus.status) === 2)
        setStatusFriend("Recibido");
      else if (Number(applicationStatus.status) === 3)
        setStatusFriend("Amigos");
    } else setStatusFriend("Seguir");
  };

  useEffect(() => {
    handle();
  }, [friendsByUser, id]);
  const dispatch = useDispatch();
  const handleRedirectChatUser = () => {
    dispatch(
      addChatBackAction({
        avatar: userInformation?.avatar,
        firstName: userInformation.firstName,
        _id: userInformation?._id,
      })
    );
  };

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
          <div className="flex gap-8 items-center">
            <Link to={`/message/chat/${userInformation?._id}`}>
              <i
                onClick={handleRedirectChatUser}
                className="bi bi-chat-dots-fill text-yellow text-2xl"
                title="Send message"
              ></i>
            </Link>

            <div className="flex text-yellow gap-1 items-center  ">
              {statusFriend === "Seguir" && (
                <>
                  <DropDownSelect
                    status={statusFriend}
                    icon="bi-person-fill-add"
                    select={[{ text: "Send friend request", icon: "bi-plus" }]}
                  />
                </>
              )}
              {statusFriend === "Enviada" && (
                <>
                  <i className="bi bi-person-fill-exclamation text-2xl cursor-default "></i>
                  <span className="text-yellow">{statusFriend}</span>
                </>
              )}
              {statusFriend === "Recibido" && (
                <>
                  <DropDownSelect
                    status={statusFriend}
                    icon="bi-people-fill"
                    select={[
                      { text: "Accept", icon: "bi-check" },
                      { text: "Reject", icon: "bi-x" },
                    ]}
                  />
                </>
              )}
              {statusFriend === "Amigos" && (
                <DropDownSelect
                  status={statusFriend}
                  icon="bi-people-fill"
                  select={[{ text: "Delete friend", icon: "bi-trash3-fill" }]}
                />
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between mb-3">
        <span className="text-sm">Friends</span>
        <span className="text-sm">Matchs</span>
      </div>
      <div className="flex justify-between ">
        <AvatarStack avatars={avatars} openModalFriends={setShow} show={show} />
        <AvatarStack avatars={avatars} />
        <ModalFriends setShow={setShow} show={show} />
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
