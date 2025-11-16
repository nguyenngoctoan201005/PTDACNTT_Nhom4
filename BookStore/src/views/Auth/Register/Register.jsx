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
import { HorizontalLogo } from "../../../assets";
import { useGlobalContext } from "../../../GlobalContext";
import { Link } from "react-router";
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

      message.success("Đăng kí tài khoản thành công");
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
                <div className="my-1">
                  <img
                    src={HorizontalLogo}
                    alt="Logo"
                    style={{
                      height: "60px",
                      width: "auto",
                      minWidth: "125px",
                      backgroundColor: "transparent",
                    }}
                  />
                </div>
              </Space>
              <h2 className="text-5xl font-bold leading-tight">
                Chào mừng bạn đến với trang web
              </h2>
              <p className="text-lg text-white/90">
                Khám phá hàng nghìn cuốn sách, kết nối với những người yêu sách
                khác và khám phá những thế giới mới qua văn học.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <ReadOutlined className="text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">
                    Bộ sưu tập được chọn lọc
                  </h3>
                  <p className="text-white/80">
                    Những cuốn sách được tuyển chọn kỹ lưỡng từ mọi thể loại
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <GiftOutlined className="text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Ưu đãi độc quyền</h3>
                  <p className="text-white/80">
                    Giảm giá đặc biệt dành cho thành viên
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ThunderboltOutlined className="text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">
                    Giao hàng nhanh chóng
                  </h3>
                  <p className="text-white/80">
                    Nhận sách của bạn một cách nhanh nhất
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 border-t border-white/20 pt-6">
            <p className="text-white/80 italic">
              “Người đọc sách sống được cả ngàn cuộc đời trước khi chết. Kẻ
              không bao giờ đọc chỉ sống một lần.” — George R.R. Martin
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-white">
          <div className="w-full max-w-md">
            <div className="space-y-8 max-w-md mx-auto">
              <div className="text-center space-y-1">
                <Title level={2} className="!mb-0">
                  Tạo tài khoản
                </Title>
                <Text type="secondary">
                  Tham gia BookHaven để bắt đầu hành trình đọc sách của bạn
                </Text>
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
                        <span className="font-medium text-gray-700">Tên</span>
                      }
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên của bạn!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="John"
                        className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        autoComplete="off"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={
                        <span className="font-medium text-gray-700">
                          Tên đăng nhập
                        </span>
                      }
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên đăng nhập!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Nhập tên đăng nhập của bạn"
                        className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        autoComplete="off"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={
                        <span className="font-medium text-gray-700">
                          Địa chỉ Email
                        </span>
                      }
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập địa chỉ email của bạn!",
                        },
                        {
                          type: "email",
                          message: "Email của bạn không hợp lệ",
                        },
                      ]}
                    >
                      <Input
                        placeholder="you@example.com"
                        className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        autoComplete="off"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={
                        <span className="font-medium text-gray-700">
                          Số điện thoại
                        </span>
                      }
                      name="phoneNumber"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại!",
                        },
                        {
                          pattern: /^[0-9]{9,11}$/,
                          message: "Số điện thoại không hợp lệ (9–11 chữ số)",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Ví dụ: 0987654321"
                        className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        autoComplete="off"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={
                        <span className="font-medium text-gray-700">
                          Mật khẩu
                        </span>
                      }
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mật khẩu!",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Nhập mật khẩu của bạn"
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
                          Xác nhận mật khẩu
                        </span>
                      }
                      name="confirmPassword"
                      dependencies={["password"]}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng xác nhận mật khẩu của bạn!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("Mật khẩu không khớp!")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        placeholder="Xác nhận mật khẩu của bạn"
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
                          Thành phố
                        </span>
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
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="ward"
                      label={
                        <span className="font-medium text-gray-700">
                          Phường/Xã
                        </span>
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
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label={
                        <span className="font-medium text-gray-700">
                          Địa chỉ
                        </span>
                      }
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập địa chỉ của bạn!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Nhập địa chỉ (số nhà, tên đường...)"
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
                      Tôi đồng ý với{" "}
                      <Link href="#" className="text-blue-600">
                        Điều khoản dịch vụ
                      </Link>{" "}
                      và{" "}
                      <Link href="#" className="text-blue-600">
                        Chính sách bảo mật
                      </Link>
                    </Checkbox>
                  </Form.Item>

                  <Form.Item
                    name="newsletter"
                    valuePropName="checked"
                    initialValue={true}
                  >
                    <Checkbox>
                      Đăng ký nhận bản tin của chúng tôi để nhận gợi ý sách và
                      ưu đãi
                    </Checkbox>
                  </Form.Item>

                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full h-11 font-semibold text-base bg-blue-600 hover:bg-blue-500"
                  >
                    <UserAddOutlined />
                    Tạo tài khoản
                  </Button>
                </Row>
              </Form>

              {/* Footer */}
              <Divider plain className="text-gray-400">
                ĐÃ CÓ TÀI KHOẢN?
              </Divider>

              <Button
                type="default"
                className="w-full h-11 border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50"
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </Button>

              <p className="text-center text-sm text-gray-500">
                Bằng việc tạo tài khoản, bạn đồng ý với{" "}
                <Link href="#" className="text-blue-600">
                  Điều khoản dịch vụ
                </Link>{" "}
                của chúng tôi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
