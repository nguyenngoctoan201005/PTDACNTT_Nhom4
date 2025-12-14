import "./NV_Thongke.css";
import { NV_Nav } from "../../../nav/NV_Nav";
export default function NV_Thongke() {
  return (
    <>
      <NV_Nav />
      <main className="nv_trangthongke_main">
        <div className="nv_trangthongke_tieude">Thống kê doanh thu</div>
        <hr
          style={{
            border: "1px solid rgb(210, 206, 206)",
            width: "1150px",
            marginLeft: "25px",
            marginTop: "25px",
          }}
        />

        <div className="nv_trangthongke_noidung">
          <div className="nv_trangthongke_noidung_tieude">
            Thống kê doanh thu cá nhân
          </div>
          <div className="nv_trangthongke_noidung_tong">
            <div className="nv_trangthongke_noidung_tong_dong">
              <div className="nv_trangthongke_noidung_tong_nhan">
                Tổng số sách đã bán :{" "}
                <span className="nv_trangthongke_noidung_tong_dl">3</span>
              </div>
            </div>
            <div className="nv_trangthongke_noidung_tong_dong">
              <div className="nv_trangthongke_noidung_tong_nhan">
                Tổng doanh thu :{" "}
                <span
                  className="nv_trangthongke_noidung_tong_dl"
                  style={{ color: "green" }}
                >
                  500.000đ
                </span>
              </div>
            </div>
          </div>

          <table className="nv_tk_table">
            <tr className="nv_tk_tr">
              <th
                className="nv_tk_th"
                style={{ width: "80px", borderRadius: "15px 0px 0px 15px" }}
              >
                Mã sách
              </th>
              <th className="nv_tk_th" style={{ width: "650px" }}>
                Tên sách
              </th>
              <th className="nv_tk_th" style={{ width: "60px" }}>
                SL
              </th>
              <th
                className="nv_tk_th"
                style={{ borderRadius: "0px 15px 15px 0px" }}
              >
                Tổng tiền
              </th>
            </tr>

            <tr className="nv_tk_tr">
              <td className="nv_tk_td">MS001</td>
              <td className="nv_tk_td">Đắc nhân tâm</td>
              <td className="nv_tk_td">2</td>
              <td className="nv_tk_td">200.000đ</td>
            </tr>

            <tr className="nv_tk_tr">
              <td className="nv_tk_td">MS001</td>
              <td className="nv_tk_td">Đắc nhân tâm</td>
              <td className="nv_tk_td">2</td>
              <td className="nv_tk_td">200.000đ</td>
            </tr>

            <tr className="nv_tk_tr">
              <td className="nv_tk_td">MS001</td>
              <td className="nv_tk_td">Đắc nhân tâm</td>
              <td className="nv_tk_td">2</td>
              <td className="nv_tk_td">200.000đ</td>
            </tr>

            <tr className="nv_tk_tr">
              <td className="nv_tk_td">MS001</td>
              <td className="nv_tk_td">Đắc nhân tâm</td>
              <td className="nv_tk_td">2</td>
              <td className="nv_tk_td">200.000đ</td>
            </tr>

            <tr className="nv_tk_tr">
              <td className="nv_tk_td">MS001</td>
              <td className="nv_tk_td">Đắc nhân tâm</td>
              <td className="nv_tk_td">2</td>
              <td className="nv_tk_td">200.000đ</td>
            </tr>

            <tr className="nv_tk_tr">
              <td className="nv_tk_td">MS001</td>
              <td className="nv_tk_td">Đắc nhân tâm</td>
              <td className="nv_tk_td">2</td>
              <td className="nv_tk_td">200.000đ</td>
            </tr>
          </table>
        </div>
      </main>
    </>
  );
}
