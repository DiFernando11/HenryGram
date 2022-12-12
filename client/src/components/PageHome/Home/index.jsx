import React from "react";
import HeaderHome from "../HeaderHome";
import Post from "../Post";
import RecommendedFriends from "../RecommendedFriends";

function Home() {
  return (
    <main className={"bg-stone-700 w-full flex"}>
      <div className="w-full">
        <HeaderHome />
        <div className="calcViewHeight">
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
      <RecommendedFriends />
    </main>
  );
}

export default Home;
