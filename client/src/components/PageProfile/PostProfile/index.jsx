import React from "react";

import MakePost from "../../PageHome/MakePost";
import Post from "../../PageHome/Post";
import SkeletonPost from "../../Skeletons/SkeletonPost";

function PostProfile({ isFriend }) {
  return (
    <section className="w-3/5 calcViewHeightPageProfile pt-2 ">
      {!isFriend && (
        // <div className="w-12 h-12 bg-amber-300 flex justify-center items-center rounded-full fixed ml-3 z-10 ">
        //   <div className=" ml-[50px] justify-center items-center ">
        //   </div>
        // </div>
        <MakePost />
      )}

      <div>
        {!posts.length
          ? posts.map((post) => (
              <Post
                key={post.id}
                type={post.type}
                seguir={post.seguir}
                message={post.message}
                user={post.user}
                imagePost={post.imagePost}
              />
            ))
          : [1, 2].map((value) => <SkeletonPost key={value} />)}
      </div>
    </section>
  );
}
const posts = [
  {
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
  },
  {
    id: 2,
    type: "Normal",
    seguir: true,
    message:
      "Lorem ipsum dolor sitnihil provident placeat perferendis dicta repellendus laborum delectuseveniet animi adipisci vitae soluta voluptas mollitia nam quide eumomnis illo",
    user: {
      id: 4,
      name: "Luis Lazarte",
      image:
        "https://gamer-commerce.vercel.app/static/media/LuisLazarte.1a5c228c.jpeg",
    },
    imagePost:
      "https://imborrable.com/wp-content/uploads/2022/10/fotos-gratis-de-stock-1.jpg",
  },
  {
    id: 3,
    type: "Match",
    seguir: true,
    message:
      "Lorem ipsum dolor sitnihil provident placeat perferendis dicta repellendus laborum delectuseveniet animi adipisci vitae soluta voluptas mollitia nam quide eumomnis illo",
    user: {
      id: 3,
      name: "Andres Aldao",
      image:
        "https://gamer-commerce.vercel.app/static/media/AndresOlarte.0b566e29.jpeg",
    },
    imagePost: "",
  },
  {
    id: 4,
    type: "Match",
    seguir: false,
    message:
      "Lorem ipsum dolor sitnihil provident placeat perferendis dicta repellendus laborum delectuseveniet animi adipisci vitae soluta voluptas mollitia nam quide eumomnis illo",
    user: {
      id: 1,
      name: "Facundo Martinez",
      image:
        "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
    },
    imagePost:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuI_ihgwfDJetbTDVJwLH3WcioCL4XxGetRg&usqp=CAU",
  },
  {
    id: 5,
    type: "Match",
    seguir: false,
    message:
      "Lorem ipsum dolor sitnihil provident placeat perferendis dicta repellendus laborum delectuseveniet animi adipisci vitae soluta voluptas mollitia nam quide eumomnis illo",
    user: {
      id: 6,
      name: "Nacho",
      image:
        "https://gamer-commerce.vercel.app/static/media/EmmanuelRomo.b21b242f.jpeg",
    },
    imagePost: "",
  },
];

export default PostProfile;
