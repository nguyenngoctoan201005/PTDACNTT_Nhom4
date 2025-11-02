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
} from "@ant-design/icons";
import "./AuthLayout.css";

const { Header, Content, Footer } = Layout;
const { Title, Text, Link } = Typography;

const AuthLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginOrRegister =
    location.pathname === "/login" || location.pathname === "register";
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

  const handleMenuClick = (e) => {
    navigate(`${e.key}`);
  };
  return (
    <Layout>
      {!isLoginOrRegister && (
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
              <Flex gap={16}>
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
                {!isLoginOrRegister && (
                  <>
                    <Button type="primary" onClick={() => navigate("/login")}>
                      Đăng nhập
                    </Button>
                    <Button
                      type="default"
                      onClick={() => navigate("/register")}
                    >
                      Đăng kí
                    </Button>
                  </>
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
      )}
      <Content>
        <Outlet />
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
                Đối tác đáng tin cậy của bạn trong hành trình khám phá văn học.
                Chúng tôi sở hữu những bộ sách hay nhất từ khắp nơi trên thế
                giới, giúp bạn tiếp cận gần hơn với những câu chuyện ý nghĩa.
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
                <Link>Liên hệ với chúng tôi</Link>
                <Link>Thông tin giao hàng</Link>
                <Link>FAQ</Link>
              </Space>
            </div>
          </Col>

          <Col xs={12} sm={8} md={6} lg={6}>
            <Title level={5}>Quick Links</Title>
            <Space direction="vertical">
              <Link to="/books">Tất cả sách</Link>
              <Link>Sách bán chạy</Link>
              <Link>Mới xuất bản</Link>
              <Link>Đặc biệt</Link>
            </Space>
          </Col>

          <Col xs={12} sm={8} md={6} lg={4}>
            <Title level={5}>Thể loại</Title>
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

export default AuthLayout;
