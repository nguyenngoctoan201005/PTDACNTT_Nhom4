import axiosInstance from "../auth/axiosInstance";

export const getListDanhGia = async (data) => {
  const res = await axiosInstance.get("/danh_gia", { ...data });

  return res.data;
};

export const getListDanhGiaByMaSach = async (data) => {
  const res = await axiosInstance.get(`/danh_gia/${data.maSach}`, { ...data });

  return res.data;
};

export const insertListDanhGia = async (data) => {
  const res = await axiosInstance.post("/danh_gia", { ...data });

  return res.data;
};