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
  message,
  Slider,
  Button,
} from "antd";
import { useState, useEffect } from "react";
import BookCard from "../../../components/BookCard";
import { Link, useSearchParams } from "react-router";
import { getListRequestSach, searchSach } from "../../../api/sachService";

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

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  const [form] = Form.useForm();
  const [listSach, setListSach] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      name: keyword || "",
      genres: [],
      price: [0, 5000000],
    });

    form.submit();
  }, [keyword]);

  const handleSubmitFilter = async (values) => {
    setCurrentPage(1);
    setLoadingSearch(true);
    const { name, genres, price } = values;

    const hasSearch = !!name;

    const DEFAULT_PRICE = [0, 5000000];

    const isPriceChanged =
      price[0] !== DEFAULT_PRICE[0] || price[1] !== DEFAULT_PRICE[1];

    const hasFilter = genres?.length > 0 || isPriceChanged;

    const resetAfterFilter = () => {
      // form.resetFields();
      setCurrentPage(1);
      setLoadingSearch(false);
    };

    try {
      if (!hasSearch && !hasFilter) {
        const res = await getListRequestSach({
          // genres: genres || [],
          minPrice: 0,
          maxPrice: 5000000,
          orderBy: "donGia",
          order: "asc",
        });
        setListSach(res);
        resetAfterFilter();
        return;
      }

      if (hasSearch && !hasFilter) {
        const res = await searchSach({ term: name });
        setListSach(res.result);
        resetAfterFilter();
        return;
      }

      if (!hasSearch && hasFilter) {
        const res = await getListRequestSach({
          // genres: genres || [],
          minPrice: price?.[0] || 0,
          maxPrice: price?.[1] || 5000000,
          orderBy: "donGia",
          order: "asc",
        });
        setListSach(res);
        resetAfterFilter();
        return;
      }

      if (hasSearch && hasFilter) {
        const [searchRes, filterRes] = await Promise.all([
          searchSach({ term: name }),
          getListRequestSach({
            // genres: genres || [],
            minPrice: price?.[0] || 0,
            maxPrice: price?.[1] || 5000000,
            orderBy: "donGia",
            order: "asc",
          }),
        ]);

        const intersect = searchRes.filter((item) =>
          filterRes.some((f) => f.id === item.id)
        );

        setListSach(intersect);
        resetAfterFilter();
        return;
      }
    } catch (err) {
      message.error("Lỗi khi lọc / tìm kiếm sách");
    }
  };

  //Book list pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const temptSach = typeof listSach === "object" ? listSach : premiumBooks;

  const currentBooks = temptSach.slice(startIndex, endIndex);

  return (
    <div className="bg-blue-50 py-6 px-[80px]">
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
        <Col span={24}>
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
              onFinish={handleSubmitFilter}
              layout="vertical"
              className="flex flex-col gap-3"
            >
              <div className="flex gap-3 items-center">
                <Form.Item
                  name="name"
                  label={<Typography.Title level={5}>Search</Typography.Title>}
                  className="flex-1"
                >
                  <Input prefix={<SearchOutlined />} placeholder="Tìm sách" />
                </Form.Item>
                <Form.Item
                  name="genres"
                  label={
                    <Typography.Title level={5}>Thể loại</Typography.Title>
                  }
                  className="min-w-3xs"
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
                  className="min-w-3xs"
                  placeholder="Chọn 1 khoảng giá"
                >
                  <Slider
                    range
                    min={0}
                    max={5000000}
                    step={50000}
                    tooltip={{ formatter: (v) => v.toLocaleString() + "₫" }}
                  />
                </Form.Item>
              </div>
              <Form.Item className="flex justify-end">
                <Button
                  htmlType="submit"
                  type="primary"
                  icon={<SearchOutlined />}
                  loading={loadingSearch}
                >
                  Tìm kiếm
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={24}>
          <Flex wrap gap={12} className="justify-center">
            {currentBooks.map((book, index) => (
              <div
                key={index}
                style={{
                  flex: "1 1 240px",
                  maxWidth: "240px",
                }}
              >
                <BookCard
                  imageUrl={book.imageUrl}
                  type={book.type}
                  discount={book.discount}
                  name={book.tenSach}
                  author={book.author}
                  price={book.donGia}
                  id={book.maSach}
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
            total={premiumBooks.length}
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
