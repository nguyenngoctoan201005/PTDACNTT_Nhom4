import { Row, Col, Typography, Button, Card, Tag, Space } from "antd";

const { Title, Text } = Typography;

const HomeBookCollection = ({
  tag,
  title,
  subtitle,
  description,
  buttons = [],
  items = [],
}) => {
  return (
    <div
      style={{
        padding: "60px 80px 0 80px",
        marginBottom: 40,
        minHeight: "calc(100vh - 160px)",
        height: "auto",
      }}
    >
      <Row
        gutter={48}
        align="middle"
        className="h-full"
        style={{ minHeight: 500 }}
      >
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
                  bodyStyle={{ padding: 0, display: "none" }}
                  cover={
                    item.cover && (
                      <div className="relative h-[320px] w-full">
                        <img
                          alt={item.title}
                          src={item.cover}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-center">
                          <Text
                            strong
                            style={{
                              color: "white",
                              fontSize: 16,
                              marginBottom: 4,
                            }}
                          >
                            {item.title}
                          </Text>
                          <Text
                            style={{
                              color: "rgba(255,255,255,0.8)",
                              fontSize: 13,
                            }}
                          >
                            {item.subtitle}
                          </Text>
                        </div>
                      </div>
                    )
                  }
                  style={{
                    borderRadius: 12,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                  }}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default HomeBookCollection;
