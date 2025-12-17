import "./NV_Quanlydanhgia.css";
import { NV_Nav } from "../../../nav/NV_Nav";
import { useEffect, useState } from "react";
import { Table, Button, Modal, Input, message } from "antd";
import { DeleteOutlined, SearchOutlined, EyeOutlined } from "@ant-design/icons";
import { getListDanhGia, deleteDanhGia } from "../../../api/danhGiaService";
import { useDebounce } from "../../../hooks/useDebounce";
import { useTranslation } from "react-i18next";

export default function NV_Quanlydanhgia() {
  const { t } = useTranslation();
  const [listDanhGia, setListDanhGia] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const fetchDanhGia = async () => {
    try {
      const res = await getListDanhGia();
      // Lấy trực tiếp từ res.result như cấu trúc JSON mày đưa
      setListDanhGia(res.result || []);
    } catch (error) {
      console.error(error);
      message.error(t("common.error"));
    }
  };

  useEffect(() => {
    fetchDanhGia();
  }, []);

  const handleDelete = async () => {
    if (!selectedReview) return;
    try {
      await deleteDanhGia(selectedReview.maDanhGia); // Giả sử 'maDanhGia' vẫn là key đúng
      message.success(t("danhgia.review_management.modal_delete.success"));
      fetchDanhGia();
      setShowModalDelete(false);
      setSelectedReview(null);
    } catch (error) {
      console.error(error);
      message.error(t("danhgia.review_management.modal_delete.error"));
    }
  };

  const columns = [
    {
      title: t("danhgia.review_management.columns.stt"),
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      // SỬA: Dùng 'hoTen' thay vì ['khachHang', 'hoTen']
      title: t("danhgia.review_management.columns.customer"),
      dataIndex: "hoTen",
      key: "hoTen",
      render: (text) => text || "N/A",
    },
    {
      // SỬA: Dùng 'tenSach' thay vì ['sach', 'tenSach']
      title: t("danhgia.review_management.columns.book"),
      dataIndex: "tenSach",
      key: "tenSach",
      render: (text) => text || "N/A",
    },
    {
      title: t("danhgia.review_management.columns.rating"),
      dataIndex: "soSao",
      key: "soSao",
      render: (soSao) => (
        <span className="text-yellow-500 font-bold">{soSao} sao</span>
      ),
    },
    {
      // SỬA: Dùng 'binhLuan' thay vì 'noiDung'
      title: t("danhgia.review_management.columns.comment"),
      dataIndex: "binhLuan",
      key: "binhLuan",
      ellipsis: true,
    },
    {
      // SỬA: Dùng 'ngayBL' thay vì 'ngayDanhGia'
      title: t("danhgia.review_management.columns.date"),
      dataIndex: "ngayBL",
      key: "ngayBL",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: t("danhgia.review_management.columns.action"),
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <Button
            onClick={() => {
              setSelectedReview(record);
              setShowModalDetail(true);
            }}
            type="text"
            icon={<EyeOutlined style={{ color: "blue" }} />}
          />
          <Button
            onClick={() => {
              setSelectedReview(record);
              setShowModalDelete(true);
            }}
            type="text"
            icon={<DeleteOutlined style={{ color: "red" }} />}
          />
        </div>
      ),
    },
  ];

  const filteredData = listDanhGia.filter((item) => {
    const searchLower = debouncedSearchText.toLowerCase();
    // SỬA: Lấy trực tiếp 'hoTen' và 'tenSach'
    const hoTen = item.hoTen || "";
    const tenSach = item.tenSach || "";
    return (
      hoTen.toLowerCase().includes(searchLower) ||
      tenSach.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <NV_Nav />
      <main className="nv_quanlydanhgia_main">
        <div className="nv_quanlydanhgia_tieude mx-4 mt-4 rounded-lg flex items-center justify-between">
          <div>{t("danhgia.review_management.title")}</div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 p-4 mx-4 bg-white rounded-lg shadow-md my-4 items-center">
          <Input
            placeholder={t("danhgia.review_management.search_placeholder")}
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
            className="overflow-x-auto"
            rowKey="maDanhGia" // Verify this key
          />
        </div>

        {/* Modal Chi Tiết */}
        <Modal
          title={t("danhgia.review_management.modal_detail.title")}
          open={showModalDetail}
          onCancel={() => {
            setShowModalDetail(false);
            setSelectedReview(null);
          }}
          footer={null}
        >
          {selectedReview && (
            <div className="flex flex-col gap-3">
              <div className="flex border-b border-gray-200 py-2">
                <span className="font-semibold w-1/3">
                  {t("danhgia.review_management.modal_detail.code")}
                </span>
                <span className="text-gray-700 font-bold">
                  {selectedReview.maDanhGia}
                </span>
              </div>
              <div className="flex border-b border-gray-200 py-2">
                <span className="font-semibold w-1/3">
                  {t("danhgia.review_management.modal_detail.book")}
                </span>
                {/* SỬA: Dùng 'tenSach' */}
                <span className="text-gray-700 font-bold">
                  {selectedReview.tenSach}
                </span>
              </div>
              <div className="flex border-b border-gray-200 py-2">
                <span className="font-semibold w-1/3">
                  {t("danhgia.review_management.modal_detail.customer")}
                </span>
                {/* SỬA: Dùng 'hoTen' */}
                <span className="text-gray-700 font-bold">
                  {selectedReview.hoTen}
                </span>
              </div>
              <div className="flex border-b border-gray-200 py-2">
                <span className="font-semibold w-1/3">
                  {t("danhgia.review_management.modal_detail.rating")}
                </span>
                <span className="text-yellow-500 font-bold">
                  {selectedReview.soSao}
                </span>
              </div>
              <div className="flex border-b border-gray-200 py-2">
                <span className="font-semibold w-1/3">
                  {t("danhgia.review_management.modal_detail.date")}
                </span>
                {/* SỬA: Dùng 'ngayBL' */}
                <span className="text-gray-700 font-bold">
                  {new Date(selectedReview.ngayBL).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <div className="flex flex-col border-b border-gray-200 py-2">
                <span className="font-semibold mb-1">
                  {t("danhgia.review_management.modal_detail.comment")}
                </span>
                <div className="bg-gray-50 p-3 rounded text-gray-700">
                  {/* SỬA: Dùng 'binhLuan' */}
                  {selectedReview.binhLuan}
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* Modal Xóa */}
        <Modal
          title={t("danhgia.review_management.modal_delete.title")}
          open={showModalDelete}
          onOk={handleDelete}
          onCancel={() => setShowModalDelete(false)}
          okText={t("danhgia.review_management.modal_delete.delete")}
          cancelText={t("danhgia.review_management.modal_delete.cancel")}
          okButtonProps={{ danger: true }}
        >
          <p>{t("danhgia.review_management.modal_delete.message")}</p>
        </Modal>
      </main>
    </>
  );
}
