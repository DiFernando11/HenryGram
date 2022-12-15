import React from "react";
import { useDispatch, useSelector } from "react-redux";
const AuthContext = React.createContext();
import { Navigate } from "react-router-dom";
import { logoutAction, verifyUserAction } from "../../redux/actions";
const getData = () => {
  return localStorage.getItem("sessionStarted");
};
function AuthProvider({ children }) {
  const [user, setUser] = React.useState(getData());
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const login = () => {
    localStorage.setItem("sessionStarted", userLogin.token);
    dispatch(verifyUserAction(userLogin.token));
    setUser(true);
  };
  const logout = () => {
    localStorage.removeItem("sessionStarted");
    dispatch(logoutAction());
    setUser(null);
  };
  const auth = { user, login, logout };
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
function useAuth() {
  const auth = React.useContext(AuthContext);
  return auth;
}
function AuthRoute(props) {
  const auth = useAuth();
  if (!auth.user) return <Navigate to="/" />;
  return props.children;
}
function NotAuthRoute(props) {
  const auth = useAuth();
  if (auth.user) return <Navigate to="/home" />;
  return props.children;
}
export { AuthRoute, NotAuthRoute, AuthProvider, useAuth };
