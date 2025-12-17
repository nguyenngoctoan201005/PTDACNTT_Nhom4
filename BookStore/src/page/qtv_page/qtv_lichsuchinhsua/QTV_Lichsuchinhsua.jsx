import "./QTV_Lichsuchinhsua.css";
import { QTV_Nav } from "../../../nav/QTV_Nav";
import { useTranslation } from "react-i18next";

export default function QTV_Lichsuchinhsua() {
  const { t } = useTranslation();
  return (
    <div className="qtv_lichsuchinhsua">
      <QTV_Nav />
      <div className="qtv_lichsuchinhsua_tieude">
        {t("admin.edit_history.title")}
      </div>
    </div>
  );
}
