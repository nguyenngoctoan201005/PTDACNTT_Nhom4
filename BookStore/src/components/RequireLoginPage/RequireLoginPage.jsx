import { Button, Card, Typography } from "antd";
import {
  ArrowRightOutlined,
  LockOutlined,
  ReadOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./RequireLoginPage.css";

const { Title, Paragraph } = Typography;

export default function RequireLoginPage() {
  return (
    <div className="min-h-auto relative overflow-hidden flex items-center justify-center px-6 py-6 mt-20">
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl opacity-50" />

      <div className="relative z-10 max-w-6xl w-full ">
        <div className="flex justify-center">
          <div className="relative w-full max-w-md h-80 flex items-center justify-center">
            <div className="relative">
              <div className="w-48 h-64 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg shadow-2xl transform -rotate-6 flex items-center justify-center relative">
                <div className="absolute inset-2 bg-white/20 rounded-md" />
                <ReadOutlined style={{ fontSize: 120, opacity: "50%" }} />
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="bg-red-400 rounded-full p-6 shadow-2xl animate-bounce">
                  <LockOutlined style={{ fontSize: 60, color: "white" }} />
                </div>
              </div>

              <div className="absolute -top-8 -right-8 bg-red-200 rounded-full p-4 animate-pulse">
                <StarOutlined style={{ fontSize: 40, color: "#ff6467" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="space-y-3">
            <Title level={2}>Bạn cần đăng nhập để xem trang này!</Title>

            <Paragraph className="text-lg text-gray-600 text-center">
              Đăng nhập để xem giỏ hàng, lưu tựa sách yêu thích.
            </Paragraph>
          </div>

          <div className="flex gap-4 pt-2">
            <Link to="/login" className="flex-1">
              <Button
                type="primary"
                size="large"
                className="w-full text-base font-semibold shadow-md hover:shadow-xl flex justify-center items-center gap-2"
              >
                Đăng nhập tài khoản
                <ArrowRightOutlined className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/register" className="flex-1">
              <Button
                size="large"
                className="w-full text-base font-semibold border-2 hover:bg-gray-100"
              >
                Tạo tài khoản mới
              </Button>
            </Link>
          </div>

          <p className="text-center text-sm text-gray-500 pt-2">
            Tiếp tục xem trang chủ?{" "}
            <Link
              to="/"
              className="text-blue-600 font-semibold hover:underline"
            >
              Quay lại Trang chủ
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
