import axiosInstance from "../auth/axiosInstance";

export const getGioHang = async (data) => {
  const res = await axiosInstance.get("/kh/GH_of_user", { ...data });

  return res.data;
};

export const insertGioHang = async (data) => {
  const res = await axiosInstance.post("/kh/addGH", { ...data });

  return res.data;
};

export const updateSoLuongGioHang = async (data) => {
  const res = await axiosInstance.put("/kh/update-soluong", { ...data });

  return res.data;
};

export const deleteSachFromGioHang = async (data) => {
  const res = await axiosInstance.delete(`/kh/delete-GH/${data.maSach}`);

  return res.data;
};