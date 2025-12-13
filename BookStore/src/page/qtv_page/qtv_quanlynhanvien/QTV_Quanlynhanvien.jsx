import "./QTV_Quanlynhanvien.css";
import { QTV_Nav } from "../../../nav/QTV_Nav";
import { getListNhanVien, deleteNhanVien } from "../../../api/nhanVienService";
import { useEffect, useState } from "react";
import { Table, Button, Modal, Input, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useDebounce } from "../../../hooks/useDebounce";
import ModalNhanVien from "./components/ModalNhanVien";

export default function QTV_Quanlynhanvien() {
  const [listNhanVien, setListNhanVien] = useState([]);
  const [selectedNhanVien, setSelectedNhanVien] = useState(null);
  const [modalState, setModalState] = useState({
    open: false,
    type: "create",
  });
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const fetchNhanVien = async () => {
    try {
      const res = await getListNhanVien();
      setListNhanVien(res.result);
    } catch (error) {
      message.error("Lỗi khi lấy danh sách nhân viên");
    }
  };

  useEffect(() => {
    fetchNhanVien();
  }, []);

  const handleCreateSuccess = () => {
    fetchNhanVien();
  };

  const openCreateModal = () => {
    setModalState({ open: true, type: "create" });
    setSelectedNhanVien(null);
  };

  const openEditModal = (nhanVien) => {
    setModalState({ open: true, type: "update" });
    setSelectedNhanVien(nhanVien);
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, open: false }));
    setSelectedNhanVien(null);
  };

  const deleteNV = async (maNhanVien) => {
    try {
      await deleteNhanVien(maNhanVien);
      message.success("Xóa nhân viên thành công");
      fetchNhanVien();
      setShowModalDelete(false);
    } catch (error) {
      message.error("Lỗi khi xóa nhân viên");
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "maNhanVien",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "NHÂN VIÊN",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "SỐ CCCD",
      dataIndex: "soCCCD",
      key: "soCCCD",
    },
    {
      title: "TÊN ĐĂNG NHẬP",
      dataIndex: "tenDangNhap",
      key: "tenDangNhap",
    },
    {
      title: "MẬT KHẨU",
      dataIndex: "matKhau",
      key: "matKhau",
      render: (text) => "******", // Hide password
    },
    {
      title: "THAO TÁC",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <Button
            onClick={() => openEditModal(record)}
            type="text"
            icon={<EditOutlined style={{ color: "blue" }} />}
          />
          <Button
            onClick={() => {
              setShowModalDelete(true);
              setSelectedNhanVien(record);
            }}
            type="text"
            icon={<DeleteOutlined style={{ color: "red" }} />}
          />
        </div>
      ),
    },
  ];

  const filteredData = listNhanVien.filter((item) =>
    item.hoTen?.toLowerCase().includes(debouncedSearchText.toLowerCase())
  );

  return (
    <>
      <QTV_Nav />
      <main className="qtv_qlnhanvien_main p-4 bg-gray-50 min-h-screen">
        <div className="qtv_qlnhanvien_tieude mx-4 mt-4 rounded-lg flex items-center justify-between bg-white p-4 shadow-sm mb-4">
          <div className="text-xl font-bold">Quản Lý Nhân Viên</div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openCreateModal}
          >
            Thêm nhân viên
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 p-4 mx-4 bg-white rounded-lg shadow-md my-4 items-center">
          <Input
            placeholder="Tìm kiếm theo tên..."
            allowClear
            enterButton
            className="w-full md:w-96"
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
          />
          <Button type="primary" icon={<SearchOutlined />}>
            Tìm kiếm
          </Button>
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
            className="overflow-x-auto"
            rowKey="maNhanVien"
          />
        </div>

        <ModalNhanVien
          open={modalState.open}
          type={modalState.type}
          dataEdit={selectedNhanVien}
          onCancel={closeModal}
          onOk={handleCreateSuccess}
        />

        <Modal
          title="Xóa nhân viên"
          open={showModalDelete}
          onOk={() => deleteNV(selectedNhanVien?.maNhanVien)}
          onCancel={() => setShowModalDelete(false)}
        >
          <p>
            Bạn có chắc chắn muốn xóa nhân viên{" "}
            <strong>{selectedNhanVien?.hoTen}</strong>?
          </p>
        </Modal>
      </main>
    </>
  );
}
