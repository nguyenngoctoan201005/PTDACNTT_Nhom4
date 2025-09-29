import CustomerLayout from "../layout/CustomerLayout";
import { customerRoutes } from "./modules/customers";
import { Navigate } from "react-router-dom";

export const privateRoutes = [
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      { index: true, element: <Navigate to="home" replace /> },
      ...customerRoutes,
    ],
  },
];
