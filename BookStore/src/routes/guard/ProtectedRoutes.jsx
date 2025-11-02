import { Navigate, Outlet } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";
import { Spin } from "antd";
import RequireLoginPage from "../../components/RequireLoginPage/RequireLoginPage";

const ProtectedRoute = () => {
  const { token, isLoading } = useGlobalContext();

  if (isLoading) return <Spin />;

  if (!token) {
    return <RequireLoginPage />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
