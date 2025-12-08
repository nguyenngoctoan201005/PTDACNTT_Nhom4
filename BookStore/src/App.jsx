import "./App.css";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Suspense } from "react";
import { GlobalProvider } from "./GlobalContext";
import { App as AntdApp } from "antd";
import LoadingSpinner from "./components/LoadingSpinner";


import { NV_Bangdieukhien } from './page/nv_page/nv_bangdieukhien/NV_Bangdieukhien.jsx'
import { NV_Quanlydonhang } from './page/nv_page/nv_quanlydonhang/NV_Quanlydonhang.jsx'
import { NV_Huyvatrahang } from './page/nv_page/nv_huyvatrahang/NV_Huyvatrahang.jsx'
import { NV_Baotrisach } from './page/nv_page/nv_baotrisach/NV_Baotrisach.jsx'
import { NV_Quanlydanhgia } from './page/nv_page/nv_quanlydanhgia/NV_Quanlydanhgia.jsx'
import { NV_Chitietdonhang } from './page/nv_page/nv_chitietdonhang/NV_Chitietdonhang.jsx'
import { NV_Thongke } from './page/nv_page/nv_thongke/NV_Thongke.jsx'
import { NV_Chinhsuasach } from './page/nv_page/nv_chinhsuasach/NV_Chinhsuasach.jsx'
import { QTV_Bangdieukhien } from './page/qtv_page/qtv_bangdieukhien/QTV_Bangdieukhien.jsx'
import { QTV_Xemxoasach } from './page/qtv_page/qtv_quanlysach/qtv_xemxoasach/QTV_Xemxoasach.jsx'
import { QTV_Quanlytheloai } from './page/qtv_page/qtv_quanlytheloai/QTV_Quanlytheloai.jsx'
import { QTV_KhachHang } from './page/qtv_page/qtv_khachhang/QTV_KhachHang.jsx'
import { QTV_Quanlynhanvien } from './page/qtv_page/qtv_quanlynhanvien/QTV_Quanlynhanvien.jsx'
import { QTV_Quanlykhuyenmai } from './page/qtv_page/qtv_quanlykhuyenmai/QTV_Quanlykhuyenmai.jsx'
import { QTV_Lichsuchinhsua } from './page/qtv_page/qtv_lichsuchinhsua/QTV_Lichsuchinhsua.jsx'
import { QTV_Themsachmoi } from './page/qtv_page/qtv_quanlysach/qtv_themsachmoi/QTV_Themsachmoi.jsx'

function App() {
  return (
    <AntdApp>
      <GlobalProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element}>
                {route.children &&
                  route.children.map((child, childIndex) => (
                    <Route
                      key={childIndex}
                      index={child.index}
                      path={child.path}
                      element={child.element}
                    >
                      {child.children &&
                        child.children.map((childI, childIndexI) => (
                          <Route
                            key={childIndexI}
                            index={childI.index}
                            path={childI.path}
                            element={childI.element}
                          />
                        ))}
                    </Route>
                  ))}
              </Route>
            ))}

            <Route path="/bangdieukhien" element={<NV_Bangdieukhien />}></Route>
            <Route path="/quanlydonhang" element={<NV_Quanlydonhang />}></Route>
            <Route path="/huyvatrahang" element={<NV_Huyvatrahang />}></Route>
            <Route path="/baotrisach" element={<NV_Baotrisach />}></Route>
            <Route path="/quanlydanhgia" element={<NV_Quanlydanhgia />}></Route>
            <Route path="/thongke" element={<NV_Thongke />}></Route>
            <Route path="/chinhsuasach" element={<NV_Chinhsuasach />}></Route>
            <Route path="/chitietdonhang" element={<NV_Chitietdonhang />}></Route>
            <Route path="/qtvbangdieukhien" element={<QTV_Bangdieukhien />}></Route>
            <Route path="/qtvquanlysach" element={<QTV_Xemxoasach />}></Route>
            <Route path="/qtvthemsachmoi" element={<QTV_Themsachmoi />}></Route>
            <Route path="/qtvkhachhang" element={<QTV_KhachHang />}></Route>
            <Route path="/qtvquanlynhanvien" element={<QTV_Quanlynhanvien />}></Route>
            <Route path="/qtvquanlytheloai" element={<QTV_Quanlytheloai />}></Route>
            <Route path="/qtvquanlykhuyenmai" element={<QTV_Quanlykhuyenmai />}></Route>
            <Route path="/qtvlichsuchinhsua" element={<QTV_Lichsuchinhsua />}></Route>
          </Routes>
        </Suspense>
      </GlobalProvider>
    </AntdApp>
  );
}

export default App;
