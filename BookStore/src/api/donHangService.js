import axiosInstance from "../auth/axiosInstance";

export const insertDonHang = async (data) => {
  const res = await axiosInstance.post("/don-hang/createDH", { ...data });

  return res.data;
};

export const getDetailDonHang = async (data) => {
  const res = await axiosInstance.get(`/don-hang/getDH/${data.id}`, { ...data });

  return res.data;
};