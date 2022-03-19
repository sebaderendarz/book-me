import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// NOTE: We must use <Navigate>. Error is raised when we use
// navigate("/login") instead. The same problem was in Login and SignUp pages.
const PrivateRoute = () => {
  let { user } = useContext(AuthContext);
  return !user ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoute;
