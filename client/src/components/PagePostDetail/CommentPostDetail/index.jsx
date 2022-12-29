import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import logoMatch from "../../../assets/coheteHenry.png";
import SendMessage from "../../PageChats/SendMessage";
import Comments from "../../PageHome/Comments/Comments";
import SkeletonUser from "../../Skeletons/skeletonUser";
function CommentPostDetail({ comments }) {
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
  const {id} = useParams()
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
      <div className="w-full flex gap-14 mt-5 mb-5 justify-center items-center border-y border-neutral-700 py-4">
        <i className="bi bi-hand-thumbs-up text-3xl text-yellow"></i>
        <i className="bi bi-chat-square-dots text-3xl text-yellow"></i>
        {/* {type === "Match" && ( */}
        <img src={logoMatch} alt="match" className="w-8 h-8" />
        {/* )} */}
      </div>
      <Comments postId={id}/>
      <div
        id="viewHeightComment"
        className="xl:h-[calc(100vh-21rem)] mt-6 xl:overflow-y-scroll"
      >
        {comments?.length  ? (
          comments.map((user) => (
            <div
              key={user._id}
              className="p-4 border border-zinc-700 flex gap-2 items-center justify-start"
            >
              <Link to={`/profile/${user.comment.userId}`}>
                <img
                  className="fit-cover max-w-[30px] min-w-[30px] rounded-full"
                  src={user.avatar}
                  alt="user avatar"
                />
              </Link>
              <div>
                <Link to={`/profile/${user.comment.userId}`}>
                  <span className="block text-sm leading-[8px] mb-2 ">{`${user.firstName} ${user.lastName}`}</span>
                </Link>
                <p className="text-sm  max-w-40 text-white">
                  {user.comment.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <span className="text-sm text-center block uppercase">
            Be the first to comment 🙂
          </span>
        )}
        {!comments &&
          [1, 2, 3, 4, 5].map((value) => <SkeletonUser key={value} />)}
      </div>
    </>
  );
}

export default CommentPostDetail;
