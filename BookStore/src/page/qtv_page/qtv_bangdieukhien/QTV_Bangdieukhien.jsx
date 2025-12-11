import React from "react";
import { QTV_Nav } from "../../../nav/QTV_Nav";
import { Card, Row, Col, Statistic, Table, Tag, Avatar, List } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DollarCircleOutlined,
  ShoppingCartOutlined,
  UsergroupAddOutlined,
  BookOutlined,
} from "@ant-design/icons";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import "./QTV_Bangdieukhien.css";

// --- Fake Data ---

const revenueData = [
  { name: "Jan", revenue: 4000, profit: 2400 },
  { name: "Feb", revenue: 3000, profit: 1398 },
  { name: "Mar", revenue: 2000, profit: 9800 },
  { name: "Apr", revenue: 2780, profit: 3908 },
  { name: "May", revenue: 1890, profit: 4800 },
  { name: "Jun", revenue: 2390, profit: 3800 },
  { name: "Jul", revenue: 3490, profit: 4300 },
  { name: "Aug", revenue: 4000, profit: 2400 },
  { name: "Sep", revenue: 3000, profit: 1398 },
  { name: "Oct", revenue: 5000, profit: 6800 },
  { name: "Nov", revenue: 6000, profit: 8800 },
  { name: "Dec", revenue: 8000, profit: 9900 },
];

const categoryData = [
  { name: "Tiểu thuyết", value: 400 },
  { name: "Kinh tế", value: 300 },
  { name: "Tâm lý", value: 300 },
  { name: "Truyện tranh", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const recentOrders = [
  {
    key: "1",
    id: "#ORD-001",
    customer: "Nguyễn Văn A",
    date: "2025-10-24",
    amount: "500.000 đ",
    status: "Completed",
  },
  {
    key: "2",
    id: "#ORD-002",
    customer: "Trần Thị B",
    date: "2025-10-24",
    amount: "250.000 đ",
    status: "Pending",
  },
  {
    key: "3",
    id: "#ORD-003",
    customer: "Lê Văn C",
    date: "2025-10-23",
    amount: "1.200.000 đ",
    status: "Processing",
  },
  {
    key: "4",
    id: "#ORD-004",
    customer: "Phạm Thị D",
    date: "2025-10-23",
    amount: "89.000 đ",
    status: "Cancelled",
  },
  {
    key: "5",
    id: "#ORD-005",
    customer: "Hoàng Văn E",
    date: "2025-10-22",
    amount: "450.000 đ",
    status: "Completed",
  },
];

const topBooks = [
  { name: "Đắc Nhân Tâm", sales: 1200 },
  { name: "Nhà Giả Kim", sales: 980 },
  { name: "Tuổi Trẻ Đáng Giá Bao Nhiêu", sales: 850 },
  { name: "Cà Phê Cùng Tony", sales: 600 },
  { name: "Mắt Biếc", sales: 450 },
];

export default function QTV_Bangdieukhien() {
  const renderStatusTag = (status) => {
    let color = "";
    switch (status) {
      case "Completed":
        color = "green";
        break;
      case "Pending":
        color = "orange";
        break;
      case "Processing":
        color = "blue";
        break;
      case "Cancelled":
        color = "red";
        break;
      default:
        color = "default";
    }
    return <Tag color={color}>{status}</Tag>;
  };

  const columns = [
    {
      title: "Mã ĐH",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
    },
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

  return (
    <>
      <QTV_Nav />
      {/* Container chính, padding điều chỉnh cho phù hợp layout */}
      <main className="qtv_trangbdk_main bg-gray-50 min-h-screen p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Tổng quan hệ thống
        </h2>

        {/* Row 1: Statistic Cards */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <Card
              bordered={false}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <Statistic
                title="Tổng doanh thu"
                value={1250000000}
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
                <span className="ml-1">12% so với tháng trước</span>
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
                value={3500}
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
                title="Khách hàng mới"
                value={150}
                precision={0}
                valueStyle={{ color: "#cf1322", fontWeight: "bold" }}
                prefix={<UsergroupAddOutlined />}
              />
              <div className="flex items-center mt-2 text-red-500 text-sm">
                <ArrowDownOutlined />{" "}
                <span className="ml-1">2% so với tháng trước</span>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card
              bordered={false}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <Statistic
                title="Sách đang bán"
                value={1200}
                precision={0}
                valueStyle={{ color: "#faad14", fontWeight: "bold" }}
                prefix={<BookOutlined />}
              />
              <div className="flex items-center mt-2 text-gray-500 text-sm">
                <span>Đang cập nhật thêm</span>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Row 2: Charts */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} lg={16}>
            <Card
              title="Biểu đồ doanh thu năm 2025"
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
              title="Tỷ lệ theo thể loại"
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

        {/* Row 3: Bottom Tables/Lists */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Card
              title="Đơn hàng gần đây"
              bordered={false}
              className="shadow-sm"
            >
              <Table
                columns={columns}
                dataSource={recentOrders}
                pagination={false}
                size="small"
              />
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="Sách bán chạy" bordered={false} className="shadow-sm">
              <List
                itemLayout="horizontal"
                dataSource={topBooks}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor: index < 3 ? "#f56a00" : "#87d068",
                          }}
                        >
                          {index + 1}
                        </Avatar>
                      }
                      title={<a href="#">{item.name}</a>}
                      description={`Đã bán: ${item.sales} cuốn`}
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
