import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPostAllUsers } from "../../../redux/actions";
import axios from "axios";
import SkeletonPost from "../../Skeletons/SkeletonPost";
import MakePost from "../MakePost";
import Post from "../Post";
import RecommendedFriends from "../RecommendedFriends";
import Loader from "../../Loader";

function Home() {
  const dispatch = useDispatch();
  const postUsers = useSelector((state) => state.allPosts);
  const [newsLoadPost, setNewsLoadPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const user = useSelector((state) => state.userInformation);
  useEffect(() => {
    dispatch(getPostAllUsers());
  }, []);
  useEffect(() => {
    if (page > 1) {
      axios
        .get(`http://localhost:3000/api/posts?limit=${page}`)
        .then((response) => {
          setNewsLoadPost([...newsLoadPost, ...response.data]);
          setLoading(false);
        })
        .catch((error) => {
    
          console.log(error);
        });
    }
  }, [page]);
  console.log(newsLoadPost);
  const handleScroll = () => {
    if (
      document.getElementById("viewHeigthPost").clientHeight +
        document.getElementById("viewHeigthPost").scrollTop >=
      document.getElementById("viewHeigthPost").scrollHeight
    ) {
      setPage(page + 1);
      setLoading(true);
    }
  };

  useEffect(() => {
    document
      .getElementById("viewHeigthPost")
      .addEventListener("scroll", handleScroll);

    return () => {
      if (document.getElementById("viewHeigthPost")) {
        document
          .getElementById("viewHeigthPost")
          .removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  return (
    <main className="w-full flex">
      <div id="viewHeigthPost" className="w-full h-[calc(100vh-4rem)] sm:h-screen overflow-y-scroll">
        <MakePost />
        {postUsers.length
          ? postUsers?.map((posts) => (
              <Post
                key={posts.post._id}
                postId={posts.post._id}
                userIdLogged={user}
                isMatch={posts.post.isMatch}
                seguir={posts.seguir}
                description={posts.post.description}
                user={posts.user}
                imagePost={posts.post.image}
              />
            ))
          : [1, 2].map((value) => <SkeletonPost key={value} />)}
        <div className="my-5">{loading && <Loader />}</div>

        {newsLoadPost.length &&
          newsLoadPost.map((posts) => (
            <Post
              key={posts.post._id}
              postId={posts.post._id}
              userIdLogged={user}
              isMatch={posts.post.isMatch}
              seguir={posts.seguir}
              description={posts.post.description}
              user={posts.user}
              imagePost={posts.post.image}
            />
          ))}
      </div>

      <RecommendedFriends />
    </main>
  );
}

export default Home;
