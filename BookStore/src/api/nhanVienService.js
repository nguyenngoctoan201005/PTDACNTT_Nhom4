import axiosInstance from "../auth/axiosInstance";

export const getListNhanVien = async (data) => {
  const res = await axiosInstance.get("/nv", { ...data });

  return res.data;
};

export const getDetailNhanVien = async (data) => {
  const res = await axiosInstance.get(`/nv/${data.maNhanVien}`, { ...data });

  return res.data;
};

export const insertNhanVien = async (data) => {
  const res = await axiosInstance.post("/nv", { ...data });

  return res.data;
};

export const updateNhanVien = async (data) => {
  const res = await axiosInstance.put(`/nv/${data.maNhanVien}`, { ...data });

  return res.data;
};

export const deleteNhanVien = async (maNhanVien) => {
  const res = await axiosInstance.delete(`/nv/${maNhanVien}`);

  return res.data;
};
