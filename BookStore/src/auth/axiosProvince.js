import axios from "axios";

const axiosProvince = axios.create({
  baseURL: import.meta.env.VITE_PROVINCE_API || "https://provinces.open-api.vn/api/v2",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosProvince.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Province API Error:", error?.response || error);
    return Promise.reject(error);
  }
);

export default axiosProvince;
