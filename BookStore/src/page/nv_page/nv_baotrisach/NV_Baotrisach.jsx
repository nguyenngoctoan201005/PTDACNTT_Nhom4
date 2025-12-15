import "./NV_Baotrisach.css";
import { NV_Nav } from "../../../nav/NV_Nav";
import { getAllSach, deleteSach } from "../../../api/sachService";
import { useState, useEffect } from "react";
import { Table, Button, Modal, Input, message } from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { useDebounce } from "../../../hooks/useDebounce";
import ModalSach from "./components/ModalSach";

export default function NV_Baotrisach() {
    const [sachList, setSachList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalState, setModalState] = useState({
        open: false,
        type: "create",
    });
    const [selectedSach, setSelectedSach] = useState(null);
    const [showModalDelete, setShowModalDelete] = useState(false);

    // Search
    const [searchText, setSearchText] = useState("");
    const debouncedSearchText = useDebounce(searchText, 500);

    const fetchSachList = async () => {
        try {
            setLoading(true);
            const res = await getAllSach();
            // Handle response structure variations defensively
            const data = res.result ? res.result : (Array.isArray(res) ? res : []);
            setSachList(data);
        } catch (error) {
            console.error("Error fetching sach list:", error);
            message.error("Lỗi khi tải danh sách sách");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSachList();
    }, []);

    const handleCreateSuccess = () => {
        fetchSachList();
    };

    const openCreateModal = () => {
        setModalState({ open: true, type: "create" });
        setSelectedSach(null);
    };

    const openEditModal = (sach) => {
        setModalState({ open: true, type: "update" });
        setSelectedSach(sach);
    };

    const closeModal = () => {
        setModalState((prev) => ({ ...prev, open: false }));
        setSelectedSach(null);
    };

    const handleDelete = async () => {
        try {
            await deleteSach(selectedSach.maSach);
            message.success("Xóa sách thành công");
            fetchSachList();
            setShowModalDelete(false);
            setSelectedSach(null);
        } catch (error) {
            console.error("Error deleting sach:", error);
            message.error("Lỗi khi xóa sách");
        }
    };

    const filteredData = sachList.filter((item) =>
        item.tenSach?.toLowerCase().includes(debouncedSearchText.toLowerCase())
    );

    const columns = [
        {
            title: "STT",
            key: "stt",
            render: (text, record, index) => index + 1,
            width: 60,
        },
        {
            title: "Mã sách",
            dataIndex: "maSach",
            key: "maSach",
            width: 100,
        },
        {
            title: "Tên sách",
            dataIndex: "tenSach",
            key: "tenSach",
        },
        {
            title: "Tác giả",
            dataIndex: "tacGiaSet", // Dùng trường tacGiaSet từ backend
            key: "tacGia",
            // Trích xuất tên tác giả từ mảng tacGiaSet
            render: (tacGiaSet) => {
                if (!tacGiaSet || tacGiaSet.length === 0) return "N/A";
                // Lấy tenTG của từng đối tượng và nối lại bằng dấu phẩy
                return tacGiaSet.map(tg => tg.tenTG).join(", ");
            },
        },

        {
            title: "Giá bán",
            dataIndex: "donGia", // Đổi từ "giaBan" sang "donGia"
            key: "giaBan",
            render: (val) => val ? val.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 0,
        },
        {
            title: "Tồn kho",
            dataIndex: "soLuongCo", // Đổi từ "soLuongTon" sang "soLuongCo"
            key: "soLuongTon",
            width: 100,
        },
        {
            title: "Thao tác",
            key: "action",
            width: 120,
            render: (_, record) => (
                <div className="flex gap-2 items-center">
                    {/* Using SVG from QTV_KhachHang template as requested or Button icons */}
                    <Button
                        onClick={() => openEditModal(record)}
                        type="text"
                        icon={<EditOutlined style={{ color: "blue" }} />}
                    />
                    <Button
                        onClick={() => {
                            setShowModalDelete(true);
                            setSelectedSach(record);
                        }}
                        type="text"
                        icon={<DeleteOutlined style={{ color: "red" }} />}
                    />
                </div>
            ),
        },
    ];

    return (
        <>
            <NV_Nav />
            <main className="nv_trangbts_main">
                <div className="nv_trangbts_tieude" style={{ padding: '20px 25px', fontSize: '24px', fontWeight: 'bold' }}>
                    <div className="flex justify-between items-center">
                        <span style={{ fontSize: '30px', fontWeight: 'bold' }}>Bảo trì sách</span>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={openCreateModal}
                        >
                            Thêm sách
                        </Button>
                    </div>
                </div>
                <hr
                    style={{
                        border: "1px solid rgb(210, 206, 206)",
                        width: "96%",
                        marginLeft: "2%",
                        marginTop: "0px",
                    }}
                />

                <div className="nv_trangbts_noidung" style={{ padding: '20px' }}>
                    <div className="flex flex-col md:flex-row gap-4 bg-white rounded-lg shadow-sm mb-4 items-center">
                        <Input
                            placeholder="Tìm kiếm theo tên sách..."
                            allowClear
                            enterButton
                            className="w-full md:w-96"
                            onChange={(e) => setSearchText(e.target.value)}
                            prefix={<SearchOutlined />}
                        />
                    </div>

                    <div className="bg-white rounded-lg shadow-sm">
                        <Table
                            columns={columns}
                            dataSource={filteredData}
                            loading={loading}
                            pagination={{
                                pageSize: 10,
                                showSizeChanger: true,
                                showQuickJumper: true,
                            }}
                            rowKey="maSach"
                        />
                    </div>
                </div>

                <ModalSach
                    open={modalState.open}
                    type={modalState.type}
                    dataEdit={selectedSach}
                    onCancel={closeModal}
                    onOk={handleCreateSuccess}
                />

                <Modal
                    title="Xóa sách"
                    open={showModalDelete}
                    onOk={handleDelete}
                    onCancel={() => {
                        setShowModalDelete(false);
                        setSelectedSach(null);
                    }}
                    okType="danger"
                >
                    <p>Bạn có chắc chắn muốn xóa sách <b>{selectedSach?.tenSach}</b>?</p>
                </Modal>

            </main>
        </>
    );
}