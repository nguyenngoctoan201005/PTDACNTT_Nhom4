import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Row,
  Col,
  Divider,
  Space,
  message,
  App,
} from "antd";
import {
  BookOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  ReadOutlined,
  GiftOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { Logo } from "../../../assets";
import { useGlobalContext } from "../../../GlobalContext";

const { Title, Text, Paragraph } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useGlobalContext();
  const { message } = App.useApp();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      console.log(values);
      await login({
        userName: values.username,
        matKhau: values.password,
      });
    } catch (err) {
      console.log(">>>>>>>>>>>>", err.message);
      message.error("Sai tên đăng nhập hoặc mật khẩu");
    } finally {
      setLoading(false);
    }
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
                  Chào mừng đến với hành trình văn học
                </h2>
                <p className="text-lg text-white/90">
                  Khám phá hàng ngàn cuốn sách, kết nối với cộng đồng và trải
                  nghiệm những thế giới mới.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <ReadOutlined className="text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">
                    Bộ Sưu Tập Tuyển Chọn
                  </h3>
                  <p className="text-white/80">
                    Sách được tuyển chọn kỹ lưỡng theo mọi thể loại
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <GiftOutlined className="text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Ưu Đãi Đặc Quyền</h3>
                  <p className="text-white/80">
                    Giảm giá dành riêng cho thành viên
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ThunderboltOutlined className="text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Giao Hàng Nhanh</h3>
                  <p className="text-white/80">Giao sách nhanh chóng tận tay</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 border-t border-white/20 pt-6">
            <p className="text-white/80 italic">
              "Người đọc sách sống ngàn cuộc đời trước khi chết. Người không bao
              giờ đọc chỉ sống một cuộc đời." — George R.R. Martin
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-white">
          <div className="w-full max-w-md">
            <div className="space-y-8">
              <div className="text-center lg:text-left space-y-1">
                <Title level={2} className="!mb-0">
                  Chào Mừng Trở Lại
                </Title>
                <Text type="secondary">Đăng nhập để tiếp tục mua sắm</Text>
              </div>

              <Form layout="vertical" onFinish={onFinish} className="space-y-4">
                <Form.Item
                  label={
                    <span className="font-medium text-gray-700">
                      Tên đăng nhập
                    </span>
                  }
                  name="username"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên đăng nhập!" },
                  ]}
                >
                  <Input
                    placeholder="Nhập tên đăng nhập"
                    size="large"
                    className="rounded-md border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="font-medium text-gray-700">Mật khẩu</span>
                  }
                  name="password"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu!" },
                  ]}
                >
                  <Input.Password
                    placeholder="Nhập mật khẩu"
                    size="large"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    className="rounded-md border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="w-full h-11 font-semibold text-base bg-blue-600 hover:bg-blue-50"
                >
                  Đăng Nhập
                </Button>
              </Form>

              <Divider plain className="text-gray-400">
                Chưa có tài khoản?
              </Divider>

              <Button
                type="default"
                className="w-full h-11 border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50"
                onClick={() => navigate("/register")}
              >
                Đăng Ký Ngay
              </Button>

              <p className="text-center text-sm text-gray-500">
                Bằng cách đăng nhập, bạn đồng ý với Điều khoản dịch vụ của chúng
                tôi
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
