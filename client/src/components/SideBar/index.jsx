import { Sidebar } from "flowbite-react";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import HiChartPi from "../../assets/coheteHenry.png";
import { useAuth } from "../auth";
import styles from "./index.module.css";

function SideBar() {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <aside className="w-64 bg-yellow relative" aria-label="Sidebar">
      <div className="overflow-y-auto bg-yellow py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
        <ul className="space-y-2">
          <a href="https://flowbite.com/" class="flex items-center pl-2.5 mb-5">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="mr-3 h-6 sm:h-7"
              alt="Flowbite Logo"
            />
            <span class="self-center text-xl font-semibold text-gray-900 whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>
          {routes.map((route) => {
            if (route.private && !auth?.user) return null;
            return (
              <li>
                <NavLink
                  to={route.to}
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <i className={`bi ${route.icon} text-2xl `}></i>
                  <span className="ml-3 text-black">{route.page}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>

        <ul className="w-11/12 pt-10  border-t border-gray-300 dark:border-gray-700 absolute bottom-8">
          {/* <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
            >
              <i className="bi bi-house-fill"></i>
              <span class="ml-4">Upgrade to Pro</span>
            </a>
          </li> */}
          <NavLink to={"/profile"}>
            <img
              src="https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo"
              className="w-12 h-12  block m-auto rounded-full"
              alt="Flowbite Logo"
            />
          </NavLink>
        </ul>
      </div>
    </aside>
    //    <span class="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">
    //    3
    //  </span>
    // <nav className={styles.siderBar}>

    //   <li onClick={() => navigate(-1)}>Atras</li>
    //   <ul>
    //     {routes.map((route) => {
    //       if (route.private && !auth?.user) return null;
    //       if (route.isLogin && auth?.user) return null;
    //       return (
    //         <li key={route.page}>
    //           <NavLink
    //             style={({ isActive }) => ({ color: isActive && "red" })}
    //             to={route.to}
    //           >
    //             {route.page}
    //           </NavLink>
    //         </li>
    //       );
    //     })}
    //   </ul>
    // </nav>
  );
}
const routes = [];
routes.push(
  { to: "/home", page: "HOME", icon: "bi-house-fill", private: true },
  { to: "/message", page: "INBOX", icon: "bi-chat-dots-fill", private: true }
  // { to: "/logout", page: "LOGOUT", icon: "bi-house-fill", private: true }
);
export default SideBar;
