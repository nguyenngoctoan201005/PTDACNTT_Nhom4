import { useEffect, useState, useMemo } from "react";
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
import {
  getListProvinces,
  getProvinceDetail,
} from "../../../api/provinceService";
import { useGlobalContext } from "../../../GlobalContext";
import { insertDonHang } from "../../../api/donHangService";
import { formatCurrency } from "../../../hooks/formatCurrentcy";

const { Option } = Select;

const Checkout = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { user, cart, fetchCart } = useGlobalContext();

  const [discount, setDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    total: 0,
  });
  const [products, setProducts] = useState([]);

  const orderData = {
    ...user,
    ...cart,
  };

  const [provinces, setProvinces] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    getListProvinces()
      .then((data) => {
        setProvinces(data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách tỉnh:", error);
      });
  }, []);

  useEffect(() => {
    if (!selectedCity) return;
    getProvinceDetail(selectedCity, 2)
      .then((data) => {
        setWards(data.wards);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách xã:", error);
      });
  }, [selectedCity]);

  const provinceOptions = useMemo(
    () => provinces.map((p) => ({ label: p.name, value: p.code })),
    [provinces]
  );

  const wardOptions = useMemo(
    () => wards.map((p) => ({ label: p.name, value: p.code })),
    [wards]
  );

  const handleChangeCity = (value) => {
    setSelectedCity(value);
    form.setFieldValue("ward", null);
  };

  useEffect(() => {
    form.setFieldsValue(orderData);
    if (orderData.chiTietGHResponses) {
      setProducts(orderData.chiTietGHResponses);
    }
  }, [cart]);

  useEffect(() => {
    const subtotal = products.reduce((sum, item) => {
      const price = item.sach.donGia;
      const itemDiscount = item.sach.discount || 0;
      const discountedPrice = itemDiscount
        ? Math.round(price - (price * itemDiscount) / 100)
        : price;
      return sum + discountedPrice * item.soLuong;
    }, 0);

    setOrderSummary({
      subtotal: subtotal,
      total: subtotal - discount,
    });
  }, [products, discount]);

  const handleApplyDiscount = () => {
    if (discountCode === "123456789") {
      const newDiscount = 8500;
      setDiscount(newDiscount);
      message.success("Áp dụng mã giảm giá thành công!");
    } else {
      setDiscount(0);
      message.warning("Mã giảm giá không hợp lệ!");
    }
  };

  const handleRemove = (id) => {
    const updated = products.filter((p) => p.sach.maSach !== id);
    setProducts(updated);
    fetchCart();
  };

  const handleQuantityChange = (id, newQty) => {
    setProducts((prev) =>
      prev.map((p) => (p.sach.maSach === id ? { ...p, soLuong: newQty } : p))
    );
    fetchCart();
  };

  const handleFinish = async (values) => {
    try {
      const payload = {
        tenNguoiNhan: values.hoTen,
        email: values.email,
        diaChiGiaoHang: `${values.address}, ${values.ward}, ${values.city}`,
        phiGiaoHang: orderSummary.total,
        trangThai: "CHO_XAC_NHAN",
        ngayDat: new Date().toISOString().split("T")[0],
        soDTNguoiNhan: values.soDT,
        maNV: 1,
        maGiamGia: discount > 0 ? 1 : 1,
        maKH: user?.maKH,
        maPTTT: 1,
        maQuanHuyen: values.ward,
        chiTietDonHang: products.map((p) => ({
          maSach: p.sach.id,
          soLuong: p.soLuong,
          donGia: p.sach.donGia,
        })),
      };

      console.log("Payload gửi lên:", payload);

      await insertDonHang(payload);

      message.success("Đặt hàng thành công!");
      fetchCart();
      navigate("/orders");
    } catch (error) {
      console.error("Lỗi đặt hàng:", error);
      message.error("Đặt hàng thất bại, vui lòng thử lại!");
    }
  };

  const orderBooks = products.map((c) => ({
    ...c.sach,
    soLuong: c.soLuong,
  }));

  return (
    <div className="bg-blue-50 py-8 px-[80px]">
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
                name="hoTen"
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
                name="soDT"
                label="Điện thoại"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                ]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
              <Form.Item
                name="city"
                label={
                  <span className="font-medium text-gray-700">Thành phố</span>
                }
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn thành phố của bạn!",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Chọn thành phố"
                  optionFilterProp="label"
                  onChange={handleChangeCity}
                  // onSearch={onSearch}
                  options={provinceOptions}
                />
              </Form.Item>
              <Form.Item
                name="ward"
                label={
                  <span className="font-medium text-gray-700">Phường/Xã</span>
                }
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn phường/xã của bạn",
                  },
                ]}
              >
                <Select
                  showSearch
                  virtual
                  placeholder="Chọn phường xã"
                  optionFilterProp="label"
                  // onChange={(value) => setSelectedCity(value)}
                  // onSearch={onSearch}
                  options={wardOptions}
                />
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
                  {products.reduce((sum, item) => sum + item.soLuong, 0)} sản
                  phẩm
                </p>
                <p>
                  <b>Thành tiền:</b> {formatCurrency(orderSummary.subtotal)}
                </p>
                <p>
                  <b>Giảm giá:</b> {discount.toLocaleString()}đ
                </p>
                <hr className="my-2" />
                <p className="text-lg font-semibold">
                  Tổng cộng: {formatCurrency(orderSummary.total)}
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
            {orderBooks.length === 0 ? (
              <p>Giỏ hàng trống.</p>
            ) : (
              orderBooks.map((item) => (
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
