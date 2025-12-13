import { Navigate, Outlet } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";
import { Spin } from "antd";
import RequireLoginPage from "../../components/RequireLoginPage/RequireLoginPage";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { token, roles, isLoading } = useGlobalContext();

  if (isLoading) return <Spin />;

  if (!token) {
    return <RequireLoginPage />;
  }

  if (allowedRoles.length > 0) {
    // If user has no roles or doesn't match the required roles
    if (!roles || !allowedRoles.some((role) => roles.includes(role))) {
      console.log("roles", roles);
      console.log("allowedRoles", allowedRoles);
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
