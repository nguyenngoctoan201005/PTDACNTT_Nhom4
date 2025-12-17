import "./QTV_Quanlytacgia.css";
import { QTV_Nav } from "../../../nav/QTV_Nav";
import { useEffect, useState } from "react";
import { Table, Button, Input, message, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { getListTacGia, deleteTacGia } from "../../../api/tacGiaService";
import ModalTacGia from "./components/ModalTacGia";
import { useDebounce } from "../../../hooks/useDebounce";
import { useTranslation } from "react-i18next";

export default function QTV_Quanlytacgia() {
  const { t } = useTranslation();
  const [listTacGia, setListTacGia] = useState([]);
  const [selectedTacGia, setSelectedTacGia] = useState(null);
  const [modalState, setModalState] = useState({
    open: false,
    type: "create",
  });
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const fetchTacGia = async () => {
    try {
      const res = await getListTacGia();
      setListTacGia(res.result || []);
    } catch (error) {
      console.error(error);
      message.error(t("admin.author.error.fetch_list"));
    }
  };

  useEffect(() => {
    fetchTacGia();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteTacGia(selectedTacGia.maTG);
      message.success(t("admin.author.delete.success"));
      fetchTacGia();
      setShowModalDelete(false);
      setSelectedTacGia(null);
    } catch (error) {
      console.error(error);
      message.error(t("admin.author.delete.error"));
    }
  };

  const openCreateModal = () => {
    setModalState({ open: true, type: "create" });
    setSelectedTacGia(null);
  };

  const openEditModal = (record) => {
    setModalState({ open: true, type: "update" });
    setSelectedTacGia(record);
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, open: false }));
    setSelectedTacGia(null);
  };

  const handleSuccess = () => {
    fetchTacGia();
  };

  const filteredData = listTacGia.filter((item) =>
    item.tenTG?.toLowerCase().includes(debouncedSearchText.toLowerCase())
  );

  const columns = [
    {
      title: t("admin.author.columns.stt"),
      key: "stt",
      render: (text, record, index) => index + 1,
      width: 80,
    },
    {
      title: t("admin.author.columns.name"),
      dataIndex: "tenTG",
      key: "tenTG",
    },
    {
      title: t("admin.author.columns.bio"),
      dataIndex: "tieuSu",
      key: "tieuSu",
      render: (text) => text || t("admin.author.default_bio"),
    },
    {
      title: t("admin.author.columns.action"),
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <Button
            onClick={() => openEditModal(record)}
            type="text"
            icon={<EditOutlined style={{ color: "blue" }} />}
          />
          <Button
            onClick={() => {
              setSelectedTacGia(record);
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
      <main className="qtv_quanlytacgia_main">
        <div className="qtv_quanlytacgia_header mx-4 mt-4 rounded-lg flex items-center justify-between">
          <div>{t("admin.author.title")}</div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openCreateModal}
          >
            {t("admin.author.add_button")}
          </Button>
        </div>
        <div className="flex flex-col md:flex-row gap-4 p-4 mx-4 bg-white rounded-lg shadow-md my-4 items-center">
          <Input
            placeholder={t("admin.author.search_placeholder")}
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
            rowKey="maTG"
            className="overflow-x-auto"
          />
        </div>
        <ModalTacGia
          open={modalState.open}
          type={modalState.type}
          dataEdit={selectedTacGia}
          onCancel={closeModal}
          onOk={handleSuccess}
        />
        <Modal
          title={t("admin.author.delete.title")}
          open={showModalDelete}
          onOk={handleDelete}
          onCancel={() => setShowModalDelete(false)}
        >
          <p>
            {t("admin.author.delete.confirm", { name: selectedTacGia?.tenTG })}
          </p>
        </Modal>
      </main>
    </>
  );
}
