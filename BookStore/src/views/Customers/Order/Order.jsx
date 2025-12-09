import { Breadcrumb, Table, Tag, Button, message, Card } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";

const Order = () => {
  // Fake data đơn hàng
  const dataSource = [
    {
      key: "1",
      orderCode: "001",
      productName: "Sách 01 - Lập trình C++ cơ bản",
      quantity: 2,
      status: 1, // 1: Chờ xác nhận
    },
    {
      key: "2",
      orderCode: "002",
      productName: "Sách 02 - Cấu trúc dữ liệu và Giải thuật",
      quantity: 1,
      status: 2, // 2: Đã xác nhận
    },
    {
      key: "3",
      orderCode: "003",
      productName: "Sách 03 - Lập trình Web với React",
      quantity: 3,
      status: 3, // 3: Đang giao
    },
  ];

  const [orders, setOrders] = useState(dataSource);

  const renderStatus = (status) => {
    let text = "";
    let color = "";

    switch (status) {
      case 1:
        text = "Chờ xác nhận";
        color = "orange";
        break;
      case 2:
        text = "Đã xác nhận";
        color = "green";
        break;
      case 3:
        text = "Đang giao";
        color = "blue";
        break;
      case 4:
        text = "Hoàn thành";
        color = "success";
        break;
      case 5:
        text = "Đã hủy";
        color = "red";
        break;
      default:
        text = "Không xác định";
        color = "default";
    }

    return <Tag color={color}>{text}</Tag>;
  };

  // Cấu hình cột bảng
  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderCode",
      key: "orderCode",
      align: "center",
    },
    {
      title: "Sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => renderStatus(status),
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button
          type="link"
          danger
          disabled={record.status === 5 || record.status === 4}
          onClick={() => handleCancel(record.key)}
        >
          Hủy / Trả hàng
        </Button>
      ),
    },
  ];

  const handleCancel = (key) => {
    setOrders((prev) =>
      prev.map((order) => (order.key === key ? { ...order, status: 5 } : order))
    );
    message.success("Đơn hàng đã được hủy thành công!");
  };

  return (
    <div className="bg-blue-50 py-4 px-[80px]">
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

      <Card>
        <h2 className="text-center text-3xl font-semibold mb-8">Đơn hàng</h2>

        <Table
          bordered
          dataSource={orders}
          columns={columns}
          pagination={false}
          className="rounded-lg"
        />
      </Card>
    </div>
  );
};

export default Order;
