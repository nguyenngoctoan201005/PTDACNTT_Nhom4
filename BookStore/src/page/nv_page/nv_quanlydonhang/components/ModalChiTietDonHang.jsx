
import React, { useState, useEffect } from "react";
import { Modal, Table, Button, Select, message, Tag } from "antd";
import { updateTrangThaiDonHang } from "../../../../api/donHangService"; // Chú ý đường dẫn import

const ModalChiTietDonHang = ({ open, onCancel, order, onUpdateSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [currentStatus, setCurrentStatus] = useState("");

    // Hàm tiện ích map trạng thái UI (tiếng Việt) sang giá trị Backend (uppercase, no accent)
    const mapStatusToValue = (statusUI) => {
        switch (statusUI) {
            case 'Chờ xác nhận': return 'CHO_XAC_NHAN';
            case 'Đang giao': return 'DANG_GIAO';
            case 'Đã giao': return 'DA_GIAO';
            case 'Đã hủy': return 'DA_HUY';
            case 'Trả hàng': return 'TRA_HANG';
            default: return '';
        }
    };

    // Hàm tiện ích map giá trị Backend (uppercase, no accent) sang trạng thái UI (tiếng Việt, có dấu)
    const mapValueToLabel = (value) => {
        switch (value) {
            case 'CHO_XAC_NHAN': return 'Chờ xác nhận';
            case 'DANG_GIAO': return 'Đang giao';
            case 'DA_GIAO': return 'Đã giao';
            case 'DA_HUY': return 'Đã hủy';
            case 'TRA_HANG': return 'Trả hàng';
            default: return value;
        }
    };

    const getStatusTag = (value) => {
        const statusMap = {
            'CHO_XAC_NHAN': { color: "orange", text: "Chờ xác nhận" },
            'DANG_GIAO': { color: "blue", text: "Đang giao" },
            'DA_GIAO': { color: "green", text: "Đã giao" },
            'DA_HUY': { color: "red", text: "Đã hủy" },
            'TRA_HANG': { color: "yellow", text: "Trả hàng" },
        };
        const config = statusMap[value] || { color: "default", text: mapValueToLabel(value) };
        return <Tag color={config.color}>{config.text}</Tag>;
    };


    useEffect(() => {
        if (order) {
            // Chuyển trạng thái nhận về (tiếng Việt) sang format Backend (uppercase, no accent)
            setCurrentStatus(mapStatusToValue(order.trangThai));
        }
    }, [order]);

    // Hàm cập nhật trạng thái 
    const handleUpdateStatus = async () => { //
        try {
            setLoading(true); //
            // SỬA ĐỔI: Gửi body có đủ maDonHang và trangThai (theo yêu cầu của mày)
            const dataToUpdate = {
                maDonHang: order.maDonHang, // Thêm maDonHang vào body
                trangThai: currentStatus  //
            };
            // API nhận (maDonHang, dataToUpdate)
            const res = await updateTrangThaiDonHang(order.maDonHang, dataToUpdate); //
            if (res.code === 0) { //
                message.success("Cập nhật trạng thái thành công"); //
                onUpdateSuccess(); //
                onCancel(); //
            } else {
                console.error("Lỗi từ server:", res); //
                message.error(res.message || "Cập nhật trạng thái thất bại. (Lỗi Server)"); //
            }
        } catch (error) { //
            console.error("Lỗi gọi API hoặc mạng:", error); //
            message.error("Lỗi cập nhật trạng thái. Vui lòng kiểm tra console."); //
        } finally { //
            setLoading(false); //
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    // BẮT ĐẦU PHẦN TÍNH TOÁN TỔNG TIỀN (Giữ nguyên logic tự tính lại)
    const tongTienHang = (order?.chiTietDonHangList || []).reduce((acc, item) => {
        const thanhTienItem = (item.soLuongMua || 0) * (item.giaMua || 0);
        return acc + thanhTienItem;
    }, 0);

    const phiGiaoHang = order?.phiGiaoHang || 0;
    const discountPercent = order?.giamGia?.chietKhau || 0;

    let tongTienGiam = 0;
    if (order?.giamGia) {
        tongTienGiam = tongTienHang * (discountPercent / 100);
    }

    const tongThanhToan = tongTienHang + phiGiaoHang - tongTienGiam;
    // KẾT THÚC PHẦN TÍNH TOÁN

    // Định nghĩa các cột cho bảng sản phẩm (ĐÃ FIX LỖI ĐƠN GIÁ VÀ THÀNH TIỀN)
    const columns = [
        {
            title: "Mã sản phẩm",
            dataIndex: ["id", "maSach"],
            key: "maSach",
            render: (maSach, record) => <span>{maSach || record.id?.maSach}</span>,
        },
        {
            title: "Số lượng",
            dataIndex: "soLuongMua",
            key: "soLuongMua",
            render: (text) => <span>x{text}</span>,
        },
        {
            title: "Đơn giá", // Giá của 1 sản phẩm
            dataIndex: "giaMua",
            key: "giaMua",
            render: (value) => formatCurrency(value),
        },
        {
            title: "Thành tiền", // Số lượng * Đơn giá
            key: "thanhTien",
            render: (_, record) => {
                const thanhTien = (record.soLuongMua || 0) * (record.giaMua || 0);
                return formatCurrency(thanhTien);
            },
        },
    ];

    return (
        <Modal
            title={`Chi tiết đơn hàng: ${order?.maDonHang || ""}`}
            open={open}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Đóng
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    loading={loading}
                    onClick={handleUpdateStatus}
                    // Disable nếu trạng thái hiện tại không thay đổi
                    disabled={currentStatus === mapStatusToValue(order?.trangThai)}
                >
                    Cập nhật trạng thái
                </Button>,
            ]}
            width={800}
        >
            {order && (
                <div className="flex flex-col gap-4">
                    {/* Thông tin khách hàng */}
                    <div className="p-3 bg-gray-50 rounded-lg">
                        <h3 className="font-bold mb-2">Thông tin khách hàng</h3>
                        <p>
                            <span className="font-semibold">Tên:</span>{" "}
                            {order.tenNguoiNhan}
                        </p>
                        <p>
                            <span className="font-semibold">SĐT:</span>{" "}
                            {order.soDTNguoiNhan}
                        </p>
                        <p>
                            <span className="font-semibold">Địa chỉ:</span>{" "}
                            {`${order.diaChiGiaoHang}, ${order.quanHuyen?.tenQuanHuyen}, ${order.quanHuyen?.tinh?.tenTinh}`}
                        </p>
                    </div>

                    {/* Trạng thái đơn hàng */}
                    <div className="flex items-center gap-2">
                        <span className="font-bold">Trạng thái hiện tại:</span>
                        <Select
                            value={currentStatus}
                            style={{ width: 200 }}
                            onChange={setCurrentStatus}
                            options={[
                                // VALUE phải khớp với format backend (viết hoa không dấu)
                                { value: "CHO_XAC_NHAN", label: getStatusTag("CHO_XAC_NHAN") },
                                { value: "DANG_GIAO", label: getStatusTag("DANG_GIAO") },
                                { value: "DA_GIAO", label: getStatusTag("DA_GIAO") },
                                { value: "DA_HUY", label: getStatusTag("DA_HUY") },
                                { value: "TRA_HANG", label: getStatusTag("TRA_HANG") },
                            ]}
                        />
                    </div>

                    {/* Chi tiết sản phẩm */}
                    <Table
                        columns={columns}
                        dataSource={order.chiTietDonHangList || []}
                        pagination={false}
                        // Sửa rowKey cho đúng chuẩn
                        rowKey={(record, index) => record.id?.maSach || `item-${index}`}
                        size="small"
                        summary={() => {
                            return (
                                <>
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell index={0} colSpan={3} className="text-right font-bold">
                                            Tổng tiền hàng
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={1} className="font-bold">
                                            {formatCurrency(tongTienHang)}
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell index={0} colSpan={3} className="text-right font-bold">
                                            Phí giao hàng
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={1} className="font-bold">
                                            {formatCurrency(phiGiaoHang)}
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                    {order.giamGia && (
                                        <Table.Summary.Row>
                                            <Table.Summary.Cell index={0} colSpan={3} className="text-right font-bold text-blue-600">
                                                Giảm giá ({discountPercent}%)
                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell index={1} className="font-bold text-blue-600">
                                                -{formatCurrency(tongTienGiam)}
                                            </Table.Summary.Cell>
                                        </Table.Summary.Row>
                                    )}
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell index={0} colSpan={3} className="text-right font-bold text-red-600">
                                            Tổng thanh toán
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={1} className="font-bold text-red-600">
                                            {formatCurrency(tongThanhToan)}
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                </>
                            );
                        }}
                    />
                </div>
            )}
        </Modal>
    );
};

export default ModalChiTietDonHang;
