import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select, InputNumber, message } from "antd";
import {
  insertSach,
  updateSach,
  getSachDetail,
} from "../../../../../api/sachService";
import { getListTheLoai } from "../../../../../api/theLoaiService";
import { getListTacGia } from "../../../../../api/tacGiaService";

const { TextArea } = Input;
const { Option } = Select;

const ModalSach = ({ open, onCancel, onOk, type = "create", dataEdit }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [listTheLoai, setListTheLoai] = useState([]);
  const [listTacGia, setListTacGia] = useState([]);

  useEffect(() => {
    if (open) {
      // fetch categories and authors for the selects
      const fetchTheLoai = async () => {
        try {
          const res = await getListTheLoai();
          setListTheLoai(res?.result || []);
        } catch (err) {
          console.error("Lỗi khi tải danh sách thể loại:", err);
        }
      };

      const fetchTacGia = async () => {
        try {
          const res = await getListTacGia();
          setListTacGia(res?.result || []);
        } catch (err) {
          console.error("Lỗi khi tải danh sách tác giả:", err);
        }
      };

      fetchTheLoai();
      fetchTacGia();

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
      values["nhaXuatBan"] = {
        maNXB: 1,
      };
      values["loaiSach"] = {
        maLoai: form.getFieldValue("loaiSach"),
      };
      values["tacGiaIds"] = [form.getFieldValue("maTacGia")];
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
            name="loaiSach"
            label="Thể loại"
            rules={[{ required: true, message: "Vui lòng chọn thể loại" }]}
          >
            <Select placeholder="Chọn thể loại">
              {listTheLoai.map((item) => (
                <Option key={item.maLoai} value={item.maLoai}>
                  {item.tenLoai}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="maTacGia"
            label="Tác giả"
            rules={[{ required: true, message: "Vui lòng chọn tác giả" }]}
          >
            <Select placeholder="Chọn tác giả">
              {listTacGia.map((tg) => (
                <Option key={tg.maTG} value={tg.maTG}>
                  {tg.tenTG}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="dichGia" label="Dịch giả">
            <Input placeholder="Nhập dịch giả" />
          </Form.Item>

          <Form.Item
            name="nhaXuatBan"
            label="Nhà xuất bản"
            rules={[{ required: true, message: "Vui lòng chọn NXB" }]}
          >
            <Select placeholder="Chọn NXB">
              {/* Placeholder options */}
              <Option value="1">NXB Văn Học</Option>
              <Option value="2">NXB Hà Nội</Option>
              <Option value="3">NXB Trẻ</Option>
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
