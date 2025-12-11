import "./QTV_KhachHang.css";
import { QTV_Nav } from "../../../nav/QTV_Nav";
import { useEffect, useState, useMemo } from "react";
import { Table, Button, Modal, Form, Input, message, Select } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  getListKhachHang,
  deleteKhachHang,
} from "../../../api/khachHangService";
import { useDebounce } from "../../../hooks/useDebounce";
import ModalKhachHang from "./components/ModalKhachHang";

export default function QTV_KhachHang() {
  const [suaKhachhang, setSuaKhachhang] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [listKhachHang, setListKhachHang] = useState([]);
  const [modalState, setModalState] = useState({
    open: false,
    type: "create",
  });
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleCreateSuccess = () => {
    fetchKhachHang();
  };

  const openCreateModal = () => {
    setModalState({ open: true, type: "create" });
    setSelectedCustomer(null);
  };

  const openEditModal = (customer) => {
    setModalState({ open: true, type: "update" });
    setSelectedCustomer(customer);
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, open: false }));
    setSelectedCustomer(null);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "maKhachHang",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "KHÁCH HÀNG",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "SĐT",
      dataIndex: "soDT",
      key: "soDT",
    },
    {
      title: "ĐỊA CHỈ",
      dataIndex: "diaChi",
      key: "diaChi",
    },
    {
      title: "THAO TÁC",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <svg
            onClick={() => {
              setSelectedCustomer(record);
              setSuaKhachhang(true);
            }}
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 432 432"
          >
            <path
              fill="blue"
              d="M213.5 3q88.5 0 151 62.5T427 216t-62.5 150.5t-151 62.5t-151-62.5T0 216T62.5 65.5T213.5 3zm0 64Q187 67 168 85.5t-19 45t19 45.5t45.5 19t45-19t18.5-45.5t-18.5-45t-45-18.5zm0 303q39.5 0 73-18.5T341 301q0-20-23.5-35.5t-52-23t-52-7.5t-52 7.5t-52 23T85 301q21 32 55 50.5t73.5 18.5z"
            />
          </svg>
          {/* <Button
            onClick={() => openEditModal(record)}
            type="text"
            icon={<EditOutlined />}
          /> */}
          <Button
            onClick={() => {
              setShowModalDelete(true);
              setSelectedCustomer(record);
            }}
            type="text"
            icon={<DeleteOutlined style={{ color: "red" }} />}
          />
        </div>
      ),
    },
  ];

  const fetchKhachHang = async () => {
    try {
      const res = await getListKhachHang();

      setListKhachHang(res.result);
    } catch (error) {
      message.error("Lỗi khi lấy danh sách khách hàng");
    }
  };

  const deleteKH = async (maKhachHang) => {
    try {
      await deleteKhachHang(maKhachHang);
      message.success("Xóa khách hàng thành công");
      fetchKhachHang();
      setShowModalDelete(false);
    } catch (error) {
      message.error("Lỗi khi xóa khách hàng");
    }
  };

  useEffect(() => {
    fetchKhachHang();
  }, []);

  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const filteredData = listKhachHang.filter((item) =>
    item.hoTen?.toLowerCase().includes(debouncedSearchText.toLowerCase())
  );

  return (
    <>
      <QTV_Nav />
      <main className="qtv_khachhang_main">
        <div className="qtv_khachhang_tieude mx-4 mt-4 rounded-lg flex items-center justify-between">
          <div>Khách Hàng</div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openCreateModal}
          >
            Thêm khách hàng
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
          {/* <div className="flex gap-4">
            <Select
              defaultValue=""
              style={{ width: 180 }}
              options={[
                { value: "", label: "Sắp xếp theo" },
                { value: "totalSpend", label: "Tổng chi tiêu" },
                { value: "orderCount", label: "Số lượng đơn" },
              ]}
            />
            <Select
              defaultValue=""
              style={{ width: 180 }}
              options={[
                { value: "", label: "Thứ tự" },
                { value: "desc", label: "Cao đến thấp" },
                { value: "asc", label: "Thấp đến cao" },
              ]}
            />
          </div> */}
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
            rowKey="maKhachHang"
          />
        </div>

        <ModalKhachHang
          open={modalState.open}
          type={modalState.type}
          dataEdit={selectedCustomer}
          onCancel={closeModal}
          onOk={handleCreateSuccess}
        />

        <Modal
          title="Chi tiết khách hàng"
          open={suaKhachhang}
          onCancel={() => {
            setSuaKhachhang(false);
            setSelectedCustomer(null);
          }}
          footer={null}
        >
          {selectedCustomer && (
            <div className="flex flex-col gap-3">
              <div className="flex border-b border-gray-200 py-2">
                <span className="font-semibold w-1/3">Mã Khách hàng:</span>
                <span className="text-gray-700 font-bold">
                  {selectedCustomer.maKhachHang}
                </span>
              </div>
              <div className="flex border-b border-gray-200 py-2">
                <span className="font-semibold w-1/3">Tên:</span>
                <span className="text-gray-700 font-bold">
                  {selectedCustomer.hoTen}
                </span>
              </div>
              <div className="flex border-b border-gray-200 py-2">
                <span className="font-semibold w-1/3">Email:</span>
                <span className="text-gray-700 font-bold">
                  {selectedCustomer.email}
                </span>
              </div>
              <div className="flex border-b border-gray-200 py-2">
                <span className="font-semibold w-1/3">SĐT:</span>
                <span className="text-gray-700 font-bold">
                  {selectedCustomer.soDT}
                </span>
              </div>
              <div className="flex border-b border-gray-200 py-2">
                <span className="font-semibold w-1/3">Địa chỉ:</span>
                <span className="text-gray-700 font-bold">
                  {selectedCustomer.diaChi}
                </span>
              </div>
              <div className="flex border-b border-gray-200 py-2">
                <span className="font-semibold w-1/3">Tổng đơn hàng:</span>
                <span className="text-gray-700 font-bold">
                  {selectedCustomer.orderCount || 0}
                </span>
              </div>
              <div className="flex border-b border-gray-200 py-2">
                <span className="font-semibold w-1/3">Tổng chi tiêu:</span>
                <span className="text-red-500 font-bold">
                  {selectedCustomer.totalSpend || 0}
                </span>
              </div>
            </div>
          )}
        </Modal>
        <Modal
          title="Xóa khách hàng"
          open={showModalDelete}
          onOk={() => deleteKH(selectedCustomer.maKH)}
          onCancel={() => setShowModalDelete(false)}
        >
          <p>Bạn có chắc chắn muốn xóa khách hàng này?</p>
        </Modal>
      </main>
    </>
  );
}
