import { Card, Tag, Rate, Button, Typography, Row, Space } from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const BookCard = ({
  imageUrl,
  type,
  discount,
  name,
  author,
  price,
  id,
  onRemove,
  onAddToFavorite,
  onAddToCart,
}) => {
  return (
    <Card
      hoverable
      style={{
        width: "100%",
        borderRadius: 12,
        overflow: "hidden",
        maxWidth: "240px",
      }}
      cover={
        <Link to={`/books/${id}`}>
          <div style={{ position: "relative" }}>
            <img
              alt="The Midnight Library"
              src={imageUrl}
              style={{ width: "100%", height: 180, objectFit: "cover" }}
            />
            <Tag
              color="blue"
              style={{
                position: "absolute",
                top: 8,
                left: 8,
                borderRadius: "8px",
              }}
            >
              {type}
            </Tag>
            <Tag
              color="red"
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                borderRadius: "8px",
              }}
            >
              {discount}% OFF
            </Tag>
            {onRemove && (
              <Button
                type="text"
                size="small"
                shape="circle"
                icon={<CloseOutlined />}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onRemove(id);
                }}
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  background: "rgba(255,255,255,0.8)",
                }}
              />
            )}
          </div>
        </Link>
      }
    >
      <div>
        <Link to={`/books/${id}`}>
          <Title level={5} style={{ marginBottom: 0, color: "#1677ff" }}>
            {name}
          </Title>
        </Link>
        <Text type="secondary">by {author}</Text>

        <Row align="middle" style={{ marginTop: 8 }}>
          <Rate disabled defaultValue={4} style={{ fontSize: 14 }} />
          <Text style={{ marginLeft: 8 }}>
            <b>4.8</b> (2,847)
          </Text>
        </Row>

        <Row align="middle" style={{ marginTop: 8 }}>
          {!!discount && (
            <Text strong style={{ fontSize: 20, color: "#1677ff" }}>
              $24.99
            </Text>
          )}
          <Text
            delete={!discount ? false : true}
            style={{ marginLeft: 8, fontSize: 16, color: "#999" }}
          >
            ${price}
          </Text>
        </Row>

        <Space
          direction="vertical"
          style={{ width: "100%", marginTop: 12 }}
          size="small"
        >
          {onAddToCart && (
            <Button
              type="primary"
              block
              icon={<ShoppingCartOutlined />}
              onClick={() => onAddToCart(id)}
              style={{
                backgroundColor: "#f44336",
                borderColor: "#f44336",
                borderRadius: 6,
              }}
            >
              Add to Cart
            </Button>
          )}

          {onAddToFavorite && (
            <Button
              block
              icon={<HeartOutlined />}
              onClick={() => onAddToFavorite(id)}
              style={{
                borderColor: "#ff4081",
                color: "#ff4081",
                borderRadius: 6,
              }}
            >
              Add to Favorite
            </Button>
          )}
        </Space>
      </div>
    </Card>
  );
};

export default BookCard;
