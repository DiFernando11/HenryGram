import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  invitationSendGroupAction,
  likeDislikePostAction,
  responseInvitationGroupAction,
} from "../../../redux/actions";
import logoMatch from "../../../assets/coheteHenry.png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
function ActionsPosts({ user, group, postId, likes, isMatch }) {
  const dispatch = useDispatch();
  const userInformation = useSelector((state) => state.userInformation);
  const [isCreatorPost, setIsCreatorPost] = useState(false);
  const [responseFront, setResponseFront] = useState("");

  const [youLikePost, setYouLikePost] = useState({
    youLike: false,
    numberLikes: 0,
  });

  const handleSendInvitationGroup = () => {
    if (!responseFront.length && !isCreatorPost) {
      dispatch(
        invitationSendGroupAction({
          groupId: group,
          userId: userInformation?._id,
        })
      ).then((res) => {
        handleAlertInvitationGroup(res.payload.msg);
        setResponseFront(res.payload.msg);
      });
    } else {
      handleAlertInvitationGroup(responseFront);
    }
    isCreatorPost &&
      handleAlertInvitationGroup("You are the creator of the group");

  };
  const handleLikeDislikePost = () => {
    if (youLikePost.youLike) {
      setYouLikePost({
        youLike: false,
        numberLikes: youLikePost.numberLikes - 1,
      });
    } else {
      setYouLikePost({
        youLike: true,
        numberLikes: youLikePost.numberLikes + 1,
      });
    }
    dispatch(likeDislikePostAction({ postId, userId: userInformation?._id }));
  };

  const handleAlertInvitationGroup = (title) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      iconColor: "white",
      // showClass: {
      //   popup: "animate__animated animate__fadeInDown",
      // },
      // hideClass: {
      //   popup: "animate__animated animate__fadeOutUp",
      // },
      // customClass: {
      //   popup: styles.coloredSuccede,
      //   title: styles.titles,
      // },
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: "success",
      title,
    });
  };

  useEffect(() => {
    if (userInformation) {
      const youLike = likes?.some((like) => like._id === userInformation?._id);
      const numberLikes = likes?.length;
      setYouLikePost({ youLike, numberLikes });
      setIsCreatorPost(user?._id === userInformation?._id);
    }
  }, [userInformation]);
  return (
    <div className="flex gap-8 mt-5 mb-5 items-center border-y border-neutral-700 py-4">
      {/* {invitationGroupSend && handleAlertInvitationGroup()} */}
      <div className="flex items-center gap-2">
        <i
          onClick={handleLikeDislikePost}
          className={`bi ${
            youLikePost.youLike ? "bi-hand-thumbs-up-fill" : "bi-hand-thumbs-up"
          }  text-2xl sm:text-3xl text-yellow`}
        ></i>
        {likes?.length && <span>{youLikePost.numberLikes}</span>}
      </div>
      <Link to={`/post/${postId}/${user._id}`}>
        <i className="bi bi-chat-square-dots text-2xl sm:text-3xl text-yellow"></i>
      </Link>
      {isMatch && (
        <img
          onClick={handleSendInvitationGroup}
          src={logoMatch}
          alt="match"
          className={`w-8 h-8 cursor-pointer ${!isCreatorPost && "grayscale"} `}
        />
      )}
    </div>
  );
}

export default ActionsPosts;
