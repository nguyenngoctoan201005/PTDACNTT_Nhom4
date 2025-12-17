import {
  Row,
  Col,
  Typography,
  Tag,
  Rate,
  Button,
  InputNumber,
  Space,
  Tabs,
  Card,
  Divider,
  Descriptions,
  message,
  Spin,
} from "antd";
import {
  ShoppingCartOutlined,
  HeartTwoTone,
  ShareAltOutlined,
  PlusOutlined,
  MinusOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import BookReview from "./BookReview";
import BookCard from "../../../components/BookCard";
import { useParams } from "react-router";
import { useGlobalContext } from "../../../GlobalContext";
import { getSachDetail, getSachByMaLoai } from "../../../api/sachService";
import { formatCurrency } from "../../../hooks/formatCurrentcy";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useTranslation } from "react-i18next";

const { Title, Text, Paragraph } = Typography;

const BookDetail = () => {
  const [relatedBooks, setRelatedBooks] = useState([]);
  const { t } = useTranslation();

  const [bookDetail, setBookDetail] = useState();
  const [value, setValue] = useState(1);
  const [addFavorite, setAddFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  const { addToCart, cart } = useGlobalContext();

  const items = [
    {
      key: "1",
      label: t("book.detail.description"),
      children: (
        <Card>
          <Typography.Title level={5}>
            {t("book.detail.description")}
          </Typography.Title>
          {bookDetail?.moTa}
        </Card>
      ),
    },
    {
      key: "2",
      label: t("book.detail.info"),
      children: (
        <Card>
          <Descriptions
            bordered={false}
            column={1}
            labelStyle={{
              width: 200,
              fontWeight: 500,
              color: "#555",
            }}
            contentStyle={{
              color: "#000",
            }}
          >
            {/* <Descriptions.Item label="Loại sản phẩm">Bìa mềm</Descriptions.Item>
            <Descriptions.Item label="Dịch giả">
              Phạm Thị Nguyệt
            </Descriptions.Item> */}

            {/* <Descriptions.Item label="Kích thước">
              13 × 20.5 cm
            </Descriptions.Item> */}
            <Descriptions.Item label={t("book.detail.publisher")}>
              {bookDetail?.nhaXuatBan?.tenNXB}
            </Descriptions.Item>

            {/* <Descriptions.Item label="Số trang">127</Descriptions.Item>
            <Descriptions.Item label="Đơn Vị Liên Kết Xuất Bản">
              Phương Nam Book
            </Descriptions.Item> */}

            <Descriptions.Item label={t("book.detail.author")}>
              Ihara Saikaku
            </Descriptions.Item>
          </Descriptions>
        </Card>
      ),
    },
    {
      key: "3",
      label: t("book.detail.reviews"),
      children: <BookReview />,
    },
  ];

  const { bookId } = useParams();

  const fetchSachDetail = async () => {
    try {
      window.scrollTo(0, 0);
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await getSachDetail({
        id: bookId,
      });
      setBookDetail(response.result);

      // Fetch related books
      if (response.result?.loaiSach?.maLoai) {
        const relatedRes = await getSachByMaLoai({
          maLoai: response.result.loaiSach.maLoai,
        });
        setRelatedBooks(
          relatedRes.result.filter((b) => b.maSach !== response.result.maSach)
        );
      }
    } catch (error) {
      console.log(error);
      message.error(t("book.detail.error_fetch"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSachDetail();
  }, [bookId]);

  useEffect(() => {
    if (bookDetail) {
      document.title = `${bookDetail.tenSach} - Bookstore`;
    }
  }, [bookDetail]);

  useEffect(() => {
    if (bookDetail) {
      const storedBooks =
        JSON.parse(localStorage.getItem("favoriteBooks")) || [];
      const isFavorite = storedBooks.some(
        (item) => item.id === bookDetail.maSach
      );
      setAddFavorite(isFavorite);
    }
  }, [bookDetail]);

  const handleAddToCart = async () => {
    try {
      setCartLoading(true);
      await addToCart({
        maSach: bookId,
        soLuong: value,
      });

      message.success(t("book.detail.added_to_cart"));
    } catch (err) {
      console.log("error >>>", err);
      message.error(err.message);
    } finally {
      setCartLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          margin: "0 80px",
          borderRadius: 8,
        }}
        className="p-10"
      >
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-blue-50 mt-10">
      {/* <Spin spinning={loading} size="large" tip="Đang tải dữ liệu..."> */}
      <div
        style={{
          background: "#fff",
          margin: "0 80px",
          borderRadius: 8,
        }}
        className="p-10"
      >
        <Row gutter={[40, 40]} align="middle">
          <Col xs={24} md={12} lg={12}>
            <img
              src={`https://covers.openlibrary.org/b/id/${bookDetail?.hinhAnhs[0]}-L.jpg`}
              alt={bookDetail?.tenSach}
              style={{
                width: "100%",
                borderRadius: 8,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                maxHeight: 600,
                maxWidth: 500,
              }}
            />
          </Col>

          <Col xs={24} md={12} lg={12}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Tag color="blue">{bookDetail?.loaiSach?.tenLoai || ""}</Tag>

              <Title level={2} style={{ margin: 0 }}>
                {bookDetail?.tenSach}
              </Title>
              <Text type="secondary">
                Tác giả: {bookDetail?.tacGiaSet[0]?.tenTG}
              </Text>

              <Space align="center" size="small">
                <Rate disabled value={bookDetail?.avgSao || 5} />
                <Text strong>{bookDetail?.avgSao || 5}</Text>
                <Text type="secondary">
                  ({bookDetail?.soLuotDG || 0}{" "}
                  {t("book.detail.reviews").toLowerCase()})
                </Text>
              </Space>

              <Space align="baseline" size="middle">
                <Title level={2} style={{ color: "#1677ff", margin: 0 }}>
                  {formatCurrency(bookDetail?.donGia)}
                </Title>
                {/* <Text delete>{formatNumber(bookDetail?.giaBan)}</Text> */}
                {/* <Tag color="red">{bookDetail?.giamGia}% OFF</Tag> */}
              </Space>

              <Paragraph style={{ maxWidth: 600 }}>
                {bookDetail?.moTa}
              </Paragraph>

              <Text type="success">
                ✓{" "}
                {t("book.detail.stock_quantity", {
                  count: bookDetail?.soLuongCo,
                })}
              </Text>

              <Space align="center" style={{ marginTop: 8 }}>
                <Text>{t("book.detail.quantity")}</Text>
                <Space>
                  <Button
                    icon={<MinusOutlined />}
                    onClick={() => setValue((v) => Math.max(v - 1, 0))}
                    disabled={value <= 1}
                  />
                  <InputNumber
                    controls={false}
                    value={value}
                    onChange={(v) => setValue(v)}
                    min={1}
                    max={100}
                    style={{ width: 80, textAlign: "right" }}
                  />
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => setValue((v) => v + 1)}
                  />
                </Space>
              </Space>

              <Space size="middle" style={{ marginTop: 16 }}>
                <Button
                  type="primary"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                  onClick={handleAddToCart}
                  loading={cartLoading}
                >
                  {t("book.detail.add_to_cart")}
                </Button>
                <Button
                  icon={
                    addFavorite ? (
                      <HeartFilled style={{ color: "red" }} />
                    ) : (
                      <HeartOutlined />
                    )
                  }
                  onClick={() => {
                    const storedBooks =
                      JSON.parse(localStorage.getItem("favoriteBooks")) || [];
                    if (addFavorite) {
                      const newBooks = storedBooks.filter(
                        (item) => item.id !== bookDetail.maSach
                      );
                      localStorage.setItem(
                        "favoriteBooks",
                        JSON.stringify(newBooks)
                      );
                      setAddFavorite(false);
                      message.success(t("common.message.removed_favorite"));
                    } else {
                      const newBook = {
                        id: bookDetail.maSach,
                        name: bookDetail.tenSach,
                        price: bookDetail.donGia,
                        hinhAnhs: bookDetail.hinhAnhs,
                        soSao: bookDetail.avgSao,
                        tacGia: bookDetail.tacGiaSet?.[0]?.tenTG,
                      };
                      localStorage.setItem(
                        "favoriteBooks",
                        JSON.stringify([...storedBooks, newBook])
                      );
                      setAddFavorite(true);
                      message.success(t("common.message.added_favorite"));
                    }
                  }}
                  size="large"
                  type="text"
                />
                <Button icon={<ShareAltOutlined />} size="large" type="text" />
              </Space>
            </Space>
          </Col>
        </Row>
      </div>
      <div
        style={{
          padding: 40,
          background: "#fff",
          margin: "20px 80px",
          borderRadius: 8,
        }}
      >
        <Row gutter={[32, 32]} align="top">
          <Col xs={24} md={24} lg={18}>
            <Tabs defaultActiveKey="1" items={items} />
          </Col>
          <Col xs={24} md={24} lg={6}>
            <Card
              style={{
                height: "100%",
              }}
            >
              <Title level={5}>{t("book.detail.related_books")}</Title>
              <Divider />
              <div
                style={{
                  maxHeight: 780,
                  overflowY: "auto",
                  scrollbarWidth: "none",
                }}
              >
                <div className="sm:grid sm:grid-cols-2 lg:grid-cols-1">
                  {relatedBooks.map((book, index) => (
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
                        showButton={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      {/* </Spin> */}
    </div>
  );
};

export default BookDetail;
