import { Breadcrumb, Card, Flex, Typography, message, Empty } from "antd";
import { Link } from "react-router";
import BookCard from "../../../components/BookCard";
import { useState, useEffect } from "react";
import RequireLoginPage from "../../../components/RequireLoginPage/RequireLoginPage";
import { useGlobalContext } from "../../../GlobalContext";

const Favorite = () => {
  const { token } = useGlobalContext();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("favoriteBooks")) || [];
    setBooks(storedBooks);
  }, []);

  const handleRemove = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    localStorage.setItem("favoriteBooks", JSON.stringify(updatedBooks));
    message.success("Đã xóa khỏi danh sách yêu thích");
  };

  const handleAddToCart = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  if (!token) {
    return <RequireLoginPage />;
  }

  return (
    <div className="bg-blue-50 py-6 px-[80px]">
      <Breadcrumb
        items={[
          {
            key: 1,
            title: <Link to={"/home"}>Home</Link>,
          },
          {
            key: 2,
            title: "Favorite",
          },
        ]}
      />
      <Typography.Title level={2}>Favorite</Typography.Title>
      <Card>
        {books.length > 0 ? (
          <Flex wrap>
            {books.map((book, index) => (
              <div
                key={index}
                style={{
                  flex: "1 1 240px",
                  maxWidth: "240px",
                  margin: "6px",
                }}
              >
                <BookCard
                  imageUrl={book.imageUrl}
                  type={book.type}
                  discount={book.discount}
                  name={book.name}
                  author={book.author}
                  price={book.price}
                  id={book.id}
                  onAddToCart={handleAddToCart}
                  onRemove={handleRemove}
                />
              </div>
            ))}
          </Flex>
        ) : (
          <Empty description="Chưa có sách yêu thích" />
        )}
      </Card>
    </div>
  );
};

export default Favorite;
