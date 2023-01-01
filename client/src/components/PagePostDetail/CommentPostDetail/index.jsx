import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ActionsPosts from "../../PageHome/ActionsPost";
import Comments from "../../PageHome/Comments/Comments";
import SkeletonUser from "../../Skeletons/skeletonUser";
import CardComment from "../CardComment";
function CommentPostDetail({ comments, user, group, postId, likes, isMatch }) {
  // const [page, setPage] = useState(0);
  // const handleScroll = () => {
  //   if (
  //     document.getElementById("viewHeightComment").clientHeight +
  //       document.getElementById("viewHeightComment").scrollTop >=
  //     document.getElementById("viewHeightComment").scrollHeight
  //   ) {
  //     comment = [...comment, ...comment];
  //     console.log("llegue");
  //   }
  // };
  const userInformation = useSelector((state) => state.userInformation);
  const [commentFront, setCommentFront] = useState([]);
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
    document.getElementById("viewHeightComment");
    // .addEventListener("scroll", handleScroll);

    return () => {
      if (document.getElementById("viewHeightComment")) {
        document.getElementById("viewHeightComment");
        // .removeEventListener("scroll", handleScroll);
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
        id="viewHeightComment"
        className="xl:h-[calc(100vh-22rem)] mt-6 xl:overflow-y-scroll"
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
          ? comments
              .map((user) => (
                <CardComment
                  key={user._id}
                  userId={user.comment.userId}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  avatar={user.avatar}
                  comment={user.comment.description}
                />
              ))
              .reverse()
          : null}
        {!commentFront.length && !comments?.length && comments ? (
          <span className="text-sm text-center block uppercase">
            Be the first to comment 🙂
          </span>
        ) : null}
        {!comments &&
          [1, 2, 3, 4, 5].map((value) => <SkeletonUser key={value} />)}
      </div>
    </>
  );
}

export default CommentPostDetail;
