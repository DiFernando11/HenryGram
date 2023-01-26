import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  confirmedRequestFriendAction,
  sendRequestFriendAction,
} from "../../redux/actions";
import DropDownSelect from "../DropDownSelect";

function StatusFriend({ user }) {
  const { id } = useParams();
  const [statusFriend, setStatusFriend] = useState("");
  const userInformation = useSelector((state) => state.userInformation);
  const friendsByUser = useSelector((state) => state.friendsByUser);
  const dispatch = useDispatch();

  const handleStatusFriend = () => {
    const applicationStatus = friendsByUser.find(
      (friend) => friend.recipient == user || friend.requester == user
    );
    if (applicationStatus) {
      if (Number(applicationStatus.status) === 1) setStatusFriend("Enviada");
      else if (Number(applicationStatus.status) === 2)
        setStatusFriend("Recibido");
      else if (Number(applicationStatus.status) === 3)
        setStatusFriend("Amigos");
    } else setStatusFriend("Seguir");
  };
  useEffect(() => {
    handleStatusFriend();
  }, [friendsByUser, id]);

  const handleSendRequestFriend = () => {
    dispatch(
      sendRequestFriendAction({ UserA: userInformation?._id, UserB: user })
    );
    setStatusFriend("Enviada");
  };
  const handleConfirmedReuqestFriend = () => {
    dispatch(
      confirmedRequestFriendAction({
        UserA: userInformation?._id,
        UserB: user,
        resp: true,
      })
    );
    setStatusFriend("Amigos");
  };
  const handleRejectReuqestFriend = () => {
    dispatch(
      confirmedRequestFriendAction({
        UserA: userInformation._id,
        UserB: user,
        resp: false,
      })
    );
    setStatusFriend("Seguir");
  };

  return (
    <div>
      {statusFriend === "Seguir" && (
        <>
          <DropDownSelect
            status={statusFriend}
            icon="bi-person-fill-add"
            select={[
              {
                text: "Send friend request",
                icon: "bi-plus",
                handleActionFriend: handleSendRequestFriend,
              },
            ]}
          />
        </>
      )}
      {statusFriend === "Enviada" && userInformation?._id !== user && (
        <>
          <DropDownSelect
            status={statusFriend}
            icon="bi-person-fill-exclamation"
            select={[
              {
                text: "Cancel request",
                icon: "bi-check",
                handleActionFriend: handleRejectReuqestFriend,
              },
            ]}
          />
        </>
      )}
      {statusFriend === "Recibido" && (
        <>
          <DropDownSelect
            status={statusFriend}
            icon="bi-people-fill"
            select={[
              {
                text: "Accept",
                icon: "bi-check",
                handleActionFriend: handleConfirmedReuqestFriend,
              },
              {
                text: "Reject",
                icon: "bi-x",
                handleActionFriend: handleRejectReuqestFriend,
              },
            ]}
          />
        </>
      )}
      {statusFriend === "Amigos" && (
        <DropDownSelect
          status={statusFriend}
          icon="bi-people-fill"
          select={[
            {
              text: "Delete friend",
              icon: "bi-trash3-fill",
              handleActionFriend: handleRejectReuqestFriend,
            },
          ]}
        />
      )}
    </div>
  );
}

export default StatusFriend;
