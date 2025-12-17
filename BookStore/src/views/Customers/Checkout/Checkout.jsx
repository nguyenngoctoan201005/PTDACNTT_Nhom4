import { useEffect, useState, useMemo, useRef } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Select,
  message,
  Modal,
  Row,
  Col,
  Breadcrumb,
  Typography,
} from "antd";
import { Link } from "react-router";
import OrderCard from "../../../components/OrderCard";
import { useNavigate } from "react-router";
import { getListProvinces, getListWards } from "../../../api/provinceService";
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
  const [showResultModal, setShowResultModal] = useState(false);
  const [countdown, setCountdown] = useState(15);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [qrUrl, setQrUrl] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);

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
        setProvinces(data.result);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách tỉnh:", error);
      });
  }, []);

  useEffect(() => {
    getListWards()
      .then((data) => {
        setWards(data.result);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách xã:", error);
      });
  }, []);

  const provinceOptions = useMemo(
    () => provinces.map((p) => ({ label: p.tenTinh, value: p.maTinh })),
    [provinces]
  );

  const wardOptions = useMemo(
    () => wards.map((p) => ({ label: p.tenQuanHuyen, value: p.maQuanHuyen })),
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

  const generateQr = () => {
    const BANK_ID = "MB"; // Mã ngân hàng: MB, VCB, TECHCOMBANK, ACB...
    const ACCOUNT_NO = "9704229201118880886"; // Số tài khoản của bạn
    const ACCOUNT_NAME = "LE HUY HOANG"; // Tên chủ tài khoản
    const content = "";

    const url = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-compact.png?amount=${orderSummary.total}&addInfo=${content}&accountName=${ACCOUNT_NAME}`;
    setQrUrl(url);
    setShowQrModal(true);
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
        maGiamGia: discountCode ? Number(discountCode) : null,
        maKH: user?.maKH,
        maPTTT: paymentMethod === "COD" ? 1 : 2,
        maQuanHuyen: values.ward,
        chiTietDonHang: products.map((p) => ({
          maSach: p.sach.id,
          soLuong: p.soLuong,
          donGia: p.sach.donGia,
        })),
      };

      await insertDonHang(payload);

      message.success(t("cart.checkout_page.success"));
      // refresh cart and show result modal with countdown
      fetchCart();
      setCountdown(15);
      setShowResultModal(true);

      // start interval to update countdown
      intervalRef.current = setInterval(() => {
        setCountdown((s) => s - 1);
      }, 1000);

      // after 15s navigate to home
      timeoutRef.current = setTimeout(() => {
        clearInterval(intervalRef.current);
        setShowResultModal(false);
        navigate("/home");
      }, 15000);
    } catch (error) {
      console.error("Lỗi đặt hàng:", error);
      message.error(t("cart.checkout_page.error"));
    }
  };

  // cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

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
              <div style={{ marginBottom: 16 }}>
                <h4 className="font-medium mb-2">
                  {t("cart.checkout_page.payment.title")}
                </h4>
                <div style={{ display: "flex", gap: 12 }}>
                  <Button
                    type={paymentMethod === "COD" ? "primary" : "default"}
                    onClick={() => setPaymentMethod("COD")}
                  >
                    {t("cart.checkout_page.payment.cash")}
                  </Button>
                  <Button
                    type={paymentMethod === "BANK" ? "primary" : "default"}
                    onClick={() => setPaymentMethod("BANK")}
                  >
                    {t("cart.checkout_page.payment.bank")}
                  </Button>
                  {paymentMethod === "BANK" && (
                    <Button onClick={generateQr}>
                      {t("cart.checkout_page.payment.scan_qr")}
                    </Button>
                  )}
                </div>
              </div>
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

      <Modal
        open={showResultModal}
        title={t("cart.checkout_page.success")}
        footer={[
          <Button
            key="homeNow"
            type="primary"
            onClick={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
              if (intervalRef.current) clearInterval(intervalRef.current);
              setShowResultModal(false);
              navigate("/home");
            }}
          >
            {t("cart.checkout_page.go_home_now") || "Về trang chủ"}
          </Button>,
        ]}
        closable={false}
      >
        <div>
          <p>{t("cart.checkout_page.success")}</p>
          <p style={{ marginTop: 8 }}>
            {t("cart.checkout_page.countdown", { count: countdown })}
          </p>
        </div>
      </Modal>

      <Modal
        open={showQrModal}
        title={t("cart.checkout_page.payment.scan_qr")}
        footer={null}
        onCancel={() => setShowQrModal(false)}
      >
        <div
          style={{ textAlign: "center" }}
          className="flex flex-col justify-center items-center"
        >
          {qrUrl ? (
            <img src={qrUrl} alt="qr" style={{ width: 300, height: 300 }} />
          ) : (
            <p>Generating...</p>
          )}
          <p style={{ marginTop: 8 }}>
            {t("cart.checkout_page.payment.scan_qr")}
          </p>
        </div>
      </Modal>

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
