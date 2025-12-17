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
import RequireLoginPage from "../../../components/RequireLoginPage/RequireLoginPage";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const Checkout = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { user, cart, fetchCart, token } = useGlobalContext();
  const { t } = useTranslation();

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
      message.success(t("cart.checkout_page.discount.success"));
    } else {
      setDiscount(0);
      message.warning(t("cart.checkout_page.discount.invalid"));
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
        phiGiaoHang: 0,
        trangThai: "CHO_XAC_NHAN",
        ngayDat: new Date().toISOString().split("T")[0],
        soDTNguoiNhan: values.soDT,
        maNV: 1,
        maGiamGia: Number(discountCode),
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

      await insertDonHang(payload);

      message.success(t("cart.checkout_page.success"));
      fetchCart();
      navigate("/orders");
    } catch (error) {
      console.error("Lỗi đặt hàng:", error);
      message.error(t("cart.checkout_page.error"));
    }
  };

  const orderBooks = products.map((c) => ({
    ...c.sach,
    soLuong: c.soLuong,
  }));

  if (!token) {
    return <RequireLoginPage />;
  }

  return (
    <div className="bg-blue-50 py-8 px-[80px]">
      <Breadcrumb
        items={[
          {
            key: 1,
            title: <Link to={"/home"}>{t("home.name")}</Link>,
          },
          {
            key: 2,
            title: <Link to={"/cart"}>{t("cart.title")}</Link>,
          },
          {
            key: 3,
            title: t("cart.checkout_page.title"),
          },
        ]}
      />
      <Typography.Title level={2}>
        {t("cart.checkout_page.title")}
      </Typography.Title>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Card>
              <h3 className="font-semibold text-lg mb-2">
                {t("cart.checkout_page.customer_info")}
              </h3>
              <Form.Item
                name="hoTen"
                label={t("cart.checkout_page.form.name")}
                rules={[
                  {
                    required: true,
                    message: t("common.validation.required", {
                      field: t("cart.checkout_page.form.name").toLowerCase(),
                    }),
                  },
                ]}
              >
                <Input
                  placeholder={t("cart.checkout_page.form.placeholder.name")}
                />
              </Form.Item>
              <Form.Item
                name="email"
                label={t("cart.checkout_page.form.email")}
                rules={[
                  {
                    required: true,
                    message: t("common.validation.required", {
                      field: t("cart.checkout_page.form.email").toLowerCase(),
                    }),
                  },
                ]}
              >
                <Input
                  placeholder={t("cart.checkout_page.form.placeholder.email")}
                />
              </Form.Item>
              <Form.Item
                name="soDT"
                label={t("cart.checkout_page.form.phone")}
                rules={[
                  {
                    required: true,
                    message: t("common.validation.required", {
                      field: t("cart.checkout_page.form.phone").toLowerCase(),
                    }),
                  },
                ]}
              >
                <Input
                  placeholder={t("cart.checkout_page.form.placeholder.phone")}
                />
              </Form.Item>
              <Form.Item
                name="city"
                label={
                  <span className="font-medium text-gray-700">
                    {t("cart.checkout_page.form.city")}
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: t("common.validation.required", {
                      field: t("cart.checkout_page.form.city").toLowerCase(),
                    }),
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder={t("cart.checkout_page.form.placeholder.city")}
                  optionFilterProp="label"
                  onChange={handleChangeCity}
                  // onSearch={onSearch}
                  options={provinceOptions}
                />
              </Form.Item>
              <Form.Item
                name="ward"
                label={
                  <span className="font-medium text-gray-700">
                    {t("cart.checkout_page.form.ward")}
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: t("common.validation.required", {
                      field: t("cart.checkout_page.form.ward").toLowerCase(),
                    }),
                  },
                ]}
              >
                <Select
                  showSearch
                  virtual
                  placeholder={t("cart.checkout_page.form.placeholder.ward")}
                  optionFilterProp="label"
                  // onChange={(value) => setSelectedCity(value)}
                  // onSearch={onSearch}
                  options={wardOptions}
                />
              </Form.Item>
              <Form.Item
                name="address"
                label={t("cart.checkout_page.form.address")}
                rules={[
                  {
                    required: true,
                    message: t("common.validation.required", {
                      field: t("cart.checkout_page.form.address").toLowerCase(),
                    }),
                  },
                ]}
              >
                <Input.TextArea
                  placeholder={t("cart.checkout_page.form.placeholder.address")}
                  rows={2}
                />
              </Form.Item>
            </Card>
          </Col>

          <Col span={8}>
            <Card className="h-full">
              <h3 className="font-semibold text-lg mb-2">
                {t("cart.checkout_page.discount.title")}
              </h3>
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder={t(
                    "cart.checkout_page.form.placeholder.discount"
                  )}
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <Button type="primary" onClick={handleApplyDiscount}>
                  {t("cart.checkout_page.discount.apply")}
                </Button>
              </div>

              {/* Card Đơn hàng */}
              <Card className="shadow-md bg-gray-50 border border-gray-200">
                <p>
                  <b>{t("cart.checkout_page.summary.quantity")}:</b>{" "}
                  {products.reduce((sum, item) => sum + item.soLuong, 0)}{" "}
                  {t("cart.checkout_page.summary.items")}
                </p>
                <p>
                  <b>{t("cart.checkout_page.summary.subtotal")}:</b>{" "}
                  {formatCurrency(orderSummary.subtotal)}
                </p>
                <p>
                  <b>{t("cart.checkout_page.summary.discount")}:</b>{" "}
                  {discount.toLocaleString()}đ
                </p>
                <hr className="my-2" />
                <p className="text-lg font-semibold">
                  {t("cart.checkout_page.summary.total")}:{" "}
                  {formatCurrency(orderSummary.total)}
                </p>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full mt-4"
                  size="large"
                >
                  {t("cart.checkout_page.summary.submit")}
                </Button>
                <Button
                  size="large"
                  onClick={() => navigate("/cart")}
                  className="w-full"
                  style={{ marginTop: 8 }}
                >
                  {t("cart.checkout_page.summary.back_to_cart")}
                </Button>
              </Card>
            </Card>
          </Col>
        </Row>
      </Form>

      <Card style={{ marginTop: 16 }}>
        <Row gutter={[16, 16]}>
          <Typography.Title level={2} style={{ margin: "0 20px" }}>
            {t("cart.checkout_page.products")}
          </Typography.Title>
          <Col span={24}>
            {orderBooks.length === 0 ? (
              <p>{t("cart.checkout_page.empty_cart")}</p>
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
