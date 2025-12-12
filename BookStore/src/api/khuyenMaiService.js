import axiosInstance from "../auth/axiosInstance";

export const getListKhuyenMai = async (data) => {
  const res = await axiosInstance.get("/khuyen-mai", { ...data });

  return res.data;
};

export const getDetailKhuyenMai = async (data) => {
  const res = await axiosInstance.get(`/khuyen-mai/${data.maKhuyenMai}`, { ...data });

  return res.data;
};

export const insertKhuyenMai = async (data) => {
  const res = await axiosInstance.post("/khuyen-mai", { ...data });

  return res.data;
};

export const updateKhuyenMai = async (data) => {
  const res = await axiosInstance.put(`/khuyen-mai/${data.maKhuyenMai}`, { ...data });

  return res.data;
};

export const deleteKhuyenMai = async (maKhuyenMai) => {
  const res = await axiosInstance.delete(`/khuyen-mai/${maKhuyenMai}`);

  return res.data;
};
