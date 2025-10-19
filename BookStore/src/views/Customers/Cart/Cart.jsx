import { Button, Card, Col, Divider, Row, Space, Typography } from "antd";
import OrderCard from "../../../components/OrderCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UnorderedListOutlined } from "@ant-design/icons";

const Cart = () => {
  const orderBook = [
    {
      id: 1,
      name: "The Midnight Library",
      author: "Matt Haig",
      price: 29.99,
      discount: 17,
      discountPrice: 24.99,
      imageUrl: "https://via.placeholder.com/100x140?text=The+Midnight+Library",
    },
    {
      id: 2,
      name: "The Midnight Library",
      author: "Matt Haig",
      price: 29.99,
      discount: 17,
      discountPrice: 24.99,
      imageUrl: "https://via.placeholder.com/100x140?text=The+Midnight+Library",
    },
    {
      id: 3,
      name: "The Midnight Library",
      author: "Matt Haig",
      price: 29.99,
      discount: 17,
      discountPrice: 24.99,
      imageUrl: "https://via.placeholder.com/100x140?text=The+Midnight+Library",
    },
    {
      id: 4,
      name: "The Midnight Library",
      author: "Matt Haig",
      price: 29.99,
      discount: 17,
      discountPrice: 24.99,
      imageUrl: "https://via.placeholder.com/100x140?text=The+Midnight+Library",
    },
  ];

  const booksWithQuantity = orderBook.map((book) => {
    return {
      ...book,
      quantity: 1,
    };
  });
  const [books, setBooks] = useState(booksWithQuantity);

  const navigate = useNavigate();

  const handleRemove = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === id ? { ...book, quantity } : book))
    );
  };

  const totalPrice = books
    .reduce((sum, b) => sum + b.discountPrice * b.quantity, 0)
    .toFixed(2);

  return (
    <div className="bg-blue-50 py-4 mt-20 px-[80px]">
      <Typography.Title level={2}>Shopping Cart</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={18}>
          {books.length > 0 ? (
            <div>
              {books.map((book) => (
                <OrderCard
                  key={book.id}
                  book={book}
                  onRemove={handleRemove}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </div>
          ) : (
            <Card>Not available</Card>
          )}
        </Col>
        <Col span={6}>
          <Card>
            <div className="flex justify-between items-center mb-8">
              <Typography.Title level={5} style={{ marginBottom: 0 }}>
                Order Summary
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
              <div>Total</div>
              <span>{totalPrice}</span>
            </Typography.Title>
            <Divider />
            <div className="flex flex-col gap-2">
              <Button
                type="primary"
                block
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>
              <Button block onClick={() => navigate("/home")}>
                Continue Shopping
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
