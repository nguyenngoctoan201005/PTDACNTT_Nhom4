import "./NV_Chinhsuasach.css";
import { NV_Nav } from "../../../nav/NV_Nav";
import { useState, useEffect } from "react";
import { getSach } from "../../../api/sachService";

export default function NV_Chinhsuasach() {

  const [sach, setSach] = useState({});
  useEffect(() => {
    const fetchSach = async () => {
      try {
        const sach = await getSach();
        setSach(sach);
      } catch (error) {
        console.error("Error fetching sach:", error);
      }
    };
    fetchSach();
  }, []);


  return (
    <>
      <NV_Nav />
      <main className="nv_trangcssach_main">
        <div className="nv_trangcssach_tieude">Chỉnh sửa thông tin sách</div>
        <hr
          style={{
            border: "1px solid rgb(210, 206, 206)",
            width: "1200px",
            marginLeft: "25px",
            marginTop: "25px",
          }}
        />
        <div className="nv_trangcssach_noidung">
          <div className="nv_trangcssach_noidung_tieude">Thông tin sách</div>
          <div className="nv_trangcssach_noidung_thongtinsach">
            <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh">
              <div className="nv_trangcssach_noidung_thongtinsach_nhan">
                Tên sách*
              </div>
              <div className="nv_trangcssach_noidung_thongtinsach_tenip">
                <input type="text" placeholder="Nhập tên sách" />
              </div>
            </div>

            <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh2">
              <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh">
                <div className="nv_trangcssach_noidung_thongtinsach_nhan">
                  Giá bán*
                </div>
                <div className="dong2 nv_trangcssach_noidung_thongtinsach_giaip">
                  <input type="text" placeholder="Nhập giá bán" />
                </div>
              </div>

              <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh">
                <div className="nv_trangcssach_noidung_thongtinsach_nhan">
                  Số lượng tồn kho*
                </div>
                <div className="dong2 nv_trangcssach_noidung_thongtinsach_tonkhoip">
                  <input type="text" placeholder="Nhập số lượng tồn kho" />
                </div>
              </div>
            </div>

            <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh">
              <div className="nv_trangcssach_noidung_thongtinsach_nhan">
                Thể loại*
              </div>
              <div className="nv_trangcssach_noidung_thongtinsach_theloaiip">
                <select name="" id="">
                  <option value="">Văn học</option>
                  <option value="">Kinh tế</option>
                  <option value="">Tâm lý</option>
                  <option value="">Giáo trình</option>
                  <option value="">Truyện tranh</option>
                </select>
              </div>
            </div>

            <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh">
              <div className="nv_trangcssach_noidung_thongtinsach_nhan">
                Mô tả*
              </div>
              <div className="nv_trangcssach_noidung_thongtinsach_motaip">
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  cols="80"
                ></textarea>{" "}
              </div>
            </div>

            <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh">
              <div className="nv_trangcssach_noidung_thongtinsach_nhan">
                Chọn hình ảnh*
              </div>
              <input type="file" class="file-input" />
            </div>

            <div className="nv_trangcssach_noidung_tieudemtct">
              Mô tả chi tiết :
            </div>

            <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh2">
              <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh">
                <div className="nv_trangcssach_noidung_thongtinsach_nhan">
                  Tác giả*
                </div>
                <div className="dong5 nv_trangcssach_noidung_thongtinsach_tgip">
                  <select name="" id="">
                    <option value="">Nguyễn Văn A</option>
                    <option value="">Nguyễn Văn B</option>
                  </select>
                </div>
              </div>

              <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh">
                <div className="nv_trangcssach_noidung_thongtinsach_nhan">
                  Dịch giả*
                </div>
                <div className="dong5 nv_trangcssach_noidung_thongtinsach_dgip">
                  <input type="text" placeholder="Nhập dịch giả" />
                </div>
              </div>
            </div>

            <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh2">
              <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh">
                <div className="nv_trangcssach_noidung_thongtinsach_nhan">
                  Nhà xuất bản*
                </div>
                <div className="nv_trangcssach_noidung_thongtinsach_nxbip">
                  <select name="" id="">
                    <option value="">NXB Tiếng Việt</option>
                    <option value="">NXB Hà Nội</option>
                  </select>
                </div>
              </div>

              <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh">
                <div className="nv_trangcssach_noidung_thongtinsach_nhan">
                  Loại sản phẩm*
                </div>
                <div className="nv_trangcssach_noidung_thongtinsach_loaiip">
                  <select name="" id="">
                    <option value="">Bìa mềm</option>
                    <option value="">Bìa cứng</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh2">
              <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh">
                <div className="nv_trangcssach_noidung_thongtinsach_nhan">
                  Kích thước*
                </div>
                <div className="dong7 nv_trangcssach_noidung_thongtinsach_kthip">
                  <input type="text" placeholder="Ví dụ : 19 x 10cm" />
                </div>
              </div>

              <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh">
                <div className="nv_trangcssach_noidung_thongtinsach_nhan">
                  Số trang*
                </div>
                <div className="dong7 nv_trangcssach_noidung_thongtinsach_strip">
                  <input type="text" placeholder="Nhập số trang" />
                </div>
              </div>
            </div>
            <div className="nv_trangcssach_noidung_btn">
              <button className="nv_trangcssach_noidung_btnluu">
                Lưu thay đổi
              </button>
              <button className="nv_trangcssach_noidung_btnhuy">Hủy</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
