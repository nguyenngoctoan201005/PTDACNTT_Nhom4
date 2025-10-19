import { Navigate } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
import { lazy } from "react";

const Login = lazy(() => import("../views/Auth/Login/Login"));
const Register = lazy(() => import("../views/Auth/Register/Register"));

export const publicRoutes = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="home" replace /> },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];
