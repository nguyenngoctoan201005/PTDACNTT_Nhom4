import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import {
  insertTacGia,
  updateTacGia,
  getDetailTacGia,
} from "../../../../api/tacGiaService";

const ModalTacGia = ({ open, onCancel, onOk, type = "create", dataEdit }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (type === "update" && dataEdit) {
        const fetchDetail = async () => {
          try {
            setIsLoading(true);
            const res = await getDetailTacGia({
              maTacGia: dataEdit.maTG,
            });
            if (res && res.result) {
              form.setFieldsValue(res.result);
            } else {
              form.setFieldsValue(dataEdit);
            }
          } catch (error) {
            console.error("Lỗi lấy chi tiết tác giả:", error);
            form.setFieldsValue(dataEdit);
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
        await insertTacGia(values);
        message.success("Thêm tác giả thành công!");
      } else {
        await updateTacGia({ ...values, maTacGia: dataEdit.maTG });
        message.success("Cập nhật tác giả thành công!");
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
      title={type === "create" ? "Thêm tác giả mới" : "Cập nhật tác giả"}
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
          name="tenTG"
          label="Tên tác giả"
          rules={[
            { required: true, message: "Vui lòng nhập tên tác giả" },
            { min: 2, message: "Tên tác giả phải có ít nhất 2 ký tự" },
          ]}
        >
          <Input placeholder="Nhập tên tác giả" />
        </Form.Item>

        <Form.Item name="tieuSu" label="Tiểu sử">
          <Input.TextArea rows={4} placeholder="Nhập tiểu sử tác giả" />
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

export default ModalTacGia;
