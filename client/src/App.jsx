import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider, AuthRoute, NotAuthRoute } from "./components/auth";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Chats from "./components/PageChats/Chats";
import Landing from "./components/Landing";

function App() {
  return (
    <AuthProvider>
      
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <AuthRoute>
              <Home />
              <NavBar />
            </AuthRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <Profile />
              <NavBar />
            </AuthRoute>
          }
        />
        <Route
          path="/message"
          element={
            <AuthRoute>
              <Chats />
              <NavBar />
            </AuthRoute>
          }
        />

        <Route
          path="/logout"
          element={
            <AuthRoute>
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
