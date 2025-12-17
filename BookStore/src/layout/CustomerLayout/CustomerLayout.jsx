import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Badge,
  Button,
  Menu,
  Flex,
  Input,
  Layout,
  Space,
  Row,
  Col,
  Typography,
  Dropdown,
  Avatar,
  message,
} from "antd";
import { Logo } from "../../assets";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  HeartFilled,
  HeartOutlined,
  UserOutlined,
  KeyOutlined,
  LogoutOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import "./CustomerLayout.css";
import { useGlobalContext } from "../../GlobalContext";
import ProtectedRoute from "../../routes/guard/ProtectedRoutes";
import { useDebounce } from "../../hooks/useDebounce";
import { useState, useEffect, useRef } from "react";
import { getListTheLoai } from "../../api/theLoaiService";
import { suggestSach } from "../../api/sachService";
import { useTranslation } from "react-i18next";

const { Header, Content, Footer } = Layout;
const { Title, Text, Link } = Typography;

const CustomerLayout = ({ type }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, handleLogout, cart, cartAmount } = useGlobalContext();
  const isLoginOrRegister =
    location.pathname === "/login" || location.pathname === "register";
  const searchRef = useRef(null);
  const [listTheLoai, setListTheLoai] = useState([]);

  const fetchTheLoai = async () => {
    try {
      const res = await getListTheLoai();
      setListTheLoai(res.result || []);
    } catch (error) {
      console.error(error);
      message.error("Lỗi khi lấy danh sách thể loại");
    }
  };

  useEffect(() => {
    fetchTheLoai();
  }, []);

  const { t, i18n } = useTranslation();
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  const userItem = [
    {
      key: 1,
      label: (
        <div>
          <Text strong>{user?.hoTen}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {user?.email}
          </Text>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "lang_vi",
      label: (
        <div
          onClick={() => handleLanguageChange("vi")}
          style={{ cursor: "pointer" }}
        >
          {i18n?.language === "vi" ? "✓ " : ""}Tiếng Việt
        </div>
      ),
    },
    {
      key: "lang_en",
      label: (
        <div
          onClick={() => handleLanguageChange("en")}
          style={{ cursor: "pointer" }}
        >
          {i18n?.language === "en" ? "✓ " : ""}English
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: 2,
      label: (
        <a onClick={() => navigate("/profile")}>
          <UserOutlined /> {t("common.button.profile")}
        </a>
      ),
    },
    {
      key: 3,
      label: (
        <a onClick={() => navigate("/profile/change-password")}>
          <KeyOutlined /> {t("common.button.change-password")}
        </a>
      ),
    },
    {
      key: 4,
      label: (
        <div onClick={handleLogout} className="text-red-600">
          <LogoutOutlined /> {t("common.button.logout")}
        </div>
      ),
    },
  ];

  const handleMenuClick = (e) => {
    navigate(`/books?maLoai=${e.key}`);
  };

  // Suggest sách
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 400);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggest, setLoadingSuggest] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedSearch.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        setLoadingSuggest(true);
        const res = await suggestSach({ term: debouncedSearch });
        setSuggestions(res.result || []);
      } catch (e) {
        console.error("Error fetching suggestions:", e);
      } finally {
        setLoadingSuggest(false);
      }
    };

    fetchSuggestions();
  }, [debouncedSearch]);

  const handleInputFocus = async () => {
    if (searchTerm.trim()) {
      const res = await suggestSach({ term: searchTerm });
      setSuggestions(res.result || []);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEnterSearch = () => {
    navigate(`/books?keyword=${searchTerm}`);
  };

  return (
    <Layout>
      <Header
        style={{
          backgroundColor: "rgb(137, 209, 245)",
          height: 100,
          padding: "0 80px",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          width: "100%",
        }}
      >
        <div className="flex items-center gap-8 h-[64px]">
          <Space
            align="start"
            onClick={() => navigate("/home")}
            className="cursor-pointer"
          >
            <div className="my-1">
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
          <div style={{ position: "relative", flex: 1 }} ref={searchRef}>
            <Input
              prefix={<SearchOutlined />}
              placeholder={t("common.search_placeholder")}
              style={{ flex: 1, marginTop: 10 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onPressEnter={handleEnterSearch}
              onFocus={handleInputFocus}
            />
            {suggestions.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: 55,
                  left: 0,
                  right: 0,
                  background: "white",
                  borderRadius: 6,
                  boxShadow: "0px 3px 8px rgba(0,0,0,0.15)",
                  zIndex: 2000,
                }}
              >
                {loadingSuggest ? (
                  <div className="px-4 py-2 text-gray-500">
                    {t("common.loading")}
                  </div>
                ) : (
                  suggestions.slice(0, 4).map((book) => (
                    <div
                      key={book.maSach}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer leading-tight flex items-center gap-3"
                      onClick={() => {
                        navigate(`/books/${book.maSach}`);
                        setSearchTerm("");
                        setSuggestions([]);
                      }}
                    >
                      <Avatar
                        icon={<ReadOutlined />}
                        shape="square"
                        size={54}
                      />
                      <div>
                        <p style={{ marginBottom: 1 }}>{book.tenSach}</p>
                        <Typography.Text type="secondary">
                          {t("common.price_label")} {book.donGia}
                        </Typography.Text>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          <Space align="end" style={{ marginTop: 10 }}>
            <Flex gap={20} align="center">
              <Button
                type="link"
                icon={
                  <HeartOutlined style={{ color: "white", fontSize: 20 }} />
                }
                onClick={() => navigate("/favorite")}
              />
              <Badge count={cartAmount}>
                <Button
                  type="link"
                  icon={
                    <ShoppingCartOutlined
                      style={{ color: "white", fontSize: 20 }}
                    />
                  }
                  onClick={() => navigate("/cart")}
                />
              </Badge>
              {!user ? (
                <>
                  <Button type="primary" onClick={() => navigate("/login")}>
                    {t("common.button.login")}
                  </Button>
                  <Button onClick={() => navigate("/register")}>
                    {t("common.button.register")}
                  </Button>
                </>
              ) : (
                <Dropdown
                  menu={{
                    items: userItem,
                  }}
                  trigger={["click", "hover"]}
                  placement="bottomRight"
                  className="cursor-pointer"
                >
                  <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
              )}
            </Flex>
          </Space>
        </div>
        <div className="-mt-1 home-menu">
          <Menu
            mode="horizontal"
            onClick={handleMenuClick}
            items={listTheLoai.slice(0, 10).map((item) => ({
              key: item.maLoai,
              label: item.tenLoai,
            }))}
            style={{
              flex: 1,
              minWidth: 0,
              justifyContent: "center",
              lineHeight: "36px",
              borderBottom: "none",
              backgroundColor: "transparent",
            }}
          />
        </div>
      </Header>
      <Content style={{ marginTop: 20 }}>
        <div className="bg-blue-50 py-4 mt-12 px-[80px]">
          {type === 1 ? <Outlet /> : <ProtectedRoute />}
        </div>
      </Content>
      <Footer style={{ backgroundColor: "white", padding: "60px 80px 20px" }}>
        <Row gutter={[32, 32]}>
          <Col xs={24} md={12} lg={12}>
            <Space direction="vertical" size="small">
              <Title level={4} style={{ marginBottom: 0 }}>
                <span style={{ color: "#1890ff" }}>Bookstore</span>
              </Title>
              <Text type="secondary">Nhà sách cao cấp</Text>
              <Text style={{ display: "block", maxWidth: 400 }}>
                Đối tác tin cậy của bạn trong hành trình khám phá văn học. Chúng
                tôi tuyển chọn những cuốn sách hay nhất từ khắp nơi trên thế
                giới, đưa bạn đến gần hơn với những câu chuyện ý nghĩa.
              </Text>
            </Space>

            <Space
              direction="vertical"
              size="small"
              style={{ marginTop: 16, color: "#555" }}
            >
              <Text>
                <EnvironmentOutlined /> 123 Đường Văn Học, Quận Sách, TP.HCM
              </Text>
              <Text>
                <PhoneOutlined /> Hotline: 1900-1234 (24/7)
              </Text>
              <Text>
                <MailOutlined /> support@Bookstore.com
              </Text>
            </Space>

            <div style={{ marginTop: 24 }}>
              <Title level={5} style={{ marginBottom: 8 }}>
                Hỗ trợ
              </Title>
              <Space direction="vertical">
                <Link onClick={() => navigate("/about")}>Liên hệ</Link>
                <Link onClick={() => navigate("/about")}>Về chúng tôi</Link>
              </Space>
            </div>
          </Col>

          <Col xs={12} sm={8} md={6} lg={6}>
            <Title level={5}>Liên kết nhanh</Title>
            <Space direction="vertical">
              <Link onClick={() => navigate("/books")}>Tất cả sách</Link>
              <Link onClick={() => navigate("/books")}>Sách bán chạy</Link>
              <Link onClick={() => navigate("/books")}>Sách mới</Link>
            </Space>
          </Col>

          <Col xs={12} sm={8} md={6} lg={4}>
            <Title level={5}>Thể loại</Title>
            <Space direction="vertical">
              {listTheLoai.slice(0, 5).map((category) => (
                <Link
                  key={category.maLoai}
                  onClick={() => navigate(`/books?maLoai=${category.maLoai}`)}
                >
                  {category.tenLoai}
                </Link>
              ))}
            </Space>
          </Col>
        </Row>

        <div
          style={{
            borderTop: "1px solid #e8e8e8",
            marginTop: 40,
            paddingTop: 16,
            textAlign: "center",
          }}
        >
          <Text type="secondary">
            © 2025 Bookstore - Nhà sách cao cấp. Bản quyền thuộc về chúng tôi.
          </Text>
          <br />
          <Text type="secondary">
            Được tạo ra với <HeartFilled style={{ color: "red" }} /> dành cho
            những người yêu sách trên toàn thế giới
          </Text>
        </div>
      </Footer>
    </Layout>
  );
};

export default CustomerLayout;
