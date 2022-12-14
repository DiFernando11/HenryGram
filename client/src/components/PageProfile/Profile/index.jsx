import React from "react";
import AboutProfile from "../AboutProfile";
import HeaderProfile from "../HeaderProfile";
import PostProfile from "../PostProfile";

function Profile() {
  return (
    <main className="w-full">
      <HeaderProfile />
      <div className=" w-full flex calcViewHeightPageProfile">
        <AboutProfile />
        <PostProfile />
      </div>
    </main>
  );
}

export default Profile;
