import {
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
  Typography,
  Empty,
} from "antd";
import OrderCard from "../../../components/OrderCard";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import { useGlobalContext } from "../../../GlobalContext";
import { formatCurrency } from "../../../hooks/formatCurrentcy";
import RequireLoginPage from "../../../components/RequireLoginPage";

const Cart = () => {
  const { cart, fetchCart, token } = useGlobalContext();

  if (!token) {
    return <RequireLoginPage />;
  }

  const orderBooks =
    cart?.chiTietGHResponses?.map((c) => ({
      ...c.sach,
      soLuong: c.soLuong,
    })) || [];

  const [books, setBooks] = useState(orderBooks);
  const [totalPrice, setTotalPrice] = useState(cart.tongTien);

  const navigate = useNavigate();

  const handleRemove = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.maSach !== id));
    fetchCart();
  };

  const handleQuantityChange = (id, soLuong) => {
    if (soLuong < 1) return;
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.maSach === id ? { ...book, soLuong } : book
      )
    );
    fetchCart();
  };

  useEffect(() => {
    setTotalPrice(cart.tongTien);
  }, [cart]);

  return (
    <div className="bg-blue-50 py-6">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Typography.Title
              level={3}
              style={{
                marginBottom: 0,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div className="text-2xl bg-blue-500 p-2 rounded-md flex items-center justify-center text-white">
                <ShoppingCartOutlined />
              </div>
              Giỏ hàng
            </Typography.Title>
          </Card>
        </Col>
        <Col span={books.length > 0 ? 18 : 24}>
          {books.length > 0 ? (
            <div>
              {books.map((book) => (
                <OrderCard
                  key={book.maSach}
                  book={book}
                  onRemove={handleRemove}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </div>
          ) : (
            <Card className="flex flex-col items-center justify-center py-12">
              <Empty
                description="Giỏ hàng của bạn đang trống"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </Card>
          )}
        </Col>
        {books.length > 0 ? (
          <Col span={6}>
            <Card>
              <div className="flex justify-between items-center mb-8">
                <Typography.Title level={5} style={{ marginBottom: 0 }}>
                  Tổng tiền
                </Typography.Title>
                <Button
                  icon={<UnorderedListOutlined />}
                  type="text"
                  onClick={() => {
                    navigate("/order-list");
                  }}
                />
              </div>
              <Typography.Title level={4} className="flex justify-between">
                <div>Tổng tiền</div>
                <span>{formatCurrency(totalPrice)}</span>
              </Typography.Title>
              <Divider />
              <div className="flex flex-col gap-2">
                <Button
                  type="primary"
                  block
                  onClick={() => navigate("/checkout")}
                >
                  Thanh toán
                </Button>
                <Button block onClick={() => navigate("/home")}>
                  Tiếp tục mua sắm
                </Button>
              </div>
            </Card>
          </Col>
        ) : (
          <></>
        )}
      </Row>
    </div>
  );
};

export default Cart;
