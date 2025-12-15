import axiosInstance from "../auth/axiosInstance";

export const getListRequestSach = async (data) => {
  const res = await axiosInstance.post("/sach/request-sach", { ...data });

  return res.data;
};


export const searchSach = async (data) => {
  const res = await axiosInstance.get("/sach/search", { params: data });

  return res.data;
};

export const suggestSach = async (data) => {
  const res = await axiosInstance.get("/sach/suggest", { params: data });

  return res.data;
};

export const getSachDetail = async (data) => {
  const res = await axiosInstance.get(`/sach/${data.id}`, { ...data });

  return res.data;
};

// CRUD operations (might be mocked or not fully implemented on backend yet, but kept for admin logic)
export const insertSach = async (data) => {
  const res = await axiosInstance.post("/sach", data);
  return res.data;
};

export const updateSach = async (data) => {
  const res = await axiosInstance.put(`/sach/${data.maSach}`, data);
  return res.data;
};

export const deleteSach = async (maSach) => {
  const res = await axiosInstance.delete(`/sach/${maSach}`);
  return res.data;
};

export const getAllSachs = async (filter) => {
  // filter matches SachFilterRequest in backend
  const res = await axiosInstance.post("/sach/request-sach", filter);
  return res.data;
};

export const getSach = async (maSach) => {
  const res = await axiosInstance.get(`/sach/${maSach}`);
  return res.data;
};

/*
{
    "code": 0,
    "result": {
        "maSach": 2,
        "tenSach": "Cuốn Sách Tiểu Thuyết 2",
        "donGia": 102000.0,
        "donViTinh": "cuốn",
        "soLuongCo": 52,
        "khoHang": null,
        "moTa": "Đây là mô tả cho cuốn sách thứ 2",
        "loaiSach": {
            "maLoai": 1,
            "tenLoai": "Tiểu Thuyết",
            "moTa": "NVT dep trai co gi sai"
        },
        "nhaXuatBan": {
            "maNXB": 1,
            "tenNXB": "NXB Văn Học"
        },
        "tacGiaSet": []
    }
}
*/

export const getAllSach = async () => {
  const res = await axiosInstance.get("/sach");
  return res.data;
};

/*
{
    "code": 0,
    "message": "Lấy danh sách tất cả sách thành công",
    "result": [
        {
            "maSach": 1,
            "tenSach": "Cuốn Sách Tiểu Thuyết 1",
            "donGia": 101000.0,
            "donViTinh": "cuốn",
            "soLuongCo": 51,
            "khoHang": null,
            "moTa": "Đây là mô tả cho cuốn sách thứ 1",
            "loaiSach": {
                "maLoai": 1,
                "tenLoai": "Tiểu Thuyết",
                "moTa": "NVT dep trai co gi sai"
            },
            "nhaXuatBan": {
                "maNXB": 1,
                "tenNXB": "NXB Văn Học"
            },
            "tacGiaSet": []
        },
        {
            "maSach": 2,
            "tenSach": "Cuốn Sách Tiểu Thuyết 2",
            "donGia": 102000.0,
            "donViTinh": "cuốn",
            "soLuongCo": 52,
            "khoHang": null,
            "moTa": "Đây là mô tả cho cuốn sách thứ 2",
            "loaiSach": {
                "maLoai": 1,
                "tenLoai": "Tiểu Thuyết",
                "moTa": "NVT dep trai co gi sai"
            },
            "nhaXuatBan": {
                "maNXB": 1,
                "tenNXB": "NXB Văn Học"
            },
            "tacGiaSet": []
        },
        {
            "maSach": 3,
            "tenSach": "Cuốn Sách Tiểu Thuyết 3",
            "donGia": 103000.0,
            "donViTinh": "cuốn",
            "soLuongCo": 53,
            "khoHang": null,
            "moTa": "Đây là mô tả cho cuốn sách thứ 3",
            "loaiSach": {
                "maLoai": 1,
                "tenLoai": "Tiểu Thuyết",
                "moTa": "NVT dep trai co gi sai"
            },
            "nhaXuatBan": {
                "maNXB": 1,
                "tenNXB": "NXB Văn Học"
            },
            "tacGiaSet": []
        },
        {
            "maSach": 4,
            "tenSach": "Cuốn Sách Tiểu Thuyết 4",
            "donGia": 104000.0,
            "donViTinh": "cuốn",
            "soLuongCo": 54,
            "khoHang": null,
            "moTa": "Đây là mô tả cho cuốn sách thứ 4",
            "loaiSach": {
                "maLoai": 1,
                "tenLoai": "Tiểu Thuyết",
                "moTa": "NVT dep trai co gi sai"
            },
            "nhaXuatBan": {
                "maNXB": 1,
                "tenNXB": "NXB Văn Học"
            },
            "tacGiaSet": []
        },
        {
            "maSach": 5,
            "tenSach": "Cuốn Sách Tiểu Thuyết 5",
            "donGia": 105000.0,
            "donViTinh": "cuốn",
            "soLuongCo": 55,
            "khoHang": null,
            "moTa": "Đây là mô tả cho cuốn sách thứ 5",
            "loaiSach": {
                "maLoai": 1,
                "tenLoai": "Tiểu Thuyết",
                "moTa": "NVT dep trai co gi sai"
            },
            "nhaXuatBan": {
                "maNXB": 1,
                "tenNXB": "NXB Văn Học"
            },
            "tacGiaSet": []
        },
        {
            "maSach": 6,
            "tenSach": "Cuốn Sách Tiểu Thuyết 6",
            "donGia": 106000.0,
            "donViTinh": "cuốn",
            "soLuongCo": 56,
            "khoHang": null,
            "moTa": "Đây là mô tả cho cuốn sách thứ 6",
            "loaiSach": {
                "maLoai": 1,
                "tenLoai": "Tiểu Thuyết",
                "moTa": "NVT dep trai co gi sai"
            },
            "nhaXuatBan": {
                "maNXB": 1,
                "tenNXB": "NXB Văn Học"
            },
            "tacGiaSet": []
        },
        {
            "maSach": 7,
            "tenSach": "Cuốn Sách Tiểu Thuyết 7",
            "donGia": 107000.0,
            "donViTinh": "cuốn",
            "soLuongCo": 57,
            "khoHang": null,
            "moTa": "Đây là mô tả cho cuốn sách thứ 7",
            "loaiSach": {
                "maLoai": 1,
                "tenLoai": "Tiểu Thuyết",
                "moTa": "NVT dep trai co gi sai"
            },
            "nhaXuatBan": {
                "maNXB": 1,
                "tenNXB": "NXB Văn Học"
            },
            "tacGiaSet": []
        },
        {
            "maSach": 8,
            "tenSach": "Cuốn Sách Tiểu Thuyết 8",
            "donGia": 108000.0,
            "donViTinh": "cuốn",
            "soLuongCo": 58,
            "khoHang": null,
            "moTa": "Đây là mô tả cho cuốn sách thứ 8",
            "loaiSach": {
                "maLoai": 1,
                "tenLoai": "Tiểu Thuyết",
                "moTa": "NVT dep trai co gi sai"
            },
            "nhaXuatBan": {
                "maNXB": 1,
                "tenNXB": "NXB Văn Học"
            },
            "tacGiaSet": []
        },
        {
            "maSach": 9,
            "tenSach": "Cuốn Sách Tiểu Thuyết 9",
            "donGia": 109000.0,
            "donViTinh": "cuốn",
            "soLuongCo": 59,
            "khoHang": null,
            "moTa": "Đây là mô tả cho cuốn sách thứ 9",
            "loaiSach": {
                "maLoai": 1,
                "tenLoai": "Tiểu Thuyết",
                "moTa": "NVT dep trai co gi sai"
            },
            "nhaXuatBan": {
                "maNXB": 1,
                "tenNXB": "NXB Văn Học"
            },
            "tacGiaSet": []
        },
        {
            "maSach": 10,
            "tenSach": "Cuốn Sách Tiểu Thuyết 10",
            "donGia": 110000.0,
            "donViTinh": "cuốn",
            "soLuongCo": 60,
            "khoHang": null,
            "moTa": "Đây là mô tả cho cuốn sách thứ 10",
            "loaiSach": {
                "maLoai": 1,
                "tenLoai": "Tiểu Thuyết",
                "moTa": "NVT dep trai co gi sai"
            },
            "nhaXuatBan": {
                "maNXB": 1,
                "tenNXB": "NXB Văn Học"
            },
            "tacGiaSet": []
        }
    ]
}
*/