import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select, message, InputNumber } from "antd";
import { insertSach, updateSach } from "../../../../api/sachService";
import { getListTheLoai } from "../../../../api/theLoaiService";
import { getListTacGia } from "../../../../api/tacGiaService";


const ModalSach = ({
    open,
    onCancel,
    onOk,
    type = "create",
    dataEdit,
}) => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);


    useEffect(() => {
        // Fetch categories
        const fetchCategories = async () => {
            try {
                const res = await getListTheLoai(); // Lấy danh sách thể loại từ API
                if (res && res.result) {
                    // Ánh xạ thành format { label: tenLoai, value: maLoai } mà Select cần
                    setCategories(res.result.map(c => ({ label: c.tenLoai, value: c.maLoai })));
                }
            } catch (error) {
                console.error("Failed to fetch categories", error);
            }
        };


        // Fetch authors
        const fetchAuthors = async () => {
            try {
                const res = await getListTacGia(); // Lấy danh sách tác giả từ API
                if (res && res.result) {
                    // Ánh xạ thành format { label: tenTG, value: maTG }
                    setAuthors(res.result.map(a => ({ label: a.tenTG, value: a.maTG })));
                }
            } catch (error) {
                console.error("Failed to fetch authors", error);
            }
        };

        fetchCategories();
        fetchAuthors();

        // **Lưu ý:** Bỏ cái useEffect lặp lại sau đó của mày đi.
    }, []);



    useEffect(() => {
        if (open) {
            if (type === "update" && dataEdit) {
                // Logic mapping khi EDIT (Update)
                const mappedData = {
                    ...dataEdit,
                    maLoai: dataEdit.loaiSach?.maLoai, // Lấy ID thể loại
                    tacGia: dataEdit.tacGiaSet?.map(tg => tg.maTG), // Lấy mảng ID tác giả
                    // Không cần map nhaXuatBan vì ta đã hardcode nó là 1
                };
                form.setFieldsValue(mappedData);
            } else if (type === "create") {
                // Khi tạo mới (Create): Reset toàn bộ form
                form.resetFields();
            }
        }
    }, [open, type, dataEdit, form]);

    const handleSubmit = async () => {
        try {
            // Đảm bảo các trường còn lại được validate
            const values = await form.validateFields();
            setIsLoading(true);

            // Chuẩn hóa dữ liệu gửi lên Backend
            const finalPayload = {
                // Lấy các trường đơn giản từ form
                tenSach: values.tenSach,
                donGia: values.donGia,
                soLuongCo: values.soLuongCo,
                hinhAnh: values.hinhAnh,
                moTa: values.moTa,

                // Chuyển maLoai thành object loaiSach (như API yêu cầu)
                loaiSach: {
                    maLoai: values.maLoai,
                },

                // Chuyển mảng tacGia (ID) thành tacGiaIds (như API yêu cầu)
                tacGiaIds: values.tacGia,

                // HARDCODE Nhà Xuất Bản MÃ 1 theo yêu cầu của mày
                nhaXuatBan: {
                    maNXB: 1
                },
            };

            if (type === "create") {
                await insertSach(finalPayload);
                message.success("Thêm sách thành công!");
            } else {
                // Thêm maSach vào payload cho update
                await updateSach({ ...finalPayload, maSach: dataEdit.maSach });
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
                        rules={[{ required: true, message: 'Tên sách không được bỏ trống!' }]} // Thêm validation
                    >
                        <Input placeholder="Nhập tên sách" />
                    </Form.Item>

                    <Form.Item
                        name="tacGia"
                        label="Tác giả"
                        rules={[{ required: true, message: 'Vui lòng chọn ít nhất một tác giả!' }]} // Thêm validation
                    >
                        <Select
                            mode="multiple"
                            placeholder="Chọn tác giả"
                            options={authors} // Đã có sẵn options từ state authors
                        />
                    </Form.Item>

                    <Form.Item
                        name="maLoai"
                        label="Thể loại"
                        rules={[{ required: true, message: 'Vui lòng chọn thể loại!' }]} // Thêm validation
                    >
                        <Select
                            placeholder="Chọn thể loại"
                            options={categories} // Đã có sẵn options từ state categories
                        />
                    </Form.Item>

                    <Form.Item
                        name="donGia"
                        label="Đơn giá"
                        rules={[{ required: true, message: 'Đơn giá không được bỏ trống!' }]} // Thêm validation
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            min={0} // Giá không thể là số âm
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            placeholder="Nhập đơn giá"
                        />
                    </Form.Item>

                    <Form.Item
                        name="soLuongCo"
                        label="Số lượng tồn"
                        rules={[{ required: true, message: "Vui lòng nhập số lượng tồn" }]}
                    >
                        <InputNumber style={{ width: '100%' }} placeholder="Nhập số lượng tồn" />
                    </Form.Item>

                    <Form.Item
                        name="nhaXuatBan"
                        label="Nhà xuất bản"
                    >
                        <Input placeholder="Nhập nhà xuất bản" />
                    </Form.Item>


                    <Form.Item
                        name="hinhAnh"
                        label="Hình ảnh (URL)"
                    >
                        <Input placeholder="Nhập link hình ảnh" />
                    </Form.Item>
                </div>

                <Form.Item
                    name="moTa"
                    label="Mô tả"
                >
                    <Input.TextArea rows={4} placeholder="Nhập mô tả sách" />
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
