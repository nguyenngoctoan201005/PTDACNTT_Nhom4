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
    title: "Thông tin cá nhân - Readify",
  },
  {
    path: "update",
    element: <UpdateProfile />,
    title: "Cập nhật hồ sơ - Readify",
  },
  {
    path: "change-password",
    element: <ChangePassword />,
    title: "Đổi mật khẩu - Readify",
  },
];
