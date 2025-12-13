import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select, InputNumber, message } from "antd";
import {
  insertSach,
  updateSach,
  getSachDetail,
} from "../../../../../api/sachService";

const { TextArea } = Input;
const { Option } = Select;

const ModalSach = ({ open, onCancel, onOk, type = "create", dataEdit }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (type === "update" && dataEdit) {
        const fetchDetail = async () => {
          try {
            setIsLoading(true);
            const res = await getSachDetail({ id: dataEdit.maSach });
            if (res && res.result) {
              const data = { ...res.result };
              // Map nested objects to form fields
              if (data.loaiSach && typeof data.loaiSach === "object") {
                data.maTheLoai = data.loaiSach.maLoai;
              }
              // Potential mapping for other fields if they follow same pattern
              if (data.tacGia && typeof data.tacGia === "object") {
                data.maTacGia = data.tacGia.maTacGia;
              }
              if (data.nhaXuatBan && typeof data.nhaXuatBan === "object") {
                data.maNXB = data.nhaXuatBan.maNXB;
              }

              form.setFieldsValue(data);
            } else {
              // Fallback
              const data = { ...dataEdit };
              if (data.loaiSach && typeof data.loaiSach === "object") {
                data.maTheLoai = data.loaiSach.maLoai;
              }
              form.setFieldsValue(data);
            }
          } catch (error) {
            console.error("Lỗi lấy chi tiết sách:", error);
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
        await insertSach(values);
        message.success("Thêm sách thành công!");
      } else {
        await updateSach({ ...values, maSach: dataEdit.maSach });
        message.success("Cập nhật sách thành công!");
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
      title={type === "create" ? "Thêm sách mới" : "Cập nhật sách"}
      open={open}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      footer={null}
      width={800}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="tenSach"
            label="Tên sách"
            rules={[{ required: true, message: "Vui lòng nhập tên sách" }]}
          >
            <Input placeholder="Nhập tên sách" />
          </Form.Item>

          <Form.Item
            name="donGia"
            label="Giá bán"
            rules={[{ required: true, message: "Vui lòng nhập giá bán" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
              placeholder="Nhập giá bán"
            />
          </Form.Item>

          <Form.Item
            name="soLuongCo"
            label="Số lượng tồn kho"
            rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Nhập số lượng"
            />
          </Form.Item>

          <Form.Item
            name="maTheLoai"
            label="Thể loại"
            rules={[{ required: true, message: "Vui lòng chọn thể loại" }]}
          >
            <Select placeholder="Chọn thể loại">
              {/* Placeholder options - replace with API data if available */}
              <Option value="vanhoc">Văn học</Option>
              <Option value="kinhte">Kinh tế</Option>
              <Option value="tamly">Tâm lý</Option>
              <Option value="giaotrinh">Giáo trình</Option>
              <Option value="truyentranh">Truyện tranh</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="maTacGia"
            label="Tác giả"
            rules={[{ required: true, message: "Vui lòng chọn tác giả" }]}
          >
            <Select placeholder="Chọn tác giả">
              {/* Placeholder options */}
              <Option value="nguyenvana">Nguyễn Văn A</Option>
              <Option value="nguyenvanb">Nguyễn Văn B</Option>
            </Select>
          </Form.Item>

          <Form.Item name="dichGia" label="Dịch giả">
            <Input placeholder="Nhập dịch giả" />
          </Form.Item>

          <Form.Item
            name="maNXB"
            label="Nhà xuất bản"
            rules={[{ required: true, message: "Vui lòng chọn NXB" }]}
          >
            <Select placeholder="Chọn NXB">
              {/* Placeholder options */}
              <Option value="nxb_hanoi">NXB Hà Nội</Option>
              <Option value="nxb_tre">NXB Trẻ</Option>
            </Select>
          </Form.Item>

          <Form.Item name="loaiSanPham" label="Loại sản phẩm">
            <Select placeholder="Chọn loại sản phẩm">
              <Option value="bia_mem">Bìa mềm</Option>
              <Option value="bia_cung">Bìa cứng</Option>
            </Select>
          </Form.Item>

          <Form.Item name="kichThuoc" label="Kích thước">
            <Input placeholder="Ví dụ: 19 x 10cm" />
          </Form.Item>

          <Form.Item name="soTrang" label="Số trang">
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Nhập số trang"
            />
          </Form.Item>

          <Form.Item
            name="hinhAnh"
            label="Hình ảnh (URL)"
            // rules={[{ required: true, message: "Vui lòng nhập URL hình ảnh" }]}
          >
            <Input placeholder="Nhập URL hình ảnh" />
          </Form.Item>
        </div>

        <Form.Item
          name="moTa"
          label="Mô tả"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <TextArea rows={4} placeholder="Nhập mô tả sách" />
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

export default ModalSach;
