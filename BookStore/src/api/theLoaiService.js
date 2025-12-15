import axiosInstance from "../auth/axiosInstance";

export const getListTheLoai = async () => {
  const res = await axiosInstance.get("/loai-sach");
  return res.data;
};

/*
{
    "code": 0,
    "result": [
        {
            "maLoai": 1,
            "tenLoai": "Tiểu Thuyết",
            "moTa": "NVT dep trai co gi sai"
        },
        {
            "maLoai": 2,
            "tenLoai": "Kinh Doanh",
            "moTa": "NVT dep trai co gi sai"
        },
        {
            "maLoai": 3,
            "tenLoai": "Kinh Doanh",
            "moTa": "NVT dep trai co gi sai"
        },
        {
            "maLoai": 4,
            "tenLoai": "Kinh Doanh",
            "moTa": "NVT dep trai co gi sai"
        },
        {
            "maLoai": 5,
            "tenLoai": "Kinh Doanh",
            "moTa": "NVT dep trai co gi sai"
        }
    ]
} */

export const getDetailTheLoai = async ({ maLoai }) => {
  const res = await axiosInstance.get(`/loai-sach/${maLoai}`);
  return res.data;
};

/*
{
    "code": 0,
    "result": {
        "maLoai": 2,
        "tenLoai": "Kinh Doanh",
        "moTa": "NVT dep trai co gi sai"
    }
} */

export const insertTheLoai = async (data) => {
  const res = await axiosInstance.post("/loai-sach", data);
  return res.data;
};

export const updateTheLoai = async ({ maLoai, ...rest }) => {
  const res = await axiosInstance.put(`/loai-sach/${maLoai}`, rest);
  return res.data;
};


export const deleteTheLoai = async (maLoai) => {
  const res = await axiosInstance.delete(`/loai-sach/${maLoai}`);
  return res.data;
};