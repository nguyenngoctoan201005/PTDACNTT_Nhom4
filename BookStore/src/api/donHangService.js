import axiosInstance from "../auth/axiosInstance";

export const insertDonHang = async (data) => {
    const res = await axiosInstance.post("/don-hang/createDH", { ...data });

    return res.data;
};

export const getDetailDonHang = async (maDonHang) => {
    const res = await axiosInstance.get(`/don-hang/getDH/${maDonHang}`);
    return res.data;
};

export const createDonHang = async (data) => {
    const res = await axiosInstance.post("/don-hang/createDH", data);
    return res.data;
};

export const getAllDonHang = async () => {
    const res = await axiosInstance.get("/don-hang/getALLDH");
    return res.data;
};


export const getDonHang = async (maDH) => {
    const res = await axiosInstance.get(`/don-hang/getDH/${maDH}`);
    return res.data;
};



export const updateTrangThaiDonHang = async (maDonHang, data) => {
    // data matches UpdateTrangThai body
    const res = await axiosInstance.put(`/don-hang/${maDonHang}/updateTT`, data);
    return res.data;
};

export const getDonHangOfKhachHang = async () => {
    const res = await axiosInstance.get("/don-hang/don_hang_of_KH");
    return res.data;
};
