import React from "react";
const AuthContext = React.createContext();
import { Navigate } from "react-router-dom";
function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const login = ({ username }) => {
    setUser({ username, rol: "Admin" });
  };
  const logout = () => {
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
  if (!auth.user) return <Navigate to="/login" />;
  return props.children;
}
function NotAuthRoute(props) {
  const auth = useAuth();
  if (auth.user) return <Navigate to="/home" />;
  return props.children;
}
export { AuthRoute, NotAuthRoute, AuthProvider, useAuth };
