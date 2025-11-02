import { Card, Form, Input, Button, Row, Col, Select } from "antd";
import { EyeInvisibleOutlined } from "@ant-design/icons";
import { useGlobalContext } from "../../../GlobalContext";
import { useState, useEffect, useMemo } from "react";
import {
  getListProvinces,
  getProvinceDetail,
} from "../../../api/provinceService";
import { useNavigate } from "react-router";

const UpdateProfile = () => {
  const [form] = Form.useForm();
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  const [provinces, setProvinces] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    try {
      setLoading(true);
      console.log(values);
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
      navigate("/profile/info");
    }
  };

  useEffect(() => {
    if (!user) return;

    setSelectedCity(user.city_code);

    form.setFieldsValue({
      name: user.name,
      username: user.username,
      email: user.email,
      city_code: user.city_code,
      ward_code: user.ward_code,
    });
  }, [user, form]);

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
    form.setFieldValue("ward", null);
  };

  return (
    <Card title="Account Information" className="flex-1">
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label={<span className="font-medium text-gray-700">Tên</span>}
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên của bạn!",
                },
              ]}
            >
              <Input
                placeholder="John"
                className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={
                <span className="font-medium text-gray-700">Tên đăng nhập</span>
              }
              name="username"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên đăng nhập!",
                },
              ]}
            >
              <Input
                placeholder="Nhập tên đăng nhập của bạn"
                className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                autoComplete="off"
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={
                <span className="font-medium text-gray-700">Địa chỉ Email</span>
              }
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ email của bạn!",
                },
                {
                  type: "email",
                  message: "Email của bạn không hợp lệ",
                },
              ]}
            >
              <Input
                placeholder="you@example.com"
                className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="city_code"
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
          </Col>
          <Col span={24}>
            <Form.Item
              name="ward_code"
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
          </Col>
        </Row>
        <div className="flex justify-end w-full">
          <Button type="primary" htmlType="submit" loading={loading}>
            Xác nhận
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default UpdateProfile;
