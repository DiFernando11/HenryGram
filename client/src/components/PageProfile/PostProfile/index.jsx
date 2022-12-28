import { Transition } from "@headlessui/react";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPostUSer, clearState } from "../../../redux/actions";
import MakePost from "../../PageHome/MakePost";
import Post from "../../PageHome/Post";
import SkeletonPost from "../../Skeletons/SkeletonPost";
import { useParams } from "react-router-dom";
function PostProfile({ userInformation, isFriend }) {
  const postUser = useSelector((state) => state.userPostsProfile);
  const dispatch = useDispatch();
  const { id } = useParams();
console.log(postUser , "postsUser")
  useEffect(() => {
    dispatch(getPostUSer(id));
    return () => {
      dispatch(clearState("posts"));
    };
  }, [id]);

  return (
    <section className="xl:w-3/5 xl:h-[calc(100vh-9rem)] xl:overflow-y-scroll pt-2 ">
      {!isFriend && (
        // <div className="w-12 h-12 bg-amber-300 flex justify-center items-center rounded-full fixed ml-3 z-10 ">
        //   <div className=" ml-[50px] justify-center items-center ">
        //   </div>
        // </div>
        <Transition
          show={!isFriend}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <MakePost />
        </Transition>
      )}

      <div>
        {postUser.length
          ? postUser?.map((post) => (
              <Post
                key={post._id}
                postId={post._id}
                isMatch={post.isMatch}
                seguir={post.seguir}
                description={post.description}
                user={userInformation}
                imagePost={post.image}
                group = {post.group}
                likes= {post.likes}
              />
            ))
          : [1, 2].map((value) => <SkeletonPost key={value} />)}
      </div>
    </section>
  );
}

export default PostProfile;
