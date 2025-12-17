import "./NV_Chitietdonhang.css";
import { NV_Nav } from "../../../nav/NV_Nav";
import { useTranslation } from "react-i18next";

export default function NV_Chitietdonhang() {
  const { t } = useTranslation();
  return (
    <>
      <NV_Nav />
      <main className="nv_trangctdh_main">
        <div className="nv_trangctdh_tieude">
          {t("staff.order_detail.title")}
        </div>
        <hr
          style={{
            border: "1px solid rgb(210, 206, 206)",
            width: "1150px",
            marginLeft: "25px",
            marginTop: "25px",
          }}
        />

        <div className="nv_trangctdh_caco">
          <div className="nv_trangctdh_caco_tieude">
            {t("staff.order_detail.order_info.title", { code: "DH001" })}
          </div>
          <div className="nv_trangctdh_caco_nhan">
            {t("staff.order_detail.order_info.code", { code: "DH001" })}
          </div>
          <div className="nv_trangctdh_caco_nhan">
            {t("staff.order_detail.order_info.date", { date: "28/9/2025" })}
          </div>
          <div className="nv_trangctdh_caco_nhan">
            {t("staff.order_detail.order_info.note", {
              note: "gói hàng cẩn th",
            })}
          </div>
          <div className="nv_trangctdh_caco_cntt">
            <span className="nv_trangctdh_caco_nhan">
              {t("staff.order_detail.order_info.update_status")}
            </span>
            <select name="" id="">
              <option value="cxn">Chờ xác nhận</option>
              <option value="cxn">Chờ giao hàng</option>
              <option value="cxn">Đang giao hàng</option>
            </select>
            <button className="nv_trangctdh_caco_button">
              {t("staff.order_detail.order_info.button_update")}
            </button>
          </div>
          <div className="nv_trangctdh_caco_trangthaidh">
            <div style={{ borderRadius: "20px 0px 0px 20px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 15 15"
              >
                <path
                  fill-rule="evenodd"
                  d="M0 7.5a7.5 7.5 0 1 1 15 0a7.5 7.5 0 0 1-15 0Zm7.072 3.21l4.318-5.398l-.78-.624l-3.682 4.601L4.32 7.116l-.64.768l3.392 2.827Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>

            <div
              className="nv_trangctdh_caco_trangthaidh_noidungtrangthai"
              style={{ borderRadius: "0px 20px 20px 0px" }}
            >
              {t("staff.order_detail.order_info.success")}
            </div>
          </div>
        </div>

        <div className="nv_trangctdh_caco">
          <div className="nv_trangctdh_caco_tieude">
            {t("staff.order_detail.products.title")}
          </div>
          <table className="ctdh_tb">
            <tr>
              <th className="ctdh_th ctdh_th1">
                {t("staff.order_detail.products.columns.product")}
              </th>
              <th className="ctdh_th ctdh_th2">
                {t("staff.order_detail.products.columns.price")}
              </th>
              <th className="ctdh_th ctdh_th3">
                {t("staff.order_detail.products.columns.quantity")}
              </th>
              <th className="ctdh_th ctdh_th4">
                {t("staff.order_detail.products.columns.total")}
              </th>
            </tr>
            <tr>
              <td className="ctdh_td nv_trangctdh_caco_sach">
                <div className="nv_trangctdh_caco_sach_anh">
                  <img src="../../img/sachtes.png" alt="" />
                </div>
                <div className="nv_trangctdh_caco_sach_ten">
                  <div className="tensach">Tên sách .................</div>
                </div>
              </td>
              <td className="ctdh_td nv_trangctdh_caco_sach_gia">50.000đ</td>
              <td className="ctdh_td nv_trangctdh_caco_sach_sl">2</td>
              <td className="ctdh_td nv_trangctdh_caco_sach_ttien">100.000đ</td>
            </tr>

            <tr>
              <td className="ctdh_td nv_trangctdh_caco_sach">
                <div className="nv_trangctdh_caco_sach_anh">
                  <img src="../../img/sachtes.png" alt="" />
                </div>
                <div className="nv_trangctdh_caco_sach_ten">
                  <div>Tên sách .................</div>
                </div>
              </td>
              <td className="ctdh_td nv_trangctdh_caco_sach_gia">50.000đ</td>
              <td className="ctdh_td nv_trangctdh_caco_sach_sl">2</td>
              <td className="ctdh_td nv_trangctdh_caco_sach_ttien">100.000đ</td>
            </tr>
          </table>
        </div>

        <div className="nv_trangctdh_caco_ttkhachhangvathanhtoan">
          <div className="nv_trangctdh_caco_ttkhachhangvathanhtoan_bang">
            <div className="nv_trangctdh_caco_ttkhachhangvathanhtoan_bang_tieude">
              {t("staff.order_detail.customer_info.title")}
            </div>
            <div className="nv_trangctdh_caco_ttkhachhangvathanhtoan_bang_thongtin">
              <div className="tenkh">
                {t("staff.order_detail.customer_info.name", {
                  name: "Phạm Hùng Minh",
                })}
              </div>
              <div className="ttkh">
                {t("staff.order_detail.customer_info.phone", {
                  phone: "099999999",
                })}
              </div>
              <div className="ttkh">
                {t("staff.order_detail.customer_info.email", {
                  email: "abc@gmail.com",
                })}
              </div>
              <div className="ttkh">
                {t("staff.order_detail.customer_info.address", {
                  address: "123/4 abc, phường 5, quận 6, TP.HCM",
                })}{" "}
              </div>
            </div>
          </div>

          <div className="nv_trangctdh_caco_ttkhachhangvathanhtoan_bang">
            <div className="nv_trangctdh_caco_ttkhachhangvathanhtoan_bang_tieude">
              {t("staff.order_detail.payment_info.title")}
            </div>
            <div className="nv_trangctdh_caco_ttkhachhangvathanhtoan_bang_thongtin">
              <div style={{ marginBottom: "10px" }}>
                <div className="thanhtoan_phuongthuc">
                  {t("staff.order_detail.payment_info.method")}
                </div>
                <div className="thanhtoan_phuongthuc_dulieu">
                  Thanh toán khi nhận hàng
                </div>
              </div>
              <div>
                <div className="thanhtoan_phuongthuc">
                  {t("staff.order_detail.payment_info.shipping")}
                </div>
                <div className="thanhtoan_phuongthuc_dulieu">
                  Vận chuyển tiêu chuẩn
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="nv_trangctdh_caco">
          <div className="nv_trangctdh_caco_tieude">
            {t("staff.order_detail.summary.title")}
          </div>
          <div className="nv_trangctdh_caco_dongdulieu">
            <div className="nv_trangctdh_caco_dongdulieu_thtin">
              {t("staff.order_detail.summary.subtotal", { count: 4 })}
            </div>
            <div className="nv_trangctdh_caco_dongdulieu_thtin">200.000đ</div>
          </div>

          <div className="nv_trangctdh_caco_dongdulieu">
            <div className="nv_trangctdh_caco_dongdulieu_thtin">
              {t("staff.order_detail.summary.shipping_fee")}
            </div>
            <div className="nv_trangctdh_caco_dongdulieu_thtin">30.000đ</div>
          </div>

          <div className="nv_trangctdh_caco_dongdulieu">
            <div className="nv_trangctdh_caco_dongdulieu_thtin">
              {t("staff.order_detail.summary.discount")}
            </div>
            <div className="nv_trangctdh_caco_dongdulieu_thtin">-20.000đ</div>
          </div>
          <hr
            style={{
              border: "1px solid rgb(210, 206, 206)",
              width: "1090px",
              marginLeft: "25px",
              marginTop: "10px",
            }}
          />

          <div className="nv_trangctdh_caco_dongdulieu">
            <div
              className="nv_trangctdh_caco_dongdulieu_thtin"
              style={{ fontWeight: "600", fontSize: "20px", color: "red" }}
            >
              {t("staff.order_detail.summary.total")}
            </div>
            <div
              className="nv_trangctdh_caco_dongdulieu_thtin"
              style={{
                fontWeight: "600",
                fontSize: "20px",
                color: "rgb(255, 0, 0)",
              }}
            >
              210.000đ
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
