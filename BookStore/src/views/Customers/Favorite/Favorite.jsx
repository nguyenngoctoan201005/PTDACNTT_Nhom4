import { Breadcrumb, Card, Flex, Typography } from "antd";
import { Link } from "react-router";
import BookCard from "../../../components/BookCard";
import { useState } from "react";
import RequireLoginPage from "../../../components/RequireLoginPage";
import { useGlobalContext } from "../../../GlobalContext";

const Favorite = () => {
  const { token } = useGlobalContext();
  const favoriteBooks = [
    {
      imageUrl: "https://via.placeholder.com/150x200?text=Midnight+Library",
      type: "comedy",
      discount: 17,
      name: "The Midnight Library",
      author: "Matt Haig",
      price: 2.99,
      id: 1,
    },
    {
      imageUrl: "https://via.placeholder.com/150x200?text=Atomic+Habits",
      type: "self-help",
      discount: 10,
      name: "Atomic Habits",
      author: "James Clear",
      price: 5.49,
      id: 2,
    },
    {
      imageUrl: "https://via.placeholder.com/150x200?text=1984",
      type: "fiction",
      discount: 20,
      name: "1984",
      author: "George Orwell",
      price: 3.99,
      id: 3,
    },
    {
      imageUrl: "https://via.placeholder.com/150x200?text=Harry+Potter",
      type: "fantasy",
      discount: 15,
      name: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      price: 4.99,
      id: 4,
    },
    {
      imageUrl: "https://via.placeholder.com/150x200?text=Harry+Potter",
      type: "fantasy",
      discount: 15,
      name: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      price: 4.99,
      id: 5,
    },
    {
      imageUrl: "https://via.placeholder.com/150x200?text=Harry+Potter",
      type: "fantasy",
      discount: 15,
      name: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      price: 4.99,
      id: 6,
    },
  ];

  const [books, setBooks] = useState(favoriteBooks);

  const handleRemove = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
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
          <div>Not available</div>
        )}
      </Card>
    </div>
  );
};

export default Favorite;
