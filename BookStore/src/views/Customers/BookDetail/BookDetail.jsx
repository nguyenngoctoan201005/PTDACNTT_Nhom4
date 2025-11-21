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
import { useState } from "react";
import BookReview from "./BookReview";
import BookCard from "../../../components/BookCard";
import { useParams } from "react-router";
import { useGlobalContext } from "../../../GlobalContext";

const { Title, Text, Paragraph } = Typography;

const BookDetail = () => {
  const book = {
    title: "The Midnight Library",
    author: "Matt Haig",
    category: "Fiction",
    price: 24.99,
    oldPrice: 29.99,
    discount: 17,
    rating: 4.8,
    reviews: 2847,
    introduction:
      "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices...",
    stock: 47,
    cover: "https://via.placeholder.com/300x400?text=The+Midnight+Library",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores ab voluptates officia consequatur similique iusto odit culpa sunt ratione rerum, eveniet delectus ea ipsam obcaecati voluptate recusandae eum dicta magni",
  };
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

  const [value, setValue] = useState(1);
  const [addFavorite, setAddFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const { addToCart } = useGlobalContext();

  const items = [
    {
      key: "1",
      label: "Mô tả",
      children: (
        <Card>
          <Typography.Title level={5}>About this book</Typography.Title>
          {book.description}
        </Card>
      ),
    },
    {
      key: "2",
      label: "Thông tin chi tiết",
      children: (
        <Card>
          <Descriptions
            bordered={false}
            column={2}
            labelStyle={{
              width: 200,
              fontWeight: 500,
              color: "#555",
            }}
            contentStyle={{
              color: "#000",
            }}
          >
            <Descriptions.Item label="Loại sản phẩm">Bìa mềm</Descriptions.Item>
            <Descriptions.Item label="Dịch giả">
              Phạm Thị Nguyệt
            </Descriptions.Item>

            <Descriptions.Item label="Kích thước">
              13 × 20.5 cm
            </Descriptions.Item>
            <Descriptions.Item label="Nhà Xuất Bản">
              NXB Văn Học
            </Descriptions.Item>

            <Descriptions.Item label="Số trang">127</Descriptions.Item>
            <Descriptions.Item label="Đơn Vị Liên Kết Xuất Bản">
              Phương Nam Book
            </Descriptions.Item>

            <Descriptions.Item label="Tác giả">Ihara Saikaku</Descriptions.Item>
          </Descriptions>
        </Card>
      ),
    },
    {
      key: "3",
      label: "Đánh giá",
      children: <BookReview />,
    },
  ];

  const { bookId } = useParams();

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await addToCart({
        maSach: bookId,
        soLuong: value,
      });

      message.success("Thêm vào giỏ hàng thành công");
    } catch (err) {
      console.log("error >>>", err);
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 py-4 mt-20">
      <div
        style={{
          padding: "60px 100px",
          background: "#fff",
          margin: "0 80px",
          borderRadius: 8,
        }}
      >
        <Row gutter={[40, 40]} align="middle">
          <Col xs={24} md={12} lg={12}>
            <img
              src={book.cover}
              alt={book.title}
              style={{
                width: "100%",
                borderRadius: 8,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            />
          </Col>

          <Col xs={24} md={12} lg={12}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Tag color="blue">{book.category}</Tag>

              <Title level={2} style={{ margin: 0 }}>
                {book.title}
              </Title>
              <Text type="secondary">Tác giả: {book.author}</Text>

              <Space align="center" size="small">
                <Rate disabled defaultValue={4} />
                <Text strong>{book.rating}</Text>
                <Text type="secondary">
                  ({book.reviews.toLocaleString()} lượt đánh giá)
                </Text>
              </Space>

              <Space align="baseline" size="middle">
                <Title level={2} style={{ color: "#1677ff", margin: 0 }}>
                  ${book.price.toFixed(2)}
                </Title>
                <Text delete>${book.oldPrice.toFixed(2)}</Text>
                <Tag color="red">{book.discount}% OFF</Tag>
              </Space>

              <Paragraph style={{ maxWidth: 600 }}>
                {book.introduction}
              </Paragraph>

              <Text type="success">✓ In Stock ({book.stock} available)</Text>

              <Space align="center" style={{ marginTop: 8 }}>
                <Text>Số lượng:</Text>
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
                  loading={loading}
                >
                  Thêm vào giỏ hàng
                </Button>
                <Button
                  icon={
                    addFavorite ? (
                      <HeartOutlined />
                    ) : (
                      <HeartFilled style={{ color: "red" }} />
                    )
                  }
                  onClick={() => setAddFavorite(!addFavorite)}
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
              <Title level={5}>Các sách tương tự</Title>
              <Divider />
              <div
                style={{
                  maxHeight: 780,
                  overflowY: "auto",
                  scrollbarWidth: "none",
                }}
              >
                <div className="sm:grid sm:grid-cols-2 lg:grid-cols-1">
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
    </div>
  );
};

export default BookDetail;
