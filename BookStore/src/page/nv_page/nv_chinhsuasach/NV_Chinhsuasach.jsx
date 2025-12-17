import "./NV_Chinhsuasach.css";
import { NV_Nav } from "../../../nav/NV_Nav";
import { useState, useEffect } from "react";
import { getSach } from "../../../api/sachService";
import { useTranslation } from "react-i18next";

export default function NV_Chinhsuasach() {
  const { t } = useTranslation();
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
        <div className="nv_trangcssach_tieude">
          {t("staff.edit_book.title")}
        </div>
        <hr
          style={{
            border: "1px solid rgb(210, 206, 206)",
            width: "1200px",
            marginLeft: "25px",
            marginTop: "25px",
          }}
        />
        <div className="nv_trangcssach_noidung">
          <div className="nv_trangcssach_noidung_tieude">
            {t("staff.edit_book.section_info")}
          </div>
          <div className="nv_trangcssach_noidung_thongtinsach">
            <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh">
              <div className="nv_trangcssach_noidung_thongtinsach_nhan">
                {t("staff.edit_book.labels.name")}
              </div>
              <div className="nv_trangcssach_noidung_thongtinsach_tenip">
                <input
                  type="text"
                  placeholder={t("staff.edit_book.placeholders.name")}
                />
              </div>
            </div>

            <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh2">
              <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh">
                <div className="nv_trangcssach_noidung_thongtinsach_nhan">
                  {t("staff.edit_book.labels.price")}
                </div>
                <div className="dong2 nv_trangcssach_noidung_thongtinsach_giaip">
                  <input
                    type="text"
                    placeholder={t("staff.edit_book.placeholders.price")}
                  />
                </div>
              </div>

              <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh">
                <div className="nv_trangcssach_noidung_thongtinsach_nhan">
                  {t("staff.edit_book.labels.stock")}
                </div>
                <div className="dong2 nv_trangcssach_noidung_thongtinsach_tonkhoip">
                  <input
                    type="text"
                    placeholder={t("staff.edit_book.placeholders.stock")}
                  />
                </div>
              </div>
            </div>

            <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh">
              <div className="nv_trangcssach_noidung_thongtinsach_nhan">
                {t("staff.edit_book.labels.genre")}
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
                {t("staff.edit_book.labels.description")}
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
                {t("staff.edit_book.labels.image")}
              </div>
              <input type="file" class="file-input" />
            </div>

            <div className="nv_trangcssach_noidung_tieudemtct">
              {t("staff.edit_book.section_detail")}
            </div>

            <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh2">
              <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh">
                <div className="nv_trangcssach_noidung_thongtinsach_nhan">
                  {t("staff.edit_book.labels.author")}
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
                  {t("staff.edit_book.labels.translator")}
                </div>
                <div className="dong5 nv_trangcssach_noidung_thongtinsach_dgip">
                  <input
                    type="text"
                    placeholder={t("staff.edit_book.placeholders.translator")}
                  />
                </div>
              </div>
            </div>

            <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh2">
              <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh">
                <div className="nv_trangcssach_noidung_thongtinsach_nhan">
                  {t("staff.edit_book.labels.publisher")}
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
                  {t("staff.edit_book.labels.product_type")}
                </div>
                <div className="nv_trangcssach_noidung_thongtinsach_loaiip">
                  <select name="" id="">
                    <option value="">
                      {t("staff.edit_book.options.soft_cover")}
                    </option>
                    <option value="">
                      {t("staff.edit_book.options.hard_cover")}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh2">
              <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh">
                <div className="nv_trangcssach_noidung_thongtinsach_nhan">
                  {t("staff.edit_book.labels.size")}
                </div>
                <div className="dong7 nv_trangcssach_noidung_thongtinsach_kthip">
                  <input
                    type="text"
                    placeholder={t("staff.edit_book.placeholders.size")}
                  />
                </div>
              </div>

              <div className="nv_trangcssach_noidung_thongtinsach_thuoctinh">
                <div className="nv_trangcssach_noidung_thongtinsach_nhan">
                  {t("staff.edit_book.labels.pages")}
                </div>
                <div className="dong7 nv_trangcssach_noidung_thongtinsach_strip">
                  <input
                    type="text"
                    placeholder={t("staff.edit_book.placeholders.pages")}
                  />
                </div>
              </div>
            </div>
            <div className="nv_trangcssach_noidung_btn">
              <button className="nv_trangcssach_noidung_btnluu">
                {t("staff.edit_book.buttons.save")}
              </button>
              <button className="nv_trangcssach_noidung_btnhuy">
                {t("staff.edit_book.buttons.cancel")}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
