import './NV_Quanlydanhgia.css'
import { NV_Nav } from '../../../nav/NV_Nav'
import { useState } from 'react'

export function NV_Quanlydanhgia() {
    const [show, setShow] = useState(false);
    return (
        <>
            <NV_Nav />
            <main className='nv_trangdgbl_main'>
                <div className="nv_trangdgbl_tieude">Quản lý đánh giá/bình luận</div>
                <hr style={{ border: '1px solid rgb(210, 206, 206)', width: '1150px', marginLeft: '25px', marginTop: '25px' }} />

                <div className="nv_trangdgbl_noidung">
                    <div className="nv_trangdgbl_noidung_tieude">Đánh giá bình luận từ khách hàng</div>
                    <table width="1150px" className='nv_qldg_table'>
                        <tr className='nv_qldg_tr'>
                            <th className='nv_qldg_th' style={{ borderRadius: '10px 0 0 10px' }}>Tên khách hàng</th>
                            <th className='nv_qldg_th'>Tên sách</th>
                            <th className='nv_qldg_th'>Đánh giá</th>
                            <th className='nv_qldg_th'>Bình luận</th>
                            <th className='nv_qldg_th'>Ngày đánh giá</th>
                            <th className='nv_qldg_th' style={{ borderRadius: '0px 10px 10px 0px' }}>Thao tác</th>
                        </tr>

                        <tr onClick={() => setShow(true)} className='nv_qldg_tr'>
                            <td className='nv_qldg_td'>Nguyễn Văn A</td>
                            <td className='nv_qldg_td'>Đắc Nhân Tâm</td>
                            <td className='nv_qldg_td'>5 sao</td>
                            <td className='nv_qldg_td'>Sách rất hay và bổ ích!</td>
                            <td className='nv_qldg_td'>2023-10-01</td>
                            <td className='nv_qldg_td'><button className="nv_trangdgbl_noidung_btnxoa">Xoá</button> <button className="nv_trangdgbl_noidung_btnan">Ẩn</button></td>
                        </tr>


                    </table>
                </div>


                {show && (<div className="nv_trangdgbl_chitietdanhgia">
                    <div className="nv_trangdgbl_chitietdanhgia_tieude">Chi tiết đánh giá
                        <svg onClick={() => setShow(false)} xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 8 8"><path fill="" d="M1.41 0L0 1.41l.72.72L2.5 3.94L.72 5.72L0 6.41l1.41 1.44l.72-.72l1.81-1.81l1.78 1.81l.69.72l1.44-1.44l-.72-.69l-1.81-1.78l1.81-1.81l.72-.72L6.41 0l-.69.72L3.94 2.5L2.13.72L1.41 0z" /></svg>

                    </div>
                    <hr style={{ border: '1px solid gainsboro' }} />
                    <div className="nv_trangdgbl_chitietdanhgia_noidung">
                        <div className="nv_trangdgbl_chitietdanhgia_tensach">Tên sách : Đắc nhân tâm </div>
                        <div className="nv_trangdgbl_chitietdanhgia_nhan">Mã đơn sách : S001</div>
                        <div className="nv_trangdgbl_chitietdanhgia_nhan">Ngày đánh giá : 19/10/2025</div>
                        <div className="nv_trangdgbl_chitietdanhgia_nhan">Khách hàng : Nguyễn Văn A </div>
                        <div className="nv_trangdgbl_chitietdanhgia_nhan">Mã khách hàng : KH01</div>
                        <div className="nv_trangdgbl_chitietdanhgia_nhan">Đánh giá : 5 sao</div>

                        <hr style={{ border: '1px solid gainsboro' }} />
                        <div className="nv_trangdgbl_chitietdanhgia_nhan">Bình luận :</div>
                        <div className="nv_trangdgbl_chitietdanhgia_binhluan">Sách rất hay và bổ ích cho tôi ! Sẽ mua tiếp tặng bạn bè</div>
                        <hr style={{ border: '1px solid gainsboro' }} />
                        <div className='nv_trangdgbl_chitietdanhgia_thao_tac'>Thao tác : <button className="nv_trangdgbl_noidung_btnxoa">Xoá</button> <button className="nv_trangdgbl_noidung_btnan">Ẩn</button></div>
                    </div>
                </div>
                )}
            </main>
        </>

    )
}