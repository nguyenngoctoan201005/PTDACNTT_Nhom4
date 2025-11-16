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
  Card,
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
  SettingOutlined,
} from "@ant-design/icons";
import "./ProfileLayout.css";
import { useGlobalContext } from "../../GlobalContext";
import ProtectedRoute from "../../routes/guard/ProtectedRoutes";
import { useEffect, useState } from "react";

const { Header, Content, Footer } = Layout;
const { Title, Text, Link } = Typography;

const ProfileLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, handleLogout } = useGlobalContext();

  const [selectedKey, setSelectedKey] = useState("info");

  useEffect(() => {
    setSelectedKey(location.pathname.replace("/profile/", ""));
  }, [location.pathname]);

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
    setSelectedKey(e.key);
    navigate(`/profile/${e.key}`);
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
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search books, authors, ..."
            style={{ flex: 1, marginTop: 10 }}
          />
          <Space align="end" style={{ marginTop: 10 }}>
            <Flex gap={20} align="center">
              <Button
                type="link"
                icon={
                  <HeartOutlined style={{ color: "white", fontSize: 20 }} />
                }
                onClick={() => navigate("/favorite")}
              />
              <Badge count={3}>
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
            items={genres}
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
        <div className="bg-blue-50 py-4 mt-20 px-[80px]">
          <div className="flex gap-6 p-6">
            {!!user && (
              <Card className="w-72 p-4 text-center">
                <Avatar
                  size={96}
                  icon={<UserOutlined />}
                  className="mx-auto mb-3"
                />
                <h3 className="text-lg font-semibold mt-3">{user.hoTen}</h3>
                <p className="text-gray-500 mb-4 text-sm">{user.email}</p>

                <Menu
                  onClick={handleMenuClick}
                  defaultSelectedKeys={["info"]}
                  selectedKeys={[selectedKey]}
                  mode="inline"
                  className="text-left mt-4 border-none menu-profile"
                  items={[
                    {
                      key: "info",
                      icon: <UserOutlined />,
                      label: "Thông tin tài khoản",
                    },
                    {
                      key: "update",
                      icon: <SettingOutlined />,
                      label: "Cập nhật thông tin",
                    },
                    {
                      key: "change-password",
                      icon: <KeyOutlined />,
                      label: "Đổi mật khẩu",
                    },
                  ]}
                />
              </Card>
            )}

            <div className="flex-1">
              <ProtectedRoute />
            </div>
          </div>
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

export default ProfileLayout;
