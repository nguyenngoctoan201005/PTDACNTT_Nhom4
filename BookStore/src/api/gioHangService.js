import axiosInstance from "../auth/axiosInstance";

export const insertGioHang = async (data) => {
  const res = await axiosInstance.post("/kh/addGH", { ...data });

  return res.data;
};

export const updateSoLuongGioHang = async (data) => {
  const res = await axiosInstance.post("/kh/update-soluong", { ...data });

  return res.data;
};

export const deleteSachFromGioHang = async (data) => {
  const res = await axiosInstance.post("/kh/delete-GH", { ...data });

  return res.data;
};