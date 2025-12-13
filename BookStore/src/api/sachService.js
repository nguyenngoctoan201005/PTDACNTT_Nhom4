import axiosInstance from "../auth/axiosInstance";

export const getAllSachs = async (filter) => {
    // filter matches SachFilterRequest in backend
    const res = await axiosInstance.post("/sach/request-sach", filter);
    return res.data;
};

export const getSach = async (maSach) => {
    const res = await axiosInstance.get(`/sach/${maSach}`);
    return res.data;
};

export const searchSach = async (term) => {
    const res = await axiosInstance.get("/sach/search", {
        params: { term: term }
    });
    return res.data;
};

export const suggestSach = async (term) => {
    const res = await axiosInstance.get("/sach/suggest", {
        params: { term: term }
    });
    return res.data;
};

export const updateSach = async (maSach, data) => {
    const res = await axiosInstance.put(`/sach/${maSach}`, data);
    return res.data;
};

export const deleteSach = async (maSach) => {
    const res = await axiosInstance.delete(`/sach/${maSach}`);
    return res.data;
};
