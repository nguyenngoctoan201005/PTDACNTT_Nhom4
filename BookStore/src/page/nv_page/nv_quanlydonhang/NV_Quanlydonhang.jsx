import "./NV_Quanlydonhang.css";
import { NV_Nav } from "../../../nav/NV_Nav";
import { useState, useEffect } from "react";
import { Table, Input, message, Tag, Button } from "antd";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import { getAllDonHang } from "../../../api/donHangService";
import { useDebounce } from "../../../hooks/useDebounce";
import ModalChiTietDonHang from "./components/ModalChiTietDonHang";
import { getDetailDonHang } from "../../../api/donHangService";

export function NV_Quanlydonhang() {
    const [listDonHang, setListDonHang] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
    const debouncedSearchText = useDebounce(searchText, 500);

    const fetchDonHang = async () => {
        try {
            setLoading(true);
            const res = await getAllDonHang();
            // Assuming res.result is the array of orders based on previous code inspection
            setListDonHang(res.result || []);
        } catch (error) {
            console.error(error);
            message.error("Lỗi khi lấy danh sách đơn hàng");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDonHang();
    }, []);

    const handleUpdateSuccess = () => {
        fetchDonHang();
    };

    console.log(listDonHang)



    const getStatusTag = (status) => {
        const statusMap = {
            'Chờ xác nhận': { color: "orange", text: "Chờ xác nhận" },
            'Đang giao': { color: "blue", text: "Đang giao" },
            'Đã giao': { color: "green", text: "Đã giao" },
            'Đã hủy': { color: "red", text: "Đã hủy" },
            'Trả hàng': { color: "yellow", text: "Trả hàng" },
        };
        const config = statusMap[status] || { color: "default", text: "Không rõ" };
        return <Tag color={config.color}>{config.text}</Tag>;
    };

    //Test
    const handleViewDetail = async (record) => {
        try {
            setLoading(true);
            setSelectedOrder(record); // Hiển thị thông tin cơ bản trước
            setShowDetail(true);

            const res = await getDetailDonHang(record.maDonHang);

            if (res.code === 0 && res.result) {
                // Cập nhật selectedOrder với data chi tiết (bao gồm chiTietDonHangList, giamGia, v.v.)
                setSelectedOrder(res.result);
            } else {
                message.error("Không tìm thấy chi tiết đơn hàng");
            }
        } catch (error) {
            console.error(error);
            message.error("Lỗi khi lấy chi tiết đơn hàng");
            setShowDetail(false);
        } finally {
            setLoading(false);
        }
    };

    //Test



    const columns = [
        {
            title: "Mã Đơn Hàng",
            dataIndex: "maDonHang",
            key: "maDonHang",
            render: (text) => <span className="font-semibold">{text}</span>,
        },
        {
            title: "Khách Hàng",
            dataIndex: "tenNguoiNhan",
            key: "khachHang",
        },
        {
            title: "Ngày Đặt",
            dataIndex: "ngayDat",
            key: "ngayDat",
            render: (text) => new Date(text).toLocaleDateString("vi-VN"),
        },
        {
            title: "Trạng Thái",
            dataIndex: "trangThai",
            key: "trangThai",
            render: (status) => getStatusTag(status),
        },
        {
            title: "Tổng Tiền",
            key: "tongTien",
            render: (_, record) => {
                // 1. Lấy tiền hàng và phí ship
                const tongTienHang = record.tongTien || 0;
                const phiGiaoHang = record.phiGiaoHang || 0;

                // 2. Tính Giảm giá (nếu có)
                const discountPercent = record.giamGia?.chietKhau || 0;
                let tongTienGiam = 0;
                if (record.giamGia) {
                    tongTienGiam = tongTienHang * (discountPercent / 100);
                }

                // 3. Tính Tổng Thanh Toán Cuối Cùng
                const total = tongTienHang - tongTienGiam + phiGiaoHang;

                return new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(total);
            },
        },
        {
            title: "Thao Tác",
            key: "action",
            render: (_, record) => (
                <Button
                    type="text"
                    icon={<EyeOutlined />}
                    onClick={() => {
                        handleViewDetail(record)
                    }}
                >
                    Chi tiết
                </Button>
            ),
        },
    ];

    const filteredData = listDonHang.filter((item) => {
        const searchLower = debouncedSearchText.toLowerCase();
        return (
            // item.maDonHang?.toLowerCase().includes(searchLower) ||
            item.tenNguoiNhan?.toLowerCase().includes(searchLower)
        );
    });

    console.log(filteredData);

    return (
        <>
            <NV_Nav />
            <main className="qtv_khachhang_main"> {/* Reusing logic from QTV layout if applicable, or custom css class matching struct */}
                <div className="qtv_khachhang_tieude mx-4 mt-4 rounded-lg flex items-center justify-between">
                    <div>Quản Lý Đơn Hàng</div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 p-4 mx-4 bg-white rounded-lg shadow-md my-4 items-center">
                    <Input
                        placeholder="Tìm kiếm theo mã đơn, tên khách hàng..."
                        allowClear
                        className="w-full md:w-96"
                        onChange={(e) => setSearchText(e.target.value)}
                        prefix={<SearchOutlined />}
                    />
                </div>

                <div className="bg-white p-4 mx-4 rounded-lg shadow-md">
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                        }}
                        loading={loading}
                        rowKey="id" // Or maDonHang if unique
                        className="overflow-x-auto"
                    />
                </div>

                <ModalChiTietDonHang
                    open={showDetail}
                    order={selectedOrder}
                    onCancel={() => {
                        setShowDetail(false);
                        setSelectedOrder(null);
                    }}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            </main>
        </>
    );
}
