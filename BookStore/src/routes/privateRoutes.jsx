import AuthLayout from "../layout/AuthLayout/AuthLayout";
import CustomerLayout from "../layout/CustomerLayout/CustomerLayout";
import { customerRoutes } from "./modules/customers";
import { Navigate, Outlet } from "react-router-dom";
import { profileRoutes } from "./modules/profile";
import ProfileLayout from "../layout/ProfileLayout/ProfileLayout";
import { adminRoutes } from "./modules/admin";
import { staffRoutes } from "./modules/staff";
import ProtectedRoute from "./guard/ProtectedRoutes";

export const privateRoutes = [
  {
    path: "/",
    element: <CustomerLayout type={2} />,
    children: [...customerRoutes],
  },
  {
    path: "profile",
    element: <ProfileLayout />,
    children: [
      { index: true, element: <Navigate to="info" replace /> },
      ...profileRoutes,
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
    children: [
      { index: true, element: <Navigate to="qtvbangdieukhien" replace /> },
      ...adminRoutes,
    ],
  },
  {
    path: "/nhanvien",
    element: <ProtectedRoute allowedRoles={["STAFF"]} />,
    children: [
      { index: true, element: <Navigate to="bangdieukhien" replace /> },
      ...staffRoutes,
    ],
  },
];
