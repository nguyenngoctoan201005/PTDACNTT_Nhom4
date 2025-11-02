import axiosProvince from "../auth/axiosProvince";

export const getListProvinces = async () => {
  const res = await axiosProvince.get("/p");
  return res.data;
};

export const getProvinceDetail = async (code, depth) => {
  const res = await axiosProvince.get(`/p/${code}`, {
    params: { depth },
  });
  return res.data;
};

export const getListWards = async () => {
  const res = await axiosProvince.get("/w");
  return res.data;
};

export const getWardDetail = async (code) => {
  const res = await axiosProvince.get(`/w/${code}`);
  return res.data;
};