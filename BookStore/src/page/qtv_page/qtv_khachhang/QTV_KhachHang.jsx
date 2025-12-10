import "./QTV_KhachHang.css";
import { QTV_Nav } from "../../../nav/QTV_Nav";
import { useState } from "react";
export default function QTV_KhachHang() {
  const [suaKhachhang, setSuaKhachhang] = useState(false);
  return (
    <>
      <QTV_Nav />
      <main className="qtv_khachhang_main">
        <div className="qtv_khachhang_tieude">Khách hàng</div>

        <div className="qtv_khachhang_search">
          <input type="text" name="" id="" placeholder="Search..." />
          <div>
            <select name="" id="">
              <option value="">Tất cả</option>
              <option value="">Tổng chi tiêu</option>
              <option value="">Số lượng đơn</option>
            </select>

            <select name="" id="">
              <option value="">Tất cả</option>
              <option value="">Cao đến thấp</option>
              <option value="">Thấp đến cao</option>
            </select>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 26 26"
          >
            <path
              fill="#4f4f4f"
              d="M10 .188A9.812 9.812 0 0 0 .187 10A9.812 9.812 0 0 0 10 19.813c2.29 0 4.393-.811 6.063-2.125l.875.875a1.845 1.845 0 0 0 .343 2.156l4.594 4.625c.713.714 1.88.714 2.594 0l.875-.875a1.84 1.84 0 0 0 0-2.594l-4.625-4.594a1.824 1.824 0 0 0-2.157-.312l-.875-.875A9.812 9.812 0 0 0 10 .188zM10 2a8 8 0 1 1 0 16a8 8 0 0 1 0-16zM4.937 7.469a5.446 5.446 0 0 0-.812 2.875a5.46 5.46 0 0 0 5.469 5.469a5.516 5.516 0 0 0 3.156-1a7.166 7.166 0 0 1-.75.03a7.045 7.045 0 0 1-7.063-7.062c0-.104-.005-.208 0-.312z"
            />
          </svg>
        </div>

        <div className="qtv_khachhang_noidung">
          <table className="qtv_khachhang_noidung_table">
            <tr className="qtv_khachhang_noidung_table_tr">
              <th className="qtv_kh_th qtv_khachhang_noidung_table_th1">STT</th>
              <th className="qtv_kh_th qtv_khachhang_noidung_table_th2">
                KHÁCH HÀNG
              </th>
              <th className="qtv_kh_th qtv_khachhang_noidung_table_th3">
                EMAIL
              </th>
              <th className="qtv_kh_th qtv_khachhang_noidung_table_th4">
                SL ĐƠN
              </th>
              <th className="qtv_kh_th qtv_khachhang_noidung_table_th5">
                TỔNG CHI TIÊU
              </th>
              <th className="qtv_kh_th qtv_khachhang_noidung_table_th6">
                THAO TÁC
              </th>
            </tr>

            <tr className="qtv_khachhang_noidung_table_tr">
              <td className="qtv_kh_td qtv_khachhang_noidung_table_td1">1</td>
              <td className="qtv_kh_td qtv_khachhang_noidung_table_td2">
                Nguyễn Văn A
              </td>
              <td className="qtv_kh_td qtv_khachhang_noidung_table_td3">
                nguyenvana@gmail.com
              </td>
              <td className="qtv_kh_td qtv_khachhang_noidung_table_td4">1</td>
              <td className="qtv_kh_td qtv_khachhang_noidung_table_td5">
                1.000.000đ
              </td>
              <td className="qtv_kh_td qtv_khachhang_noidung_table_td6">
                <svg
                  onClick={() => setSuaKhachhang(true)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="200"
                  height="200"
                  viewBox="0 0 432 432"
                >
                  <path
                    fill="blue"
                    d="M213.5 3q88.5 0 151 62.5T427 216t-62.5 150.5t-151 62.5t-151-62.5T0 216T62.5 65.5T213.5 3zm0 64Q187 67 168 85.5t-19 45t19 45.5t45.5 19t45-19t18.5-45.5t-18.5-45t-45-18.5zm0 303q39.5 0 73-18.5T341 301q0-20-23.5-35.5t-52-23t-52-7.5t-52 7.5t-52 23T85 301q21 32 55 50.5t73.5 18.5z"
                  />
                </svg>
              </td>
            </tr>

            <tr className="qtv_khachhang_noidung_table_tr">
              <td className="qtv_kh_td qtv_khachhang_noidung_table_td1">1</td>
              <td className="qtv_kh_td qtv_khachhang_noidung_table_td2">
                Nguyễn Văn A
              </td>
              <td className="qtv_kh_td qtv_khachhang_noidung_table_td3">
                nguyenvana@gmail.com
              </td>
              <td className="qtv_kh_td qtv_khachhang_noidung_table_td4">1</td>
              <td className="qtv_kh_td qtv_khachhang_noidung_table_td5">
                1.000.000đ
              </td>
              <td className="qtv_kh_td qtv_khachhang_noidung_table_td6">
                <svg
                  onClick={() => setSuaKhachhang(true)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="200"
                  height="200"
                  viewBox="0 0 432 432"
                >
                  <path
                    fill="blue"
                    d="M213.5 3q88.5 0 151 62.5T427 216t-62.5 150.5t-151 62.5t-151-62.5T0 216T62.5 65.5T213.5 3zm0 64Q187 67 168 85.5t-19 45t19 45.5t45.5 19t45-19t18.5-45.5t-18.5-45t-45-18.5zm0 303q39.5 0 73-18.5T341 301q0-20-23.5-35.5t-52-23t-52-7.5t-52 7.5t-52 23T85 301q21 32 55 50.5t73.5 18.5z"
                  />
                </svg>
              </td>
            </tr>

            <tr className="qtv_khachhang_noidung_table_tr">
              <td className="qtv_kh_td qtv_khachhang_noidung_table_td1">1</td>
              <td className="qtv_kh_td qtv_khachhang_noidung_table_td2">
                Nguyễn Văn A
              </td>
              <td className="qtv_kh_td qtv_khachhang_noidung_table_td3">
                nguyenvana@gmail.com
              </td>
              <td className="qtv_kh_td qtv_khachhang_noidung_table_td4">1</td>
              <td className="qtv_kh_td qtv_khachhang_noidung_table_td5">
                1.000.000đ
              </td>
              <td className="qtv_kh_td qtv_khachhang_noidung_table_td6">
                <svg
                  onClick={() => setSuaKhachhang(true)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="200"
                  height="200"
                  viewBox="0 0 432 432"
                >
                  <path
                    fill="blue"
                    d="M213.5 3q88.5 0 151 62.5T427 216t-62.5 150.5t-151 62.5t-151-62.5T0 216T62.5 65.5T213.5 3zm0 64Q187 67 168 85.5t-19 45t19 45.5t45.5 19t45-19t18.5-45.5t-18.5-45t-45-18.5zm0 303q39.5 0 73-18.5T341 301q0-20-23.5-35.5t-52-23t-52-7.5t-52 7.5t-52 23T85 301q21 32 55 50.5t73.5 18.5z"
                  />
                </svg>
              </td>
            </tr>

            <tr className="qtv_khachhang_noidung_table_tr">
              <td className="qtv_kh_td qtv_khachhang_noidung_table_td1">1</td>
              <td className="qtv_kh_td qtv_khachhang_noidung_table_td2">
                Nguyễn Văn A
              </td>
              <td className="qtv_kh_td qtv_khachhang_noidung_table_td3">
                nguyenvana@gmail.com
              </td>
              <td className="qtv_kh_td qtv_khachhang_noidung_table_td4">1</td>
              <td className="qtv_kh_td qtv_khachhang_noidung_table_td5">
                1.000.000đ
              </td>
              <td className="qtv_kh_td qtv_khachhang_noidung_table_td6">
                <svg
                  onClick={() => setSuaKhachhang(true)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="200"
                  height="200"
                  viewBox="0 0 432 432"
                >
                  <path
                    fill="blue"
                    d="M213.5 3q88.5 0 151 62.5T427 216t-62.5 150.5t-151 62.5t-151-62.5T0 216T62.5 65.5T213.5 3zm0 64Q187 67 168 85.5t-19 45t19 45.5t45.5 19t45-19t18.5-45.5t-18.5-45t-45-18.5zm0 303q39.5 0 73-18.5T341 301q0-20-23.5-35.5t-52-23t-52-7.5t-52 7.5t-52 23T85 301q21 32 55 50.5t73.5 18.5z"
                  />
                </svg>
              </td>
            </tr>
          </table>
        </div>

        {suaKhachhang && (
          <div className="qtv_khachhang_xemchitiet">
            <div className="qtv_khachhang_xemchitiet_tieude">
              Chi tiết khách hàng
              <svg
                onClick={() => setSuaKhachhang(false)}
                width="200"
                height="200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
              >
                <path
                  fill="#000000"
                  d="m4.818 4.111l-.707.707a.5.5 0 0 0 0 .707L6.586 8L4.11 10.475a.5.5 0 0 0 0 .707l.707.707a.5.5 0 0 0 .707 0L8 9.414l2.475 2.475a.5.5 0 0 0 .707 0l.707-.707a.5.5 0 0 0 0-.707L9.414 8l2.475-2.475a.5.5 0 0 0 0-.707l-.707-.707a.5.5 0 0 0-.707 0L8 6.586L5.525 4.11a.5.5 0 0 0-.707 0"
                />
              </svg>
            </div>

            <div className="qtv_khachhang_xemchitiet_noidung">
              <div className="qtv_kh_xct_thongtin">
                <span className="qtv_xct_nhan qtv_khachhang_xemchitiet_noidung_nhanten">
                  Mã Khách hàng :{" "}
                </span>{" "}
                <span className="qtv_xct_giatri qtv_khachhang_xemchitiet_noidung_ten">
                  KH001
                </span>
              </div>
              <div className="qtv_kh_xct_thongtin">
                <span className="qtv_xct_nhan qtv_khachhang_xemchitiet_noidung_nhanten">
                  Tên :{" "}
                </span>{" "}
                <span className="qtv_xct_giatri qtv_khachhang_xemchitiet_noidung_ten">
                  Nguyễn Văn A
                </span>
              </div>
              <div className="qtv_kh_xct_thongtin">
                <span className="qtv_xct_nhan qtv_khachhang_xemchitiet_noidung_nhanten">
                  Email
                </span>{" "}
                <span className="qtv_xct_giatri qtv_khachhang_xemchitiet_noidung_ten">
                  nguyenvana@gmail.com
                </span>
              </div>
              <div className="qtv_kh_xct_thongtin">
                <span className="qtv_xct_nhan qtv_khachhang_xemchitiet_noidung_nhanten">
                  SĐT :{" "}
                </span>{" "}
                <span className="qtv_xct_giatri qtv_khachhang_xemchitiet_noidung_ten">
                  0123456789
                </span>
              </div>
              <div className="qtv_kh_xct_thongtin">
                <span className="qtv_xct_nhan qtv_khachhang_xemchitiet_noidung_nhanten">
                  Địa chỉ :{" "}
                </span>{" "}
                <span className="qtv_xct_giatri qtv_khachhang_xemchitiet_noidung_ten">
                  Phù Vân-Phủ Lý-Hà Nam
                </span>
              </div>
              <div className="qtv_kh_xct_thongtin">
                <span className="qtv_xct_nhan qtv_khachhang_xemchitiet_noidung_nhanten">
                  Tổng đơn hàng :{" "}
                </span>{" "}
                <span className="qtv_xct_giatri qtv_khachhang_xemchitiet_noidung_ten">
                  10
                </span>
              </div>
              <div className="qtv_kh_xct_thongtin">
                <span className="qtv_xct_nhan qtv_khachhang_xemchitiet_noidung_nhanten">
                  Tổng chi tiêu :{" "}
                </span>{" "}
                <span className="qtv_xct_giatri qtv_khachhang_xemchitiet_noidung_ten">
                  1.000.000đ
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
