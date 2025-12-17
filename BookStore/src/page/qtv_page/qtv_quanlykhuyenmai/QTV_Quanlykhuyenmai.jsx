import "./QTV_Quanlykhuyenmai.css";
import { QTV_Nav } from "../../../nav/QTV_Nav";
import { useEffect, useState } from "react";
import { Table, Button, Input, message, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  getListKhuyenMai,
  deleteKhuyenMai,
} from "../../../api/khuyenMaiService";
import ModalKhuyenMai from "./components/ModalKhuyenMai";
import { useDebounce } from "../../../hooks/useDebounce";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export default function QTV_Quanlykhuyenmai() {
  const { t } = useTranslation();
  const [listKhuyenMai, setListKhuyenMai] = useState([]);
  const [selectedKhuyenMai, setSelectedKhuyenMai] = useState(null);
  const [modalState, setModalState] = useState({
    open: false,
    type: "create",
  });
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const fetchKhuyenMai = async () => {
    try {
      const res = await getListKhuyenMai();
      setListKhuyenMai(res.result || []);
    } catch (error) {
      console.error(error);
      message.error(t("admin.promotion.error.fetch_list"));
    }
  };

  useEffect(() => {
    fetchKhuyenMai();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteKhuyenMai(selectedKhuyenMai.maGiamGia);
      message.success(t("admin.promotion.delete.success"));
      fetchKhuyenMai();
      setShowModalDelete(false);
      setSelectedKhuyenMai(null);
    } catch (error) {
      console.error(error);
      message.error(t("admin.promotion.delete.error"));
    }
  };

  const openCreateModal = () => {
    setModalState({ open: true, type: "create" });
    setSelectedKhuyenMai(null);
  };

  const openEditModal = (record) => {
    setModalState({ open: true, type: "update" });
    setSelectedKhuyenMai(record);
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, open: false }));
    setSelectedKhuyenMai(null);
  };

  const handleSuccess = () => {
    fetchKhuyenMai();
  };

  const filteredData = listKhuyenMai.filter((item) =>
    String(item.maGiamGia)
      .toLowerCase()
      .includes(debouncedSearchText.toLowerCase())
  );

  const columns = [
    {
      title: t("admin.promotion.columns.stt"),
      key: "stt",
      render: (text, record, index) => index + 1,
      width: 60,
    },
    {
      title: t("admin.promotion.columns.code"),
      dataIndex: "maGiamGia",
      key: "maGiamGia",
      width: 150,
    },
    {
      title: t("admin.promotion.columns.description"),
      dataIndex: "moTa",
      key: "moTa",
      ellipsis: true,
    },
    {
      title: t("admin.promotion.columns.expiry"),
      key: "hanSuDung",
      width: 200,
      render: (_, record) => {
        const start = record.ngayBatDau
          ? dayjs(record.ngayBatDau).format("DD/MM/YYYY")
          : "";
        const end = record.ngayKetThuc
          ? dayjs(record.ngayKetThuc).format("DD/MM/YYYY")
          : "";
        return `${start} - ${end}`;
      },
    },
    {
      title: t("admin.promotion.columns.discount"),
      dataIndex: "chietKhau",
      key: "chietKhau",
      width: 120,
      render: (text) => `${text}%`,
    },
    {
      title: t("admin.promotion.columns.action"),
      key: "action",
      width: 120,
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <Button
            onClick={() => openEditModal(record)}
            type="text"
            icon={<EditOutlined style={{ color: "blue" }} />}
          />
          <Button
            onClick={() => {
              setSelectedKhuyenMai(record);
              setShowModalDelete(true);
            }}
            type="text"
            icon={<DeleteOutlined style={{ color: "red" }} />}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <QTV_Nav />
      <main className="qtv_quanlykhuyenmai_main">
        <div className="qtv_quanlykhuyenmai_header mx-4 mt-4 rounded-lg flex items-center justify-between">
          <div>{t("admin.promotion.title")}</div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openCreateModal}
          >
            {t("admin.promotion.add_button")}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 p-4 mx-4 bg-white rounded-lg shadow-md my-4 items-center">
          <Input
            placeholder={t("admin.promotion.search_placeholder")}
            allowClear
            className="w-full md:w-96"
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
          />
        </div>

        <div className="bg-white p-4 mx-4 rounded-lg shadow-md">
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
            }}
            rowKey="maKhuyenMai"
            className="overflow-x-auto"
          />
        </div>

        <ModalKhuyenMai
          open={modalState.open}
          type={modalState.type}
          dataEdit={selectedKhuyenMai}
          onCancel={closeModal}
          onOk={handleSuccess}
        />

        <Modal
          title={t("admin.promotion.delete.title")}
          open={showModalDelete}
          onOk={handleDelete}
          onCancel={() => setShowModalDelete(false)}
        >
          <p>
            {t("admin.promotion.delete.confirm", {
              name: selectedKhuyenMai?.maGiamGia,
            })}
          </p>
        </Modal>
      </main>
    </>
  );
}
