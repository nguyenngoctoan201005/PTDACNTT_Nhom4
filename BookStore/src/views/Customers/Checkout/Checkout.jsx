import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Select,
  message,
  Row,
  Col,
  Breadcrumb,
  Typography,
} from "antd";
import { Link } from "react-router";
import OrderCard from "../../../components/OrderCard";
import { useNavigate } from "react-router";

const { Option } = Select;

const Checkout = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [discount, setDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 300000,
    shipping: 10000,
    total: 310000,
  });
  const [products, setProducts] = useState([]);

  // Fake API data
  const orderData = {
    name: "Nguyễn Văn A",
    email: "a@gmail.com",
    phone: "0123456789",
    province: "Hà Nội",
    district: "Đống Đa",
    ward: "Phường Láng Hạ",
    address: "Số 12, ngõ 34 Láng Hạ",
    products: [
      {
        id: 1,
        name: "Sách A",
        author: "Tác giả A",
        price: 120,
        discountPrice: 100,
        discount: 20,
        quantity: 2,
        imageUrl: "https://placehold.co/100x140",
      },
      {
        id: 2,
        name: "Sách B",
        author: "Tác giả B",
        price: 150,
        quantity: 1,
        imageUrl: "https://placehold.co/100x140",
      },
    ],
  };

  const provinceData = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng"];
  const districtData = ["Đống Đa", "Ba Đình", "Cầu Giấy"];
  const wardData = ["Phường Láng Hạ", "Phường Thành Công", "Phường Trung Liệt"];

  const calcSummary = (productList, discountValue = discount) => {
    const subtotal = productList.reduce(
      (sum, p) => sum + (p.discountPrice ?? p.price) * p.quantity,
      0
    );
    setOrderSummary({
      subtotal,
      shipping: 10000,
      total: subtotal + 10000 - discountValue,
    });
  };

  useEffect(() => {
    form.setFieldsValue(orderData);
    setProducts(orderData.products);
    calcSummary(orderData.products);
  }, []);

  const handleApplyDiscount = () => {
    if (discountCode === "123456789") {
      const newDiscount = 8500;
      setDiscount(newDiscount);
      calcSummary(products, newDiscount);
      message.success("Áp dụng mã giảm giá thành công!");
    } else {
      setDiscount(0);
      calcSummary(products, 0);
      message.warning("Mã giảm giá không hợp lệ!");
    }
  };

  const handleQuantityChange = (id, newQty) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, quantity: newQty } : p
    );
    setProducts(updated);
    calcSummary(updated);
  };

  const handleRemove = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    calcSummary(updated);
  };

  const handleFinish = (values) => {
    console.log("Thông tin đặt hàng:", values);
    console.log("Sản phẩm:", products);
    console.log("Tóm tắt:", orderSummary);
    message.success("Đặt hàng thành công!");
  };

  return (
    <div className="bg-blue-50 py-8 mt-20 px-[80px]">
      <Breadcrumb
        items={[
          {
            key: 1,
            title: <Link to={"/home"}>Home</Link>,
          },
          {
            key: 2,
            title: <Link to={"/cart"}>Giỏ hàng</Link>,
          },
          {
            key: 3,
            title: "Đặt hàng",
          },
        ]}
      />
      <Typography.Title level={2}>Đặt hàng</Typography.Title>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Card>
              <h3 className="font-semibold text-lg mb-2">
                Thông tin khách hàng
              </h3>
              <Form.Item
                name="name"
                label="Họ và tên"
                rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
              >
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Vui lòng nhập email" }]}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Điện thoại"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                ]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
              <Form.Item
                name="province"
                label="Tỉnh / Thành phố"
                rules={[{ required: true, message: "Vui lòng chọn tỉnh" }]}
              >
                <Select placeholder="Chọn tỉnh / thành phố">
                  {provinceData.map((p) => (
                    <Option key={p} value={p}>
                      {p}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="district"
                label="Quận / Huyện"
                rules={[
                  { required: true, message: "Vui lòng chọn quận / huyện" },
                ]}
              >
                <Select placeholder="Chọn quận / huyện">
                  {districtData.map((d) => (
                    <Option key={d} value={d}>
                      {d}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="ward"
                label="Phường / Xã"
                rules={[
                  { required: true, message: "Vui lòng chọn phường / xã" },
                ]}
              >
                <Select placeholder="Chọn phường / xã">
                  {wardData.map((w) => (
                    <Option key={w} value={w}>
                      {w}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="address"
                label="Địa chỉ cụ thể"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
              >
                <Input.TextArea placeholder="Nhập địa chỉ cụ thể" rows={2} />
              </Form.Item>
            </Card>
          </Col>

          <Col span={8}>
            <Card className="h-full">
              <h3 className="font-semibold text-lg mb-2">Mã giảm giá</h3>
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Nhập mã giảm giá"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <Button type="primary" onClick={handleApplyDiscount}>
                  Áp dụng
                </Button>
              </div>

              {/* Card Đơn hàng */}
              <Card className="shadow-md bg-gray-50 border border-gray-200">
                <p>
                  <b>Số lượng sản phẩm:</b>{" "}
                  {orderData.products.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                  )}{" "}
                  sản phẩm
                </p>
                <p>
                  <b>Thành tiền:</b> {orderSummary.subtotal.toLocaleString()}đ
                </p>
                <p>
                  <b>Phí vận chuyển:</b>{" "}
                  {orderSummary.shipping.toLocaleString()}đ
                </p>
                <p>
                  <b>Giảm giá:</b> {discount.toLocaleString()}đ
                </p>
                <hr className="my-2" />
                <p className="text-lg font-semibold">
                  Tổng cộng: {orderSummary.total.toLocaleString()}đ
                </p>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full mt-4"
                  size="large"
                >
                  Đặt mua
                </Button>
                <Button
                  size="large"
                  onClick={() => navigate("/cart")}
                  className="w-full"
                  style={{ marginTop: 8 }}
                >
                  Quay về giỏ hàng
                </Button>
              </Card>
            </Card>
          </Col>
        </Row>
      </Form>

      <Card style={{ marginTop: 16 }}>
        <Row gutter={[16, 16]}>
          <Typography.Title level={2} style={{ margin: "0 20px" }}>
            Sản phẩm
          </Typography.Title>
          <Col span={24}>
            {products.length === 0 ? (
              <p>Giỏ hàng trống.</p>
            ) : (
              products.map((item) => (
                <OrderCard
                  key={item.id}
                  book={item}
                  onRemove={handleRemove}
                  onQuantityChange={handleQuantityChange}
                />
              ))
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Checkout;
