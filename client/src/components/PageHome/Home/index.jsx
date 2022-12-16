import React from "react";
import HeaderHome from "../HeaderHome";
import Post from "../Post";
import RecommendedFriends from "../RecommendedFriends";
import { useAuth } from "../../auth/index";


function Home() {
  const auth = useAuth();

  const handleClick = () => {
    auth.logout();
  };

  return (
    <main className={"w-full flex "}>
      <button className="text-white" onClick={handleClick}>
        Elminar
      </button>

      <div className="w-full">
        {/* <HeaderHome /> */}
        <div className="calcViewHeight mt-16">
          {posts.length &&
            posts.map((post) => (
              <Post
                key={post.id}
                type={post.type}
                seguir={post.seguir}
                message={post.message}
                user={post.user}
                imagePost={post.imagePost}
              />
            ))}
        </div>
      </div>
      <RecommendedFriends />
    </main>
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

export default Home;
