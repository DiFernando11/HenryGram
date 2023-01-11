import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const URL = import.meta.env.VITE_URL_RAILWAY;
const socket = io(`${URL || "http://localhost:3000"}`);
import "./App.css";
import {
  AuthProvider,
  AuthRoute,
  NotAuthRoute,
  useAuth,
} from "./components/auth";
import Swal from "sweetalert2";
import Logout from "./components/Logout";
import Chats from "./components/PageChats/Chats";
import Landing from "./components/Landing";
import Register from "./components/Register";
import Messages from "./components/PageChats/Mesagge";
import Home from "./components/PageHome/Home";
import ProfileFriends from "./components/PageProfile/ProfileFriends/index";
import ValidateUser from "./components/ValidateUser/ValidateUser";
import NavBar from "./components/NavBar/NavBar";
import {
  getFriendsByUser,
  getInformationUsersAction,
  verifyUserAction,
  logoutAction,
} from "./redux/actions";
import ViewPost from "./components/PagePostDetail/viewPost";
import SideBar from "./components/SideBar";
import MessageGroup from "./components/PageChats/MessageGroup";
import notFound from "../src/assets/404.png";
function App() {
  const [saveTokenData, setSaveTokenData] = useState(null);
  const userInformation = useSelector((state) => state.userInformation);

  const dispatch = useDispatch();

  const getData = () => {
    return localStorage.getItem("sessionStarted");
  };

  useEffect(() => {
    (async () => {
      setSaveTokenData(getData());
      // dispatch(searchUsersAction());
      if (saveTokenData) {
        dispatch(verifyUserAction(saveTokenData));
      }
    })();
  }, [saveTokenData]);

  useEffect(() => {
    dispatch(getInformationUsersAction());
  }, []);

  useEffect(() => {
    if (userInformation && userInformation !== "error") {
      dispatch(getFriendsByUser(userInformation._id));
      socket.emit("registrarse", userInformation?._id);
    } else if (userInformation === "error") {
      Swal.fire({
        icon: "error",
        title: "Su sesión ha expirado",
        allowOutsideClick: false,
        text: "Por favor vuelva a iniciar sesión",
        type: "error",
        confirmButtonText: "Ok",
        background: "#1e1c1d",
        iconColor: "#fcd34d",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("sessionStarted");
          dispatch(logoutAction());
          window.location.reload();
        }
      });
    }
  }, [userInformation]);

  useEffect(() => {
    if (userInformation === "error") {
      Swal.fire({
        icon: "error",
        title: "Su sesión ha expirado",
        text: "Por favor vuelva a iniciar sesión",
        type: "error",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("sessionStarted");
          dispatch(logoutAction());
          window.location.reload();
        }
      });
    }
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <NotAuthRoute>
              <Landing />
            </NotAuthRoute>
          }
        />
        <Route
          path="/home"
          element={
            <AuthRoute>
              <NavBar />
              <SideBar />
              <Home />
            </AuthRoute>
          }
        />
        {/* <Route
          path="/profile"
          element={
            <AuthRoute>
              <SideBar />
              <NavBar />
              <ProfileUser />
            </AuthRoute>
          }
        /> */}
        <Route
          path="/profile/:id"
          element={
            <AuthRoute>
              <SideBar />
              <NavBar />
              <ProfileFriends />
            </AuthRoute>
          }
        />
        <Route
          path="/register"
          element={
            <NotAuthRoute>
              <Register />
            </NotAuthRoute>
          }
        />

        <Route
          path="/message"
          element={
            <AuthRoute>
              <SideBar />
              <NavBar />
              <Chats />
            </AuthRoute>
          }
        >
          <Route path="chat/:id" element={<Messages />} />
          <Route path="chat/group/:id" element={<MessageGroup />} />
        </Route>
        <Route
          path="/post/:id/:userId"
          element={
            <AuthRoute>
              <SideBar />
              <NavBar />
              <ViewPost />
            </AuthRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <AuthRoute>
              {/* <SideBar /> */}
              <NavBar />
              <Logout />
            </AuthRoute>
          }
        />
        <Route
          path="/validate"
          element={
            <NotAuthRoute>
              <ValidateUser />
            </NotAuthRoute>
          }
        />

        <Route
          path="*"
          element={<img src={notFound} className="w-screen h-screen" />}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
