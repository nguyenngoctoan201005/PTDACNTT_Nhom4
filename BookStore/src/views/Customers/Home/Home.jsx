import { Carousel, Row, Col, Typography, Card, Spin, message } from "antd";
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
import { getSachByMaLoai } from "../../../api/sachService";
import { getListTheLoai } from "../../../api/theLoaiService";
import { useState, useEffect } from "react";
import { getCategoryIcon } from "../../../hooks/formatIconTheLoai";
import { useTranslation } from "react-i18next";

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useGlobalContext();
  const { t } = useTranslation();

  const [genres, setGenres] = useState([]);
  const [genre1Books, setGenre1Books] = useState([]);
  const [genre2Books, setGenre2Books] = useState([]);
  const [genre1Name, setGenre1Name] = useState("Thể loại 1");
  const [genre2Name, setGenre2Name] = useState("Thể loại 2");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenreBooks = async () => {
      try {
        setLoading(true);
        // Fetch books for genre 1 and 2
        const [genre1Data, genre2Data, genresData] = await Promise.all([
          getSachByMaLoai({ maLoai: 1 }),
          getSachByMaLoai({ maLoai: 21 }),
          getListTheLoai(),
        ]);

        setGenre1Books(genre1Data.result);
        setGenre2Books(genre2Data.result);
        setGenres(
          genresData.result.map((g) => ({
            ...g,
            icon: getCategoryIcon(g.maLoai),
          }))
        );

        // Find genre names
        const genre1 = genresData.result.find((g) => g.maLoai === 1);
        const genre2 = genresData.result.find((g) => g.maLoai === 21);

        if (genre1) setGenre1Name(genre1.tenLoai);
        if (genre2) setGenre2Name(genre2.tenLoai);
      } catch (error) {
        console.error("Error fetching genre books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreBooks();
  }, []);

  const bestSellerBooks = [
    {
      title: "Nhà Giả Kim",
      subtitle: "Paulo Coelho",
      cover: "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg",
    },
    {
      title: "Nghĩ Giàu Làm Giàu",
      subtitle: "Napoleon Hill",
      cover: "https://covers.openlibrary.org/b/isbn/9780449214923-L.jpg",
    },
    {
      title: "Đại Gia Gatsby",
      subtitle: "F. Scott Fitzgerald",
      cover: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
    },
  ];

  const newReleaseBooks = [
    {
      title: "Những Người Khốn Khổ",
      subtitle: "Victor Hugo",
      cover: "https://covers.openlibrary.org/b/isbn/9780451419439-L.jpg",
    },
    {
      title: "Xứ Cát (Dune)",
      subtitle: "Frank Herbert",
      cover: "https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg",
    },
    {
      title: "Tội Ác và Trừng Phạt",
      subtitle: "Fyodor Dostoevsky",
      cover: "https://covers.openlibrary.org/b/isbn/9780143107637-L.jpg",
    },
  ];

  const dealBooks = [
    {
      title: "Hoàng Tử Bé",
      subtitle: "Antoine de Saint-Exupéry",
      cover: "https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg",
    },
    {
      title: "Ông Già Và Biển Cả",
      subtitle: "Ernest Hemingway",
      cover: "https://covers.openlibrary.org/b/isbn/9780684801223-L.jpg",
    },
    {
      title: "Giết Con Chim Nhại",
      subtitle: "Harper Lee",
      cover: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",
    },
  ];

  const exclusiveBooks = [
    {
      title: "Anh Chàng Hobbit",
      subtitle: "J.R.R. Tolkien",
      cover: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg",
    },
    {
      title: "Chúa Tể Những Chiếc Nhẫn",
      subtitle: "J.R.R. Tolkien",
      cover: "https://covers.openlibrary.org/b/isbn/9780261103252-L.jpg",
    },
    {
      title: "Trò Chơi Vương Quyền",
      subtitle: "George R.R. Martin",
      cover: "https://covers.openlibrary.org/b/isbn/9780553103540-L.jpg",
    },
  ];

  const genresList = [
    ...genres.slice(0, 5),
    {
      icon: <EllipsisOutlined style={{ fontSize: 32, color: "#1677ff" }} />,
      tenLoai: t("home.genre.view_more"),
    },
  ];

  return (
    <div>
      <div className="-mx-[80px] -mt-6 custom-carousel">
        <Carousel
          autoplay={{ dotDuration: true }}
          autoplaySpeed={5000}
          arrows
          style={{
            backgroundColor: "white",
            marginTop: "40px",
            marginBottom: "80px",
          }}
          dots={{
            className: "custom-dots",
            style: { bottom: "20px" },
          }}
        >
          <HomeBookCollection
            tag={t("home.collection.bestseller.tag")}
            title={t("home.collection.bestseller.title")}
            subtitle={t("home.collection.bestseller.subtitle")}
            description={t("home.collection.bestseller.description")}
            items={bestSellerBooks}
          />
          <HomeBookCollection
            tag={t("home.collection.new_release.tag")}
            title={t("home.collection.new_release.title")}
            subtitle={t("home.collection.new_release.subtitle")}
            description={t("home.collection.new_release.description")}
            items={newReleaseBooks}
          />
          <HomeBookCollection
            tag={t("home.collection.deals.tag")}
            title={t("home.collection.deals.title")}
            subtitle={t("home.collection.deals.subtitle")}
            description={t("home.collection.deals.description")}
            items={dealBooks}
          />
          <HomeBookCollection
            tag={t("home.collection.exclusive.tag")}
            title={t("home.collection.exclusive.title")}
            subtitle={t("home.collection.exclusive.subtitle")}
            description={t("home.collection.exclusive.description")}
            items={exclusiveBooks}
          />
        </Carousel>
      </div>
      <div className="px-[80px] pt-10 bg-white">
        <div className="flex">
          <Typography.Title level={3}>{genre1Name}</Typography.Title>
          <div className="flex-1" />
          <Link to={`/books?genre=1`}>{t("common.button.view_all")}</Link>
        </div>
        {loading ? (
          <div className="flex justify-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <div className="flex">
            {genre1Books.slice(0, 5).map((book, index) => (
              <div
                key={index}
                style={{
                  flex: "1 1 240px",
                  maxWidth: "240px",
                  margin: "8px",
                }}
              >
                <BookCard
                  imageUrl={`https://covers.openlibrary.org/b/id/${book.hinhAnhs[0]}-L.jpg`}
                  type={book.type}
                  discount={book.discount}
                  name={book.tenSach}
                  author={book.tacGiaSet?.[0]?.tenTG}
                  price={book.donGia}
                  id={book.maSach}
                  soSao={book.avgSao}
                  onAddToCart={() =>
                    addToCart({ maSach: book.maSach, soLuong: 1 })
                  }
                  onAddToFavorite={() => {
                    const favoriteBooks =
                      JSON.parse(localStorage.getItem("favoriteBooks")) || [];
                    const exists = favoriteBooks.some(
                      (b) => b.id === book.maSach
                    );
                    if (!exists) {
                      const newBook = {
                        id: book.maSach,
                        name: book.tenSach,
                        imageUrl: `https://covers.openlibrary.org/b/id/${book.hinhAnhs[0]}-L.jpg`,
                        price: book.donGia,
                        author: book.tacGiaSet?.[0]?.tenTG,
                        type: book.type,
                        discount: book.discount,
                      };
                      localStorage.setItem(
                        "favoriteBooks",
                        JSON.stringify([...favoriteBooks, newBook])
                      );
                      message.success(t("common.message.added_favorite"));
                    } else {
                      message.info(t("common.message.already_favorite"));
                    }
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="px-[80px] pt-10 bg-white">
        <div className="flex">
          <Typography.Title level={3}>{genre2Name}</Typography.Title>
          <div className="flex-1" />
          <Link to={`/books?genre=2`}>{t("common.button.view_all")}</Link>
        </div>
        {loading ? (
          <div className="flex justify-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <div className="flex">
            {genre2Books.slice(0, 5).map((book, index) => (
              <div
                key={index}
                style={{
                  flex: "1 1 240px",
                  maxWidth: "240px",
                  margin: "8px",
                }}
              >
                <BookCard
                  imageUrl={`https://covers.openlibrary.org/b/id/${book.hinhAnhs[0]}-L.jpg`}
                  type={book.type}
                  discount={book.discount}
                  name={book.tenSach}
                  author={book.tacGiaSet?.[0]?.tenTG}
                  price={book.donGia}
                  id={book.maSach}
                  soSao={book.avgSao}
                  onAddToCart={() =>
                    addToCart({ maSach: book.maSach, soLuong: 1 })
                  }
                  onAddToFavorite={() => {
                    const favoriteBooks =
                      JSON.parse(localStorage.getItem("favoriteBooks")) || [];
                    const exists = favoriteBooks.some(
                      (b) => b.id === book.maSach
                    );
                    if (!exists) {
                      const newBook = {
                        id: book.maSach,
                        name: book.tenSach,
                        imageUrl: `https://covers.openlibrary.org/b/id/${book.hinhAnhs[0]}-L.jpg`,
                        price: book.donGia,
                        author: book.tacGiaSet?.[0]?.tenTG,
                        type: book.type,
                        discount: book.discount,
                      };
                      localStorage.setItem(
                        "favoriteBooks",
                        JSON.stringify([...favoriteBooks, newBook])
                      );
                      message.success(t("common.message.added_favorite"));
                    } else {
                      message.info(t("common.message.already_favorite"));
                    }
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="px-[80px] py-10 bg-blue-50">
        <Typography.Title level={2} className="text-center">
          {t("home.genre.title")}
        </Typography.Title>
        <Row gutter={[16, 16]} justify="center">
          {genresList.map((genre, index) => (
            <Col key={index} xs={12} sm={8} md={6} lg={4}>
              <Card
                hoverable
                style={{
                  textAlign: "center",
                  borderRadius: 12,
                  height: "100%",
                }}
                onClick={() =>
                  genre.maLoai
                    ? navigate(`/books?maLoai=${genre.maLoai}`)
                    : navigate("/books")
                }
              >
                <div className="text-2xl text-blue-500">{genre.icon}</div>
                <h3 style={{ marginTop: 12 }}>{genre.tenLoai}</h3>
                <p style={{ color: "#888" }}>
                  {t("home.genre.book_count", {
                    count: Math.round(Math.random() * 100),
                  })}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
