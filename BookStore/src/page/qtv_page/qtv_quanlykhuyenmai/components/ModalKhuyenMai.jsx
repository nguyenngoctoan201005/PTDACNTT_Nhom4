import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, Button, message } from "antd";
import {
  insertKhuyenMai,
  updateKhuyenMai,
  getDetailKhuyenMai,
} from "../../../../api/khuyenMaiService";
import dayjs from "dayjs";

const ModalKhuyenMai = ({
  open,
  onCancel,
  onOk,
  type = "create",
  dataEdit,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (type === "update" && dataEdit) {
        const fetchDetail = async () => {
          try {
            setIsLoading(true);
            const res = await getDetailKhuyenMai({
              maGiamGia: dataEdit.maGiamGia,
            });
            if (res && res.result) {
              const promotion = res.result;
              // Convert date strings to dayjs objects for DatePicker
              form.setFieldsValue({
                ...promotion,
                ngayBatDau: promotion.ngayBatDau
                  ? dayjs(promotion.ngayBatDau)
                  : null,
                ngayKetThuc: promotion.ngayKetThuc
                  ? dayjs(promotion.ngayKetThuc)
                  : null,
              });
            } else {
              // Fallback to dataEdit
              form.setFieldsValue({
                ...dataEdit,
                ngayBatDau: dataEdit.ngayBatDau
                  ? dayjs(dataEdit.ngayBatDau)
                  : null,
                ngayKetThuc: dataEdit.ngayKetThuc
                  ? dayjs(dataEdit.ngayKetThuc)
                  : null,
              });
            }
          } catch (error) {
            console.error("Lỗi lấy chi tiết khuyến mãi:", error);
            // Fallback to dataEdit
            form.setFieldsValue({
              ...dataEdit,
              ngayBatDau: dataEdit.ngayBatDau
                ? dayjs(dataEdit.ngayBatDau)
                : null,
              ngayKetThuc: dataEdit.ngayKetThuc
                ? dayjs(dataEdit.ngayKetThuc)
                : null,
            });
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

      // Convert dayjs objects to ISO strings for API
      const payload = {
        ...values,
        maGiamGia: Number(values.maGiamGia),
        ngayBatDau: values.ngayBatDau
          ? values.ngayBatDau.format("YYYY-MM-DD")
          : null,
        ngayKetThuc: values.ngayKetThuc
          ? values.ngayKetThuc.format("YYYY-MM-DD")
          : null,
      };

      if (type === "create") {
        await insertKhuyenMai(payload);
        message.success("Thêm khuyến mãi thành công!");
      } else {
        await updateKhuyenMai({
          ...payload,
          maKhuyenMai: dataEdit.maKhuyenMai,
        });
        message.success("Cập nhật khuyến mãi thành công!");
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
      title={type === "create" ? "Thêm khuyến mãi mới" : "Cập nhật khuyến mãi"}
      open={open}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      footer={null}
      destroyOnClose
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="maGiamGia"
          label="Mã giảm giá"
          rules={[
            { required: true, message: "Vui lòng nhập mã giảm giá" },
            // { min: 1, message: "Mã giảm giá phải có ít nhất 1 ký tự" },
          ]}
        >
          <Input placeholder="Nhập mã giảm giá" disabled={type === "update"} />
        </Form.Item>

        <Form.Item
          name="ngayBatDau"
          label="Ngày bắt đầu"
          rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu" }]}
        >
          <DatePicker
            className="w-full"
            format="DD/MM/YYYY"
            placeholder="Chọn ngày bắt đầu"
          />
        </Form.Item>

        <Form.Item
          name="ngayKetThuc"
          label="Ngày kết thúc"
          rules={[
            { required: true, message: "Vui lòng chọn ngày kết thúc" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  !value ||
                  !getFieldValue("ngayBatDau") ||
                  value.isAfter(getFieldValue("ngayBatDau"))
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Ngày kết thúc phải sau ngày bắt đầu")
                );
              },
            }),
          ]}
        >
          <DatePicker
            className="w-full"
            format="DD/MM/YYYY"
            placeholder="Chọn ngày kết thúc"
          />
        </Form.Item>

        <Form.Item
          name="chietKhau"
          label="Chiết khấu (%)"
          rules={[
            { required: true, message: "Vui lòng nhập chiết khấu" },
            {
              pattern: /^[0-9]+$/,
              message: "Chiết khấu phải là số",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || (value >= 0 && value <= 100)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Chiết khấu phải từ 0 đến 100")
                );
              },
            }),
          ]}
        >
          <Input
            placeholder="Nhập chiết khấu (%)"
            type="number"
            min={0}
            max={100}
          />
        </Form.Item>

        <Form.Item name="moTa" label="Mô tả">
          <Input.TextArea rows={4} placeholder="Nhập mô tả khuyến mãi" />
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

export default ModalKhuyenMai;
