import { Card, Form, Input, Button, Row, Col, Select, message } from "antd";
import { EyeInvisibleOutlined } from "@ant-design/icons";
import { useGlobalContext } from "../../../GlobalContext";
import { useState, useEffect, useMemo } from "react";
import {
  getListProvinces,
  getProvinceDetail,
} from "../../../api/provinceService";
import { updateKhachHang } from "../../../api/khachHangService";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const UpdateProfile = () => {
  const [form] = Form.useForm();
  const { user } = useGlobalContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  console.log("user", user);

  const [provinces, setProvinces] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    try {
      setLoading(true);
      const payload = {
        maKhachHang: user.maKH,
        hoTen: values.hoTen,
        email: values.email,
        soDT: values.phoneNumber,
        diaChi: values.address,
        maQuanHuyen: values.ward_code,
        // Keep other fields if necessary or if backend requires them
        userName: values.userName,
      };

      await updateKhachHang(payload);
      message.success(t("profile.update_info.success"));
      navigate("/profile/info");
    } catch (err) {
      console.error(err);
      message.error(
        err.response?.data?.message || t("profile.update_info.fail")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    setSelectedCity(user.city_code);

    form.setFieldsValue({
      hoTen: user.hoTen,
      userName: user.userName,
      email: user.email,
      phoneNumber: user.soDT,
      city_code: user.city_code,
      ward_code: user.ward_code,
      address: user.diaChi,
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
    <Card title={t("profile.update_info.title")} className="flex-1">
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label={
                <span className="font-medium text-gray-700">
                  {t("common.form.name")}
                </span>
              }
              name="hoTen"
              rules={[
                {
                  required: true,
                  message: t("common.validation.required", {
                    field: t("common.form.name"),
                  }),
                },
              ]}
            >
              <Input
                placeholder={t("common.form.placeholder.name")}
                className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={
                <span className="font-medium text-gray-700">
                  {t("common.form.username")}
                </span>
              }
              name="userName"
              rules={[
                {
                  required: true,
                  message: t("common.validation.required", {
                    field: t("common.form.username"),
                  }),
                },
              ]}
            >
              <Input
                placeholder={t("common.form.placeholder.username_yours")}
                className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                autoComplete="off"
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={
                <span className="font-medium text-gray-700">
                  {t("common.form.email")}
                </span>
              }
              name="email"
              rules={[
                {
                  required: true,
                  message: t("common.validation.required", {
                    field: t("common.form.email"),
                  }),
                },
                {
                  type: "email",
                  message: t("common.validation.email_invalid"),
                },
              ]}
            >
              <Input
                placeholder={t("common.form.placeholder.email")}
                className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={
                <span className="font-medium text-gray-700">
                  {t("common.form.phoneNumber")}
                </span>
              }
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: t("common.validation.required", {
                    field: t("common.form.phoneNumber"),
                  }),
                },
                {
                  pattern: /^[0-9]{9,11}$/,
                  message: t("common.validation.phone_invalid"),
                },
              ]}
            >
              <Input
                placeholder={t("common.form.placeholder.phone")}
                className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="city_code"
              label={
                <span className="font-medium text-gray-700">
                  {t("common.form.city")}
                </span>
              }
              rules={[
                {
                  required: true,
                  message: t("common.validation.required_select", {
                    field: t("common.form.city").toLowerCase(),
                  }),
                },
              ]}
            >
              <Select
                showSearch
                placeholder={t("common.form.placeholder.city")}
                optionFilterProp="label"
                onChange={handleChangeCity}
                // onSearch={onSearch}
                options={provinceOptions}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="ward_code"
              label={
                <span className="font-medium text-gray-700">
                  {t("common.form.ward")}
                </span>
              }
              rules={[
                {
                  required: true,
                  message: t("common.validation.required_select", {
                    field: t("common.form.ward").toLowerCase(),
                  }),
                },
              ]}
            >
              <Select
                showSearch
                virtual
                placeholder={t("common.form.placeholder.ward")}
                optionFilterProp="label"
                // onChange={(value) => setSelectedCity(value)}
                // onSearch={onSearch}
                options={wardOptions}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={
                <span className="font-medium text-gray-700">
                  {t("common.form.address")}
                </span>
              }
              name="address"
              rules={[
                {
                  required: true,
                  message: t("common.validation.required", {
                    field: t("common.form.address"),
                  }),
                },
              ]}
            >
              <Input
                placeholder={t("common.form.placeholder.address")}
                className="rounded-md border-gray-300 hover:border-blue-500 focus:ring-1 focus:ring-blue-500"
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-end w-full">
          <Button type="primary" htmlType="submit" loading={loading}>
            {t("common.button.confirm")}
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default UpdateProfile;
