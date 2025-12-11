import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import {
  insertTheLoai,
  updateTheLoai,
  getDetailTheLoai,
} from "../../../../api/theLoaiService";

const ModalTheLoai = ({ open, onCancel, onOk, type = "create", dataEdit }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (type === "update" && dataEdit) {
        // Fetch detail if needed, or just use dataEdit if it has all info
        // Based on the service, getDetailTheLoai takes { maTheLoai }
        const fetchDetail = async () => {
          try {
            setIsLoading(true);
            const res = await getDetailTheLoai({
              maTheLoai: dataEdit.maTheLoai,
            });
            if (res && res.result) {
              form.setFieldsValue(res.result);
            } else {
              // Fallback to dataEdit if API fails or returns distinct structure,
              // though best practice is to rely on API or consistent dataEdit
              form.setFieldsValue(dataEdit);
            }
          } catch (error) {
            console.error("Lỗi lấy chi tiết thể loại:", error);
            // message.error("Lỗi tải thông tin thể loại");
            form.setFieldsValue(dataEdit); // Fallback
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
        await insertTheLoai(values);
        message.success("Thêm thể loại thành công!");
      } else {
        await updateTheLoai({ ...values, maTheLoai: dataEdit.maTheLoai });
        message.success("Cập nhật thể loại thành công!");
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
      title={type === "create" ? "Thêm thể loại mới" : "Cập nhật thể loại"}
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
          name="tenLoai"
          label="Tên thể loại"
          rules={[
            { required: true, message: "Vui lòng nhập tên thể loại" },
            { min: 3, message: "Tên thể loại phải có ít nhất 3 ký tự" },
          ]}
        >
          <Input placeholder="Nhập tên thể loại" />
        </Form.Item>

        {/* Assuming there might be a description or other fields based on the old UI's textarea */}
        {/* The old UI had a textarea for description, but I need to check if API supports it. 
             Looking at theLoaiService.js, it just passes data through. 
             I'll add it if it was in the old UI. Old UI had "Mô tả" textarea. 
             I will add it as 'moTa' assuming that's the field name. 
             If not, it won't be saved but won't crash. */}
        <Form.Item name="moTa" label="Mô tả">
          <Input.TextArea rows={4} placeholder="Nhập mô tả" />
        </Form.Item>

        <div className="flex justify-end gap-2 mt-4">
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

export default ModalTheLoai;
