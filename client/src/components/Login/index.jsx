import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/index";

function Login() {
  const auth = useAuth();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const handleDataUser = (e) => {
    setUsername(e.target.value);
  };
  const handleLoginUser = (e) => {
    e.preventDefault();
    auth.login({ username });
    navigate("/home");
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLoginUser}>
        <input
          type="text"
          value={username}
          onChange={(e) => handleDataUser(e)}
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default Login;
