import axiosInstance from "../auth/axiosInstance";

export const getListProvinces = async () => {
  const res = await axiosInstance.get("/tinh");
  return res.data;
};

export const getListWards = async () => {
  const res = await axiosInstance.get("/quan-huyen");
  return res.data;
};
