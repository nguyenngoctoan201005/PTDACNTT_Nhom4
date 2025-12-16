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

export default function QTV_Quanlytacgia() {
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
      message.error("Lỗi khi lấy danh sách tác giả");
    }
  };

  useEffect(() => {
    fetchTacGia();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteTacGia(selectedTacGia.maTG);
      message.success("Xóa tác giả thành công");
      fetchTacGia();
      setShowModalDelete(false);
      setSelectedTacGia(null);
    } catch (error) {
      console.error(error);
      message.error("Lỗi khi xóa tác giả");
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
      title: "STT",
      key: "stt",
      render: (text, record, index) => index + 1,
      width: 80,
    },
    {
      title: "TÊN TÁC GIẢ",
      dataIndex: "tenTG",
      key: "tenTG",
    },
    {
      title: "TIỂU SỬ",
      dataIndex: "tieuSu",
      key: "tieuSu",
      render: (text) => text || "Đang cập nhật",
    },
    {
      title: "THAO TÁC",
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
          <div>Quản lý tác giả</div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openCreateModal}
          >
            Thêm tác giả mới
          </Button>
        </div>
        <div className="flex flex-col md:flex-row gap-4 p-4 mx-4 bg-white rounded-lg shadow-md my-4 items-center">
          <Input
            placeholder="Tìm kiếm tác giả..."
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
          title="Xóa tác giả"
          open={showModalDelete}
          onOk={handleDelete}
          onCancel={() => setShowModalDelete(false)}
        >
          <p>
            Bạn có chắc chắn muốn xóa tác giả{" "}
            <strong>{selectedTacGia?.tenTG}</strong>?
          </p>
        </Modal>
      </main>
    </>
  );
}
