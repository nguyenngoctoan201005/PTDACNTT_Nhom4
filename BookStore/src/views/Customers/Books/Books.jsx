import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  Divider,
  Input,
  Row,
  Typography,
  Select,
  Radio,
  Form,
  Flex,
  Pagination,
  Breadcrumb,
} from "antd";
import { useDebounce } from "../../../hooks/useDebounce";
import { useState, useEffect, useMemo } from "react";
import BookCard from "../../../components/BookCard";
import { Link } from "react-router";

const Books = () => {
  const genres = [
    {
      label: "Fiction",
      value: "fiction",
    },
    {
      label: "Mystery",
      value: "mystery",
    },
    {
      label: "Romance",
      value: "romance",
    },
    {
      label: "Sci-Fi",
      value: "sci-fi",
    },
    {
      label: "Biography",
      value: "biography",
    },
    {
      label: "Self-Help",
      value: "self-help",
    },
  ];
  const genreList = [
    {
      label: "All",
      value: "",
    },
    ...genres,
  ];
  const prices = [
    { label: "Dưới 50,000", value: 1 },
    { label: "50,000 - 100,000", value: 2 },
    { label: "Hơn 100,000", value: 3 },
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

  //Form
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({});

  const debouncedValues = useDebounce(formValues, 600);

  useEffect(() => {
    if (Object.keys(debouncedValues).length > 0) {
      console.log("debouncedValues", debouncedValues);
    }
  }, [debouncedValues]);

  const handleFormChange = (_, allValues) => {
    setFormValues(allValues);
  };

  //Filter
  const filteredBooks = useMemo(() => {
    let filtered = premiumBooks;

    const { name, genres, price } = debouncedValues;

    if (name) {
      filtered = filtered.filter((b) =>
        b.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (genres && genres.length > 0) {
      filtered = filtered.filter((b) => genres.includes(b.type));
    }

    if (price) {
      filtered = filtered.filter((b) => {
        if (price === 1) return b.price < 50000;
        if (price === 2) return b.price >= 50000 && b.price <= 100000;
        if (price === 3) return b.price > 100000;
        return true;
      });
    }

    return filtered;
  }, [debouncedValues, premiumBooks]);

  //Book list
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentBooks = filteredBooks.slice(startIndex, endIndex);

  return (
    <div className="bg-blue-50 py-4 mt-20 px-[80px]">
      <Breadcrumb
        items={[
          {
            title: <Link to="/home">Home</Link>,
          },
          {
            title: "Books",
          },
        ]}
        style={{ marginBottom: 10 }}
      />
      <Row gutter={[16, 16]}>
        <Col span={4}>
          <Card>
            <div className="flex gap-3">
              <FilterOutlined style={{ fontSize: 20 }} />
              <Typography.Title level={4} style={{ marginBottom: 0 }}>
                Filter
              </Typography.Title>
            </div>
            <Divider />
            <Form
              form={form}
              onValuesChange={handleFormChange}
              layout="vertical"
            >
              <Form.Item
                name="name"
                label={<Typography.Title level={5}>Search</Typography.Title>}
              >
                <Input prefix={<SearchOutlined />} placeholder="Tìm sách" />
              </Form.Item>
              <Form.Item
                name="genres"
                label={<Typography.Title level={5}>Thể loại</Typography.Title>}
              >
                <Select
                  showSearch
                  mode="multiple"
                  placeholder="Chọn 1 thể loại"
                  optionFilterProp="label"
                  options={genreList}
                />
              </Form.Item>
              <Form.Item
                name="price"
                label={
                  <Typography.Title level={5}>Price Range</Typography.Title>
                }
              >
                <Radio.Group
                  options={prices}
                  style={{ display: "flex", flexDirection: "column" }}
                />
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={20}>
          <Flex wrap gap={2}>
            {currentBooks.map((book, index) => (
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
                  showButton={true}
                  onAddToCart={() => console.log("added")}
                  onAddToFavorite={() => console.log("added")}
                />
              </div>
            ))}
          </Flex>
          <Pagination
            align="center"
            current={currentPage}
            pageSize={pageSize}
            total={filteredBooks.length}
            onChange={(page) => setCurrentPage(page)}
            style={{ marginTop: 16, textAlign: "center" }}
            showQuickJumper
          />
        </Col>
      </Row>
    </div>
  );
};

export default Books;
