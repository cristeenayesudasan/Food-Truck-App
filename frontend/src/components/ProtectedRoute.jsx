import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  return sessionStorage.getItem("token") ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
