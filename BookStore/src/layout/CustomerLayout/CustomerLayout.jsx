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
} from "antd";
import { HorizontalLogo } from "../../assets";
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

  console.log("listTheLoai", listTheLoai);

  const genres = [
    {
      label: "Fiction",
      key: "fiction",
    },
    {
      label: "Mystery",
      key: "mystery",
    },
    {
      label: "Romance",
      key: "romance",
    },
    {
      label: "Sci-Fi",
      key: "sci-fi",
    },
    {
      label: "Biography",
      key: "biography",
    },
    {
      label: "Self-Help",
      key: "self-help",
    },
  ];

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
      key: 2,
      label: (
        <a onClick={() => navigate("/profile")}>
          <UserOutlined /> Profile
        </a>
      ),
    },
    {
      key: 3,
      label: (
        <a onClick={() => navigate("/change-password")}>
          <KeyOutlined /> Change password
        </a>
      ),
    },
    {
      key: 4,
      label: (
        <div onClick={handleLogout} className="text-red-600">
          <LogoutOutlined /> Log out
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
          <div style={{ position: "relative", flex: 1 }} ref={searchRef}>
            <Input
              prefix={<SearchOutlined />}
              placeholder="Nhập tên sách bạn muốn tìm tại đây"
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
                  <div className="px-4 py-2 text-gray-500">Loading...</div>
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
                          Đơn giá: {book.donGia}
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
                    Sign in
                  </Button>
                  <Button>Sign up</Button>
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
                <span style={{ color: "#1890ff" }}>Readify</span>
              </Title>
              <Text type="secondary">Premium Bookstore</Text>
              <Text style={{ display: "block", maxWidth: 400 }}>
                Your trusted partner in literary discovery. We curate the finest
                collection of books from around the world, bringing you closer
                to the stories that matter.
              </Text>
            </Space>

            <Space
              direction="vertical"
              size="small"
              style={{ marginTop: 16, color: "#555" }}
            >
              <Text>
                <EnvironmentOutlined /> 123 Literary Lane, Book City, BC 12345
              </Text>
              <Text>
                <PhoneOutlined /> Hotline: 1900-1234 (24/7)
              </Text>
              <Text>
                <MailOutlined /> support@Readify.com
              </Text>
            </Space>

            <div style={{ marginTop: 24 }}>
              <Title level={5} style={{ marginBottom: 8 }}>
                Support
              </Title>
              <Space direction="vertical">
                <Link>Contact Us</Link>
                <Link>Shipping Info</Link>
                <Link>Returns</Link>
                <Link>FAQ</Link>
              </Space>
            </div>
          </Col>

          <Col xs={12} sm={8} md={6} lg={6}>
            <Title level={5}>Quick Links</Title>
            <Space direction="vertical">
              <Link>All Books</Link>
              <Link>Bestsellers</Link>
              <Link>New Releases</Link>
              <Link>Special Deals</Link>
            </Space>
          </Col>

          <Col xs={12} sm={8} md={6} lg={4}>
            <Title level={5}>Genres</Title>
            <Space direction="vertical">
              <Link>Fiction</Link>
              <Link>Mystery</Link>
              <Link>Romance</Link>
              <Link>Science Fiction</Link>
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
            © 2025 Readify Premium Bookstore. All rights reserved.
          </Text>
          <br />
          <Text type="secondary">
            Crafted with <HeartFilled style={{ color: "red" }} /> for book
            lovers worldwide
          </Text>
        </div>
      </Footer>
    </Layout>
  );
};

export default CustomerLayout;
