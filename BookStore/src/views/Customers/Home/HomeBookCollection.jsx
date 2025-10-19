import { Row, Col, Typography, Button, Card, Tag, Space } from "antd";

const { Title, Text } = Typography;

const HomeBookCollection = ({
  tag,
  title,
  subtitle,
  description,
  buttons = [],
  items = [],
  bg = "linear-gradient(to right, #f9fcff, #fff6f6)",
}) => {
  return (
    <div
      style={{
        background: bg,
        padding: "60px 80px",
        marginBottom: 40,
        height: "700px",
      }}
    >
      <Row gutter={48} align="middle" className="h-full">
        <Col xs={24} md={12}>
          {tag && (
            <Tag color="red" style={{ fontSize: 14, padding: "4px 10px" }}>
              {tag}
            </Tag>
          )}
          <Title level={1} style={{ margin: "16px 0" }}>
            {title}
          </Title>
          {subtitle && (
            <Title
              level={4}
              style={{ color: "red", fontWeight: "bold", marginTop: 0 }}
            >
              {subtitle}
            </Title>
          )}
          {description && (
            <Text type="secondary" style={{ fontSize: 16 }}>
              {description}
            </Text>
          )}
          <br />
          {buttons.length > 0 && (
            <Space style={{ marginTop: 24 }}>
              {buttons.map((btn, index) => (
                <Button
                  key={index}
                  type={btn.type || "default"}
                  size="large"
                  style={{ borderRadius: 8 }}
                  onClick={btn.onClick}
                >
                  {btn.label}
                </Button>
              ))}
            </Space>
          )}
        </Col>

        <Col xs={24} md={12}>
          <Row
            gutter={16}
            justify="center"
            className=" transform rotate-3 hover:rotate-0 transition-transform duration-500"
          >
            {items.map((item, index) => (
              <Col
                key={index}
                xs={8}
                className={`relative group ${
                  index === 1 ? "scale-110 z-10" : "scale-95"
                } hover:scale-105 transition-all duration-300`}
              >
                <Card
                  hoverable
                  className="bg-card/80 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-border/50"
                  cover={
                    item.cover && (
                      <div>
                        <img
                          alt={item.title}
                          src={item.cover}
                          style={{
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12,
                            height: 200,
                            objectFit: "cover",
                          }}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    )
                  }
                  style={{
                    borderRadius: 12,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                    textAlign: "center",
                  }}
                >
                  <Text strong>{item.title}</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 13 }}>
                    {item.subtitle}
                  </Text>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default HomeBookCollection;
