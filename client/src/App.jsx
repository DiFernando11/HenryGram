import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider, AuthRoute, NotAuthRoute } from "./components/auth";
import Logout from "./components/Logout";
import NavBar from "./components/NavBar";
import Profile from "./components/PageProfile/Profile";
import Chats from "./components/PageChats/Chats";
import Landing from "./components/Landing";
import Register from "./components/Register";
import Messages from "./components/PageChats/Mesagge";
import Home from "./components/PageHome/Home";
import ValidateUser from "./components/ValidateUser/ValidateUser";

function App() {
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
              <Home/>
            </AuthRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <NavBar />
              <Profile />
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
          path="/validate"
          element={
            <NotAuthRoute>
              <ValidateUser />
            </NotAuthRoute>
          }
        />
        <Route
          path="/message"
          element={
            <AuthRoute>
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
