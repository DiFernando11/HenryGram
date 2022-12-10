import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider, AuthRoute, NotAuthRoute } from "./components/auth";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NavBar from "./components/NavBar";

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route
          path="/home"
          element={
            <AuthRoute>
              <Home />
            </AuthRoute>
          }
        />
        <Route
          path="/login"
          element={
            <NotAuthRoute>
              <Login />
            </NotAuthRoute>
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
