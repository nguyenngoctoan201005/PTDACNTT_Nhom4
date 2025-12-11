import axiosInstance from "../auth/axiosInstance";

export const getGioHang = async (data) => {
  const res = await axiosInstance.get("/gh/GH_of_user", { ...data });

  return res.data;
};

export const insertGioHang = async (data) => {
  const res = await axiosInstance.post("/gh/addGH", { ...data });

  return res.data;
};

export const updateSoLuongGioHang = async (data) => {
  const res = await axiosInstance.put("/gh/update-soluong", { ...data });

  return res.data;
};

export const deleteSachFromGioHang = async (data) => {
  const res = await axiosInstance.delete(`/gh/delete-GH/${data.maSach}`);

  return res.data;
};