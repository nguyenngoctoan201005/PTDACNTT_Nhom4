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
import { useState, useEffect } from "react";
import { formatCurrency } from "../hooks/formatCurrentcy";
import {
  updateSoLuongGioHang,
  deleteSachFromGioHang,
} from "../api/gioHangService";
import { useDebounce } from "../hooks/useDebounce";

const { Title, Text } = Typography;

const OrderCard = ({ key, book, onRemove, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(book.soLuong);

  useEffect(() => {
    setQuantity(book.soLuong);
  }, [book.soLuong]);

  const discount = book.discount ?? 0;
  const price = book.donGia;

  const discountedPrice = discount
    ? Math.round(price - (price * discount) / 100)
    : price;

  const updateQuantity = async (newQty, action) => {
    try {
      const newQ = action === "UPDATE" ? newQty : 1;
      await updateSoLuongGioHang({
        maSach: book.maSach,
        action: action,
        soLuong: newQ,
      });
      console.log("newQty", newQty);
      setQuantity(newQty);
      onQuantityChange?.(book.maSach, newQty);
    } catch (error) {
      console.error("Lỗi cập nhật số lượng:", error);
    }
  };

  const handleIncrease = () => {
    const newQty = quantity + 1;
    updateQuantity(newQty, "INCREASE");
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      updateQuantity(newQty, "DECREASE");
    }
  };

  const [inputValue, setInputValue] = useState(book.soLuong || 1);

  useEffect(() => {
    setQuantity(book.soLuong);
    setInputValue(book.soLuong || 1);
  }, [book.soLuong]);

  const debouncedValue = useDebounce(inputValue, 200);

  useEffect(() => {
    if (debouncedValue === book.soLuong) return;
    if (debouncedValue && debouncedValue >= 1) {
      updateQuantity(debouncedValue, "UPDATE");
    }
  }, [debouncedValue]);

  const handleInputChange = (value) => {
    if (!value || value < 1) return;
    setInputValue(value);
    setQuantity(value);
  };

  const handleDelete = async () => {
    try {
      await deleteSachFromGioHang({ maSach: book.maSach });
      onRemove?.(book.maSach);
    } catch (error) {
      console.error("Lỗi xóa sách:", error);
    }
  };

  return (
    <Card
      key={key}
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
                alt={book.tenSach}
                width={80}
                height={100}
                preview={false}
                style={{ borderRadius: 8, objectFit: "cover" }}
              />
            </Col>
            <Col>
              <Title level={5} style={{ marginBottom: 0 }}>
                {book.tenSach}
              </Title>
              {!!book.author && <Text type="secondary">by {book.author}</Text>}
              <div style={{ marginTop: 8 }}>
                {book.discount ? (
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
                onChange={handleInputChange}
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
                onClick={handleDelete}
              />
            </Space>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default OrderCard;
