import "./QTV_Themsachmoi.css";
import { QTV_Nav } from "../../../../nav/QTV_Nav";
import { useTranslation } from "react-i18next";

export default function QTV_Themsachmoi() {
  const { t } = useTranslation();
  return (
    <>
      <QTV_Nav />

      <main className="qtv_trangthemmoi_main">
        <div className="qtv_trangthemmoi_tieude">
          {t("admin.add_book_page.title")}
        </div>
        <div className="qtv_trangthemmoi_noidung">
          <div className="qtv_trangthemmoi_noidung_tieude">
            {t("admin.add_book_page.section_info")}
          </div>
          <div className="qtv_trangthemmoi_noidung_thongtinsach">
            <div className="qtv_trangthemmoi_noidung_thongtinsach_thuoctinh">
              <div className="qtv_trangthemmoi_noidung_thongtinsach_nhan">
                {t("admin.add_book_page.labels.name")}
              </div>
              <div className="qtv_trangthemmoi_noidung_thongtinsach_tenip">
                <input
                  type="text"
                  placeholder={t("admin.add_book_page.placeholders.name")}
                />
              </div>
            </div>

            <div className="qtv_trangthemmoi_noidung_thongtinsach_thuoctinh2">
              <div className="qtv_trangthemmoi_noidung_thongtinsach_thuoctinh">
                <div className="qtv_trangthemmoi_noidung_thongtinsach_nhan">
                  {t("admin.add_book_page.labels.price")}
                </div>
                <div className="dong2 qtv_trangthemmoi_noidung_thongtinsach_giaip">
                  <input
                    type="text"
                    placeholder={t("admin.add_book_page.placeholders.price")}
                  />
                </div>
              </div>

              <div className="qtv_trangthemmoi_noidung_thongtinsach_thuoctinh">
                <div className="qtv_trangthemmoi_noidung_thongtinsach_nhan">
                  {t("admin.add_book_page.labels.stock")}
                </div>
                <div className="dong2 qtv_trangthemmoi_noidung_thongtinsach_tonkhoip">
                  <input
                    type="text"
                    placeholder={t("admin.add_book_page.placeholders.stock")}
                  />
                </div>
              </div>
            </div>

            <div className="qtv_trangthemmoi_noidung_thongtinsach_thuoctinh">
              <div className="qtv_trangthemmoi_noidung_thongtinsach_nhan">
                {t("admin.add_book_page.labels.genre")}
              </div>
              <div className="qtv_trangthemmoi_noidung_thongtinsach_theloaiip">
                <select name="" id="">
                  <option value="">Văn học</option>
                  <option value="">Kinh tế</option>
                  <option value="">Tâm lý</option>
                  <option value="">Giáo trình</option>
                  <option value="">Truyện tranh</option>
                </select>
              </div>
            </div>

            <div className="qtv_trangthemmoi_noidung_thongtinsach_thuoctinh">
              <div className="qtv_trangthemmoi_noidung_thongtinsach_nhan">
                {t("admin.add_book_page.labels.description")}
              </div>
              <div className="qtv_trangthemmoi_noidung_thongtinsach_motaip">
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  cols="80"
                ></textarea>{" "}
              </div>
            </div>

            <div className="qtv_trangthemmoi_noidung_thongtinsach_thuoctinh">
              <div className="qtv_trangthemmoi_noidung_thongtinsach_nhan">
                {t("admin.add_book_page.labels.image")}
              </div>
              <input type="file" className="file-input" />
            </div>

            <div className="qtv_trangthemmoi_noidung_tieudemtct">
              {t("admin.add_book_page.section_detail")}
            </div>

            <div className="qtv_trangthemmoi_noidung_thongtinsach_thuoctinh2">
              <div className="qtv_trangthemmoi_noidung_thongtinsach_thuoctinh">
                <div className="qtv_trangthemmoi_noidung_thongtinsach_nhan">
                  {t("admin.add_book_page.labels.author")}
                </div>
                <div className="dong5 qtv_trangthemmoi_noidung_thongtinsach_tgip">
                  <select name="" id="">
                    <option value="">Nguyễn Văn A</option>
                    <option value="">Nguyễn Văn B</option>
                  </select>
                </div>
              </div>

              <div className="qtv_trangthemmoi_noidung_thongtinsach_thuoctinh">
                <div className="qtv_trangthemmoi_noidung_thongtinsach_nhan">
                  {t("admin.add_book_page.labels.translator")}
                </div>
                <div className="dong5 qtv_trangthemmoi_noidung_thongtinsach_dgip">
                  <input
                    type="text"
                    placeholder={t(
                      "admin.add_book_page.placeholders.translator"
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="qtv_trangthemmoi_noidung_thongtinsach_thuoctinh2">
              <div className="qtv_trangthemmoi_noidung_thongtinsach_thuoctinh">
                <div className="qtv_trangthemmoi_noidung_thongtinsach_nhan">
                  {t("admin.add_book_page.labels.publisher")}
                </div>
                <div className="qtv_trangthemmoi_noidung_thongtinsach_nxbip">
                  <select name="" id="">
                    <option value="">NXB Tiếng Việt</option>
                    <option value="">NXB Hà Nội</option>
                  </select>
                </div>
              </div>

              <div className="qtv_trangthemmoi_noidung_thongtinsach_thuoctinh">
                <div className="qtv_trangthemmoi_noidung_thongtinsach_nhan">
                  {t("admin.add_book_page.labels.product_type")}
                </div>
                <div className="qtv_trangthemmoi_noidung_thongtinsach_loaiip">
                  <select name="" id="">
                    <option value="">
                      {t("admin.add_book_page.options.soft_cover")}
                    </option>
                    <option value="">
                      {t("admin.add_book_page.options.hard_cover")}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="qtv_trangthemmoi_noidung_thongtinsach_thuoctinh2">
              <div className="qtv_trangthemmoi_noidung_thongtinsach_thuoctinh">
                <div className="qtv_trangthemmoi_noidung_thongtinsach_nhan">
                  {t("admin.add_book_page.labels.size")}
                </div>
                <div className="dong7 qtv_trangthemmoi_noidung_thongtinsach_kthip">
                  <input
                    type="text"
                    placeholder={t("admin.add_book_page.placeholders.size")}
                  />
                </div>
              </div>

              <div className="qtv_trangthemmoi_noidung_thongtinsach_thuoctinh">
                <div className="qtv_trangthemmoi_noidung_thongtinsach_nhan">
                  {t("admin.add_book_page.labels.pages")}
                </div>
                <div className="dong7 qtv_trangthemmoi_noidung_thongtinsach_strip">
                  <input
                    type="text"
                    placeholder={t("admin.add_book_page.placeholders.pages")}
                  />
                </div>
              </div>
            </div>
            <div className="qtv_trangthemmoi_noidung_btn">
              <button className="qtv_trangthemmoi_noidung_btnluu">
                {t("admin.add_book_page.buttons.save")}
              </button>
              <button className="qtv_trangthemmoi_noidung_btnhuy">
                {t("admin.add_book_page.buttons.cancel")}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
