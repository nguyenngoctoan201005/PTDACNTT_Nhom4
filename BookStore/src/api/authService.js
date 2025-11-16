import axiosInstance from "../auth/axiosInstance";

export const login = async (data) => {
  const res = await axiosInstance.post("/auth/token", {
    userName: data.userName,
    matKhau: data.matKhau,
  });

  return res.data;
};

export const getUserInfo = async (data) => {
  const res = await axiosInstance.get("/kh/myInfo", { ...data });
  return res.data;
};

export const register = async (data) => {
  const response = await axiosInstance.post("/kh", { 
    hoTen: data.hoTen,
    userName: data.userName,
    matKhau: data.matKhau,
    email: data.email,
    soDT: data.soDT,
    diaChi: data.diaChi,
    maQuanHuyen: data.maQuanHuyen
  });
  return response.data;
};