import "./QTV_Quanlykhuyenmai.css";
import { QTV_Nav } from "../../../nav/QTV_Nav";
import { useState } from "react";
export default function QTV_Quanlykhuyenmai() {
  const [themKhuyenmai, setThemKhuyenmai] = useState(false);
  const [suaKhuyenmai, setSuaKhuyenmai] = useState(false);
  return (
    <>
      <QTV_Nav />
      <main className="qtv_qlkhuyenmai_main">
        <div className="qtv_qlkhuyenmai_tieude">
          <div className="qtv_qlkhuyenmai_tieude_tt">Quản Lý Khuyến Mãi</div>
          <div
            onClick={() => setThemKhuyenmai(true)}
            className="qtv_qlkhuyenmai_tieude_btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="200"
              viewBox="0 0 24 24"
            >
              <path
                fill=""
                d="M21 5H3a1 1 0 0 0-1 1v4h.893c.996 0 1.92.681 2.08 1.664A2.001 2.001 0 0 1 3 14H2v4a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-4h-1a2.001 2.001 0 0 1-1.973-2.336c.16-.983 1.084-1.664 2.08-1.664H22V6a1 1 0 0 0-1-1zM9 9a1 1 0 1 1 0 2a1 1 0 1 1 0-2zm-.8 6.4l6-8l1.6 1.2l-6 8l-1.6-1.2zM15 15a1 1 0 1 1 0-2a1 1 0 1 1 0 2z"
              />
            </svg>
            +Thêm khuyến mãi
          </div>
        </div>

        <div className="qtv_qlkhuyenmai_noidung">
          <table className="qtv_qlkhuyenmai_table">
            <tr className="qtv_qlkhuyenmai_table_tr">
              <th className="qtv_qlnv_th qtv_qlkhuyenmai_table_th1">
                MÃ GIẢM GIÁ
              </th>
              <th className="qtv_qlnv_th qtv_qlkhuyenmai_table_th2">MÔ TẢ</th>
              <th className="qtv_qlnv_th qtv_qlkhuyenmai_table_th3">
                HẠN SỬ DỤNG
              </th>
              <th className="qtv_qlnv_th qtv_qlkhuyenmai_table_th4">
                CHIẾT KHẤU(%)
              </th>
              <th className="qtv_qlnv_th qtv_qlkhuyenmai_table_th5">
                THAO TÁC
              </th>
            </tr>

            <tr className="qtv_qlkhuyenmai_table_tr">
              <td className="qtv_qlnv_td qtv_qlkhuyenmai_table_td1">
                KHACHHANGMOI
              </td>
              <td className="qtv_qlnv_td qtv_qlkhuyenmai_table_td2">
                00120000334
              </td>
              <td className="qtv_qlnv_td qtv_qlkhuyenmai_table_td3">
                20/9/2025
              </td>
              <td className="qtv_qlnv_td qtv_qlkhuyenmai_table_td4">20</td>
              <td className="qtv_qlnv_td qtv_qlkhuyenmai_table_td5">
                <svg
                  onClick={() => setSuaKhuyenmai(true)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="200"
                  height="200"
                  viewBox="0 0 1025 1023"
                >
                  <path
                    fill="#004cff"
                    d="M896.428 1023h-768q-53 0-90.5-37.5T.428 895V127q0-53 37.5-90t90.5-37h576l-128 127h-384q-27 0-45.5 19t-18.5 45v640q0 27 19 45.5t45 18.5h640q27 0 45.5-18.5t18.5-45.5V447l128-128v576q0 53-37.5 90.5t-90.5 37.5zm-576-464l144 144l-208 64zm208 96l-160-159l479-480q17-16 40.5-16t40.5 16l79 80q16 16 16.5 39.5t-16.5 40.5z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="200"
                  height="200"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="#ff0000"
                    fill-rule="evenodd"
                    d="M5.75 3V1.5h4.5V3h-4.5Zm-1.5 0V1a1 1 0 0 1 1-1h5.5a1 1 0 0 1 1 1v2h2.5a.75.75 0 0 1 0 1.5h-.365l-.743 9.653A2 2 0 0 1 11.148 16H4.852a2 2 0 0 1-1.994-1.847L2.115 4.5H1.75a.75.75 0 0 1 0-1.5h2.5Zm-.63 1.5h8.76l-.734 9.538a.5.5 0 0 1-.498.462H4.852a.5.5 0 0 1-.498-.462L3.62 4.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </td>
            </tr>
          </table>
        </div>

        {themKhuyenmai && (
          <div className="qtv_qlkhuyenmai_themkhuyenmai">
            <div className="qtv_qlkhuyenmai_themkhuyenmai_tieude">
              Thêm khuyến mãi mới{" "}
            </div>
            <div className="qtv_qlkhuyenmai_themkhuyenmai_noidung">
              <div className="qtv_qlkhuyenmai_themkhuyenmai_nhapdl">
                <div className="qtv_qlkhuyenmai_themkhuyenmai_nhapdl_nhan">
                  Mã giảm giá
                </div>
                <input type="text" placeholder="Nhập dữ liệu" />
              </div>
            </div>

            <div className="qtv_qlkhuyenmai_themkhuyenmai_noidung">
              <div className="qtv_qlkhuyenmai_themkhuyenmai_nhapdl">
                <div className="qtv_qlkhuyenmai_themkhuyenmai_nhapdl_nhan">
                  Ngày bắt đầu
                </div>
                <input type="date" placeholder="Nhập dữ liệu" />
              </div>
            </div>

            <div className="qtv_qlkhuyenmai_themkhuyenmai_noidung">
              <div className="qtv_qlkhuyenmai_themkhuyenmai_nhapdl">
                <div className="qtv_qlkhuyenmai_themkhuyenmai_nhapdl_nhan">
                  Ngày kết thúc
                </div>
                <input type="date" placeholder="Nhập dữ liệu" />
              </div>
            </div>

            <div className="qtv_qlkhuyenmai_themkhuyenmai_noidung">
              <div className="qtv_qlkhuyenmai_themkhuyenmai_nhapdl">
                <div className="qtv_qlkhuyenmai_themkhuyenmai_nhapdl_nhan">
                  Chiếu khấu(%)
                </div>
                <input type="text" placeholder="Nhập dữ liệu" />
              </div>
            </div>

            <div className="qtv_qlkhuyenmai_themkhuyenmai_noidung">
              <div className="qtv_qlkhuyenmai_themkhuyenmai_nhapdl">
                <div className="qtv_qlkhuyenmai_themkhuyenmai_nhapdl_nhan">
                  Mô tả
                </div>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  cols="130"
                ></textarea>
              </div>
            </div>

            <div className="qtv_qlkhuyenmai_themkhuyenmai_button">
              <div className="qtv_qlkhuyenmai_themkhuyenmai_button_nhan1">
                Thêm mã giảm giá
              </div>
              <div
                onClick={() => setThemKhuyenmai(false)}
                className="qtv_qlkhuyenmai_themkhuyenmai_button_nhan2"
              >
                Hủy bỏ
              </div>
            </div>
          </div>
        )}

        {suaKhuyenmai && (
          <div className="qtv_qlkhuyenmai_suakm">
            <div className="qtv_qlkhuyenmai_suakm_tieude">
              Sửa thông tin giảm giá
            </div>
            <div className="qtv_qlkhuyenmai_themkhuyenmai_noidung">
              <div className="qtv_qlkhuyenmai_themkhuyenmai_nhapdl">
                <div className="qtv_qlkhuyenmai_themkhuyenmai_nhapdl_nhan">
                  Mã giảm giá
                </div>
                <input type="text" placeholder="Nhập dữ liệu" />
              </div>
            </div>

            <div className="qtv_qlkhuyenmai_themkhuyenmai_noidung">
              <div className="qtv_qlkhuyenmai_themkhuyenmai_nhapdl">
                <div className="qtv_qlkhuyenmai_themkhuyenmai_nhapdl_nhan">
                  Ngày bắt đầu
                </div>
                <input type="date" placeholder="Nhập dữ liệu" />
              </div>
            </div>

            <div className="qtv_qlkhuyenmai_themkhuyenmai_noidung">
              <div className="qtv_qlkhuyenmai_themkhuyenmai_nhapdl">
                <div className="qtv_qlkhuyenmai_themkhuyenmai_nhapdl_nhan">
                  Ngày kết thúc
                </div>
                <input type="date" placeholder="Nhập dữ liệu" />
              </div>
            </div>

            <div className="qtv_qlkhuyenmai_themkhuyenmai_noidung">
              <div className="qtv_qlkhuyenmai_themkhuyenmai_nhapdl">
                <div className="qtv_qlkhuyenmai_themkhuyenmai_nhapdl_nhan">
                  Chiếu khấu(%)
                </div>
                <input type="text" placeholder="Nhập dữ liệu" />
              </div>
            </div>

            <div className="qtv_qlkhuyenmai_themkhuyenmai_noidung">
              <div className="qtv_qlkhuyenmai_themkhuyenmai_nhapdl">
                <div className="qtv_qlkhuyenmai_themkhuyenmai_nhapdl_nhan">
                  Mô tả
                </div>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  cols="130"
                ></textarea>
              </div>
            </div>

            <div className="qtv_qlkhuyenmai_suakm_button">
              <div className="qtv_qlkhuyenmai_suakm_button_nhan1">
                Lưu thông tin
              </div>
              <div
                onClick={() => setSuaKhuyenmai(false)}
                className="qtv_qlkhuyenmai_suakm_button_nhan2"
              >
                Hủy bỏ
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
