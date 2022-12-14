import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");
import "./App.css";
import { AuthProvider, AuthRoute, NotAuthRoute, useAuth } from "./components/auth";
import Swal from "sweetalert2";
import Logout from "./components/Logout";
import Chats from "./components/PageChats/Chats";
import Landing from "./components/Landing";
import Register from "./components/Register";
import Messages from "./components/PageChats/Mesagge";
import Home from "./components/PageHome/Home";
import ProfileUser from "./components/PageProfile/ProfileUser/index";
import ProfileFriends from "./components/PageProfile/ProfileFriends/index";
import ValidateUser from "./components/ValidateUser/ValidateUser";
import NavBar from "./components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import {
  chatTimeReal,
  getFriendsByUser,
  getInformationUsersAction,
  verifyUserAction,
  logoutAction
} from "./redux/actions";
import ViewPost from "./components/PagePostDetail/viewPost";
import SideBar from "./components/SideBar";
import MessageGroup from "./components/PageChats/MessageGroup";

function App() {
  //PORFAVOR NO BORRRAR
  //PORFAVOR NO BORRRAR
  //PORFAVOR NO BORRRAR
  //PORFAVOR NO BORRRAR
  // document.querySelectorAll(".modal-container img").forEach((el) => {
  //   el.addEventListener("click", function (ev) {
  //     ev.stopPropagation();
  //     this.parentNode.classList.add("active");
  //     console.log("expan click");
  //   });
  // });
  // document.querySelectorAll(".modal-container").forEach((el) => {
  //   el.addEventListener("click", function (ev) {
  //     this.classList.remove("active");
  //     console.log("remove click");
  //   });
  // });
  const [saveTokenData, setSaveTokenData] = useState(null);
  const userInformation = useSelector((state) => state.userInformation);
  const navigate = useNavigate();
  const chatTimeRealArray = useSelector((state) => state.chatTimeReal);

  const dispatch = useDispatch();
  const auth = useAuth()
  ;

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
    console.log("userInformation", userInformation);
    if (userInformation && userInformation !== "error") {
      dispatch(getFriendsByUser(userInformation._id));
      socket.emit("registrarse", userInformation?._id);
    }else if(userInformation === "error"){
      console.log("error");
      Swal.fire({
        icon: "error",
        title: "Su sesi??n ha expirado",
        text: "Por favor vuelva a iniciar sesi??n",
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
  }, [userInformation]);

  useEffect(() => {
    if (userInformation === "error") {
      Swal.fire({
        icon: "error",
        title: "Su sesi??n ha expirado",
        text: "Por favor vuelva a iniciar sesi??n",
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
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <SideBar />
              <NavBar />
              <ProfileUser />
            </AuthRoute>
          }
        />
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
          path="/post/:id"
          element={
            <AuthRoute>
              {/* <SideBar /> */}
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

        <Route path="*" element={<p>Not found</p>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
