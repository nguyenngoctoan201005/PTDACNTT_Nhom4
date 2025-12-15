import axiosInstance from "../auth/axiosInstance";

export const getListKhuyenMai = async (data) => {
  const res = await axiosInstance.get("/giam-gia", { ...data });

  return res.data;
};

export const getDetailKhuyenMai = async (data) => {
  const res = await axiosInstance.get(`/giam-gia/${data.maGiamGia}`, { ...data });

  return res.data;
};

export const insertKhuyenMai = async (data) => {
  const res = await axiosInstance.post("/giam-gia", { ...data });

  return res.data;
};

export const updateKhuyenMai = async (data) => {
  const res = await axiosInstance.put(`/giam-gia/${data.maGiamGia}`, { ...data });

  return res.data;
};

export const deleteKhuyenMai = async (maGiamGia) => {
  const res = await axiosInstance.delete(`/giam-gia/${maGiamGia}`);

  return res.data;
};
