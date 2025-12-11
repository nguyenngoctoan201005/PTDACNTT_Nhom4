import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import {
  insertNhanVien,
  updateNhanVien,
  getDetailNhanVien,
} from "../../../../api/nhanVienService";

const ModalNhanVien = ({ open, onCancel, onOk, type = "create", dataEdit }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (type === "update" && dataEdit) {
        // Fetch detail
        const fetchDetail = async () => {
          try {
            setIsLoading(true);
            const res = await getDetailNhanVien({
              maNhanVien: dataEdit.maNhanVien,
            });
            if (res && res.result) {
              const employee = res.result;
              form.setFieldsValue(employee);
            }
          } catch (error) {
            console.error("Lỗi lấy chi tiết nhân viên:", error);
            message.error("Lỗi tải thông tin nhân viên");
          } finally {
            setIsLoading(false);
          }
        };
        fetchDetail();
      } else {
        form.resetFields();
      }
    }
  }, [open, type, dataEdit, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setIsLoading(true);

      if (type === "create") {
        await insertNhanVien(values);
        message.success("Thêm nhân viên thành công!");
      } else {
        await updateNhanVien({ ...values, maNhanVien: dataEdit.maNhanVien });
        message.success("Cập nhật nhân viên thành công!");
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

  return (
    <Modal
      title={type === "create" ? "Thêm nhân viên mới" : "Cập nhật nhân viên"}
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
          label="Họ và tên"
          rules={[
            { required: true, message: "Vui lòng nhập họ và tên" },
            { min: 3, message: "Họ tên phải có ít nhất 3 ký tự" },
          ]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>

        <Form.Item
          name="soCCCD"
          label="Số CCCD"
          rules={[
            { required: true, message: "Vui lòng nhập số CCCD" },
            { len: 12, message: "Số CCCD phải có 12 ký tự" },
            { pattern: /^[0-9]+$/, message: "Số CCCD chỉ chứa số" },
          ]}
        >
          <Input placeholder="Nhập số CCCD" />
        </Form.Item>

        <Form.Item
          name="tenDangNhap"
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

        <Form.Item
          name="matKhau"
          label="Mật khẩu"
          rules={[
            type === "create"
              ? { required: true, message: "Vui lòng nhập mật khẩu" }
              : {},
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" }, // Adjusted min length from 8 to 6 as per some common defaults, but can be 8. 'nguyenvana99' is > 8. current hardcoded was 'nguyenvana99'
          ]}
        >
          <Input.Password
            placeholder={
              type === "update" ? "Nhập mật khẩu mới (nếu có)" : "Nhập mật khẩu"
            }
            autoComplete="new-password"
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

export default ModalNhanVien;
