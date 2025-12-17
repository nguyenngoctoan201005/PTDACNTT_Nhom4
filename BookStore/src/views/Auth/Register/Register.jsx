import { useState, useEffect, useMemo } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Row,
  Col,
  Divider,
  Space,
  App,
  Checkbox,
  Select,
} from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  ReadOutlined,
  GiftOutlined,
  ThunderboltOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { Logo } from "../../../assets";
import { useGlobalContext } from "../../../GlobalContext";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import {
  getListProvinces,
  getProvinceDetail,
} from "../../../api/provinceService";
import { register } from "../../../api/authService";

const { Title, Text } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [agree, setAgree] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await register({
        hoTen: values.name,
        userName: values.username,
        matKhau: values.password,
        email: values.email,
        soDT: values.phoneNumber,
        diaChi: values.address,
        maQuanHuyen: values.city,
      });

      message.success(t("auth.register.success"));
      navigate("/login");
    } catch (err) {
      console.log("error >>>", err);
      message.error(err.message);
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="bg-blue-50">
      <div className="min-h-screen flex bg-white">
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 flex-col justify-between p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full -ml-36 -mb-36" />

          <div className="relative z-10 space-y-6">
            <div className="space-y-4">
              <Space
                align="start"
                onClick={() => navigate("/home")}
                className="cursor-pointer"
              >
                <div className="my-1 -mt-20">
                  <img
                    src={Logo}
                    alt="Logo"
                    style={{
                      height: "300px",
                      width: "auto",
                      minWidth: "125px",
                      backgroundColor: "transparent",
                    }}
                  />
                </div>
              </Space>
              <div className="-mt-30">
                <h2 className="text-5xl font-bold leading-tight">
                  {t("auth.welcome.web_title")}
                </h2>
                <p className="text-lg text-white/90">
                  {t("auth.welcome.web_subtitle")}
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <ReadOutlined className="text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">
                    {t("auth.features.collection")}
                  </h3>
                  <p className="text-white/80">
                    {t("auth.features.collection_desc")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <GiftOutlined className="text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">
                    {t("auth.features.exclusive")}
                  </h3>
                  <p className="text-white/80">
                    {t("auth.features.exclusive_desc")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ThunderboltOutlined className="text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">
                    {t("auth.features.fast_shipping")}
                  </h3>
                  <p className="text-white/80">
                    {t("auth.features.fast_shipping_desc")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 border-t border-white/20 pt-6">
            <p className="text-white/80 italic">
              “{t("auth.quote.content")}” — {t("auth.quote.author")}
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-white">
          <div className="w-full max-w-md">
            <div className="space-y-8 max-w-md mx-auto">
              <div className="text-center space-y-1">
                <Title level={2} className="!mb-0">
                  {t("auth.register.title")}
                </Title>
                <Text type="secondary">{t("auth.register.subtitle")}</Text>
              </div>

              <Form
                layout="vertical"
                onFinish={onFinish}
                className="space-y-4"
                requiredMark={false}
                autoComplete="off"
                form={form}
              >
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item
                      label={
                        <span className="font-medium text-gray-700">
                          {t("common.form.name")}
                        </span>
                      }
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: t("common.validation.required", {
                            field: t("common.form.name"),
                          }),
                        },
                      ]}
                    >
                      <Input
                        placeholder={t("common.form.placeholder.name")}
                        className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        autoComplete="off"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={
                        <span className="font-medium text-gray-700">
                          {t("common.form.username")}
                        </span>
                      }
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: t("common.validation.required", {
                            field: t("common.form.username"),
                          }),
                        },
                      ]}
                    >
                      <Input
                        placeholder={t(
                          "common.form.placeholder.username_yours"
                        )}
                        className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        autoComplete="off"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={
                        <span className="font-medium text-gray-700">
                          {t("common.form.email")}
                        </span>
                      }
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: t("common.validation.required", {
                            field: t("common.form.email"),
                          }),
                        },
                        {
                          type: "email",
                          message: t("common.validation.email_invalid"),
                        },
                      ]}
                    >
                      <Input
                        placeholder={t("common.form.placeholder.email")}
                        className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        autoComplete="off"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={
                        <span className="font-medium text-gray-700">
                          {t("common.form.phoneNumber")}
                        </span>
                      }
                      name="phoneNumber"
                      rules={[
                        {
                          required: true,
                          message: t("common.validation.required", {
                            field: t("common.form.phoneNumber"),
                          }),
                        },
                        {
                          pattern: /^[0-9]{9,11}$/,
                          message: t("common.validation.phone_invalid"),
                        },
                      ]}
                    >
                      <Input
                        placeholder={t("common.form.placeholder.phone")}
                        className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        autoComplete="off"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={
                        <span className="font-medium text-gray-700">
                          {t("common.form.password")}
                        </span>
                      }
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: t("common.validation.required", {
                            field: t("common.form.password"),
                          }),
                        },
                        {
                          min: 8,
                          message: t("common.validation.password_min_length"),
                        },
                        () => ({
                          validator(_, value) {
                            if (!value) return Promise.resolve();
                            if (!/[A-Z]/.test(value)) {
                              return Promise.reject(
                                new Error(
                                  t("common.validation.password_uppercase")
                                )
                              );
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        placeholder={t(
                          "common.form.placeholder.password_yours"
                        )}
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        autoComplete="new-password"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={
                        <span className="font-medium text-gray-700">
                          {t("common.form.confirm_password")}
                        </span>
                      }
                      name="confirmPassword"
                      dependencies={["password"]}
                      rules={[
                        {
                          required: true,
                          message: t("common.validation.required", {
                            field: t("common.form.confirm_password"),
                          }),
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                t("common.validation.password_mismatch")
                              )
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        placeholder={t(
                          "common.form.placeholder.confirm_password"
                        )}
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        autoComplete="new-password"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="city"
                      label={
                        <span className="font-medium text-gray-700">
                          {t("common.form.city")}
                        </span>
                      }
                      rules={[
                        {
                          required: true,
                          message: t("common.validation.required_select", {
                            field: t("common.form.city").toLowerCase(),
                          }),
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder={t("common.form.placeholder.city")}
                        optionFilterProp="label"
                        onChange={handleChangeCity}
                        // onSearch={onSearch}
                        options={provinceOptions}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="ward"
                      label={
                        <span className="font-medium text-gray-700">
                          {t("common.form.ward")}
                        </span>
                      }
                      rules={[
                        {
                          required: true,
                          message: t("common.validation.required_select", {
                            field: t("common.form.ward").toLowerCase(),
                          }),
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        virtual
                        placeholder={t("common.form.placeholder.ward")}
                        optionFilterProp="label"
                        // onChange={(value) => setSelectedCity(value)}
                        // onSearch={onSearch}
                        options={wardOptions}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label={
                        <span className="font-medium text-gray-700">
                          {t("common.form.address")}
                        </span>
                      }
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: t("common.validation.required", {
                            field: t("common.form.address"),
                          }),
                        },
                      ]}
                    >
                      <Input
                        placeholder={t("common.form.placeholder.address")}
                        className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        autoComplete="off"
                      />
                    </Form.Item>
                  </Col>
                  <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    className="!mb-2"
                  >
                    <Checkbox
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                    >
                      {t("auth.register.agree_checkbox")}{" "}
                      <Link href="#" className="text-blue-600">
                        {t("auth.register.terms_service")}
                      </Link>{" "}
                      {t("auth.register.and")}{" "}
                      <Link href="#" className="text-blue-600">
                        {t("auth.register.terms_privacy")}
                      </Link>
                    </Checkbox>
                  </Form.Item>

                  <Form.Item
                    name="newsletter"
                    valuePropName="checked"
                    initialValue={true}
                  >
                    <Checkbox>{t("auth.register.newsletter")}</Checkbox>
                  </Form.Item>

                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full h-11 font-semibold text-base bg-blue-600 hover:bg-blue-500"
                  >
                    <UserAddOutlined />
                    {t("auth.register.submit")}
                  </Button>
                </Row>
              </Form>

              {/* Footer */}
              <Divider plain className="text-gray-400">
                {t("auth.register.have_account")}
              </Divider>

              <Button
                type="default"
                className="w-full h-11 border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50"
                onClick={() => navigate("/login")}
              >
                {t("auth.register.login_now")}
              </Button>

              <p className="text-center text-sm text-gray-500">
                {t("auth.register.terms_agree")}
                <Link href="#" className="text-blue-600">
                  {t("auth.register.terms_service")}
                </Link>{" "}
                {t("common.of_us")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
