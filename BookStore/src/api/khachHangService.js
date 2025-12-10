import axiosInstance from "../auth/axiosInstance";

export const getListKhachHang = async (data) => {
  const res = await axiosInstance.get("/kh", { ...data });

  return res.data;
};

export const getDetailKhachHang = async (data) => {
  const res = await axiosInstance.get(`/kh/${data.maKhachHang}`, { ...data });

  return res.data;
};

export const insertKhachHang = async (data) => {
  const res = await axiosInstance.post("/kh", { ...data });

  return res.data;
};