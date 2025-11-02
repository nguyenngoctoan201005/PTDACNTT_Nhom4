import { Navigate } from "react-router-dom";
import { lazy } from "react";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
import CustomerLayout from "../layout/CustomerLayout/CustomerLayout";

const Home = lazy(() => import("../views/Customers/Home/Home"));
const Books = lazy(() => import("../views/Customers/Books/Books"));
const BookDetail = lazy(() =>
  import("../views/Customers/BookDetail/BookDetail")
);
const About = lazy(() => import("../views/Customers/About/About"));
const Login = lazy(() => import("../views/Auth/Login/Login"));
const Register = lazy(() => import("../views/Auth/Register/Register"));
const NotFound = lazy(() => import("../components/NotFound"));

export const publicRoutes = [
  {
    path: "/",
    element: <CustomerLayout type={1} />,
    children: [
      { index: true, element: <Navigate to="home" replace /> },
      { path: "home", element: <Home /> },
      { path: "books", element: <Books /> },
      { path: "books/:bookId", element: <BookDetail /> },
      { path: "about", element: <About /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
];
