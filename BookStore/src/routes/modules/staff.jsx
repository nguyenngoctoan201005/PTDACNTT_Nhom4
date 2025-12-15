import { lazy } from "react";

const NV_Bangdieukhien = lazy(() =>
  import("../../page/nv_page/nv_bangdieukhien/NV_Bangdieukhien.jsx")
);
const NV_Quanlydonhang = lazy(() =>
  import("../../page/nv_page/nv_quanlydonhang/NV_Quanlydonhang.jsx")
);
const NV_Huyvatrahang = lazy(() =>
  import("../../page/nv_page/nv_huyvatrahang/NV_Huyvatrahang.jsx")
);
const NV_Baotrisach = lazy(() =>
  import("../../page/nv_page/nv_baotrisach/NV_Baotrisach.jsx")
);
const NV_Quanlydanhgia = lazy(() =>
  import("../../page/nv_page/nv_quanlydanhgia/NV_Quanlydanhgia.jsx")
);
const NV_Chitietdonhang = lazy(() =>
  import("../../page/nv_page/nv_chitietdonhang/NV_Chitietdonhang.jsx")
);
const NV_Thongke = lazy(() =>
  import("../../page/nv_page/nv_thongke/NV_Thongke.jsx")
);
const NV_Chinhsuasach = lazy(() =>
  import("../../page/nv_page/nv_chinhsuasach/NV_Chinhsuasach.jsx")
);

export const staffRoutes = [
  {
    path: "bangdieukhien",
    element: <NV_Bangdieukhien />,
    title: "Bảng điều khiển - Nhân viên",
  },
  {
    path: "quanlydonhang",
    element: <NV_Quanlydonhang />,
    title: "Quản lý đơn hàng - Nhân viên",
  },
  {
    path: "huyvatrahang",
    element: <NV_Huyvatrahang />,
    title: "Hủy và trả hàng - Nhân viên",
  },
  {
    path: "baotrisach",
    element: <NV_Baotrisach />,
    title: "Bảo trì sách - Nhân viên",
  },
  {
    path: "quanlydanhgia",
    element: <NV_Quanlydanhgia />,
    title: "Quản lý đánh giá - Nhân viên",
  },
  {
    path: "chitietdonhang",
    element: <NV_Chitietdonhang />,
    title: "Chi tiết đơn hàng - Nhân viên",
  },
  {
    path: "thongke",
    element: <NV_Thongke />,
    title: "Thống kê - Nhân viên",
  },
  {
    path: "chinhsuasach",
    element: <NV_Chinhsuasach />,
    title: "Chỉnh sửa sách - Nhân viên",
  },
];
