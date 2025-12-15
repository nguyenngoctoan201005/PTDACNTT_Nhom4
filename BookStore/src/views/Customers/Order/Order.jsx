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
  getDonHangOfUser,
  getDetailDonHang,
} from "../../../api/donHangService";
import { formatCurrency } from "../../../hooks/formatCurrentcy";

const Order = () => {
  const { token, user } = useGlobalContext();
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
      const data = await getDonHangOfUser();
      setOrders(data.result || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      message.error("Không thể tải danh sách đơn hàng.");
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
      message.error("Không thể lấy chi tiết đơn hàng.");
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
        text = "Chờ xác nhận";
        color = "orange";
        break;
      case "Đã xác nhận":
        text = "Đã xác nhận";
        color = "green";
        break;
      case "Đang giao":
        text = "Đang giao";
        color = "blue";
        break;
      case "Hoàn thành":
        text = "Hoàn thành";
        color = "success";
        break;
      case "Đã hủy":
        text = "Đã hủy";
        color = "red";
        break;
      default:
        text = status;
        color = "default";
    }

    return <Tag color={color}>{text}</Tag>;
  };

  const handleCancel = (maDH) => {
    message.warning("Chức năng hủy đơn hàng đang được cập nhật.");
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "ALL") return true;
    return order.trangThai === activeTab;
  });

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "maDonHang",
      key: "maDonHang",
      align: "center",
      render: (text) => <b>#{text}</b>,
    },
    {
      title: "Ngày đặt",
      dataIndex: "ngayDat",
      key: "ngayDat",
      align: "center",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Tổng tiền",
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
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      align: "center",
      render: (status) => renderStatus(status),
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="flex gap-2 justify-center items-center">
          <Button
            type="primary"
            size="small"
            onClick={() => handleViewDetail(record.maDonHang)}
          >
            Xem chi tiết
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
            Hủy đơn
          </Button>
        </div>
      ),
    },
  ];

  const detailColumns = [
    { title: "Sản phẩm", dataIndex: ["sach", "tenSach"], key: "tenSach" },
    {
      title: "Hình ảnh",
      dataIndex: ["sach", "hinhAnh"],
      key: "hinhAnh",
      render: (img) => <img src={img} alt="book" style={{ width: 50 }} />,
    },
    { title: "Số lượng", dataIndex: "soLuong", key: "soLuong" },
    {
      title: "Đơn giá",
      dataIndex: "donGia",
      key: "donGia",
      render: (price) => formatCurrency(price),
    },
    {
      title: "Thành tiền",
      key: "total",
      render: (_, item) => formatCurrency(item.soLuong * item.donGia),
    },
  ];

  if (!token) {
    return <RequireLoginPage />;
  }

  const tabItems = [
    { key: "ALL", label: "Tất cả" },
    { key: "Chờ xác nhận", label: "Chờ xác nhận" },
    { key: "Đã xác nhận", label: "Đã xác nhận" },
    { key: "Đang giao", label: "Đang giao" },
    { key: "Hoàn thành", label: "Hoàn thành" },
    { key: "Đã hủy", label: "Đã hủy" },
  ];

  return (
    <div className="bg-blue-50 py-4 px-[80px] min-h-screen">
      <div className="pt-4 mb-6 px-4 rounded-md">
        <Breadcrumb
          items={[
            {
              key: 1,
              title: <Link to={"/home"}>Trang chủ</Link>,
            },
            {
              key: 2,
              title: "Đơn hàng của tôi",
            },
          ]}
        />
      </div>

      <Card className="min-h-[500px]">
        <h2 className="text-center text-3xl font-semibold mb-8">
          Đơn hàng của tôi
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
        title="Chi tiết đơn hàng"
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
