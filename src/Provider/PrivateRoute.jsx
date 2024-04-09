import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  //   if (loading) return <progress className="
  //   progress w-56"></progress>;
  if (localStorage.getItem("accessToken")) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
