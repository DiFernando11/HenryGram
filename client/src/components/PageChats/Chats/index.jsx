import React from "react";
import { Outlet } from "react-router-dom";
import PreviewMesagge from "../PreviewMesagge";
import styles from "./index.module.css";

function Chats() {
  return (
    <main className={styles.page_Chats}>
      <div className={styles.sections_Preview_Page}>
        <PreviewMesagge title={"Messages"} messages={messagess} />
        <PreviewMesagge title={"Matchs"} messages={messagessGroup} />
      </div>
      <Outlet />
    </main>
  );
}
const messagess = [
  {
    id: 1,
    image: [
      "https://gamer-commerce.vercel.app/static/media/FacundoMartinez.d850a2c1.jpeg",
    ],
    message: "poquito",
    name: "Facundo Martinez",
  },
  {
    id: 3,
    image: [
      "https://gamer-commerce.vercel.app/static/media/AndresOlarte.0b566e29.jpeg",
    ],
    message: "poquito",
    name: "Andres Aldao",
  },
  {
    id: 4,
    image: [
      "https://gamer-commerce.vercel.app/static/media/LuisLazarte.1a5c228c.jpeg",
    ],
    message: "poquito",
    name: "Luiz Lazarte",
  },
  {
    id: 5,
    image: [
      "https://gamer-commerce.vercel.app/static/media/RogerPf.d7086f5b.jpeg",
    ],
    message: "poquito",
    name: "Roger Perez",
  },
  {
    id: 6,
    image: [
      "https://gamer-commerce.vercel.app/static/media/EmmanuelRomo.b21b242f.jpeg",
    ],
    message: "poquito",
    name: "Nacho",
  },
];

const messagessGroup = [
  {
    id: 1,
    image: [
      "https://gamer-commerce.vercel.app/static/media/AndresOlarte.0b566e29.jpeg",
      "https://gamer-commerce.vercel.app/static/media/FacundoMartinez.d850a2c1.jpeg",
      "https://gamer-commerce.vercel.app/static/media/RogerPf.d7086f5b.jpeg",
    ],
    message: "poquito",
    name: "Programadores",
  },
  {
    id: 2,
    image: [
      "https://gamer-commerce.vercel.app/static/media/LuisLazarte.1a5c228c.jpeg",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s64-c-mo",
    ],
    message: "Reunion de trabajo",
    name: "Grupo Office",
  },
  {
    id: 3,
    image: [
      "https://gamer-commerce.vercel.app/static/media/EmmanuelRomo.b21b242f.jpeg",
    ],
    message: "poquito",
    name: "Argentinos",
  },
  {
    id: 4,
    image: [
      "https://gamer-commerce.vercel.app/static/media/FacundoMartinez.d850a2c1.jpeg",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s64-c-mo",
      "https://gamer-commerce.vercel.app/static/media/EmmanuelRomo.b21b242f.jpeg",
    ],
    message: "poquito",
    name: "Viajes",
  },
  {
    id: 5,
    image: [
      "https://gamer-commerce.vercel.app/static/media/LuisLazarte.1a5c228c.jpeg",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s64-c-mo",
      "https://gamer-commerce.vercel.app/static/media/AndresOlarte.0b566e29.jpeg",
    ],
    message: "poquito",
    name: "Trabajadores",
  },
  {
    id: 6,
    image: [
      "https://gamer-commerce.vercel.app/static/media/EmmanuelRomo.b21b242f.jpeg",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s64-c-mo",
      "https://gamer-commerce.vercel.app/static/media/EmmanuelRomo.b21b242f.jpeg",
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s64-c-mo",
    ],
    message: "poquito",
    name: "Diego",
  },
  {
    id: 7,
    image: [
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s64-c-mo",
    ],
    message: "poquito",
    name: "Diego",
  },
];

export default Chats;
