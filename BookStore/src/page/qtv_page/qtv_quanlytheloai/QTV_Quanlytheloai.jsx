import "./QTV_Quanlytheloai.css";
import { QTV_Nav } from "../../../nav/QTV_Nav";
import { useEffect, useState } from "react";
import { Table, Button, Input, message, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { getListTheLoai, deleteTheLoai } from "../../../api/theLoaiService"; // Import API
import ModalTheLoai from "./components/ModalTheLoai"; // Import Modal
import { useDebounce } from "../../../hooks/useDebounce"; // Import debounce hook if exists, otherwise I'll need to check or just standard filter

export default function QTV_Quanlytheloai() {
  const [listTheLoai, setListTheLoai] = useState([]);
  const [selectedTheLoai, setSelectedTheLoai] = useState(null);
  const [modalState, setModalState] = useState({
    open: false,
    type: "create",
  });
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const fetchTheLoai = async () => {
    try {
      const res = await getListTheLoai();
      // Assuming res.result is the array based on other files
      setListTheLoai(res.result || []);
    } catch (error) {
      console.error(error);
      message.error("Lỗi khi lấy danh sách thể loại");
    }
  };

  useEffect(() => {
    fetchTheLoai();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteTheLoai(selectedTheLoai.maTheLoai);
      message.success("Xóa thể loại thành công");
      fetchTheLoai();
      setShowModalDelete(false);
      setSelectedTheLoai(null);
    } catch (error) {
      console.error(error);
      message.error("Lỗi khi xóa thể loại");
    }
  };

  const openCreateModal = () => {
    setModalState({ open: true, type: "create" });
    setSelectedTheLoai(null);
  };

  const openEditModal = (record) => {
    setModalState({ open: true, type: "update" });
    setSelectedTheLoai(record);
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, open: false }));
    setSelectedTheLoai(null);
  };

  const handleSuccess = () => {
    fetchTheLoai();
  };

  const filteredData = listTheLoai.filter((item) =>
    item.tenLoai?.toLowerCase().includes(debouncedSearchText.toLowerCase())
  );

  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (text, record, index) => index + 1,
      width: 80,
    },
    {
      title: "TÊN THỂ LOẠI",
      dataIndex: "tenLoai",
      key: "tenLoai",
    },
    // {
    //   title: "MÔ TẢ",
    //   dataIndex: "moTa",
    //   key: "moTa",
    // },
    // Old table had "SỐ SÁCH" column, but valid API might not return it.
    // I'll check if it's there, otherwise display 0 or ignore.
    // Previous hardcoded table had '5'.
    // {
    //   title: "SỐ SÁCH",
    //   dataIndex: "soSach", // Assuming API returns this, or we can leave it out if not available
    //   key: "soSach",
    //   render: (text) => text || 0,
    // },
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
              setSelectedTheLoai(record);
              setShowModalDelete(true);
            }}
            type="text"
            icon={<DeleteOutlined style={{ color: "red" }} />}
          />
        </div>
      ),
    },
  ];

  console.log("listTheLoai", listTheLoai);

  return (
    <>
      <QTV_Nav />
      <main className="qtv_quanlytheloai_main">
        <div className="qtv_quanlytheloai_header mx-4 mt-4 rounded-lg flex items-center justify-between">
          <div>Quản lý thể loại</div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openCreateModal}
          >
            Thêm thể loại mới
          </Button>
        </div>
        <div className="flex flex-col md:flex-row gap-4 p-4 mx-4 bg-white rounded-lg shadow-md my-4 items-center">
          <Input
            placeholder="Tìm kiếm thể loại..."
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
            rowKey="maTheLoai"
            className="overflow-x-auto"
          />
        </div>
        <ModalTheLoai
          open={modalState.open}
          type={modalState.type}
          dataEdit={selectedTheLoai}
          onCancel={closeModal}
          onOk={handleSuccess}
        />
        <Modal
          title="Xóa thể loại"
          open={showModalDelete}
          onOk={handleDelete}
          onCancel={() => setShowModalDelete(false)}
        >
          <p>
            Bạn có chắc chắn muốn xóa thể loại{" "}
            <strong>{selectedTheLoai?.tenTheLoai}</strong>?
          </p>
        </Modal>
      </main>
    </>
  );
}
