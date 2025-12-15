import { lazy } from "react";

const QTV_Bangdieukhien = lazy(() =>
  import("../../page/qtv_page/qtv_bangdieukhien/QTV_Bangdieukhien.jsx")
);
const QTV_Xemxoasach = lazy(() =>
  import("../../page/qtv_page/qtv_quanlysach/qtv_xemxoasach/QTV_Xemxoasach.jsx")
);
const QTV_Quanlytheloai = lazy(() =>
  import("../../page/qtv_page/qtv_quanlytheloai/QTV_Quanlytheloai.jsx")
);
const QTV_KhachHang = lazy(() =>
  import("../../page/qtv_page/qtv_khachhang/QTV_KhachHang.jsx")
);
const QTV_Quanlynhanvien = lazy(() =>
  import("../../page/qtv_page/qtv_quanlynhanvien/QTV_Quanlynhanvien.jsx")
);
const QTV_Quanlykhuyenmai = lazy(() =>
  import("../../page/qtv_page/qtv_quanlykhuyenmai/QTV_Quanlykhuyenmai.jsx")
);
const QTV_Lichsuchinhsua = lazy(() =>
  import("../../page/qtv_page/qtv_lichsuchinhsua/QTV_Lichsuchinhsua.jsx")
);
const QTV_Themsachmoi = lazy(() =>
  import(
    "../../page/qtv_page/qtv_quanlysach/qtv_themsachmoi/QTV_Themsachmoi.jsx"
  )
);

export const adminRoutes = [
  {
    path: "qtvbangdieukhien",
    element: <QTV_Bangdieukhien />,
    title: "Bảng điều khiển - Quản trị viên",
  },
  {
    path: "qtvquanlysach",
    element: <QTV_Xemxoasach />,
    title: "Quản lý sách - Quản trị viên",
  },
  {
    path: "qtvquanlytheloai",
    element: <QTV_Quanlytheloai />,
    title: "Quản lý thể loại - Quản trị viên",
  },
  {
    path: "qtvkhachhang",
    element: <QTV_KhachHang />,
    title: "Quản lý khách hàng - Quản trị viên",
  },
  {
    path: "qtvquanlynhanvien",
    element: <QTV_Quanlynhanvien />,
    title: "Quản lý nhân viên - Quản trị viên",
  },
  {
    path: "qtvquanlykhuyenmai",
    element: <QTV_Quanlykhuyenmai />,
    title: "Quản lý khuyến mãi - Quản trị viên",
  },
  {
    path: "qtvlichsuchinhsua",
    element: <QTV_Lichsuchinhsua />,
    title: "Lịch sử chỉnh sửa - Quản trị viên",
  },
  {
    path: "qtvthemsachmoi",
    element: <QTV_Themsachmoi />,
    title: "Thêm sách mới - Quản trị viên",
  },
];
