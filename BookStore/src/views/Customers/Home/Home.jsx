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

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useGlobalContext();

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
          getSachByMaLoai({ maLoai: 2 }),
          getListTheLoai(),
        ]);

        console.log("genre1Data", genre1Data);
        console.log("genre2Data", genre2Data);
        console.log("genresData", genresData);

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
        const genre2 = genresData.result.find((g) => g.maLoai === 2);

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

  const genresList = [
    ...genres.slice(0, 5),
    {
      icon: <EllipsisOutlined style={{ fontSize: 32, color: "#1677ff" }} />,
      tenLoai: "Xem thêm",
      onClick: () => navigate("/genres"),
    },
  ];

  console.log("genre1Books", genre1Books);
  console.log("genre2Books", genre2Books);
  console.log("genres", genresList);

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
            tag="Bộ sưu tập đặc biệt"
            title="Sách Bán Chạy Nhất"
            subtitle="Được yêu thích nhất"
            description="Khám phá những cuốn sách được độc giả tin tưởng và lựa chọn nhiều nhất"
            items={books}
          />
          <HomeBookCollection
            tag="Sách mới"
            title="Ra Mắt Tuần Này"
            subtitle="Cập nhật liên tục"
            description="Những cuốn sách mới nhất vừa được phát hành, đừng bỏ lỡ"
            items={books}
          />
          <HomeBookCollection
            tag="Ưu đãi hấp dẫn"
            title="Giảm Giá Đặc Biệt"
            subtitle="Tiết kiệm đến 50%"
            description="Cơ hội sở hữu sách yêu thích với mức giá tốt nhất"
            items={books}
          />
          <HomeBookCollection
            tag="Độc quyền"
            title="Bộ Sưu Tập Cao Cấp"
            subtitle="Phiên bản giới hạn"
            description="Sách cao cấp với chữ ký tác giả và bìa đặc biệt"
            items={books}
          />
        </Carousel>
      </div>
      <div className="px-[80px] pt-10 bg-white">
        <div className="flex">
          <Typography.Title level={3}>{genre1Name}</Typography.Title>
          <div className="flex-1" />
          <Link to={`/books?genre=1`}>Xem tất cả</Link>
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
                      message.success("Đã thêm vào yêu thích");
                    } else {
                      message.info("Sách đã có trong danh sách yêu thích");
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
          <Link to={`/books?genre=2`}>Xem tất cả</Link>
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
                      message.success("Đã thêm vào yêu thích");
                    } else {
                      message.info("Sách đã có trong danh sách yêu thích");
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
          Khám phá theo thể loại
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
                onClick={genre.onClick}
              >
                <div className="text-2xl text-blue-500">{genre.icon}</div>
                <h3 style={{ marginTop: 12 }}>{genre.tenLoai}</h3>
                <p style={{ color: "#888" }}>
                  {Math.round(Math.random() * 100)} cuốn sách
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
