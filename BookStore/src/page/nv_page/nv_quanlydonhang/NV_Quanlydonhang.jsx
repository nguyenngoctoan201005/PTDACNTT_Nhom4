// import './NV_Quanlydonhang.css'
// import { NV_Nav } from '../../../nav/NV_Nav'
// import { useState } from 'react'
// export function NV_Quanlydonhang() {
//     const [show, setShow] = useState(false)

//     const DataTest = [
//         // --- Đơn Hàng 1: Đã Giao Thành Công ---
//         {
//             "id": 1001,
//             "maDonHang": "DH-20251210-001",
//             "ngayDatHang": "2025-12-10T15:30:00Z",
//             "trangThai": "da_giao",
//             "tongTienThanhToan": 350000.00,
//             "phiGiaoHang": 30000.00,
//             "maGiamGia": null,
//             "thongTinNguoiNhan": {
//                 "ten": "Nguyễn Văn A",
//                 "sdt": "0912345678",
//                 "diaChiChiTiet": "25 Ngõ 10, Phố X",
//                 "phuongXa": "Phường Y",
//                 "tinhThanh": "Hà Nội"
//             },
//             "chiTietDonHang": [
//                 {
//                     "maSach": 1,
//                     "tenSach": "Lập Trình Hướng Đối Tượng",
//                     "soLuong": 1,
//                     "donGia": 150000.00,
//                     "thanhTien": 150000.00
//                 },
//                 {
//                     "maSach": 5,
//                     "tenSach": "Giải Thuật và Cấu Trúc Dữ Liệu",
//                     "soLuong": 2,
//                     "donGia": 85000.00,
//                     "thanhTien": 170000.00
//                 }
//             ],
//             "phuongThucThanhToan": "1"
//         },

//         // --- Đơn Hàng 2: Đang Xử Lý ---
//         {
//             "id": 1002,
//             "maDonHang": "DH-20251210-002",
//             "ngayDatHang": "2025-12-10T20:00:00Z",
//             "trangThai": "dang_giao",
//             "tongTienThanhToan": 200000.00,
//             "phiGiaoHang": 0.00,
//             "maGiamGia": null,
//             "thongTinNguoiNhan": {
//                 "ten": "Lê Thị B",
//                 "sdt": "0987654321",
//                 "diaChiChiTiet": "30/A, Hẻm Z",
//                 "phuongXa": "Phường T",
//                 "tinhThanh": "TP. Hồ Chí Minh"
//             },
//             "chiTietDonHang": [
//                 {
//                     "maSach": 10,
//                     "tenSach": "Kinh Tế Vi Mô",
//                     "soLuong": 2,
//                     "donGia": 100000.00,
//                     "thanhTien": 200000.00
//                 }
//             ],
//             "phuongThucThanhToan": "2"
//         },

//         // --- Đơn Hàng 3: Đã Hủy & Có Giảm Giá ---
//         {
//             "id": 1003,
//             "maDonHang": "DH-20251211-003",
//             "ngayDatHang": "2025-12-11T09:15:00Z",
//             "trangThai": "da_huy",
//             "tongTienTruocGiamGia": 500000.00,
//             "tongTienGiam": 50000.00,
//             "tongTienThanhToan": 450000.00,
//             "phiGiaoHang": 30000.00,
//             "maGiamGia": "SALE50K",
//             "thongTinNguoiNhan": {
//                 "ten": "Trần Văn C",
//                 "sdt": "0909112233",
//                 "diaChiChiTiet": "45 Lê Lợi",
//                 "phuongXa": "Phường Z",
//                 "tinhThanh": "Đà Nẵng"
//             },
//             "chiTietDonHang": [
//                 {
//                     "maSach": 20,
//                     "tenSach": "Marketing Căn Bản",
//                     "soLuong": 5,
//                     "donGia": 100000.00,
//                     "thanhTien": 500000.00
//                 }
//             ],
//             "phuongThucThanhToan": "3"
//         },

//         // --- Đơn Hàng 4: Đang Vận Chuyển & Miễn Phí Ship ---
//         {
//             "id": 1004,
//             "maDonHang": "DH-20251211-004",
//             "ngayDatHang": "2025-12-11T14:45:00Z",
//             "trangThai": "cho_xac_nhan",
//             "tongTienThanhToan": 120000.00,
//             "phiGiaoHang": 0.00,
//             "maGiamGia": null,
//             "thongTinNguoiNhan": {
//                 "ten": "Phạm Thị D",
//                 "sdt": "0383777888",
//                 "diaChiChiTiet": "Lầu 5, Tòa nhà ABC",
//                 "phuongXa": "Quận 10",
//                 "tinhThanh": "TP. Hồ Chí Minh"
//             },
//             "chiTietDonHang": [
//                 {
//                     "maSach": 3,
//                     "tenSach": "Tâm Lý Học Tội Phạm",
//                     "soLuong": 1,
//                     "donGia": 120000.00,
//                     "thanhTien": 120000.00
//                 }
//             ],
//             "phuongThucThanhToan": "4"
//         },

//         // --- Đơn Hàng 5: Chờ Thanh Toán ---
//         {
//             "id": 1005,
//             "maDonHang": "DH-20251212-005",
//             "ngayDatHang": "2025-12-12T10:00:00Z",
//             "trangThai": "cho_xac_nhan",
//             "tongTienThanhToan": 65000.00,
//             "phiGiaoHang": 15000.00,
//             "maGiamGia": null,
//             "thongTinNguoiNhan": {
//                 "ten": "Hoàng Văn E",
//                 "sdt": "0777999000",
//                 "diaChiChiTiet": "Thôn Cao",
//                 "phuongXa": "Xã Thấp",
//                 "tinhThanh": "Hải Phòng"
//             },
//             "chiTietDonHang": [
//                 {
//                     "maSach": 40,
//                     "tenSach": "Truyện Tranh A",
//                     "soLuong": 1,
//                     "donGia": 50000.00,
//                     "thanhTien": 50000.00
//                 }
//             ],
//             "phuongThucThanhToan": "5"
//         }
//     ]
//     return (
//         <>
//             <NV_Nav />
//             <main className="nv_trangqldh_main">
//                 <div className="nv_trangqldh_tieude">Quản lý đơn hàng</div>
//                 <hr style={{ border: '1px solid rgb(210, 206, 206)', width: '1150px', marginLeft: '25px', marginTop: '25px' }} />
//                 <div>
//                     <table className='nv_qldh_table' width="1150px" height="50px">
//                         <tr className='nv_qldh_tr'>
//                             <th className='nv_qldh_th'>Mã đơn hàng</th>
//                             <th className='nv_qldh_th'>Khách hàng</th>
//                             <th className='nv_qldh_th'>Ngày đặt</th>
//                             <th className='nv_qldh_th'>Trạng thái</th>
//                             <th className='nv_qldh_th'>Tổng tiền</th>
//                             <th className='nv_qldh_th'>Thao tác</th>
//                         </tr>
//                         {DataTest.map((item, index) => {
//                             if (item.trangThai === "cho_xac_nhan") {
//                                 return (
//                                     <tr className='nv_qldh_tr'>
//                                         <td className="nv_qldh_td nv_trangqldh_madh">{item.maDonHang}</td>
//                                         <td className="nv_qldh_td nv_trangqldh_kh">{item.thongTinNguoiNhan.ten}</td>
//                                         <td className="nv_qldh_td nv_trangqldh_ngaydat">{item.ngayDatHang}</td>
//                                         <td className="nv_qldh_td nv_qldh_td_trangthai"><div className="nv_qldh_td nv_trangqldh_trangthai">{item.trangThai === "cho_xac_nhan" ? "Chờ xác nhận" : item.trangThai === "dang_giao" ? "Đang giao" : item.trangThai === "da_huy" ? "Đã hủy" : item.trangThai === "cho_xac_nhan" ? "Chờ xác nhận" : item.trangThai === "dang_giao" ? "Đang giao" : item.trangThai === "da_huy" ? "Đã hủy" : "Đã giao"}</div></td>
//                                         <td className="nv_qldh_td nv_trangqldh_tongtien">{item.tongTienThanhToan}</td>
//                                         <td className="nv_qldh_td nv_qldh_td_thao tac"><button onClick={() => setShow(true)} className="nv_qldh_td nv_trangqldh_button_xct">Xem chi tiết</button> <button className="nv_trangqldh_button_xn">Xác nhận</button></td>
//                                     </tr>
//                                 )
//                             } else if (item.trangThai === "da_huy") {
//                                 return (
//                                     <tr className='nv_qldh_tr'>
//                                         <td className="nv_qldh_td nv_trangqldh_madh">{item.maDonHang}</td>
//                                         <td className="nv_qldh_td nv_trangqldh_kh">{item.thongTinNguoiNhan.ten}</td>
//                                         <td className="nv_qldh_td nv_trangqldh_ngaydat">{item.ngayDatHang}</td>
//                                         <td className="nv_qldh_td nv_qldh_td_trangthai"><div className="nv_qldh_td nv_trangqldh_trangthai" style={{ backgroundColor: 'red', color: 'white' }}>{item.trangThai === "cho_xac_nhan" ? "Chờ xác nhận" : item.trangThai === "dang_giao" ? "Đang giao" : item.trangThai === "da_huy" ? "Đã hủy" : item.trangThai === "cho_xac_nhan" ? "Chờ xác nhận" : item.trangThai === "dang_giao" ? "Đang giao" : item.trangThai === "da_huy" ? "Đã hủy" : "Đã giao"}</div></td>
//                                         <td className="nv_qldh_td nv_trangqldh_tongtien">{item.tongTienThanhToan}</td>
//                                         <td className="nv_qldh_td nv_qldh_td_thao tac"><button onClick={() => setShow(true)} className="nv_qldh_td nv_trangqldh_button_xct">Xem chi tiết</button></td>
//                                     </tr>
//                                 )
//                             } else {
//                                 return (
//                                     <tr className='nv_qldh_tr'>
//                                         <td className="nv_qldh_td nv_trangqldh_madh">{item.maDonHang}</td>
//                                         <td className="nv_qldh_td nv_trangqldh_kh">{item.thongTinNguoiNhan.ten}</td>
//                                         <td className="nv_qldh_td nv_trangqldh_ngaydat">{item.ngayDatHang}</td>
//                                         <td className="nv_qldh_td nv_qldh_td_trangthai"><div className="nv_qldh_td nv_trangqldh_trangthai" style={{ backgroundColor: 'green', color: 'white' }}>{item.trangThai === "cho_xac_nhan" ? "Chờ xác nhận" : item.trangThai === "dang_giao" ? "Đang giao" : item.trangThai === "da_huy" ? "Đã hủy" : item.trangThai === "cho_xac_nhan" ? "Chờ xác nhận" : item.trangThai === "dang_giao" ? "Đang giao" : item.trangThai === "da_huy" ? "Đã hủy" : "Đã giao"}</div></td>
//                                         <td className="nv_qldh_td nv_trangqldh_tongtien">{item.tongTienThanhToan}</td>
//                                         <td className="nv_qldh_td nv_qldh_td_thao tac"><button onClick={() => setShow(true)} className="nv_qldh_td nv_trangqldh_button_xct">Xem chi tiết</button></td>
//                                     </tr>
//                                 )
//                             }
//                         })}



//                     </table>


//                 </div>


//                 {show && (
//                     <div className='nv_qldh_ctdh'>
//                         <div className='nv_qldh_ctdh_tieude'>Chi tiết đơn hàng
//                             <svg onClick={() => setShow(false)} xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 8 8"><path fill="" d="M1.41 0L0 1.41l.72.72L2.5 3.94L.72 5.72L0 6.41l1.41 1.44l.72-.72l1.81-1.81l1.78 1.81l.69.72l1.44-1.44l-.72-.69l-1.81-1.78l1.81-1.81l.72-.72L6.41 0l-.69.72L3.94 2.5L2.13.72L1.41 0z" /></svg>
//                         </div>

//                         <div className='nv_qldh_ctdh_noidung'>
//                             <div className='nv_qldh_ctdh_noidung_left'>
//                                 <div>
//                                     <div className='nv_qldh_ctdh_noidung_tieude'>Thông tin khách hàng</div>
//                                 </div>
//                                 <div>
//                                     <div className="nv_qldh_ctdh_noidung_ct">Tên :Nguyễn Văn A</div>
//                                     <div className="nv_qldh_ctdh_noidung_ct">SĐT :0123456789</div>
//                                     <div className="nv_qldh_ctdh_noidung_ct">Địa chỉ : 123 Đường ABC, Quận XYZ, TP.HCM</div>
//                                 </div>
//                             </div>

//                             <div className='nv_qldh_ctdh_noidung_right'>
//                                 <div>
//                                     <div className='nv_qldh_ctdh_noidung_tieude'>Trạng thái đơn hàng</div>
//                                 </div>
//                                 <div className='nv_qldh_ctdh_noidung_right_ct'>
//                                     <select name="" id="">
//                                         <option value="">chờ xác nhận</option>
//                                         <option value="">đã giao hàng</option>
//                                         <option value="">đã hủy</option>
//                                     </select>
//                                     <button>Cập nhật</button>
//                                 </div>
//                             </div>

//                         </div>

//                         <table className='nv_qldh_ctdh_table'>
//                             <tr>
//                                 <th className="nv_qldh_ctdh_table_th1">Sản phẩm</th>
//                                 <th className="nv_qldh_ctdh_table_th2">Số lượng</th>
//                                 <th className="nv_qldh_ctdh_table_th3">Đơn giá</th>
//                                 <th className="nv_qldh_ctdh_table_th4">Thành tiền</th>
//                             </tr>
//                             <tr className='nv_qldh_ctdh_table_tr'>
//                                 <td className='nv_qldh_ctdh_table_td'>Sách marketing</td>
//                                 <td className='nv_qldh_ctdh_table_td'>1</td>
//                                 <td className='nv_qldh_ctdh_table_td'>100.000đ</td>
//                                 <td className='nv_qldh_ctdh_table_td'>100.000đ</td>
//                             </tr>
//                             <tr className='nv_qldh_ctdh_table_tr'>
//                                 <td className='nv_qldh_ctdh_table_td'>Sách marketing</td>
//                                 <td className='nv_qldh_ctdh_table_td'>1</td>
//                                 <td className='nv_qldh_ctdh_table_td'>100.000đ</td>
//                                 <td className='nv_qldh_ctdh_table_td'>100.000đ</td>
//                             </tr>
//                         </table>

//                     </div>

//                 )}
//             </main>
//         </>

//     )
// }

import './NV_Quanlydonhang.css'
import { NV_Nav } from '../../../nav/NV_Nav'
import { useState } from 'react'

// Hàm chuyển đổi trạng thái từ mã sang chữ (cho gọn)
const getStatusText = (status) => {
    switch (status) {
        case "cho_xac_nhan":
            return "Chờ xác nhận";
        case "dang_giao":
            return "Đang giao";
        case "da_huy":
            return "Đã hủy";
        case "da_giao":
            return "Đã giao";
        default:
            return "Không rõ";
    }
};

// Hàm định dạng tiền tệ (thêm dấu phẩy, chữ đ)
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export function NV_Quanlydonhang() {
    // 1. Dùng state để lưu TRẠNG THÁI ẩn/hiện modal
    const [showDetail, setShowDetail] = useState(false);
    // 2. Dùng state để lưu DỮ LIỆU của đơn hàng đang được xem chi tiết
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Hàm Xử lý khi nhấn "Xem chi tiết"
    const handleViewDetail = (order) => {
        setSelectedOrder(order); // Lưu đơn hàng được chọn
        setShowDetail(true); // Hiển thị modal
    };

    // Hàm Xử lý đóng modal
    const handleCloseDetail = () => {
        setShowDetail(false);
        setSelectedOrder(null); // Xóa đơn hàng đã chọn
    };

    // ... Dữ liệu DataTest của mày không đổi ...
    const DataTest = [
        // --- Đơn Hàng 1: Đã Giao Thành Công ---
        {
            "id": 1001,
            "maDonHang": "DH-20251210-001",
            "ngayDatHang": "2025-12-10T15:30:00Z",
            "trangThai": "da_giao",
            "tongTienThanhToan": 350000.00,
            "phiGiaoHang": 30000.00,
            "maGiamGia": null,
            "thongTinNguoiNhan": {
                "ten": "Nguyễn Văn A",
                "sdt": "0912345678",
                "diaChiChiTiet": "25 Ngõ 10, Phố X",
                "phuongXa": "Phường Y",
                "tinhThanh": "Hà Nội"
            },
            "chiTietDonHang": [
                {
                    "maSach": 1,
                    "tenSach": "Lập Trình Hướng Đối Tượng",
                    "soLuong": 1,
                    "donGia": 150000.00,
                    "thanhTien": 150000.00
                },
                {
                    "maSach": 5,
                    "tenSach": "Giải Thuật và Cấu Trúc Dữ Liệu",
                    "soLuong": 2,
                    "donGia": 85000.00,
                    "thanhTien": 170000.00
                }
            ],
            "phuongThucThanhToan": "1"
        },

        // --- Đơn Hàng 2: Đang Giao ---
        {
            "id": 1002,
            "maDonHang": "DH-20251210-002",
            "ngayDatHang": "2025-12-10T20:00:00Z",
            "trangThai": "dang_giao",
            "tongTienThanhToan": 200000.00,
            "phiGiaoHang": 0.00,
            "maGiamGia": null,
            "thongTinNguoiNhan": {
                "ten": "Lê Thị B",
                "sdt": "0987654321",
                "diaChiChiTiet": "30/A, Hẻm Z",
                "phuongXa": "Phường T",
                "tinhThanh": "TP. Hồ Chí Minh"
            },
            "chiTietDonHang": [
                {
                    "maSach": 10,
                    "tenSach": "Kinh Tế Vi Mô",
                    "soLuong": 2,
                    "donGia": 100000.00,
                    "thanhTien": 200000.00
                }
            ],
            "phuongThucThanhToan": "2"
        },

        // --- Đơn Hàng 3: Đã Hủy & Có Giảm Giá ---
        {
            "id": 1003,
            "maDonHang": "DH-20251211-003",
            "ngayDatHang": "2025-12-11T09:15:00Z",
            "trangThai": "da_huy",
            "tongTienTruocGiamGia": 500000.00,
            "tongTienGiam": 50000.00,
            "tongTienThanhToan": 450000.00,
            "phiGiaoHang": 30000.00,
            "maGiamGia": "SALE50K",
            "thongTinNguoiNhan": {
                "ten": "Trần Văn C",
                "sdt": "0909112233",
                "diaChiChiTiet": "45 Lê Lợi",
                "phuongXa": "Phường Z",
                "tinhThanh": "Đà Nẵng"
            },
            "chiTietDonHang": [
                {
                    "maSach": 20,
                    "tenSach": "Marketing Căn Bản",
                    "soLuong": 5,
                    "donGia": 100000.00,
                    "thanhTien": 500000.00
                }
            ],
            "phuongThucThanhToan": "3"
        },

        // --- Đơn Hàng 4: Chờ Xác Nhận (Phí Ship 0) ---
        {
            "id": 1004,
            "maDonHang": "DH-20251211-004",
            "ngayDatHang": "2025-12-11T14:45:00Z",
            "trangThai": "cho_xac_nhan",
            "tongTienThanhToan": 120000.00,
            "phiGiaoHang": 0.00,
            "maGiamGia": null,
            "thongTinNguoiNhan": {
                "ten": "Phạm Thị D",
                "sdt": "0383777888",
                "diaChiChiTiet": "Lầu 5, Tòa nhà ABC",
                "phuongXa": "Quận 10",
                "tinhThanh": "TP. Hồ Chí Minh"
            },
            "chiTietDonHang": [
                {
                    "maSach": 3,
                    "tenSach": "Tâm Lý Học Tội Phạm",
                    "soLuong": 1,
                    "donGia": 120000.00,
                    "thanhTien": 120000.00
                }
            ],
            "phuongThucThanhToan": "4"
        },

        // --- Đơn Hàng 5: Chờ Xác Nhận (Phí Ship có) ---
        {
            "id": 1005,
            "maDonHang": "DH-20251212-005",
            "ngayDatHang": "2025-12-12T10:00:00Z",
            "trangThai": "cho_xac_nhan",
            "tongTienThanhToan": 65000.00,
            "phiGiaoHang": 15000.00,
            "maGiamGia": null,
            "thongTinNguoiNhan": {
                "ten": "Hoàng Văn E",
                "sdt": "0777999000",
                "diaChiChiTiet": "Thôn Cao",
                "phuongXa": "Xã Thấp",
                "tinhThanh": "Hải Phòng"
            },
            "chiTietDonHang": [
                {
                    "maSach": 40,
                    "tenSach": "Truyện Tranh A",
                    "soLuong": 1,
                    "donGia": 50000.00,
                    "thanhTien": 50000.00
                }
            ],
            "phuongThucThanhToan": "5"
        }
    ]

    return (
        <>
            <NV_Nav />
            <main className="nv_trangqldh_main">
                <div className="nv_trangqldh_tieude">Quản lý đơn hàng</div>
                <hr style={{ border: '1px solid rgb(210, 206, 206)', width: '1150px', marginLeft: '25px', marginTop: '25px' }} />
                <div>
                    <table className='nv_qldh_table' width="1150px" height="50px">
                        <tr className='nv_qldh_tr'>
                            <th className='nv_qldh_th'>Mã đơn hàng</th>
                            <th className='nv_qldh_th'>Khách hàng</th>
                            <th className='nv_qldh_th'>Ngày đặt</th>
                            <th className='nv_qldh_th'>Trạng thái</th>
                            <th className='nv_qldh_th'>Tổng tiền</th>
                            <th className='nv_qldh_th'>Thao tác</th>
                        </tr>
                        {DataTest.map((item, index) => {
                            const status = item.trangThai;
                            const statusText = getStatusText(status);
                            let statusStyle = {};
                            let actionButton = null;

                            // Định nghĩa màu sắc và button Thao tác
                            if (status === "cho_xac_nhan") {
                                statusStyle = { backgroundColor: 'orange', color: 'white' };
                                actionButton = (
                                    <>
                                        <button onClick={() => handleViewDetail(item)} className="nv_qldh_td nv_trangqldh_button_xct">Xem chi tiết</button>
                                        <button className="nv_trangqldh_button_xn">Xác nhận</button>
                                    </>
                                );
                            } else if (status === "da_huy") {
                                statusStyle = { backgroundColor: 'red', color: 'white' };
                                actionButton = <button onClick={() => handleViewDetail(item)} className="nv_qldh_td nv_trangqldh_button_xct">Xem chi tiết</button>;
                            } else { // "dang_giao", "da_giao"
                                statusStyle = { backgroundColor: 'green', color: 'white' };
                                actionButton = <button onClick={() => handleViewDetail(item)} className="nv_qldh_td nv_trangqldh_button_xct">Xem chi tiết</button>;
                            }

                            return (
                                <tr className='nv_qldh_tr' key={item.id}>
                                    <td className="nv_qldh_td nv_trangqldh_madh">{item.maDonHang}</td>
                                    <td className="nv_qldh_td nv_trangqldh_kh">{item.thongTinNguoiNhan.ten}</td>
                                    <td className="nv_qldh_td nv_trangqldh_ngaydat">{new Date(item.ngayDatHang).toLocaleDateString('vi-VN')}</td>
                                    <td className="nv_qldh_td nv_qldh_td_trangthai">
                                        <div className="nv_qldh_td nv_trangqldh_trangthai" style={statusStyle}>
                                            {statusText}
                                        </div>
                                    </td>
                                    <td className="nv_qldh_td nv_trangqldh_tongtien">{formatCurrency(item.tongTienThanhToan + item.phiGiaoHang)}</td>
                                    <td className="nv_qldh_td nv_qldh_td_thao tac">
                                        {actionButton}
                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                </div>

                {/* Modal Chi tiết đơn hàng: 
                    Chỉ hiển thị khi showDetail là true VÀ selectedOrder có dữ liệu.
                    Sử dụng selectedOrder để render dữ liệu.
                */}
                {showDetail && selectedOrder && (
                    <div className='nv_qldh_ctdh'>
                        <div className='nv_qldh_ctdh_tieude'>Chi tiết đơn hàng: {selectedOrder.maDonHang}
                            <svg onClick={handleCloseDetail} xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 8 8"><path fill="currentColor" d="M1.41 0L0 1.41l.72.72L2.5 3.94L.72 5.72L0 6.41l1.41 1.44l.72-.72l1.81-1.81l1.78 1.81l.69.72l1.44-1.44l-.72-.69l-1.81-1.78l1.81-1.81l.72-.72L6.41 0l-.69.72L3.94 2.5L2.13.72L1.41 0z" /></svg>
                        </div>

                        <div className='nv_qldh_ctdh_noidung'>
                            <div className='nv_qldh_ctdh_noidung_left'>
                                <div>
                                    <div className='nv_qldh_ctdh_noidung_tieude'>Thông tin khách hàng</div>
                                </div>
                                <div>
                                    {/* HIỂN THỊ DỮ LIỆU ĐƠN HÀNG ĐƯỢC CHỌN */}
                                    <div className="nv_qldh_ctdh_noidung_ct">Tên: {selectedOrder.thongTinNguoiNhan.ten}</div>
                                    <div className="nv_qldh_ctdh_noidung_ct">SĐT: {selectedOrder.thongTinNguoiNhan.sdt}</div>
                                    <div className="nv_qldh_ctdh_noidung_ct">Địa chỉ: {selectedOrder.thongTinNguoiNhan.diaChiChiTiet}, {selectedOrder.thongTinNguoiNhan.phuongXa}, {selectedOrder.thongTinNguoiNhan.tinhThanh}</div>
                                </div>
                            </div>

                            <div className='nv_qldh_ctdh_noidung_right'>
                                <div>
                                    <div className='nv_qldh_ctdh_noidung_tieude'>Trạng thái đơn hàng</div>
                                </div>
                                <div className='nv_qldh_ctdh_noidung_right_ct'>
                                    {/* HIỂN THỊ TRẠNG THÁI HIỆN TẠI VÀ CHỌN CẬP NHẬT */}
                                    <select name="trangThaiCapNhat" id="trangThaiCapNhat" defaultValue={selectedOrder.trangThai}>
                                        <option value="cho_xac_nhan">Chờ xác nhận</option>
                                        <option value="dang_giao">Đang giao</option>
                                        <option value="da_giao">Đã giao hàng</option>
                                        <option value="da_huy">Đã hủy</option>
                                    </select>
                                    <button>Cập nhật</button>
                                </div>
                            </div>

                        </div>

                        <table className='nv_qldh_ctdh_table'>
                            <thead>
                                <tr>
                                    <th className="nv_qldh_ctdh_table_th1">Sản phẩm</th>
                                    <th className="nv_qldh_ctdh_table_th2">Số lượng</th>
                                    <th className="nv_qldh_ctdh_table_th3">Đơn giá</th>
                                    <th className="nv_qldh_ctdh_table_th4">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* LẶP QUA CHI TIẾT ĐƠN HÀNG */}
                                {selectedOrder.chiTietDonHang.map((item, index) => (
                                    <tr className='nv_qldh_ctdh_table_tr' key={item.maSach}>
                                        <td className='nv_qldh_ctdh_table_td'>{item.tenSach}</td>
                                        <td className='nv_qldh_ctdh_table_td'>{item.soLuong}</td>
                                        <td className='nv_qldh_ctdh_table_td'>{formatCurrency(item.donGia)}</td>
                                        <td className='nv_qldh_ctdh_table_td'>{formatCurrency(item.thanhTien)}</td>
                                    </tr>
                                ))}
                                {/* Dòng tổng kết */}
                                <tr className='nv_qldh_ctdh_table_tr'>
                                    <td className='nv_qldh_ctdh_table_td' colSpan="3" style={{ textAlign: 'right', fontWeight: 'bold' }}>Tổng tiền hàng:</td>
                                    <td className='nv_qldh_ctdh_table_td' style={{ fontWeight: 'bold' }}>{formatCurrency(selectedOrder.tongTienThanhToan)}</td>
                                </tr>
                                <tr className='nv_qldh_ctdh_table_tr'>
                                    <td className='nv_qldh_ctdh_table_td' colSpan="3" style={{ textAlign: 'right', fontWeight: 'bold' }}>Phí giao hàng:</td>
                                    <td className='nv_qldh_ctdh_table_td' style={{ fontWeight: 'bold' }}>{formatCurrency(selectedOrder.phiGiaoHang)}</td>
                                </tr>
                                <tr className='nv_qldh_ctdh_table_tr'>
                                    <td className='nv_qldh_ctdh_table_td' colSpan="3" style={{ textAlign: 'right', fontWeight: 'bold', color: 'red' }}>Tổng thanh toán:</td>
                                    <td className='nv_qldh_ctdh_table_td' style={{ fontWeight: 'bold', color: 'red' }}>{formatCurrency(selectedOrder.tongTienThanhToan + selectedOrder.phiGiaoHang)}</td>
                                </tr>
                                {/* Nếu có giảm giá */}
                                {selectedOrder.maGiamGia && (
                                    <tr className='nv_qldh_ctdh_table_tr'>
                                        <td className='nv_qldh_ctdh_table_td' colSpan="3" style={{ textAlign: 'right', fontWeight: 'bold', color: 'blue' }}>Mã giảm giá ({selectedOrder.maGiamGia}):</td>
                                        <td className='nv_qldh_ctdh_table_td' style={{ fontWeight: 'bold', color: 'blue' }}>-{formatCurrency(selectedOrder.tongTienGiam)}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                    </div>

                )}
            </main>
        </>

    )
}