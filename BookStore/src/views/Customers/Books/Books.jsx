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
  Empty,
} from "antd";
import { useState, useEffect } from "react";
import BookCard from "../../../components/BookCard";
import { Link, useSearchParams } from "react-router";
import {
  getListRequestSach,
  searchSach,
  getSachByMaLoai,
} from "../../../api/sachService";
import { getListTheLoai } from "../../../api/theLoaiService";

const Books = () => {
  const [genreList, setGenreList] = useState([]);

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const loaiSach = searchParams.get("maLoai");

  const [form] = Form.useForm();
  const [listSach, setListSach] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  // Fetch genres on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await getListTheLoai();
        const formattedGenres = res.result.map((genre) => ({
          label: genre.tenLoai,
          value: genre.maLoai,
        }));
        setGenreList(formattedGenres);
      } catch (err) {
        message.error("Lỗi khi tải danh sách thể loại");
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      name: keyword || "",
      genres: loaiSach || undefined,
      price: [0, 5000000],
    });

    form.submit();
  }, [keyword, loaiSach]);

  const handleSubmitFilter = async (values) => {
    setCurrentPage(1);
    setLoadingSearch(true);
    const { name, genres, price } = values;

    const hasSearch = !!name;

    const DEFAULT_PRICE = [0, 5000000];

    const isPriceChanged =
      price[0] !== DEFAULT_PRICE[0] || price[1] !== DEFAULT_PRICE[1];

    const hasFilter = !!genres || isPriceChanged;

    const resetAfterFilter = () => {
      setCurrentPage(1);
      setLoadingSearch(false);
    };

    try {
      if (!hasSearch && !hasFilter) {
        const res = await getListRequestSach({
          minPrice: 0,
          maxPrice: 5000000,
          orderBy: "donGia",
          order: "asc",
        });
        setListSach(res.result);
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
        // If genre is selected, fetch books for that genre
        if (genres) {
          const genrePromise = getSachByMaLoai({ maLoai: genres });

          const pricePromise = getListRequestSach({
            minPrice: price?.[0] || 0,
            maxPrice: price?.[1] || 5000000,
            orderBy: "donGia",
            order: "asc",
          });

          const [genreRes, priceRes] = await Promise.all([
            genrePromise,
            pricePromise,
          ]);

          // Ensure priceRes is an array
          const priceArray = Array.isArray(priceRes)
            ? priceRes
            : priceRes?.result || [];

          // Intersect results if price filter is applied
          if (isPriceChanged) {
            const intersect = genreRes.result.filter((item) =>
              priceArray.some((f) => f.maSach === item.maSach)
            );
            setListSach(intersect);
          } else {
            setListSach(genreRes.result);
          }
        } else {
          // Only price filter
          const res = await getListRequestSach({
            minPrice: price?.[0] || 0,
            maxPrice: price?.[1] || 5000000,
            orderBy: "donGia",
            order: "asc",
          });
          setListSach(res.result);
        }
        resetAfterFilter();
        return;
      }

      if (hasSearch && hasFilter) {
        const promises = [
          searchSach({ term: name }),
          getListRequestSach({
            minPrice: price?.[0] || 0,
            maxPrice: price?.[1] || 5000000,
            orderBy: "donGia",
            order: "asc",
          }),
        ];

        // Fetch books for the selected genre
        let genreRes = null;
        if (genres) {
          genreRes = await getSachByMaLoai({ maLoai: genres });
        }

        const results = await Promise.all(promises);
        const searchRes = results[0].result;
        const priceRes = results[1];

        // Ensure priceRes is an array
        const priceArray = Array.isArray(priceRes)
          ? priceRes
          : priceRes?.result || [];

        let intersect = searchRes;

        // Intersect with price filter
        intersect = intersect.filter((item) =>
          priceArray.some((f) => f.maSach === item.maSach)
        );

        // Intersect with genre filter if applicable
        if (genreRes) {
          intersect = intersect.filter((item) =>
            genreRes.result.some((f) => f.maSach === item.maSach)
          );
        }

        setListSach(intersect);
        resetAfterFilter();
        return;
      }
    } catch (err) {
      setLoadingSearch(false);
      console.error(err);
      message.error("Lỗi khi lọc / tìm kiếm sách");
    }
  };

  //Book list pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentBooks = listSach.slice(startIndex, endIndex);

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
                    placeholder="Chọn 1 thể loại"
                    optionFilterProp="label"
                    options={genreList}
                    allowClear
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
          {currentBooks.length > 0 ? (
            <>
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
                      onAddToFavorite={() => {
                        const favoriteBooks =
                          JSON.parse(localStorage.getItem("favoriteBooks")) ||
                          [];
                        const exists = favoriteBooks.some(
                          (b) => b.id === book.maSach
                        );
                        if (!exists) {
                          const newBook = {
                            id: book.maSach,
                            name: book.tenSach,
                            imageUrl: book.imageUrl,
                            price: book.donGia,
                            author: book.author,
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
              </Flex>
              <Pagination
                align="center"
                current={currentPage}
                pageSize={pageSize}
                total={listSach.length}
                onChange={(page) => setCurrentPage(page)}
                style={{ marginTop: 16, textAlign: "center" }}
                showQuickJumper
              />
            </>
          ) : (
            <div className="bg-white p-4">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Books;
