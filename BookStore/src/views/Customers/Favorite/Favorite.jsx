import { Breadcrumb, Card, Flex, Typography, message, Empty } from "antd";
import { Link } from "react-router";
import BookCard from "../../../components/BookCard";
import { useState, useEffect } from "react";
import RequireLoginPage from "../../../components/RequireLoginPage/RequireLoginPage";
import { useGlobalContext } from "../../../GlobalContext";
import { useTranslation } from "react-i18next";

const Favorite = () => {
  const { token } = useGlobalContext();
  const [books, setBooks] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("favoriteBooks")) || [];
    setBooks(storedBooks);
  }, []);

  const handleRemove = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    localStorage.setItem("favoriteBooks", JSON.stringify(updatedBooks));
    message.success(t("common.message.removed_favorite"));
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
            title: <Link to={"/home"}>{t("home.name")}</Link>,
          },
          {
            key: 2,
            title: t("favorite.title"),
          },
        ]}
      />
      <Typography.Title level={2}>{t("favorite.title")}</Typography.Title>
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
                  imageUrl={
                    `https://covers.openlibrary.org/b/id/${book.hinhAnhs[0]}-L.jpg` ||
                    ""
                  }
                  type={book.type}
                  discount={book.discount}
                  name={book.name}
                  author={book.author}
                  price={book.price}
                  soSao={book.soSao}
                  id={book.id}
                  onAddToCart={handleAddToCart}
                  onRemove={handleRemove}
                />
              </div>
            ))}
          </Flex>
        ) : (
          <Empty description={t("favorite.empty")} />
        )}
      </Card>
    </div>
  );
};

export default Favorite;
