import AuthLayout from "../layout/AuthLayout/AuthLayout";
import CustomerLayout from "../layout/CustomerLayout/CustomerLayout";
import { customerRoutes } from "./modules/customers";
import { Navigate, Outlet } from "react-router-dom";
import { profileRoutes } from "./modules/profile";
import ProfileLayout from "../layout/ProfileLayout/ProfileLayout";
import { adminRoutes } from "./modules/admin";

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
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <Navigate to="qtvbangdieukhien" replace /> },
      ...adminRoutes,
    ],
  },
];
