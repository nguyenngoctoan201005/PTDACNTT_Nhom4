import axiosInstance from "../auth/axiosInstance";

export const insertDonHang = async (data) => {
    const res = await axiosInstance.post("/don-hang/createDH", { ...data });

    return res.data;
};

export const getDetailDonHang = async (data) => {
  const res = await axiosInstance.get(`/don-hang/getDH/${data.maDH}`, { ...data });

  return res.data;
};

export const getDonHangOfUser = async (data) => {
  const res = await axiosInstance.get(`/don-hang/don_hang_of_KH`, { ...data });

  return res.data;
};
