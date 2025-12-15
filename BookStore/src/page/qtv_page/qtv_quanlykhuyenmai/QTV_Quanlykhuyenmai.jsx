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

export default function QTV_Quanlykhuyenmai() {
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
      message.error("Lỗi khi lấy danh sách khuyến mãi");
    }
  };

  useEffect(() => {
    fetchKhuyenMai();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteKhuyenMai(selectedKhuyenMai.maGiamGia);
      message.success("Xóa khuyến mãi thành công");
      fetchKhuyenMai();
      setShowModalDelete(false);
      setSelectedKhuyenMai(null);
    } catch (error) {
      console.error(error);
      message.error("Lỗi khi xóa khuyến mãi");
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
      title: "STT",
      key: "stt",
      render: (text, record, index) => index + 1,
      width: 60,
    },
    {
      title: "MÃ GIẢM GIÁ",
      dataIndex: "maGiamGia",
      key: "maGiamGia",
      width: 150,
    },
    {
      title: "MÔ TẢ",
      dataIndex: "moTa",
      key: "moTa",
      ellipsis: true,
    },
    {
      title: "HẠN SỬ DỤNG",
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
      title: "CHIẾT KHẤU (%)",
      dataIndex: "chietKhau",
      key: "chietKhau",
      width: 120,
      render: (text) => `${text}%`,
    },
    {
      title: "THAO TÁC",
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
          <div>Quản lý khuyến mãi</div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openCreateModal}
          >
            Thêm khuyến mãi
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 p-4 mx-4 bg-white rounded-lg shadow-md my-4 items-center">
          <Input
            placeholder="Tìm kiếm mã giảm giá..."
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
          title="Xóa khuyến mãi"
          open={showModalDelete}
          onOk={handleDelete}
          onCancel={() => setShowModalDelete(false)}
        >
          <p>
            Bạn có chắc chắn muốn xóa khuyến mãi{" "}
            <strong>{selectedKhuyenMai?.maGiamGia}</strong>?
          </p>
        </Modal>
      </main>
    </>
  );
}
