import { lazy } from "react";

const Home = lazy(() => import("../../views/Customers/Home/Home"));
const BookDetail = lazy(() =>
  import("../../views/Customers/BookDetail/BookDetail")
);
const Books = lazy(() => import("../../views/Customers/Books/Books"));
const Cart = lazy(() => import("../../views/Customers/Cart/Cart"));
const Favorite = lazy(() => import("../../views/Customers/Favorite/Favorite"));
const Order = lazy(() => import("../../views/Customers/Order/Order"));
const About = lazy(() => import("../../views/Customers/About/About"));
const Checkout = lazy(() => import("../../views/Customers/Checkout/Checkout"));

export const customerRoutes = [
  {
    path: "cart",
    element: <Cart />,
    title: "Giỏ hàng - Bookstore",
  },
  {
    path: "favorite",
    element: <Favorite />,
    title: "Sách yêu thích - Bookstore",
  },
  {
    path: "order-list",
    element: <Order />,
    title: "Đơn hàng của tôi - Bookstore",
  },
  {
    path: "checkout",
    element: <Checkout />,
    title: "Thanh toán - Bookstore",
  },
];
