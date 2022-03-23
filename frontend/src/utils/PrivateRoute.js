import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// NOTE: We must use <Navigate>. Error is raised when we use
// navigate("/signin") instead. The same problem was in SignIn and SignUp pages.
const PrivateRoute = () => {
  let { user } = useContext(AuthContext);
  const location = useLocation();

  const navigateToSignIn = () => {
    localStorage.setItem("previousLocation", location.pathname);
    return <Navigate to="/customer/signin" />;
  };

  return !user ? navigateToSignIn() : <Outlet />;
};

export default PrivateRoute;
