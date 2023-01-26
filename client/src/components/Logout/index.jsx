import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth";

function Logout() {
  const auth = useAuth();

  const navigate = useNavigate();
  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };
  
  return (
    <div>
      <h1>Logout</h1>
      <p>Estas seguro que quieres eliminar</p>
      <button onClick={handleLogout}>Si</button>
    </div>
  );
}

export default Logout;
