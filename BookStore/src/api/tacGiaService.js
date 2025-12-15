import axiosInstance from "../auth/axiosInstance";


export const getListTacGia = async () => {
    const res = await axiosInstance.get("/tac-gia");
    return res.data;
};

/*
{
    "code": 0,
    "result": [
        {
            "maTG": 1,
            "tenTG": "Nguyễn Văn A"
        },
        {
            "maTG": 2,
            "tenTG": "Nguyễn Văn B"
        },
        {
            "maTG": 3,
            "tenTG": "Nguyễn Văn C"
        },
        {
            "maTG": 4,
            "tenTG": "Nguyễn Văn D"
        },
        {
            "maTG": 5,
            "tenTG": "Nguyễn Văn E"
        }
    ]
} */

export const getDetailTacGia = async ({ maTacGia }) => {
    const res = await axiosInstance.get(`/tac-gia/${maTacGia}`);
    return res.data;
};

/*
{
    "code": 0,
    "result": {
        "maTG": 2,
        "tenTG": "Nguyễn Văn B"
    }
} */

export const insertTacGia = async (data) => {
    const res = await axiosInstance.post("/tac-gia", data);
    return res.data;
};


export const updateTacGia = async ({ maTacGia, ...rest }) => {
    const res = await axiosInstance.put(`/tac-gia/${maTacGia}`, rest);
    return res.data;
};


export const deleteTacGia = async (maTacGia) => {
    const res = await axiosInstance.delete(`/tac-gia/${maTacGia}`);
    return res.data;
};

