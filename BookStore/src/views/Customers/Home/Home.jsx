import { Carousel, Row, Col, Typography, Card } from "antd";
import {
  BookOutlined,
  SearchOutlined,
  StarOutlined,
  RiseOutlined,
  TeamOutlined,
  UserOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import HomeBookCollection from "./HomeBookCollection";
import "./Home.css";
import BookCard from "../../../components/BookCard";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../GlobalContext";

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useGlobalContext();

  const books = [
    {
      title: "The Seven Husbands",
      subtitle: "Taylor Jenkins Reid",
      cover: "https://via.placeholder.com/150x200?text=Seven+Husbands",
    },
    {
      title: "Dune",
      subtitle: "Frank Herbert",
      cover: "https://via.placeholder.com/150x200?text=Dune",
    },
    {
      title: "The Midnight Library",
      subtitle: "Matt Haig",
      cover: "https://via.placeholder.com/150x200?text=Midnight+Library",
    },
  ];
  const premiumBooks = [
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
  ];
  const genres = [
    {
      icon: <BookOutlined style={{ fontSize: 32, color: "#1677ff" }} />,
      name: "Fiction",
      count: 1247,
    },
    {
      icon: <SearchOutlined style={{ fontSize: 32, color: "#1677ff" }} />,
      name: "Mystery",
      count: 892,
    },
    {
      icon: <StarOutlined style={{ fontSize: 32, color: "#1677ff" }} />,
      name: "Romance",
      count: 1156,
    },
    {
      icon: <RiseOutlined style={{ fontSize: 32, color: "#1677ff" }} />,
      name: "Sci-Fi",
      count: 743,
    },
    {
      icon: <TeamOutlined style={{ fontSize: 32, color: "#1677ff" }} />,
      name: "Biography",
      count: 634,
    },
    {
      icon: <UserOutlined style={{ fontSize: 32, color: "#1677ff" }} />,
      name: "Self-Help",
      count: 987,
    },
  ];
  const genresList = [
    ...genres.slice(0, 5),
    {
      icon: <EllipsisOutlined style={{ fontSize: 32, color: "#1677ff" }} />,
      name: "More",
      onClick: () => navigate("/genres"),
    },
  ];

  return (
    <div>
      <div>
        <Carousel
          autoplay
          arrows
          style={{
            backgroundColor: "lightblue",
            height: "calc(100vh - 80px - 40px)",
            marginBottom: "80px",
          }}
          dots={{
            className: "custom-dots",
            style: { bottom: "20px" },
          }}
        >
          <HomeBookCollection
            tag="Limited Edition"
            title="Premium Collection"
            subtitle="Curated Selection"
            description="Handpicked premium books with exclusive author signatures available"
            buttons={[
              {
                label: "Shop Now",
                type: "primary",
                onClick: () => console.log("Shop"),
              },
              { label: "View Collection", onClick: () => console.log("View") },
            ]}
            items={books}
          />
          <HomeBookCollection
            tag="Limited Edition"
            title="Premium Collection"
            subtitle="Curated Selection"
            description="Handpicked premium books with exclusive author signatures available"
            buttons={[
              {
                label: "Shop Now",
                type: "primary",
                onClick: () => console.log("Shop"),
              },
              { label: "View Collection", onClick: () => console.log("View") },
            ]}
            items={books}
          />
          <HomeBookCollection
            tag="Limited Edition"
            title="Premium Collection"
            subtitle="Curated Selection"
            description="Handpicked premium books with exclusive author signatures available"
            buttons={[
              {
                label: "Shop Now",
                type: "primary",
                onClick: () => console.log("Shop"),
              },
              { label: "View Collection", onClick: () => console.log("View") },
            ]}
            items={books}
          />
          <HomeBookCollection
            tag="Limited Edition"
            title="Premium Collection"
            subtitle="Curated Selection"
            description="Handpicked premium books with exclusive author signatures available"
            buttons={[
              {
                label: "Shop Now",
                type: "primary",
                onClick: () => console.log("Shop"),
              },
              { label: "View Collection", onClick: () => console.log("View") },
            ]}
            items={books}
          />
        </Carousel>
      </div>
      <div className="px-[80px] pt-10 bg-white">
        <div className="flex">
          <Typography.Title level={3}>Thể loại 1</Typography.Title>
          <div className="flex-1" />
          <Link to={"/#"}>Xem tất cả</Link>
        </div>
        <div className="flex">
          {premiumBooks.map((book, index) => (
            <div
              key={index}
              style={{
                flex: "1 1 240px",
                maxWidth: "240px",
                margin: "8px",
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
                onAddToCart={() => addToCart({ maSach: book.id, soLuong: 1 })}
                onAddToFavorite={() => console.log("added")}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="px-[80px] pt-10 bg-white">
        <div className="flex">
          <Typography.Title level={3}>Thể loại 2</Typography.Title>
          <div className="flex-1" />
          <Link to={"/#"}>Xem tất cả</Link>
        </div>
        <div className="flex">
          {premiumBooks.map((book, index) => (
            <div
              key={index}
              style={{
                flex: "1 1 240px",
                maxWidth: "240px",
                margin: "8px",
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
                onAddToCart={() => console.log("added")}
                onAddToFavorite={() => console.log("added")}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="px-[80px] py-10 bg-blue-50">
        <Typography.Title level={2} className="text-center">
          Browse by genres
        </Typography.Title>
        <Row gutter={[16, 16]} justify="center">
          {genresList.map((genre, index) => (
            <Col key={index} xs={12} sm={8} md={6} lg={4}>
              <Card
                hoverable
                style={{
                  textAlign: "center",
                  borderRadius: 12,
                }}
                onClick={genre.onClick}
              >
                {genre.icon}
                <h3 style={{ marginTop: 12 }}>{genre.name}</h3>
                <p style={{ color: "#888" }}>{genre.count} books</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
