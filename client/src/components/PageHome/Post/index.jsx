import React, { useState } from "react";
import logoMatch from "../../../assets/coheteHenry.png";
import MyMenu from "./MyMenu";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import StatusFriend from "../../StatusFriend";
import Comments from "../Comments/Comments";
import CardComment from "../../PagePostDetail/CardComment";
import ActionsPosts from "../ActionsPost";
function Post({
  isMatch,
  description,
  user,
  imagePost,
  postId,
  postDetail,
  userIdLogged,
  group,
  likes,
}) {
  const location = useLocation();
  const userInformation = useSelector((state) => state.userInformation);
  const [commentFront, setCommentFront] = useState([]);

  const handleSendCommentFront = (message) => {
    setCommentFront([message , ...commentFront]);
  };

  return (
    <section
      className={`w-11/12  h-auto mt-6 m-auto relative pt-8 p-6 m-auto
			${
        !postDetail && "border border-amber-300"
      } containerBackrougndImagePost rounded shadow-md shadow-black bg-[#363636]`}
    >
      {isMatch && (
        <div className="absolute ml-6 top-0 left-0 mt-2 flex items-center gap-1">
          <span className=" text-xs ml-2">Match</span>
          <img src={logoMatch} alt="match" className="w-4 h-4" />
        </div>
      )}

      <div className="text-yellow-300 absolute top-1 right-0 mr-8 ">
        {userIdLogged?._id === user._id ||
        location.pathname === `/profile/${userInformation?._id}` ? (
          <MyMenu
            postId={postId}
            description={description}
            imagePost={imagePost}
          />
        ) : null}
      </div>
      <div className="border-t border-neutral-600"></div>
      <div className=" pt-4 flex gap-2.5 relative items-center justify-between truncate w-3/5 ">
        <Link to={`/profile/${user._id}`}>
          <div className="flex gap-3">
            <img
              className="w-10 h-10 rounded-full object-cover border bg-neutral-600 border-amber-300"
              src={user.avatar}
              alt={user.firstName}
            />
            <span className="leading-10 uppercase truncate">
              {`${user.firstName} ${user.lastName}`}{" "}
            </span>
          </div>
        </Link>
      </div>
      <div className="absolute top-12 md:right-12 right-5 ">
        <StatusFriend user={user._id} />
      </div>

      <p className="my-5 text-white text-sm ">{description}</p>
      <div className="grid grid-flow-col auto-cols-[minmax(0,_2fr)] gap-2 items-center bg-transparent">
        {imagePost &&
          imagePost.map((image) => {
            if (!image.hasOwnProperty("url")) return;
            return (
              <img
                key={image.url}
                className="w-full h-[150px] sm:h-[300px] object-cover"
                src={image.url}
                alt="post user"
              />
            );
          })}
      </div>
      {!postDetail && (
        <>
          <ActionsPosts
            user={user}
            group={group}
            postId={postId}
            likes={likes}
            isMatch={isMatch}
          />

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

          <Comments
            postId={postId}
            handleSendCommentFront={handleSendCommentFront}
          />
        </>
      )}
    </section>
  );
}

export default Post;
