import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../auth/index";
import Swal from "sweetalert2";
import { loginAction, logoutAction } from "../../redux/actions";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

function Login() {
  const dispatch = useDispatch();
  const [passwordHide , setPasswordHide] = useState(true);
  const userLogin = useSelector((state) => state.userLogin);

  const auth = useAuth();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "", 
    password: "",
  });

  const navigate = useNavigate();

  const handleErrors = (e) => {

    if (e.target.name === "email") {
      if (e.target.value === "") {
        setError({
          ...error,
          email: "Email Requerido",
        });
      } else if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(e.target.value) === false) {
        setError({
          ...error,
          email: "Email con formato incorrecto",
        });
      } else {
        setError({
          ...error,
          email: "",
        });
      }
    }

    if (e.target.name === "password") {
      if (e.target.value === "") {
        setError({
          ...error,
          password: "Contraseña Requerida",
        });
      } else if (e.target.value.length < 8) {
        setError({
          ...error,
          password: "Contraseña debe tener al menos 8 caracteres",
        });
      } else {
        setError({
          ...error,
          password: "",
        });
      }
    }
  };

  const handleDataUser = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
    handleErrors(e);
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
    

  };

  const showPassword = () => {
    setPasswordHide(!passwordHide);
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
      let message = ''
      if (userLogin === 'Email need confirmation'){
        message = 'Please, confirm your email'
      }else{
        message = 'Please, try again'
      }
      Swal.fire(
        userLogin,
        message,
        "warning"
      ).then(() => {
        dispatch(logoutAction());
      });
    }
  };
  return (
    <div className="border border-white lg:h-fit h-fit bg-white lg:w-1/4 w-2/3 rounded flex flex-col text-black py-2">
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
          className="border border-black w-10/12 mx-auto my-2 rounded lg:p-1 p-2 "
          name="email"
          type="text"
          value={login.email}
          placeholder="Email..."
          onChange={handleDataUser}
        />
        {error.email && ( <p className="text-red-500 text-xs w-10/12 mx-auto">{error.email}</p> )}
        <label className="lg:m-auto ml-9 font-bold text-xl" htmlFor="password">
          Contraseña
        </label>
        <div className="border flex justify-between border-black w-10/12 mx-auto my-2 rounded">
          <input
            className="w-full h-full border-none bg-transparent p-2"    
            name="password"
            type={passwordHide ? "password" : "text"}
            value={login.password}
            placeholder="Contraseña..."
            onChange={handleDataUser}
          />
          {passwordHide ? ( 
            <AiOutlineEye onClick={showPassword} className="text-black m-2 bg-none" />
          ) : (
            <AiOutlineEyeInvisible onClick={showPassword} className="text-black m-2" />
          )}
        </div>
        {error.password && ( <p className="text-red-500 text-xs w-10/12 mx-auto">{error.password}</p> )}
        <button
          className="bg-black font-bold border text-white mx-auto lg:my-1 my-7 lg:p-2 p-3 lg:w-1/2 w-2/3 rounded-lg transition duration:200 hover:border-black hover:bg-blacker disabled:cursor-not-allowed"
          type="submit"
          disabled = {login.email === '' && login.password === '' ? true : false}
        >
          Ingresar
        </button>
      </form>
      <hr className="border-black w-10/12 mx-auto" />
      <button
        onClick={() => navigate("/register")}
        className="bg-yellow font-sans font-bold border border-yellower rounded-lg lg:p-2 p-3 lg:w-1/2 w-2/3 mx-auto text-black transition duration:200 lg:my-5 hover:bg-yellower mt-7 "
      >
        Crear cuenta
      </button>
    </div>
  );
}

export default Login;
