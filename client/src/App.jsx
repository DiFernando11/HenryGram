import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider, AuthRoute, NotAuthRoute } from "./components/auth";
import Logout from "./components/Logout";

import Profile from "./components/PageProfile/Profile";
import Chats from "./components/PageChats/Chats";
import Landing from "./components/Landing";
import Register from "./components/Register";
import Messages from "./components/PageChats/Mesagge";
import Home from "./components/PageHome/Home";
import SideBar from "./components/SideBar";
import ProfileUser from "./components/PageProfile/ProfileUser/index";
import ProfileFriends from "./components/PageProfile/ProfileFriends/index";
import NavBar from "./components/NavBar/NavBar";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { verifyUserAction } from "./redux/actions";

function App() {
  const [saveTokenData, setSaveTokenData] = useState(null);
  const dispatch = useDispatch();

  const getData = () => {
    return localStorage.getItem("sessionStarted");
  };
  useEffect(() => {
    (async () => {
      setSaveTokenData(getData());
      if (saveTokenData) {
        await dispatch(verifyUserAction(saveTokenData));
      }
    })();
  }, [saveTokenData]);

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
              {/* <SideBar /> */}
              <NavBar />
              <Home />
            </AuthRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthRoute>
              {/* <SideBar /> */}
              <NavBar />
              <ProfileUser />
            </AuthRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <AuthRoute>
              {/* <SideBar /> */}
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
              {/* <SideBar /> */}
              <NavBar />
              <Chats />
            </AuthRoute>
          }
        >
          <Route path=":idUser" element={<Messages />} />
        </Route>

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
        <Route path="*" element={<p>Not found</p>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
