import React, { useState, useEffect } from "react";
import { NV_Nav } from "../../../nav/NV_Nav";
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Tag,
  Avatar,
  List,
  DatePicker,
  Space,
  Button,
  message,
} from "antd";
import dayjs from "dayjs";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DollarCircleOutlined,
  ShoppingCartOutlined,
  WarningOutlined,
  StarOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import "./NV_Bangdieukhien.css";

// IMPORT SERVICE DỮ LIỆU THẬT
import { getAllDonHang } from "../../../api/donHangService";
import { getListDanhGia } from "../../../api/danhGiaService";
import { getAllSachs } from "../../../api/sachService";

const { RangePicker } = DatePicker;

// --- Dữ liệu Mock (Giữ lại cho biểu đồ nếu chưa có API) ---
const revenueData = [
  { name: "Jan", revenue: 4000, profit: 2400 },
  { name: "Feb", revenue: 3000, profit: 1398 },
  { name: "Mar", revenue: 2000, profit: 9800 },
  { name: "Apr", revenue: 2780, profit: 3908 },
  { name: "May", revenue: 1890, profit: 4800 },
  { name: "Jun", revenue: 2390, profit: 3800 },
  { name: "Jul", revenue: 3490, profit: 4300 },
];

const categoryData = [
  { name: "Tiểu Thuyết", value: 400 },
  { name: "Kinh Tế", value: 300 },
  { name: "Khoa Học", value: 300 },
  { name: "Thiếu Nhi", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

// --- Hàm chuyển trạng thái từ VN sang EN để dùng chung Tag màu ---
const mapStatusToEnglish = (statusVN) => {
  switch (statusVN) {
    case "Đã giao":
      return "Đã giao";
    case "Chờ xác nhận":
      return "Chờ xác nhận";
    case "Đang giao":
      return "Đang giao";
    case "Đã hủy":
      return "Đã hủy";
    case "Trả hàng":
      return "Trả hàng";
    default:
      return "Default";
  }
};


export default function NV_Bangdieukhien() {
  const [dateRange, setDateRange] = useState([
    dayjs().startOf("month"),
    dayjs(),
  ]);

  // STATE MỚI CHO DỮ LIỆU THẬT
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0); // <<< STATE MỚI CHO DOANH THU

  // USE EFFECT GỌI API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Lấy tất cả đơn hàng (cho Tổng doanh thu, Đơn hàng gần đây, Trả hàng)
        const ordersRes = await getAllDonHang();
        if (ordersRes.code === 0 && ordersRes.result) {
          const allOrders = ordersRes.result;

          // Tính Tổng Doanh Thu (chỉ tính các đơn "Đã giao")
          const revenue = allOrders
            .filter(order => order.trangThai === "Đã giao")
            .reduce((sum, order) => sum + order.tongTien, 0);

          setTotalRevenue(revenue); // <<< SET DOANH THU THẬT

          // Sắp xếp đơn hàng theo maDonHang giảm dần (ID cao nhất = mới nhất)
          const sortedOrders = allOrders.sort((a, b) =>
            b.maDonHang - a.maDonHang
          );
          setOrders(sortedOrders);
        }

        // 2. Lấy danh sách đánh giá mới
        const reviewsRes = await getListDanhGia();
        if (reviewsRes.code === 0 && reviewsRes.result) {
          setReviews(reviewsRes.result.slice(0, 5));
        }

        // 3. Lấy sách tồn kho thấp
        const lowStockRes = await getAllSachs({});
        if (lowStockRes.code === 0 && lowStockRes.result && lowStockRes.result.data) {
          const filteredLowStock = lowStockRes.result.data
            .filter(sach => sach.soLuongCo < 10)
            .map(sach => ({
              key: sach.maSach,
              name: sach.tenSach,
              code: `S${sach.maSach}`,
              stock: sach.soLuongCo,
            }))
            .slice(0, 5);
          setLowStock(filteredLowStock);
        }

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        message.error("Lỗi khi tải dữ liệu tổng quan. Vui lòng kiểm tra console.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onDateChange = (dates) => {
    if (dates) {
      setDateRange(dates);
    }
  };

  const renderStatusTag = (status) => {
    let color = "";
    switch (status) {
      case "Đã giao":
        color = "green";
        break;
      case "Chờ xác nhận":
        color = "orange";
        break;
      case "Đang giao":
        color = "blue";
        break;
      case "Đã hủy":
        color = "red";
        break;
      case "Trả hàng":
        color = "gold";
        break;
      default:
        color = "default";
    }
    return <Tag color={color}>{status}</Tag>;
  };

  // CHUẨN BỊ DỮ LIỆU THẬT CHO CÁC MỤC

  // 1. Đơn hàng gần đây
  const recentOrdersData = orders
    .slice(0, 5)
    .map((order) => ({
      key: order.maDonHang,
      id: `#ORD-${order.maDonHang}`,
      customer: order.tenNguoiNhan,
      date: dayjs(order.ngayDat).format('DD/MM/YYYY'),
      amount: new Intl.NumberFormat("vi-VN").format(order.tongTien) + " đ",
      status: mapStatusToEnglish(order.trangThai),
    }));

  // 2. Yêu cầu trả hàng
  const returnRequestsData = orders
    .filter(order => order.trangThai === "Trả hàng")
    .map(order => ({
      key: order.maDonHang,
      orderId: `DH${order.maDonHang}`,
      reason: order.ghiChu || "Yêu cầu trả hàng không có lý do cụ thể",
      customer: order.tenNguoiNhan,
      date: dayjs(order.ngayDat).format('DD/MM/YYYY'),
    }));

  // 3. Đánh giá mới
  const newReviewsData = reviews.map(review => ({
    key: review.maDanhGia,
    orderId: `DG${review.maDanhGia}`,
    stars: review.soSao,
    customer: review.hoTen || "Khách ẩn danh",
    comment: review.binhLuan,
  }));

  // Dữ liệu Statistic Cards
  const totalReturnRequests = returnRequestsData.length;
  const totalNewReviews = newReviewsData.length;


  const orderColumns = [
    { title: "Mã ĐH", dataIndex: "id", key: "id" },
    { title: "Khách hàng", dataIndex: "customer", key: "customer" },
    { title: "Ngày đặt", dataIndex: "date", key: "date" },
    {
      title: "Tổng tiền",
      dataIndex: "amount",
      key: "amount",
      render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => renderStatusTag(status),
    },
  ];

  const lowStockColumns = [
    { title: "Sản phẩm", dataIndex: "name", key: "name" },
    { title: "Mã SP", dataIndex: "code", key: "code" },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      key: "stock",
      render: (text) => <span className="text-red-600 font-bold">{text}</span>,
    },
    {
      title: "Hành động",
      key: "action",
      render: () => <Button type="link" size="small">Nhập hàng</Button>,
    },
  ];

  return (
    <>
      <NV_Nav />
      {/* Container chính */}
      <main className="nv_trangbdk_main bg-gray-50 min-h-screen p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 m-0">
            Tổng quan hệ thống
          </h2>
        </div>

        {/* Row 1: Statistic Cards */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <Card
              bordered={false}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <Statistic
                title="Tổng doanh thu"
                value={totalRevenue} // <<< DỮ LIỆU THẬT
                precision={0}
                valueStyle={{ color: "#3f8600", fontWeight: "bold" }}
                prefix={<DollarCircleOutlined />}
                suffix="đ"
                formatter={(value) =>
                  new Intl.NumberFormat("vi-VN").format(value)
                }
              />
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <ArrowUpOutlined />{" "}
                {/* Giữ lại mock data so sánh nếu chưa có logic lọc theo thời gian */}
                <span className="ml-1">10% so với tháng trước</span>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card
              bordered={false}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <Statistic
                title="Tổng đơn hàng"
                value={orders.length || 0}
                precision={0}
                valueStyle={{ color: "#1677ff", fontWeight: "bold" }}
                prefix={<ShoppingCartOutlined />}
              />
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <ArrowUpOutlined />{" "}
                <span className="ml-1">5% so với tháng trước</span>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card
              bordered={false}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <Statistic
                title="Yêu cầu trả hàng"
                value={totalReturnRequests}
                precision={0}
                valueStyle={{ color: "#cf1322", fontWeight: "bold" }}
                prefix={<UndoOutlined />}
              />
              <div className="flex items-center mt-2 text-red-500 text-sm">
                {totalReturnRequests > 0 ? <ArrowDownOutlined /> : <span className="ml-1">Không có yêu cầu</span>}{" "}
                <span className="ml-1">{totalReturnRequests > 0 ? "Cần xử lý ngay" : ""}</span>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card
              bordered={false}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <Statistic
                title="Đánh giá mới"
                value={totalNewReviews}
                precision={0}
                valueStyle={{ color: "#faad14", fontWeight: "bold" }}
                prefix={<StarOutlined />}
              />
              <div className="flex items-center mt-2 text-gray-500 text-sm">
                <span>Trong 7 ngày qua</span>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Row 2: Charts (Dữ liệu Mock) */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} lg={16}>
            <Card
              title="Biểu đồ doanh thu"
              extra={
                <Space>
                  <span className="text-gray-600 font-medium">Lọc:</span>
                  <RangePicker
                    defaultValue={[dayjs().startOf("month"), dayjs()]}
                    format="DD/MM/YYYY"
                    onChange={onDateChange}
                  />
                </Space>
              }
              bordered={false}
              className="shadow-sm h-full"
            >
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <AreaChart
                    data={revenueData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8884d8"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8884d8"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorProfit"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#82ca9d"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#82ca9d"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip
                      formatter={(value) =>
                        new Intl.NumberFormat("en-US").format(value) + " $"
                      }
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      name="Doanh thu"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                    <Area
                      type="monotone"
                      dataKey="profit"
                      name="Lợi nhuận"
                      stroke="#82ca9d"
                      fillOpacity={1}
                      fill="url(#colorProfit)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card
              title="Tỷ lệ danh mục"
              bordered={false}
              className="shadow-sm h-full"
            >
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Row 3: Recent Orders and Low Stock */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} lg={14}>
            <Card
              title="Đơn hàng gần đây"
              bordered={false}
              className="shadow-sm h-full"
              extra={<a href="#">Xem tất cả</a>}
            >
              <Table
                columns={orderColumns}
                dataSource={recentOrdersData}
                pagination={false}
                loading={loading}
                size="small"
              />
            </Card>
          </Col>
          <Col xs={24} lg={10}>
            <Card
              title={
                <Space>
                  <WarningOutlined style={{ color: "red" }} />
                  <span className="text-red-600">Cảnh báo tồn kho thấp</span>
                </Space>
              }
              bordered={false}
              className="shadow-sm h-full"
              extra={<Tag color="red">{lowStock.length} sản phẩm</Tag>}
            >
              <Table
                columns={lowStockColumns}
                dataSource={lowStock}
                pagination={false}
                loading={loading}
                size="small"
              />
            </Card>
          </Col>
        </Row>

        {/* Row 4: Return Requests and Reviews */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card
              title={
                <Space>
                  <UndoOutlined style={{ color: "#fa8c16" }} />
                  <span>Yêu cầu trả hàng</span>
                </Space>
              }
              bordered={false}
              className="shadow-sm h-full"
              extra={<Tag color="orange">{totalReturnRequests} yêu cầu</Tag>}
            >
              <List
                itemLayout="horizontal"
                dataSource={returnRequestsData}
                loading={loading}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{ backgroundColor: "#fa8c16" }}
                          icon={<UndoOutlined />}
                        />
                      }
                      title={
                        <div className="flex justify-between">
                          <span className="font-semibold">{item.orderId}</span>
                          <span className="text-gray-400 text-xs">
                            {item.date}
                          </span>
                        </div>
                      }
                      description={
                        <div>
                          <div className="text-gray-800">{item.reason}</div>
                          <div className="text-gray-500 text-xs">
                            Khách: {item.customer}
                          </div>
                        </div>
                      }
                    />
                    <Button size="small">Xử lý</Button>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card
              title={
                <Space>
                  <StarOutlined style={{ color: "#fadb14" }} />
                  <span>Đánh giá mới</span>
                </Space>
              }
              bordered={false}
              className="shadow-sm h-full"
              extra={<Tag color="gold">{totalNewReviews} đánh giá</Tag>}
            >
              <List
                itemLayout="horizontal"
                dataSource={newReviewsData}
                loading={loading}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                      title={
                        <div className="flex justify-between">
                          <span className="font-semibold">{item.customer}</span>
                          <span className="text-yellow-500">
                            {item.stars} <StarOutlined />
                          </span>
                        </div>
                      }
                      description={
                        <div>
                          <div>"{item.comment}"</div>
                          <div className="text-gray-400 text-xs">
                            Đơn hàng: {item.orderId}
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </main>
    </>
  );
}