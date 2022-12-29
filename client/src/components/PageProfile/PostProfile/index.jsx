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
function PostProfile({ userInformation }) {
  const postUser = useSelector((state) => state.userPostsProfile);
  const userlogged = useSelector((state) => state.userInformation);
  const [newsLoadPost, setNewsLoadPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getPostUSer(id));
    return () => {
      dispatch(clearState("posts"));
    };
  }, [id]);

  useEffect(() => {
    if (page > 1) {
      axios
        .get(`http://localhost:3000/api/posts/user?id=${id}&limit=${page}`)
        .then((response) => {
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
        document.getElementById("viewHeightPostByUser").scrollTop >=
      document.getElementById("viewHeightPostByUser").scrollHeight
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
    <section
      id="viewHeightPostByUser"
      className=" xl:h-[calc(100vh-27vh)] xl:overflow-y-scroll pt-2 xl:bg-clip-padding xl:backdrop-filter xl:backdrop-blur-sm xl:bg-opacity-0"
    >
      {location.pathname === `/profile/${userlogged?._id}` ? (
        // <div className="w-12 h-12 bg-amber-300 flex justify-center items-center rounded-full fixed ml-3 z-10 ">
        //   <div className=" ml-[50px] justify-center items-center ">
        //   </div>
        // </div>
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
              />
            ))
            .reverse()
        ) : (
          <div className="flex flex-col items-center h-[calc(100vh-22rem)]">
          
          <span className="uppercase block text-center mb-12">{`${"ali"} has not published`}</span>
          <img className="block m-auto w-36 h-36" src={logoMatch} alt="logo match" />
          </div>
        )}
        {!postUser && [1, 2].map((value) => <SkeletonPost key={value} />)}
        <div className="my-5">{loading && <Loader />}</div>
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
