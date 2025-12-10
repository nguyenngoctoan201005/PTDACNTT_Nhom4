import "./QTV_KhachHang.css";
import { QTV_Nav } from "../../../nav/QTV_Nav";
import { useEffect, useState, useMemo } from "react";
import { Table, Button, Modal, Form, Input, message, Select } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
  getListKhachHang,
  insertKhachHang,
} from "../../../api/khachHangService";
import {
  getListProvinces,
  getProvinceDetail,
} from "../../../api/provinceService";
import { useDebounce } from "../../../hooks/useDebounce";

export default function QTV_KhachHang() {
  const [suaKhachhang, setSuaKhachhang] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [listKhachHang, setListKhachHang] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateCustomer = async (values) => {
    try {
      await insertKhachHang(values);
      message.success("Thêm khách hàng thành công!");
      setShowCreateModal(false);
      fetchKhachHang();
    } catch (error) {
      console.error(error);
      message.error("Thêm khách hàng thất bại!");
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "maKhachHang",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "KHÁCH HÀNG",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "SĐT",
      dataIndex: "soDT",
      key: "soDT",
    },
    {
      title: "ĐỊA CHỈ",
      dataIndex: "diaChi",
      key: "diaChi",
    },
    {
      title: "THAO TÁC",
      key: "action",
      render: (_, record) => (
        <svg
          onClick={() => {
            setSelectedCustomer(record);
            setSuaKhachhang(true);
          }}
          className="cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 432 432"
        >
          <path
            fill="blue"
            d="M213.5 3q88.5 0 151 62.5T427 216t-62.5 150.5t-151 62.5t-151-62.5T0 216T62.5 65.5T213.5 3zm0 64Q187 67 168 85.5t-19 45t19 45.5t45.5 19t45-19t18.5-45.5t-18.5-45t-45-18.5zm0 303q39.5 0 73-18.5T341 301q0-20-23.5-35.5t-52-23t-52-7.5t-52 7.5t-52 23T85 301q21 32 55 50.5t73.5 18.5z"
          />
        </svg>
      ),
    },
  ];

  const fetchKhachHang = async () => {
    try {
      const res = await getListKhachHang();

      setListKhachHang(res.result);
    } catch (error) {
      message.error("Lỗi khi lấy danh sách khách hàng");
    }
  };

  useEffect(() => {
    fetchKhachHang();
  }, []);

  const [provinces, setProvinces] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  useEffect(() => {
    getListProvinces()
      .then((data) => {
        setProvinces(data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách tỉnh:", error);
      });
  }, []);

  useEffect(() => {
    if (!selectedCity) return;
    getProvinceDetail(selectedCity, 2)
      .then((data) => {
        setWards(data.wards);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách xã:", error);
      });
  }, [selectedCity]);

  const provinceOptions = useMemo(
    () => provinces.map((p) => ({ label: p.name, value: p.code })),
    [provinces]
  );

  const wardOptions = useMemo(
    () => wards.map((p) => ({ label: p.name, value: p.code })),
    [wards]
  );

  const handleChangeCity = (value) => {
    setSelectedCity(value);
    // form.setFieldValue("ward", null); // Uncomment if you possess the form instance
  };

  const filteredData = listKhachHang.filter((item) =>
    item.hoTen?.toLowerCase().includes(debouncedSearchText.toLowerCase())
  );

  return (
    <>
      <QTV_Nav />
      <main className="qtv_khachhang_main">
        <div className="qtv_khachhang_tieude mx-4 mt-4 rounded-lg flex items-center justify-between">
          <div>Khách Hàng</div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setShowCreateModal(true)}
          >
            Thêm khách hàng
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 p-4 mx-4 bg-white rounded-lg shadow-md my-4 items-center">
          <Input
            placeholder="Tìm kiếm theo tên..."
            allowClear
            enterButton
            className="w-full md:w-96"
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
          />
          <div className="flex gap-4">
            <Select
              defaultValue=""
              style={{ width: 180 }}
              options={[
                { value: "", label: "Sắp xếp theo" },
                { value: "totalSpend", label: "Tổng chi tiêu" },
                { value: "orderCount", label: "Số lượng đơn" },
              ]}
            />
            <Select
              defaultValue=""
              style={{ width: 180 }}
              options={[
                { value: "", label: "Thứ tự" },
                { value: "desc", label: "Cao đến thấp" },
                { value: "asc", label: "Thấp đến cao" },
              ]}
            />
          </div>
        </div>

        <div className="bg-white p-4 mx-4 rounded-lg shadow-md">
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
            }}
            className="overflow-x-auto"
            rowKey="maKhachHang"
          />
        </div>

        <Modal
          title="Chi tiết khách hàng"
          open={suaKhachhang}
          onCancel={() => {
            setSuaKhachhang(false);
            setSelectedCustomer(null);
          }}
          footer={null}
        >
          {selectedCustomer && (
            <div className="flex flex-col gap-3">
              <div className="flex border-b border-gray-200 py-2">
                <span className="font-semibold w-1/3">Mã Khách hàng:</span>
                <span className="text-gray-700 font-bold">
                  {selectedCustomer.id}
                </span>
              </div>
              <div className="flex border-b border-gray-200 py-2">
                <span className="font-semibold w-1/3">Tên:</span>
                <span className="text-gray-700 font-bold">
                  {selectedCustomer.hoTen}
                </span>
              </div>
              <div className="flex border-b border-gray-200 py-2">
                <span className="font-semibold w-1/3">Email:</span>
                <span className="text-gray-700 font-bold">
                  {selectedCustomer.email}
                </span>
              </div>
              <div className="flex border-b border-gray-200 py-2">
                <span className="font-semibold w-1/3">SĐT:</span>
                <span className="text-gray-700 font-bold">
                  {selectedCustomer.soDT}
                </span>
              </div>
              <div className="flex border-b border-gray-200 py-2">
                <span className="font-semibold w-1/3">Địa chỉ:</span>
                <span className="text-gray-700 font-bold">
                  {selectedCustomer.diaChi}
                </span>
              </div>
              <div className="flex border-b border-gray-200 py-2">
                <span className="font-semibold w-1/3">Tổng đơn hàng:</span>
                <span className="text-gray-700 font-bold">
                  {selectedCustomer.orderCount || 0}
                </span>
              </div>
              <div className="flex border-b border-gray-200 py-2">
                <span className="font-semibold w-1/3">Tổng chi tiêu:</span>
                <span className="text-red-500 font-bold">
                  {selectedCustomer.totalSpend || 0}
                </span>
              </div>
            </div>
          )}
        </Modal>
        <Modal
          title="Thêm khách hàng mới"
          open={showCreateModal}
          onCancel={() => setShowCreateModal(false)}
          footer={null}
        >
          <Form onFinish={handleCreateCustomer} layout="vertical">
            <Form.Item
              name="hoTen"
              label="Họ tên"
              rules={[
                { required: true, message: "Vui lòng nhập họ tên" },
                { min: 3, message: "Họ tên phải có ít nhất 3 ký tự" },
              ]}
            >
              <Input placeholder="Nhập họ tên" />
            </Form.Item>

            <Form.Item
              name="userName"
              label="Tên đăng nhập"
              rules={[
                { required: true, message: "Vui lòng nhập tên đăng nhập" },
                { min: 3, message: "Tên đăng nhập phải có ít nhất 3 ký tự" },
                {
                  pattern: /^[a-zA-Z0-9]+$/,
                  message: "Tên đăng nhập chỉ chứa chữ và số",
                },
              ]}
            >
              <Input
                placeholder="Nhập tên đăng nhập"
                autoComplete="new-password"
              />
            </Form.Item>

            <Form.Item
              name="matKhau"
              label="Mật khẩu"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu" },
                { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự" },
                {
                  pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                  message: "Mật khẩu phải có chữ hoa và số",
                },
              ]}
            >
              <Input.Password
                placeholder="Nhập mật khẩu"
                autoComplete="new-password"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>

            <Form.Item
              name="soDT"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
              ]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>

            <Form.Item
              name="diaChi"
              label="Địa chỉ"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
            >
              <Input placeholder="Nhập địa chỉ" />
            </Form.Item>

            <Form.Item
              name="maQuanHuyen"
              label={
                <span className="font-medium text-gray-700">Thành phố</span>
              }
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thành phố của bạn!",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Chọn thành phố"
                optionFilterProp="label"
                onChange={handleChangeCity}
                // onSearch={onSearch}
                options={provinceOptions}
              />
            </Form.Item>
            <Form.Item
              name="ward"
              label={
                <span className="font-medium text-gray-700">Phường/Xã</span>
              }
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn phường/xã của bạn",
                },
              ]}
            >
              <Select
                showSearch
                virtual
                placeholder="Chọn phường xã"
                optionFilterProp="label"
                // onChange={(value) => setSelectedCity(value)}
                // onSearch={onSearch}
                options={wardOptions}
              />
            </Form.Item>

            <div className="flex justify-end gap-2">
              <Button onClick={() => setShowCreateModal(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit">
                Thêm mới
              </Button>
            </div>
          </Form>
        </Modal>
      </main>
    </>
  );
}
