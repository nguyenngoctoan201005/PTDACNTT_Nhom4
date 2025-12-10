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
  },
  {
    path: "qtvquanlysach",
    element: <QTV_Xemxoasach />,
  },
  {
    path: "qtvquanlytheloai",
    element: <QTV_Quanlytheloai />,
  },
  {
    path: "qtvkhachhang",
    element: <QTV_KhachHang />,
  },
  {
    path: "qtvquanlynhanvien",
    element: <QTV_Quanlynhanvien />,
  },
  {
    path: "qtvquanlykhuyenmai",
    element: <QTV_Quanlykhuyenmai />,
  },
  {
    path: "qtvlichsuchinhsua",
    element: <QTV_Lichsuchinhsua />,
  },
  {
    path: "qtvthemsachmoi",
    element: <QTV_Themsachmoi />,
  },
];
