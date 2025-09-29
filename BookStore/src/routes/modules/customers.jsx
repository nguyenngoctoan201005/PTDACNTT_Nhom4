import { lazy } from "react";

const Home = lazy(() => import("../../views/Customers/Home/Home"));
export const customerRoutes = [
  {
    path: "home",
    element: <Home />,
  },
];
