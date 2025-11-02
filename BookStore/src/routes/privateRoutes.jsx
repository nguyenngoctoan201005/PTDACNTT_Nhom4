import AuthLayout from "../layout/AuthLayout/AuthLayout";
import CustomerLayout from "../layout/CustomerLayout/CustomerLayout";
import { customerRoutes } from "./modules/customers";
import { Navigate } from "react-router-dom";
import { profileRoutes } from "./modules/profile";
import ProfileLayout from "../layout/ProfileLayout/ProfileLayout";

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
];
