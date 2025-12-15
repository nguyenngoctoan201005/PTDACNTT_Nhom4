import axiosInstance from "../auth/axiosInstance";

export const insertDonHang = async (data) => {
    const res = await axiosInstance.post("/don-hang/createDH", { ...data });

    return res.data;
};




export const getDetailDonHang = async (maDonHang) => { // <<< Thay đổi tham số
    // Dùng trực tiếp maDonHang trong URL, bỏ cái object config {...data} thừa thãi đi
    const res = await axiosInstance.get(`/don-hang/getDH/${maDonHang}`);
    return res.data;
};

/*
{
    "code": 0,
    "result": {
        "maDonHang": 123,
        "tenNguoiNhan": "Nguyễn Văn A",
        "soDTNguoiNhan": "0123456789",
        "email": "abc@gmail.com",
        "diaChiGiaoHang": "abc",
        "ghiChu": null,
        "phiGiaoHang": 10000.0,
        "trangThai": "Đã hủy",
        "ngayDat": "2025-01-01",
        "tongTien": 200000.0,
        "quanHuyen": {
            "maQuanHuyen": 1,
            "tenQuanHuyen": "Quận Ba Đình",
            "tinh": {
                "maTinh": 1,
                "tenTinh": "Thành phố Hà Nội"
            }
        },
        "phuongThucThanhToan": {
            "maPTTT": 1,
            "tenPTTT": "1"
        },
        "nhanVien": {
            "maNV": 1,
            "tenDangNhap": "nhanvien1",
            "matKhau": "$2a$10$JrlEkg4zlMozLKgE9Mq6yeoxZoNxD5hxwL3pArRDavZOazAKvMZh2",
            "hoTen": "Nhân Viên 1",
            "soCCCD": "0123456781",
            "roles": [
                "STAFF",
                "USER"
            ]
        },
        "giamGia": {
            "maGiamGia": 1,
            "ngayBatDau": "2025-01-01",
            "ngayKetThuc": "2026-01-01",
            "chietKhau": 1.0,
            "moTa": "",
            "donHangToiThieu": 2000.0,
            "sachGiamGiaList": []
        },
        "chiTietDonHangList": []
    }
}*/


export const createDonHang = async (data) => {
    // data structure matches DonHangCreate body in backend
    const res = await axiosInstance.post("/don-hang/createDH", data);
    return res.data;
};

export const getAllDonHang = async () => {
    const res = await axiosInstance.get("/don-hang/getALLDH");
    return res.data;
};

/*
{
    "code": 0,
    "result": [
        {
            "maDonHang": 123,
            "tenNguoiNhan": "Nguyễn Văn A",
            "soDTNguoiNhan": "0123456789",
            "email": "abc@gmail.com",
            "diaChiGiaoHang": "abc",
            "ghiChu": null,
            "phiGiaoHang": 10000.0,
            "trangThai": "Đã hủy",
            "ngayDat": "2025-01-01",
            "tongTien": 200000.0,
            "quanHuyen": {
                "maQuanHuyen": 1,
                "tenQuanHuyen": "Quận Ba Đình",
                "tinh": {
                    "maTinh": 1,
                    "tenTinh": "Thành phố Hà Nội"
                }
            },
            "phuongThucThanhToan": {
                "maPTTT": 1,
                "tenPTTT": "1"
            },
            "nhanVien": {
                "maNV": 1,
                "tenDangNhap": "nhanvien1",
                "matKhau": "$2a$10$JrlEkg4zlMozLKgE9Mq6yeoxZoNxD5hxwL3pArRDavZOazAKvMZh2",
                "hoTen": "Nhân Viên 1",
                "soCCCD": "0123456781",
                "roles": [
                    "STAFF",
                    "USER"
                ]
            },
            "giamGia": {
                "maGiamGia": 1,
                "ngayBatDau": "2025-01-01",
                "ngayKetThuc": "2026-01-01",
                "chietKhau": 1.0,
                "moTa": "",
                "donHangToiThieu": 2000.0,
                "sachGiamGiaList": []
            },
            "chiTietDonHangList": []
        },
        {
            "maDonHang": 124,
            "tenNguoiNhan": "Nguyễn Văn A",
            "soDTNguoiNhan": "0123456789",
            "email": "abc@gmail.com",
            "diaChiGiaoHang": "abc",
            "ghiChu": null,
            "phiGiaoHang": 10000.0,
            "trangThai": "Đã giao",
            "ngayDat": "2025-01-01",
            "tongTien": 100000.0,
            "quanHuyen": {
                "maQuanHuyen": 1,
                "tenQuanHuyen": "Quận Ba Đình",
                "tinh": {
                    "maTinh": 1,
                    "tenTinh": "Thành phố Hà Nội"
                }
            },
            "phuongThucThanhToan": {
                "maPTTT": 1,
                "tenPTTT": "1"
            },
            "nhanVien": {
                "maNV": 1,
                "tenDangNhap": "nhanvien1",
                "matKhau": "$2a$10$JrlEkg4zlMozLKgE9Mq6yeoxZoNxD5hxwL3pArRDavZOazAKvMZh2",
                "hoTen": "Nhân Viên 1",
                "soCCCD": "0123456781",
                "roles": [
                    "STAFF",
                    "USER"
                ]
            },
            "giamGia": {
                "maGiamGia": 1,
                "ngayBatDau": "2025-01-01",
                "ngayKetThuc": "2026-01-01",
                "chietKhau": 1.0,
                "moTa": "",
                "donHangToiThieu": 2000.0,
                "sachGiamGiaList": []
            },
            "chiTietDonHangList": []
        },
        {
            "maDonHang": 125,
            "tenNguoiNhan": "Nguyễn Văn B",
            "soDTNguoiNhan": "0123456789",
            "email": "abc@gmail.com",
            "diaChiGiaoHang": "abc",
            "ghiChu": null,
            "phiGiaoHang": 10000.0,
            "trangThai": "Trả hàng",
            "ngayDat": "2025-01-01",
            "tongTien": 200000.0,
            "quanHuyen": {
                "maQuanHuyen": 1,
                "tenQuanHuyen": "Quận Ba Đình",
                "tinh": {
                    "maTinh": 1,
                    "tenTinh": "Thành phố Hà Nội"
                }
            },
            "phuongThucThanhToan": {
                "maPTTT": 1,
                "tenPTTT": "1"
            },
            "nhanVien": {
                "maNV": 1,
                "tenDangNhap": "nhanvien1",
                "matKhau": "$2a$10$JrlEkg4zlMozLKgE9Mq6yeoxZoNxD5hxwL3pArRDavZOazAKvMZh2",
                "hoTen": "Nhân Viên 1",
                "soCCCD": "0123456781",
                "roles": [
                    "STAFF",
                    "USER"
                ]
            },
            "giamGia": {
                "maGiamGia": 1,
                "ngayBatDau": "2025-01-01",
                "ngayKetThuc": "2026-01-01",
                "chietKhau": 1.0,
                "moTa": "",
                "donHangToiThieu": 2000.0,
                "sachGiamGiaList": []
            },
            "chiTietDonHangList": []
        },
        {
            "maDonHang": 126,
            "tenNguoiNhan": "Nguyễn Văn C",
            "soDTNguoiNhan": "0123456789",
            "email": "abc@gmail.com",
            "diaChiGiaoHang": "abc",
            "ghiChu": null,
            "phiGiaoHang": 10000.0,
            "trangThai": "Đang giao",
            "ngayDat": "2025-01-01",
            "tongTien": 200000.0,
            "quanHuyen": {
                "maQuanHuyen": 1,
                "tenQuanHuyen": "Quận Ba Đình",
                "tinh": {
                    "maTinh": 1,
                    "tenTinh": "Thành phố Hà Nội"
                }
            },
            "phuongThucThanhToan": {
                "maPTTT": 1,
                "tenPTTT": "1"
            },
            "nhanVien": {
                "maNV": 1,
                "tenDangNhap": "nhanvien1",
                "matKhau": "$2a$10$JrlEkg4zlMozLKgE9Mq6yeoxZoNxD5hxwL3pArRDavZOazAKvMZh2",
                "hoTen": "Nhân Viên 1",
                "soCCCD": "0123456781",
                "roles": [
                    "STAFF",
                    "USER"
                ]
            },
            "giamGia": {
                "maGiamGia": 1,
                "ngayBatDau": "2025-01-01",
                "ngayKetThuc": "2026-01-01",
                "chietKhau": 1.0,
                "moTa": "",
                "donHangToiThieu": 2000.0,
                "sachGiamGiaList": []
            },
            "chiTietDonHangList": []
        },
        {
            "maDonHang": 127,
            "tenNguoiNhan": "Nguyễn Văn D",
            "soDTNguoiNhan": "0123456789",
            "email": "abc@gmail.com",
            "diaChiGiaoHang": "abc",
            "ghiChu": null,
            "phiGiaoHang": 10000.0,
            "trangThai": "Chờ xác nhận",
            "ngayDat": "2025-01-01",
            "tongTien": 200000.0,
            "quanHuyen": {
                "maQuanHuyen": 1,
                "tenQuanHuyen": "Quận Ba Đình",
                "tinh": {
                    "maTinh": 1,
                    "tenTinh": "Thành phố Hà Nội"
                }
            },
            "phuongThucThanhToan": {
                "maPTTT": 1,
                "tenPTTT": "1"
            },
            "nhanVien": {
                "maNV": 1,
                "tenDangNhap": "nhanvien1",
                "matKhau": "$2a$10$JrlEkg4zlMozLKgE9Mq6yeoxZoNxD5hxwL3pArRDavZOazAKvMZh2",
                "hoTen": "Nhân Viên 1",
                "soCCCD": "0123456781",
                "roles": [
                    "STAFF",
                    "USER"
                ]
            },
            "giamGia": {
                "maGiamGia": 1,
                "ngayBatDau": "2025-01-01",
                "ngayKetThuc": "2026-01-01",
                "chietKhau": 1.0,
                "moTa": "",
                "donHangToiThieu": 2000.0,
                "sachGiamGiaList": []
            },
            "chiTietDonHangList": []
        }
    ]
}*/


export const getDonHang = async (maDH) => {
    const res = await axiosInstance.get(`/don-hang/getDH/${maDH}`);
    return res.data;
};



export const updateTrangThaiDonHang = async (maDonHang, data) => {
    // data matches UpdateTrangThai body
    const res = await axiosInstance.put(`/don-hang/${maDonHang}/updateTT`, data);
    return res.data;
};

export const getDonHangOfKhachHang = async () => {
    const res = await axiosInstance.get("/don-hang/don_hang_of_KH");
    return res.data;
};
