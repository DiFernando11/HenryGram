import React, { useEffect } from "react";
import Post from "../../PageHome/Post";
import SkeletonPost from "../../Skeletons/SkeletonPost";
import CommentPostDetail from "../CommentPostDetail";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getComments,
  getPostById,
  getProfileFriendAction,
} from "../../../redux/actions";
function ViewPost() {
  const post = useSelector((state) => state.postById);
  const comments = useSelector((state) => state.comments);
  const user = useSelector((state) => state.userProfileFriend);
  const dispatch = useDispatch();
  const { id, userId } = useParams();
  useEffect(() => {
    dispatch(getComments(id));
    dispatch(getPostById(id));
    dispatch(getProfileFriendAction(userId));
  }, [id]);

  return (
    <main className="flex w-full sm:h-[calc(100vh)] h-[calc(100vh-4rem)]">
      <div className=" overflow-y-scroll xl:flex bg-[#363636] xl:w-4/5 xl:h-4/5 h-[calc(100vh-4rem)] sm:h-[calc(100vh)] m-auto border border-amber-300">
        <section className="bg-[#363636] xl:w-[65%]">
          {post?._id ? (
            <Post
              key={post._id}
              postId={post._id}
              isMatch={post.isMatch}
              seguir={post.seguir}
              description={post.description}
              user={user}
              imagePost={post.image}
              postDetail={true}
            />
          ) : (
            <SkeletonPost />
          )}
        </section>
        <section className="xl:w-[35%] border border-l-yellow px-3">
          <CommentPostDetail
            comments={comments}
            user={user}
            group={post.group}
            postId={post._id}
            likes={post.likes}
            isMatch={post.isMatch}
          />
        </section>
      </div>
    </main>
  );
}

export default ViewPost;
