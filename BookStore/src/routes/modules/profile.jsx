import { lazy } from "react";

const Info = lazy(() => import("../../views/Profile/Info/Info"));
const UpdateProfile = lazy(() =>
  import("../../views/Profile/UpdateProfile/UpdateProfile")
);
const ChangePassword = lazy(() =>
  import("../../views/Profile/ChangePassword/ChangePassword")
);

export const profileRoutes = [
  {
    path: "info",
    element: <Info />,
  },
  {
    path: "update",
    element: <UpdateProfile />,
  },
  {
    path: "change-password",
    element: <ChangePassword />,
  },
];
