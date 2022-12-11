import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth";
import styles from "./index.module.css";

function NavBar() {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <nav className={styles.siderBar}>
      <li onClick={() => navigate(-1)}>Atras</li>
      <ul>
        {routes.map((route) => {
          if (route.private && !auth?.user) return null;
          if (route.isLogin && auth?.user) return null;
          return (
            <li key={route.page}>
              <NavLink
                style={({ isActive }) => ({ color: isActive && "red" })}
                to={route.to}
              >
                {route.page}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
const routes = [];
routes.push(
  { to: "/home", page: "HOME", private: true },
  { to: "/message", page: "CHATS", private: true },
  { to: "/profile", page: "PROFILE", private: true },
  { to: "/login", page: "LOGIN", private: false, isLogin: true },
  { to: "/logout", page: "LOGOUT", private: true }
);
export default NavBar;
