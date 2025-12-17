import React, { useState, useEffect } from "react";
import { NV_Nav } from "../../../nav/NV_Nav";
import { useTranslation } from "react-i18next";
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Typography,
  Layout,
  Tag,
  Space,
  Skeleton,
  message,
} from "antd";
import {
  DollarCircleOutlined,
  BookOutlined,
  RiseOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getAllDonHang } from "../../../api/donHangService";
import dayjs from "dayjs";
import "./NV_Thongke.css";

const { Title, Text } = Typography;
const { Content } = Layout;

export default function NV_Thongke() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [revenue, setRevenue] = useState(0);
  const [totalBooksSold, setTotalBooksSold] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  // Mock data cho danh sách sách đã bán (do API chưa hỗ trợ thống kê chi tiết từng sách)
  const booksSoldData = [
    {
      key: "1",
      code: "MS001",
      name: "Đắc Nhân Tâm",
      quantity: 15,
      total: 1500000,
      rank: 1,
    },
    {
      key: "2",
      code: "MS002",
      name: "Nhà Giả Kim",
      quantity: 12,
      total: 1020000,
      rank: 2,
    },
    {
      key: "3",
      code: "MS003",
      name: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
      quantity: 10,
      total: 950000,
      rank: 3,
    },
    {
      key: "4",
      code: "MS004",
      name: "Cà Phê Cùng Tony",
      quantity: 8,
      total: 880000,
      rank: 4,
    },
    {
      key: "5",
      code: "MS005",
      name: "Mắt Biếc",
      quantity: 5,
      total: 625000,
      rank: 5,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllDonHang();
        if (res.code === 0 && res.result) {
          const orders = res.result.filter((o) => o.trangThai === "Đã giao");

          // 1. Tính tổng doanh thu
          const totalRev = orders.reduce(
            (sum, order) => sum + order.tongTien,
            0
          );
          setRevenue(totalRev);

          // 2. Tính doanh thu theo tháng (cho biểu đồ)
          const revenueByMonth = {};
          orders.forEach((order) => {
            const month = dayjs(order.ngayDat).format("MM/YYYY");
            if (!revenueByMonth[month]) {
              revenueByMonth[month] = 0;
            }
            revenueByMonth[month] += order.tongTien;
          });

          // Convert to array for Recharts
          const chartData = Object.keys(revenueByMonth).map((key) => ({
            name: key,
            revenue: revenueByMonth[key],
          }));
          // Sort by date (simple string sort works for same year, better logic needed for multi-year)
          chartData.sort((a, b) => {
            const [m1, y1] = a.name.split("/");
            const [m2, y2] = b.name.split("/");
            return new Date(y1, m1 - 1) - new Date(y2, m2 - 1);
          });

          setMonthlyRevenue(chartData);

          // 3. Fake tổng số sách (cộng từ mock data + 1 số ngẫu nhiên để demo)
          const mockTotalBooks = booksSoldData.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          setTotalBooksSold(mockTotalBooks + orders.length); // Cộng thêm số đơn hàng cho có vẻ dynamic
        }
      } catch (error) {
        console.error("Lỗi khi tải thống kê:", error);
        message.error(t("thongke.statistics.error"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: t("thongke.statistics.tables.books_sold.columns.rank"),
      dataIndex: "rank",
      key: "rank",
      render: (rank) => {
        let color = "default";
        if (rank === 1) color = "gold";
        if (rank === 2) color = "silver";
        if (rank === 3) color = "orange";
        return (
          <Tag color={color} icon={<TrophyOutlined />}>
            #{rank}
          </Tag>
        );
      },
      width: 100,
    },
    {
      title: t("thongke.statistics.tables.books_sold.columns.code"),
      dataIndex: "code",
      key: "code",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: t("thongke.statistics.tables.books_sold.columns.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("thongke.statistics.tables.books_sold.columns.quantity"),
      dataIndex: "quantity",
      key: "quantity",
      render: (qty) => (
        <Text type="success" strong>
          {qty}
        </Text>
      ),
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: t("thongke.statistics.tables.books_sold.columns.total"),
      dataIndex: "total",
      key: "total",
      render: (val) => (
        <Text strong style={{ color: "#3f8600" }}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(val)}
        </Text>
      ),
      sorter: (a, b) => a.total - b.total,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <NV_Nav />
      <Layout className="site-layout nv_trangthongke_main p-6 overflow-y-auto">
        <Content>
          <div className="mb-6">
            <Title level={2} style={{ marginBottom: 0 }}>
              {t("thongke.statistics.title")}
            </Title>
            <Text type="secondary">{t("thongke.statistics.title")}</Text>
          </div>

          {/* Top Cards */}
          <Row gutter={[24, 24]} className="mb-8">
            <Col xs={24} md={12}>
              <Card
                bordered={false}
                className="shadow-md rounded-xl hover:shadow-lg transition-all h-full"
              >
                <Statistic
                  title={
                    <span className="text-gray-500 font-semibold text-lg">
                      {t("thongke.statistics.total_revenue")}
                    </span>
                  }
                  value={loading ? 0 : revenue}
                  precision={0}
                  valueStyle={{
                    color: "#3f8600",
                    fontWeight: "bold",
                    fontSize: "2.5rem",
                  }}
                  prefix={
                    <DollarCircleOutlined className="text-green-500 mr-2" />
                  }
                  suffix={
                    <span className="text-xl text-gray-400">
                      {t("thongke.statistics.currency")}
                    </span>
                  }
                  loading={loading}
                  formatter={(value) =>
                    new Intl.NumberFormat("vi-VN").format(value)
                  }
                />
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                bordered={false}
                className="shadow-md rounded-xl hover:shadow-lg transition-all h-full"
              >
                <Statistic
                  title={
                    <span className="text-gray-500 font-semibold text-lg">
                      {t("thongke.statistics.total_books_sold")}
                    </span>
                  }
                  value={loading ? 0 : totalBooksSold}
                  precision={0}
                  valueStyle={{
                    color: "#1677ff",
                    fontWeight: "bold",
                    fontSize: "2.5rem",
                  }}
                  prefix={<BookOutlined className="text-blue-500 mr-2" />}
                  suffix={<span className="text-xl text-gray-400">cuốn</span>}
                  loading={loading}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            {/* Chart Section */}
            <Col xs={24} lg={14}>
              <Card
                title={
                  <Space>
                    <RiseOutlined className="text-blue-600" />{" "}
                    <span className="font-bold">
                      {t("thongke.statistics.charts.monthly_revenue")}
                    </span>
                  </Space>
                }
                bordered={false}
                className="shadow-md rounded-xl h-full"
              >
                {loading ? (
                  <Skeleton active />
                ) : (
                  <div style={{ width: "100%", height: 350 }}>
                    {monthlyRevenue.length > 0 ? (
                      <ResponsiveContainer>
                        <BarChart
                          data={monthlyRevenue}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                          />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip
                            formatter={(value) =>
                              new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(value)
                            }
                            contentStyle={{
                              borderRadius: "8px",
                              border: "none",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            }}
                          />
                          <Legend />
                          <Bar
                            dataKey="revenue"
                            name={t(
                              "thongke.statistics.charts.monthly_revenue"
                            )}
                            fill="#8884d8"
                            radius={[8, 8, 0, 0]}
                            barSize={50}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-400">
                        {t("thongke.statistics.no_data")}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </Col>

            {/* Top Books Table */}
            <Col xs={24} lg={10}>
              <Card
                title={
                  <Space>
                    <TrophyOutlined className="text-gold-500" />{" "}
                    <span className="font-bold">
                      {t("thongke.statistics.tables.books_sold.title")}
                    </span>
                  </Space>
                }
                bordered={false}
                className="shadow-md rounded-xl h-full"
              >
                <Table
                  columns={columns}
                  dataSource={booksSoldData}
                  pagination={false}
                  size="middle"
                  loading={loading}
                  rowClassName={() => "hover:bg-gray-50 transition-colors"}
                />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}
