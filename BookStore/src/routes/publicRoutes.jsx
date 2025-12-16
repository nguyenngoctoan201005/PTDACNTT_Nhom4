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
      { path: "home", element: <Home />, title: "Trang chủ - Bookstore" },
      { path: "books", element: <Books />, title: "Tất cả sách - Bookstore" },
      {
        path: "books/:bookId",
        element: <BookDetail />,
        title: "Chi tiết sách - Bookstore",
      },
      { path: "about", element: <About />, title: "Về chúng tôi - Bookstore" },
      { path: "*", element: <NotFound />, title: "404 - Không tìm thấy trang" },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login />, title: "Đăng nhập - Bookstore" },
      { path: "register", element: <Register />, title: "Đăng ký - Bookstore" },
    ],
  },
];
