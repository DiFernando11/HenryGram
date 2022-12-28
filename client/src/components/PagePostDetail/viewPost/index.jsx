import React, {useEffect} from "react";
import Post from "../../PageHome/Post";
import SkeletonPost from "../../Skeletons/SkeletonPost";
import CommentPostDetail from "../CommentPostDetail";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComments, getPostById, getProfileFriendAction } from "../../../redux/actions";
function ViewPost() {
  const post = useSelector(state => state.postById)
  const comments = useSelector(state => state.comments)
  const user = useSelector(state => state.userProfileFriend)
  const dispatch = useDispatch()
  const {id, userId} = useParams()
  console.log("post:", post, "comments:", comments, "user:", user)
  useEffect(() => {
  dispatch(getComments(id))
  dispatch(getPostById(id))
  dispatch(getProfileFriendAction(userId))
  }, [id])
  return (
    <main className="flex w-full h-screen">
      <div className=" flex bg-[#363636] w-4/5 h-4/5 m-auto border border-amber-300">
        <section className="bg-[#363636] w-[65%]">
          {post?._id ? <Post
            key={post._id}
            postId={post._id}
            isMatch={post.isMatch}
            seguir={post.seguir}
            description={post.description}
            user={user}
            imagePost={post.image}
            postDetail={true}
          />
          : <SkeletonPost />}
        </section>
        <section className="w-[35%] border border-l-yellow px-3">
          <CommentPostDetail comments={comments} />
        </section>
      </div>
    </main>
  );
}
const post = {
  id: 1,
  type: "Match",
  seguir: true,
  message:
    "Lorem ipsum dolor sitnihil provident placeat perferendis dicta repellendus laborum delectuseveniet animi adipisci vitae soluta voluptas mollitia nam quide eumomnis illo",
  user: {
    id: 2,
    name: "Diego Apolo",
    image:
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
  },
  imagePost:
    "https://images.ecestaticos.com/tUsQqBMzVgb6yd63QjsoObsXmd0=/0x0:0x0/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fd53%2F5d5%2Fdb0%2Fd535d5db070fa6ecf441b32de847e756.jpg",
};

export default ViewPost;
