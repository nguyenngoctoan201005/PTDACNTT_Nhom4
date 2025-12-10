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