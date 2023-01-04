import { Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPostUSer, clearState } from "../../../redux/actions";
import { useLocation } from "react-router-dom";
import MakePost from "../../PageHome/MakePost";
import Post from "../../PageHome/Post";
import SkeletonPost from "../../Skeletons/SkeletonPost";
import { useParams } from "react-router-dom";
import logoMatch from "../../../assets/coheteHenry.png";
import axios from "axios";
import Loader from "../../Loader";
const URL = import.meta.env.VITE_URL_RAILWAY;
function PostProfile({ userInformation }) {
  const postUser = useSelector((state) => state.userPostsProfile);
  const userlogged = useSelector((state) => state.userInformation);
  const updatePostRefresh = useSelector((state) => state.updatePostRefresh);
  const [newsLoadPost, setNewsLoadPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      dispatch(getPostUSer(id));
    })();

    return () => {
      dispatch(clearState("posts"));
    };
  }, [id, updatePostRefresh]);

  useEffect(() => {
    if (page > 1 ) {
      axios
        .get(
          `${
            URL || `http://localhost:3000/api/posts/user?id=${id}&limit=${page}`
          }`
        )
        .then((response) => {
          if (!response.data.length) setLoading(false);
          setNewsLoadPost([...newsLoadPost, ...response.data]);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [page]);
  const handleScroll = () => {
    if (
      document.getElementById("viewHeightPostByUser").clientHeight +
        1 +
        document.getElementById("viewHeightPostByUser").scrollTop >=
        document.getElementById("viewHeightPostByUser").scrollHeight &&
      !loading
    ) {
      setPage(page + 1);
      setLoading(true);
    }
  };
  useEffect(() => {
    document
      .getElementById("viewHeightPostByUser")
      .addEventListener("scroll", handleScroll);

    return () => {
      if (document.getElementById("viewHeightPostByUser")) {
        document
          .getElementById("viewHeightPostByUser")
          .removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <section className=" h-fit pt-2 rounded-lg">
      {location.pathname === `/profile/${userlogged?._id}` ? (
        <Transition
          show={true}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <MakePost />
        </Transition>
      ) : null}

      <div>
        {!postUser && [1, 2].map((value) => <SkeletonPost key={value} />)}
        {postUser?.length ? (
          postUser
            ?.map((post) => (
              <Post
                key={post._id}
                postId={post._id}
                isMatch={post.isMatch}
                seguir={post.seguir}
                description={post.description}
                user={userInformation}
                imagePost={post.image}
                group={post.group}
                likes={post.likes}
                lastComment={post.lastComment}
              />
            ))
            .reverse()
        ) : (
          <div className="flex flex-col items-center h-[calc(100vh-22rem)] p-5">
            <img
              className="block m-auto w-36 h-36"
              src={logoMatch}
              alt="logo match"
            />
            <h1 className="text-2xl font-bold text-gray-500">
              No hay publicaciones aun
            </h1>
          </div>
        )}
        {loading && <Loader />}
        {newsLoadPost.length &&
          newsLoadPost.map((posts, index) => (
            <Post
              key={index}
              postId={posts._id}
              isMatch={posts.isMatch}
              seguir={posts.seguir}
              description={posts.description}
              user={userInformation}
              imagePost={posts.image}
              group={posts.group}
              likes={posts.likes}
            />
          ))}
      </div>
    </section>
  );
}

export default PostProfile;
