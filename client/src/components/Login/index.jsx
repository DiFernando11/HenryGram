import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../auth/index";
import Swal from "sweetalert2";
import { loginAction, logoutAction } from "../../redux/actions";

function Login() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const auth = useAuth();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleDataUser = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };
  const handleLoginUser = (e) => {
    e.preventDefault();
    dispatch(loginAction(login));
    if (!userLogin) {
      Swal.fire({
        title: "Waiting for confirmation...",
        didOpen: () => {
          Swal.showLoading();
        },
        background: '#1e1c1d',
        iconColor: "#fcd34d",
        color: "#fafbfd"
      });
    }
    // auth.login({ login });
    // navigate('/home');
  };

  const handleAlert = (result) => {
    if (result.token) {
      Swal.fire({
        icon: "success",
        title: `Welcome ${result?.firstName}`,
        background: '#1e1c1d',
        iconColor: "#fcd34d",
        color: "#fafbfd"
      }).then((response) => {
        if (response.isConfirmed) {
          auth.login();
        }
      });
    } else {
      Swal.fire(
        "Email or password are incorrect.",
        "Please, try again.",
        "warning"
      ).then(() => {
        dispatch(logoutAction());
      });
    }
  };

  return (
    <div className="border border-white lg:h-1/2 h-3/5 bg-white lg:w-1/4 w-2/3 rounded flex flex-col">
      {userLogin && handleAlert(userLogin)}
      <h1 className="text-black mt-3 lg:mx-5 mx-auto lg:text-2xl text-4xl font-bold font-sans">
        Login
      </h1>
      <form
        className="flex flex-col lg:py-3 pt-7 font-sans"
        onSubmit={handleLoginUser}
      >
        <label className="lg:m-auto ml-9 font-bold text-xl" htmlFor="email">
          Email
        </label>
        <input
          className="border border-black w-10/12 mx-auto my-2 rounded lg:p-1 p-2"
          name="email"
          type="text"
          value={login.email}
          placeholder="Email..."
          onChange={handleDataUser}
        />
        <label className="lg:m-auto ml-9 font-bold text-xl" htmlFor="password">
          Contraseña
        </label>
        <input
          className="border border-black w-10/12 mx-auto my-2 rounded lg:p-1 p-2"
          name="password"
          type="password"
          value={login.password}
          placeholder="Contraseña..."
          onChange={handleDataUser}
        />
        <button
          className="bg-black font-bold border text-white mx-auto lg:my-1 my-7 lg:p-2 p-3 lg:w-1/2 w-2/3 rounded-lg transition duration:200 hover:border-black hover:bg-blacker "
          type="submit"
        >
          Ingresar
        </button>
      </form>
      <hr className="border-black w-10/12 mx-auto" />
      <button
        onClick={() => navigate("/register")}
        className="bg-yellow font-sans font-bold border border-yellower rounded-lg lg:p-2 p-3 lg:w-1/2 w-2/3 mx-auto text-black transition duration:200 lg:my-5 hover:bg-yellower mt-7"
      >
        Crear cuenta
      </button>
    </div>
  );
}

export default Login;
