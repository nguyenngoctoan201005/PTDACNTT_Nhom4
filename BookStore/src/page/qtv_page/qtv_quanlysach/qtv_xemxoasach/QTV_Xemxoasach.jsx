import "./QTV_Xemxoasach.css";
import { QTV_Nav } from "../../../../nav/QTV_Nav";
import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  message,
  Tag,
  Form,
  Select,
  Slider,
  Typography,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import {
  getListRequestSach,
  searchSach,
  deleteSach,
} from "../../../../api/sachService";
import ModalSach from "./components/ModalSach";

export default function QTV_Xemxoasach() {
  const [listSach, setListSach] = useState([]);
  const [selectedSach, setSelectedSach] = useState(null);
  const [modalState, setModalState] = useState({
    open: false,
    type: "create",
  });
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [form] = Form.useForm();

  const genres = [
    { label: "Fiction", value: "fiction" },
    { label: "Mystery", value: "mystery" },
    { label: "Romance", value: "romance" },
    { label: "Sci-Fi", value: "sci-fi" },
    { label: "Biography", value: "biography" },
    { label: "Self-Help", value: "self-help" },
  ];
  const genreList = [{ label: "All", value: "" }, ...genres];

  // Initial fetch
  useEffect(() => {
    form.setFieldsValue({
      name: "",
      genres: [],
      price: [0, 5000000],
    });
    const initFetch = async () => {
      await handleSubmitFilter({ name: "", genres: [], price: [0, 5000000] });
    };
    initFetch();
  }, []);

  const handleSubmitFilter = async (values) => {
    setLoadingSearch(true);
    const { name, genres, price } = values;

    const hasSearch = !!name;
    const DEFAULT_PRICE = [0, 5000000];
    const isPriceChanged =
      price[0] !== DEFAULT_PRICE[0] || price[1] !== DEFAULT_PRICE[1];
    const hasFilter = genres?.length > 0 || isPriceChanged;

    try {
      if (!hasSearch && !hasFilter) {
        const res = await getListRequestSach({
          minPrice: 0,
          maxPrice: 5000000,
          orderBy: "donGia",
          order: "asc",
        });
        setListSach(Array.isArray(res) ? res : res.result || []);
      } else if (hasSearch && !hasFilter) {
        const res = await searchSach({ term: name });
        setListSach(res.result || []);
      } else if (!hasSearch && hasFilter) {
        const res = await getListRequestSach({
          // genres: genres || [], // API might not support genres yet based on Books.jsx commented out code
          minPrice: price?.[0] || 0,
          maxPrice: price?.[1] || 5000000,
          orderBy: "donGia",
          order: "asc",
        });
        setListSach(Array.isArray(res) ? res : res.result || []);
      } else if (hasSearch && hasFilter) {
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

        // Intersect results
        // Assuming searchRes.result is the array for searchSach
        const searchList = searchRes.result || [];
        const requestList = Array.isArray(filterRes)
          ? filterRes
          : filterRes.result || [];

        console.log("filterList", requestList);
        const intersect = searchList.filter((item) =>
          requestList.some((f) => f.id === item.id || f.maSach === item.maSach)
        );
        setListSach(intersect);
      }
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi lọc / tìm kiếm sách");
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleCreateSuccess = () => {
    form.submit(); // Refetch
  };

  const openCreateModal = () => {
    setModalState({ open: true, type: "create" });
    setSelectedSach(null);
  };

  const openEditModal = (sach) => {
    setModalState({ open: true, type: "update" });
    setSelectedSach(sach);
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, open: false }));
    setSelectedSach(null);
  };

  const handleDelete = async () => {
    try {
      await deleteSach(selectedSach.maSach || selectedSach.id);
      message.success("Xóa sách thành công");
      form.submit();
      setShowModalDelete(false);
    } catch (error) {
      message.error("Lỗi khi xóa sách");
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 60,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      width: 100,
      render: (text) => (
        <img
          src={text || "https://via.placeholder.com/50"}
          alt="Book cover"
          style={{ width: 50, height: 70, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Tên sách",
      dataIndex: "tenSach",
      key: "tenSach",
      render: (text, record) => text || record.name, // Compatible with different API responses
    },
    {
      title: "Giá",
      dataIndex: "gia", // Note: Books.jsx uses 'price' or 'donGia'? book.donGia
      key: "gia",
      render: (value, record) => {
        // Books.jsx uses record.donGia.
        const price = value || record.donGia || record.price;
        return price
          ? new Intl.NumberFormat("vi-VN").format(price) + " đ"
          : "0 đ";
      },
    },
    {
      title: "Tồn kho",
      dataIndex: "soLuongTon",
      key: "soLuongTon",
      render: (value) => (value !== undefined ? value : "N/A"),
    },
    {
      title: "Trạng thái",
      key: "trangThai",
      render: (_, record) => (
        <Tag
          color={
            record.soLuongTon > 0 || record.soLuongTon === undefined
              ? "green"
              : "red"
          }
        >
          {record.soLuongTon > 0 || record.soLuongTon === undefined
            ? "Còn hàng"
            : "Hết hàng"}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <Button
            onClick={() => openEditModal(record)}
            type="text"
            icon={<EditOutlined style={{ color: "blue" }} />}
          />
          <Button
            onClick={() => {
              setShowModalDelete(true);
              setSelectedSach(record);
            }}
            type="text"
            icon={<DeleteOutlined style={{ color: "red" }} />}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <QTV_Nav />
      <main className="qtv_trangqls_main p-4 bg-gray-50 min-h-screen">
        <div className="qtv_trangqls_header mx-4 mt-4 rounded-lg flex items-center justify-between bg-white p-4 shadow-sm mb-4">
          <div className="text-xl font-bold">Quản lý sách</div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openCreateModal}
          >
            Thêm sách mới
          </Button>
        </div>

        <div className="p-4 mx-4 bg-white rounded-lg shadow-md my-4">
          <div className="flex gap-3 mb-4 items-center">
            <FilterOutlined style={{ fontSize: 20 }} />
            <Typography.Title level={5} style={{ margin: 0 }}>
              Bộ lọc
            </Typography.Title>
          </div>
          <Form
            form={form}
            onFinish={handleSubmitFilter}
            layout="inline"
            className="w-full flex-wrap gap-4"
          >
            <Form.Item name="name" label="Tên sách" className="min-w-[200px]">
              <Input
                prefix={<SearchOutlined />}
                placeholder="Tìm theo tên sách"
              />
            </Form.Item>
            <Form.Item name="genres" label="Thể loại" className="min-w-[200px]">
              <Select
                showSearch
                mode="multiple"
                placeholder="Chọn thể loại"
                optionFilterProp="label"
                options={genreList}
                style={{ width: 200 }}
                maxTagCount="responsive"
              />
            </Form.Item>
            <Form.Item
              name="price"
              label="Khoảng giá"
              className="min-w-[300px] flex-1"
            >
              <Slider
                range
                min={0}
                max={5000000}
                step={50000}
                tooltip={{ formatter: (v) => v.toLocaleString() + "₫" }}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
                loading={loadingSearch}
              >
                Tìm kiếm
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="bg-white p-4 mx-4 rounded-lg shadow-md">
          <Table
            columns={columns}
            dataSource={listSach}
            pagination={{
              pageSize: 5,
              showSizeChanger: true,
              showQuickJumper: true,
            }}
            className="overflow-x-auto"
            rowKey={(record) => record.maSach || record.id}
          />
        </div>

        <ModalSach
          open={modalState.open}
          type={modalState.type}
          dataEdit={selectedSach}
          onCancel={closeModal}
          onOk={handleCreateSuccess}
        />

        <Modal
          title="Xóa sách"
          open={showModalDelete}
          onOk={handleDelete}
          onCancel={() => setShowModalDelete(false)}
        >
          <p>
            Bạn có chắc chắn muốn xóa sách{" "}
            <strong>{selectedSach?.tenSach || selectedSach?.name}</strong>?
          </p>
        </Modal>
      </main>
    </>
  );
}
