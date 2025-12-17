import {
  Breadcrumb,
  Table,
  Tag,
  Button,
  message,
  Card,
  Tabs,
  Spin,
  Modal,
} from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import RequireLoginPage from "../../../components/RequireLoginPage/RequireLoginPage";
import { useGlobalContext } from "../../../GlobalContext";
import {
  getDonHangOfKhachHang,
  getDetailDonHang,
} from "../../../api/donHangService";
import { formatCurrency } from "../../../hooks/formatCurrentcy";
import { useTranslation } from "react-i18next";

const Order = () => {
  const { token, user } = useGlobalContext();
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    if (user?.maKH) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getDonHangOfKhachHang();
      setOrders(data.result || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      message.error(t("order.error.fetch_list"));
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = async (maDH) => {
    setIsModalOpen(true);
    setLoadingDetails(true);
    try {
      const res = await getDetailDonHang({ maDH: maDH });
      const details = res.result
        ? res.result.chiTietDonHang
        : res.chiTietDonHang;
      setSelectedOrderDetails(details || []);
    } catch (error) {
      console.error("Failed to fetch order details:", error);
      message.error(t("order.error.fetch_detail"));
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrderDetails([]);
  };

  const renderStatus = (status) => {
    let text = "";
    let color = "";

    switch (status) {
      case "Chờ xác nhận":
        text = t("order.tabs.pending");
        color = "orange";
        break;
      case "Đã xác nhận":
        text = t("order.tabs.confirmed");
        color = "green";
        break;
      case "Đang giao":
        text = t("order.tabs.shipping");
        color = "blue";
        break;
      case "Hoàn thành":
        text = t("order.tabs.completed");
        color = "success";
        break;
      case "Đã hủy":
        text = t("order.tabs.cancelled");
        color = "red";
        break;
      default:
        text = status;
        color = "default";
    }

    return <Tag color={color}>{text}</Tag>;
  };

  const handleCancel = (maDH) => {
    message.warning(t("order.detail.cancel_warning"));
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "ALL") return true;
    return order.trangThai === activeTab;
  });

  const columns = [
    {
      title: t("order.columns.id"),
      dataIndex: "maDonHang",
      key: "maDonHang",
      align: "center",
      render: (text) => <b>#{text}</b>,
    },
    {
      title: t("order.columns.date"),
      dataIndex: "ngayDat",
      key: "ngayDat",
      align: "center",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: t("order.columns.total"),
      dataIndex: "tongTien",
      key: "tongTien",
      align: "right",
      render: (_, record) => {
        const total =
          record.tongTien ||
          record.chiTietDonHang?.reduce(
            (sum, item) => sum + item.donGia * item.soLuong,
            0
          ) ||
          0;
        return formatCurrency(total);
      },
    },
    {
      title: t("order.columns.status"),
      dataIndex: "trangThai",
      key: "trangThai",
      align: "center",
      render: (status) => renderStatus(status),
    },
    {
      title: t("order.columns.action"),
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="flex gap-2 justify-center items-center">
          <Button
            type="primary"
            size="small"
            onClick={() => handleViewDetail(record.maDonHang)}
          >
            {t("order.action.view")}
          </Button>
          <Button
            type="link"
            danger
            size="small"
            disabled={
              record.trangThai === "DA_HUY" ||
              record.trangThai === "HOAN_THANH" ||
              record.trangThai === "DANG_GIAO"
            }
            onClick={() => handleCancel(record.maDonHang)}
          >
            {t("order.action.cancel")}
          </Button>
        </div>
      ),
    },
  ];

  const detailColumns = [
    {
      title: t("order.detail.product"),
      dataIndex: ["sach", "tenSach"],
      key: "tenSach",
    },
    {
      title: t("order.detail.image"),
      dataIndex: ["sach", "hinhAnh"],
      key: "hinhAnh",
      render: (img) => <img src={img} alt="book" style={{ width: 50 }} />,
    },
    { title: t("order.detail.quantity"), dataIndex: "soLuong", key: "soLuong" },
    {
      title: t("order.detail.price"),
      dataIndex: "donGia",
      key: "donGia",
      render: (price) => formatCurrency(price),
    },
    {
      title: t("order.detail.total"),
      key: "total",
      render: (_, item) => formatCurrency(item.soLuong * item.donGia),
    },
  ];

  if (!token) {
    return <RequireLoginPage />;
  }

  const tabItems = [
    { key: "ALL", label: t("order.tabs.all") },
    { key: "Chờ xác nhận", label: t("order.tabs.pending") },
    { key: "Đã xác nhận", label: t("order.tabs.confirmed") },
    { key: "Đang giao", label: t("order.tabs.shipping") },
    { key: "Hoàn thành", label: t("order.tabs.completed") },
    { key: "Đã hủy", label: t("order.tabs.cancelled") },
  ];

  return (
    <div className="bg-blue-50 py-4 px-[80px] min-h-screen">
      <div className="pt-4 mb-6 px-4 rounded-md">
        <Breadcrumb
          items={[
            {
              key: 1,
              title: <Link to={"/home"}>{t("home.name")}</Link>,
            },
            {
              key: 2,
              title: t("order.title"),
            },
          ]}
        />
      </div>

      <Card className="min-h-[500px]">
        <h2 className="text-center text-3xl font-semibold mb-8">
          {t("order.title")}
        </h2>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          type="card"
          className="mb-4"
        />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            bordered
            dataSource={filteredOrders}
            columns={columns}
            rowKey="maDH"
            pagination={{ pageSize: 5 }}
            className="rounded-lg shadow-sm"
          />
        )}
      </Card>

      <Modal
        title={t("order.detail.title")}
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={false}
        width={800}
      >
        {loadingDetails ? (
          <div className="flex justify-center items-center py-10">
            <Spin />
          </div>
        ) : (
          <Table
            columns={detailColumns}
            dataSource={selectedOrderDetails}
            pagination={false}
            rowKey={(record) => record.sach.maSach || Math.random()}
          />
        )}
      </Modal>
    </div>
  );
};

export default Order;
