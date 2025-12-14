import "./NV_Huyvatrahang.css";
import { NV_Nav } from "../../../nav/NV_Nav";
export default function NV_Huyvatrahang() {
  return (
    <>
      <NV_Nav />
      <main className="nv_tranghuyvatra_main">
        <div className="nv_tranghuyvatra_tieude">Hủy/Yêu cầu trả hàng</div>
        <hr
          style={{
            border: "1px solid rgb(210, 206, 206)",
            width: "1150px",
            marginLeft: "25px",
            marginTop: "25px",
          }}
        />
        <div>
          <table
            className="nv_huyvatrahang_table"
            width="1150px"
            height="50px"
            style={{ marginTop: "50px" }}
          >
            <tr className="nv_huyvatra_tr">
              <th className="nv_huyvatrahang_th">Mã đơn hàng</th>
              <th className="nv_huyvatrahang_th">Khách hàng</th>
              <th className="nv_huyvatrahang_th">Ngày đặt</th>
              <th className="nv_huyvatrahang_th">Trạng thái</th>
              <th className="nv_huyvatrahang_th">Tổng tiền</th>
              <th className="nv_huyvatrahang_th">Thao tác</th>
            </tr>
            <tr className="nv_huyvatra_tr">
              <td className="nv_huyvatrahang_td nv_tranghuyvatra_madh">
                DH001
              </td>
              <td className="nv_huyvatrahang_td nv_tranghuyvatra_tenkh">
                Nguyễn Văn A
              </td>
              <td className="nv_huyvatrahang_td nv_tranghuyvatra_ngaydat">
                10/10/2024
              </td>
              <td>
                <div className="nv_huyvatra_td nv_tranghuyvatra_trangthai">
                  đã hủy
                </div>
              </td>
              <td className="nv_huyvatra_td nv_tranghuyvatra_tongtien">
                150.000đ
              </td>
              <td>
                <button className="nv_huyvatra_td nv_tranghuyvatra_button">
                  Xem chi tiết
                </button>
              </td>
            </tr>

            <tr className="nv_huyvatra_tr">
              <td className="nv_huyvatra_td nv_tranghuyvatra_madh">DH001</td>
              <td className="nv_huyvatra_td nv_tranghuyvatra_tenkh">
                Nguyễn Văn A
              </td>
              <td className="nv_huyvatra_td nv_tranghuyvatra_ngaydat">
                10/10/2024
              </td>
              <td>
                <div className="nv_huyvatra_td nv_tranghuyvatra_trangthai">
                  đã hủy
                </div>
              </td>
              <td className="nv_huyvatra_td nv_tranghuyvatra_tongtien">
                150.000đ
              </td>
              <td>
                <button className="nv_huyvatra_td nv_tranghuyvatra_button">
                  Xem chi tiết
                </button>
              </td>
            </tr>

            <tr className="nv_huyvatra_tr">
              <td className="nv_huyvatra_td nv_tranghuyvatra_madh">DH001</td>
              <td className="nv_huyvatra_td nv_tranghuyvatra_tenkh">
                Nguyễn Văn A
              </td>
              <td className="nv_huyvatra_td nv_tranghuyvatra_ngaydat">
                10/10/2024
              </td>
              <td>
                <div className="nv_huyvatra_td nv_tranghuyvatra_trangthai">
                  đã hủy
                </div>
              </td>
              <td className="nv_huyvatra_td nv_tranghuyvatra_tongtien">
                150.000đ
              </td>
              <td>
                <button className="nv_huyvatra_td nv_tranghuyvatra_button">
                  Xem chi tiết
                </button>
              </td>
            </tr>

            <tr className="nv_huyvatra_tr">
              <td className="nv_huyvatra_td nv_tranghuyvatra_madh">DH001</td>
              <td className="nv_huyvatra_td nv_tranghuyvatra_tenkh">
                Nguyễn Văn A
              </td>
              <td className="nv_huyvatra_td nv_tranghuyvatra_ngaydat">
                10/10/2024
              </td>
              <td>
                <div className="nv_huyvatra_td nv_tranghuyvatra_trangthai">
                  đã hủy
                </div>
              </td>
              <td className="nv_huyvatra_td nv_tranghuyvatra_tongtien">
                150.000đ
              </td>
              <td>
                <button className="nv_huyvatra_td nv_tranghuyvatra_button">
                  Xem chi tiết
                </button>
              </td>
            </tr>
          </table>
        </div>
      </main>
    </>
  );
}
