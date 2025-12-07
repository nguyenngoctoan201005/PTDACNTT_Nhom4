import { Link } from "react-router-dom";
import { Button } from "antd";
import {
  ArrowLeftOutlined,
  BookOutlined,
  SearchOutlined,
} from "@ant-design/icons";

export default function NotFoundPage() {
  return (
    <div className="min-h-auto relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-200 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 h-screen flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl w-full">
          <div className="flex items-center justify-center lg:order-1">
            <div className="relative w-full max-w-sm">
              <div className="space-y-8 text-center">
                <div className="relative">
                  <h1 className="text-9xl md:text-[150px] font-black text-blue-200 leading-none">
                    404
                  </h1>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="relative w-40 h-56 transform rotate-12">
                        <div className="absolute inset-0 bg-blue-300/40 rounded-lg blur-xl"></div>
                        <div className="relative w-full h-full bg-blue-400 rounded-lg shadow-2xl flex flex-col overflow-hidden">
                          <div className="absolute left-0 top-0 bottom-0 w-2 bg-blue-500 rounded-l-lg"></div>
                          <div className="absolute top-0 left-2 right-2 h-1 bg-blue-100 rounded-full"></div>
                          <div className="absolute right-0 top-1 bottom-1 w-1 bg-blue-200"></div>

                          <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 text-center">
                            <div className="mb-2 text-white/70">
                              <BookOutlined className="text-3xl opacity-70" />
                            </div>
                            <h2 className="text-5xl font-bold text-white mb-1">
                              ?
                            </h2>
                          </div>
                        </div>
                      </div>

                      <div className="absolute -bottom-6 -right-2 bg-blue-500 rounded-full p-4 shadow-lg animate-pulse">
                        <SearchOutlined
                          style={{ color: "white", fontSize: 20 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-4 pt-8">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                    style={{ animationDelay: ".2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: ".4s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-800">
                Page Not Found
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Không tìm thấy trang này, vui lòng quay lại.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/home" className="flex-1">
                <Button
                  size="large"
                  type="primary"
                  className="w-full h-14 font-semibold shadow-lg"
                  icon={<ArrowLeftOutlined />}
                >
                  Về trang chủ
                </Button>
              </Link>

              <Link to="/books" className="flex-1">
                <Button
                  size="large"
                  className="w-full h-14 font-semibold"
                  icon={<BookOutlined />}
                >
                  Đến trang sách
                </Button>
              </Link>
            </div>

            <p className="text-center text-sm text-gray-500">
              Cần giúp đỡ?{" "}
              <Link
                to="/contact"
                className="text-blue-600 font-semibold hover:underline"
              >
                Liên hệ hỗ trợ
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
