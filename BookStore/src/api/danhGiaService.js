import axiosInstance from "../auth/axiosInstance";

export const getListDanhGia = async () => {
  const res = await axiosInstance.get("/danh_gia");
  return res.data;
};


/*{
    "code": 0,
    "result": [
        {
            "hoTen": "Khách Hàng 5",
            "tenSach": "Cuốn Sách Tiểu Thuyết 2",
            "soSao": 5,
            "binhLuan": "Sản phẩm rất tốt ",
            "ngayBL": "2025-01-01 00:00:00",
            "maDanhGia": 1
        },
        {
            "hoTen": null,
            "tenSach": "Cuốn Sách Tiểu Thuyết 4",
            "soSao": 4,
            "binhLuan": "Sản phẩm bị lỗi hình in ",
            "ngayBL": "2025-01-01 00:00:00",
            "maDanhGia": 2
        },
        {
            "hoTen": "Khách Hàng 2",
            "tenSach": "Cuốn Sách Tiểu Thuyết 6",
            "soSao": 3,
            "binhLuan": "Sản phẩm k hay không nên mua",
            "ngayBL": "2025-01-01 00:00:00",
            "maDanhGia": 3
        },
        {
            "hoTen": "Khách Hàng 5",
            "tenSach": "Cuốn Sách Tiểu Thuyết 10",
            "soSao": 2,
            "binhLuan": "Không nên mua sách này",
            "ngayBL": "2025-01-01 00:00:00",
            "maDanhGia": 4
        }
    ]
} */

export const getListDanhGiaByMaSach = async (maSach) => {
  const res = await axiosInstance.get(`/danh_gia/${maSach}`);

  return res.data;
};

/*
{
    "code": 0,
    "result": [
        {
            "hoTen": "Khách Hàng 5",
            "tenSach": "Cuốn Sách Tiểu Thuyết 2",
            "soSao": 5,
            "binhLuan": "Sản phẩm rất tốt ",
            "ngayBL": "2025-01-01 00:00:00",
            "maDanhGia": 1
        }
    ]
}
 */

export const insertListDanhGia = async (data) => {
  const res = await axiosInstance.post("/danh_gia", { ...data });
  return res.data;
};

export const deleteDanhGia = async (maDanhGia) => {
  const res = await axiosInstance.delete(`/danh_gia/${maDanhGia}`);
  return res.data;
};