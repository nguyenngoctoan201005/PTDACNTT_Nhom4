import React, { useEffect, useMemo, useState } from "react";
import { Modal, Form, Input, Button, Select, message } from "antd";
import {
  insertKhachHang,
  updateKhachHang,
  getDetailKhachHang,
} from "../../../../api/khachHangService";
import {
  getListProvinces,
  getListWards,
} from "../../../../api/provinceService";

const ModalKhachHang = ({
  open,
  onCancel,
  onOk,
  type = "create",
  dataEdit,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    getListProvinces()
      .then((data) => {
        setProvinces(data.result);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách tỉnh:", error);
      });
  }, []);

  useEffect(() => {
    getListWards()
      .then((data) => {
        setWards(data.result);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách xã:", error);
      });
  }, []);

  useEffect(() => {
    if (open) {
      if (type === "update" && dataEdit) {
        // Fetch detail
        const fetchDetail = async () => {
          try {
            setIsLoading(true);
            // User requested to use dataEdit.maKH
            const res = await getDetailKhachHang({
              maKhachHang: dataEdit.maKH || dataEdit.maKhachHang,
            });
            if (res && res.result) {
              const customer = res.result;
              form.setFieldsValue(customer);
              if (customer.maQuanHuyen) {
                setSelectedCity(customer.maQuanHuyen);
              }
            }
          } catch (error) {
            console.error("Lỗi lấy chi tiết khách hàng:", error);
            message.error("Lỗi tải thông tin khách hàng");
          } finally {
            setIsLoading(false);
          }
        };
        fetchDetail();
      } else {
        form.resetFields();
        setSelectedCity(null);
      }
    }
  }, [open, type, dataEdit, form]);

  const handleChangeCity = (value) => {
    setSelectedCity(value);
    form.setFieldValue("ward", null);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setIsLoading(true);

      if (type === "create") {
        await insertKhachHang(values);
        message.success("Thêm khách hàng thành công!");
      } else {
        await updateKhachHang({ ...values, maKhachHang: dataEdit.maKH });
        message.success("Cập nhật khách hàng thành công!");
      }

      onOk();
      onCancel();
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error(type === "create" ? "Thêm thất bại" : "Cập nhật thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  const provinceOptions = useMemo(
    () => provinces.map((p) => ({ label: p.tenTinh, value: p.maTinh })),
    [provinces]
  );

  const wardOptions = useMemo(
    () => wards.map((p) => ({ label: p.tenQuanHuyen, value: p.maQuanHuyen })),
    [wards]
  );

  return (
    <Modal
      title={type === "create" ? "Thêm khách hàng mới" : "Cập nhật khách hàng"}
      open={open}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
            disabled={type === "update"}
          />
        </Form.Item>

        {type === "create" && (
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
        )}

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
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
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
          label={<span className="font-medium text-gray-700">Thành phố</span>}
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
            options={provinceOptions}
          />
        </Form.Item>
        <Form.Item
          name="ward"
          label={<span className="font-medium text-gray-700">Phường/Xã</span>}
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
            options={wardOptions}
          />
        </Form.Item>

        <div className="flex justify-end gap-2">
          <Button
            onClick={() => {
              onCancel();
              form.resetFields();
            }}
          >
            Hủy
          </Button>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {type === "create" ? "Thêm mới" : "Cập nhật"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalKhachHang;
