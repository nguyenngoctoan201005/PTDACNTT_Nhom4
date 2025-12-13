import axiosInstance from "../auth/axiosInstance";

export const getListTheLoai = async (data) => {
  const res = await axiosInstance.get("/loai-sach", { ...data });

  return res.data;
};

export const getDetailTheLoai = async (data) => {
  const res = await axiosInstance.get(`/loai-sach/${data.maTheLoai}`, { ...data });

  return res.data;
};

export const insertTheLoai = async (data) => {
  const res = await axiosInstance.post("/loai-sach", { ...data });

  return res.data;
};

export const updateTheLoai = async (data) => {
  const res = await axiosInstance.put(`/loai-sach/${data.maTheLoai}`, { ...data });

  return res.data;
};

export const deleteTheLoai = async (maTheLoai) => {
  const res = await axiosInstance.delete(`/loai-sach/${maTheLoai}`);

  return res.data;
};
