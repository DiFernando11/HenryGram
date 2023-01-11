import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActionsPosts from "../../PageHome/ActionsPost";
import Comments from "../../PageHome/Comments/Comments";
import SkeletonUser from "../../Skeletons/skeletonUser";
import CardComment from "../CardComment";
import axios from "axios";
import Loader from "../../Loader";
import { useSelector } from "react-redux";
const URL = import.meta.env.VITE_URL_RAILWAY;

function CommentPostDetail({ comments, user, group, postId, likes, isMatch }) {
  const [commentFront, setCommentFront] = useState([]);
  const [oldComment, setOldComment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const userInformation = useSelector((state) => state.userInformation);
  function scrollLastMessage() {
    var objDiv = document.getElementById("viewHeightComment");
    objDiv.scrollTop = 0;
  }
  const handleSendCommentFront = (message) => {
    setCommentFront([message, ...commentFront]);
    scrollLastMessage();
  };
  const { id } = useParams();
  useEffect(() => {
    if (page > 1) {
      axios
        .get(`${URL || `http://localhost:3000`}/api/posts/comment?id=${id}&limit=${page}`)
        .then((response) => {
          console.log("ayuda");
          setOldComment([...oldComment, ...response.data]);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [page]);

  const handleScroll = () => {
    if (
      document.getElementById("viewHeightCommentDetail").clientHeight +
        1 +
        document.getElementById("viewHeightCommentDetail").scrollTop >=
      document.getElementById("viewHeightCommentDetail").scrollHeight
    ) {
      console.log("hola");
      setPage(page + 1);
      setLoading(true);
    }
  };

  useEffect(() => {
    document
      .getElementById("viewHeightCommentDetail")
      .addEventListener("scroll", handleScroll);

    return () => {
      if (document.getElementById("viewHeightCommentDetail")) {
        document
          .getElementById("viewHeightCommentDetail")
          .removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <>
      <div className=" flex justify-center ">
        <ActionsPosts
          user={user}
          group={group}
          postId={postId}
          likes={likes}
          isMatch={isMatch}
        />
      </div>
      <Comments postId={id} handleSendCommentFront={handleSendCommentFront} />
      <div
        id="viewHeightCommentDetail"
        className="xl:h-[calc(100vh-20%-16rem)] mt-6 xl:overflow-y-scroll"
      >
        {commentFront.length &&
          commentFront.map((comment, index) => (
            <CardComment
              key={index}
              userId={userInformation?._id}
              firstName={userInformation?.firstName}
              lastName={userInformation?.lastName}
              avatar={userInformation?.avatar}
              comment={comment}
            />
          ))}
        {comments?.length
          ? comments.map((user, index) => (
              <CardComment
                key={index}
                userId={user.comment.userId}
                firstName={user.firstName}
                lastName={user.lastName}
                avatar={user.avatar}
                comment={user.comment.description}
              />
            ))
          : null}
        {!commentFront.length && !comments?.length && comments ? (
          <span className="text-sm text-center block uppercase">
            Be the first to comment 🙂
          </span>
        ) : null}
        {!comments &&
          [1, 2, 3, 4, 5].map((value) => <SkeletonUser key={value} />)}
        {loading && <Loader />}
        {oldComment.length
          ? oldComment.map((user, index) => (
              <CardComment
                key={index}
                userId={user.comment.userId}
                firstName={user.firstName}
                lastName={user.lastName}
                avatar={user.avatar}
                comment={user.comment.description}
              />
            ))
          : null}
      </div>
    </>
  );
}

export default CommentPostDetail;
