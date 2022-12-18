import React from "react";
import Post from "../../PageHome/Post";
import CommentPostDetail from "../CommentPostDetail";

function ViewPost() {
  return (
    <main className="flex w-full h-[calc(100vh-4rem)] ">
      <div className=" flex bg-transparent w-4/5 h-4/5  h-full m-auto border border-amber-300">
        <section className="bg-transparent w-[65%]">
          <Post
            key={post.id}
            type={post.type}
            seguir={post.seguir}
            message={post.message}
            user={post.user}
            imagePost={post.imagePost}
            postDetail={true}
          />
        </section>
        <section className="w-[35%] border border-amber-300 ">
          <CommentPostDetail />
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
