import React from "react";
import AboutProfile from "../AboutProfile";
import HeaderProfile from "../HeaderProfile";
import PostProfile from "../PostProfile";

function Profile({ userInformation }) {
  return (
    <main className="w-full">
      <HeaderProfile userInformation={userInformation} />
      <div className=" w-full flex calcViewHeightPageProfile">
        <AboutProfile userInformation={userInformation} />
        <PostProfile userInformation={userInformation} />
      </div>
    </main>
  );
}

export default Profile;
