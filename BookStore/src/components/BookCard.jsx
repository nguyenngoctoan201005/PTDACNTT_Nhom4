import { Card, Tag, Rate, Button, Typography, Row, Space } from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { formatCurrency } from "../hooks/formatCurrentcy";
import { useGlobalContext } from "../GlobalContext";

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
  const { addToCart } = useGlobalContext();
  const discountedPrice = discount
    ? Math.round(price - (price * discount) / 100)
    : price;

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
              alt={name}
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
            {!!discount && (
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
            )}
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
        {!!author && <Text type="secondary">by {author}</Text>}

        <Row align="middle" style={{ marginTop: 8 }}>
          <Rate disabled defaultValue={4.8} style={{ fontSize: 14 }} />
          <Text style={{ marginLeft: 8 }}>
            <b>4.8</b>
          </Text>
        </Row>

        <Row align="start" style={{ marginTop: 8 }}>
          {discount ? (
            <>
              <Text strong style={{ fontSize: 20, color: "#1677ff" }}>
                {formatCurrency(discountedPrice)}
              </Text>
              <Text
                delete
                style={{ marginLeft: 8, fontSize: 16, color: "#999" }}
              >
                {formatCurrency(price)}
              </Text>
            </>
          ) : (
            <Text strong style={{ fontSize: 20, color: "#1677ff" }}>
              {formatCurrency(price)}
            </Text>
          )}
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
              onClick={() => addToCart({ maSach: id, soLuong: 1 })}
              style={{
                backgroundColor: "#f44336",
                borderColor: "#f44336",
                borderRadius: 6,
              }}
            >
              Thêm vào giỏ hàng
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
              Thêm vào yêu thích
            </Button>
          )}
        </Space>
      </div>
    </Card>
  );
};

export default BookCard;
