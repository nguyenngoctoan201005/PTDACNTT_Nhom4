import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Image,
  Tag,
  InputNumber,
  Space,
} from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Title, Text } = Typography;

const OrderCard = ({ book, onRemove, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(book.quantity || 1);

  const handleIncrease = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    onQuantityChange?.(book.id, newQty);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      onQuantityChange?.(book.id, newQty);
    }
  };

  return (
    <Card
      style={{
        borderRadius: 12,
        marginBottom: 16,
      }}
    >
      <Row align="middle" justify="space-between">
        <Col flex="auto">
          <Row align="middle" gutter={16}>
            <Col>
              <Image
                src={book.imageUrl}
                alt={book.name}
                width={80}
                height={100}
                preview={false}
                style={{ borderRadius: 8, objectFit: "cover" }}
              />
            </Col>
            <Col>
              <Title level={5} style={{ marginBottom: 0 }}>
                {book.name}
              </Title>
              <Text type="secondary">by {book.author}</Text>
              <div style={{ marginTop: 8 }}>
                <Text
                  strong
                  style={{
                    fontSize: 18,
                    color: "#1677ff",
                  }}
                >
                  ${book.discountPrice ?? book.price}
                </Text>
                {book.discount && (
                  <>
                    <Text
                      delete
                      type="secondary"
                      style={{ marginLeft: 8, fontSize: 16 }}
                    >
                      ${book.price}
                    </Text>
                    <Tag color="red" style={{ marginLeft: 8 }}>
                      {book.discount}% OFF
                    </Tag>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Col>

        <Col>
          <Row align="middle" gutter={8}>
            <Space>
              <Button
                onClick={handleDecrease}
                disabled={quantity <= 1}
                type="primary"
                icon={<MinusOutlined />}
              />
              <InputNumber
                controls={false}
                value={quantity}
                onChange={(v) => setQuantity(v)}
                min={1}
                max={100}
                style={{ width: 80, textAlign: "right" }}
              />
              <Button
                onClick={handleIncrease}
                type="primary"
                icon={<PlusOutlined />}
              />
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => onRemove?.(book.id)}
              />
            </Space>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default OrderCard;
