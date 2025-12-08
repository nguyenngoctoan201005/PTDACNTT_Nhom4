import './NV_Quanlydonhang.css'
import { NV_Nav } from '../../../nav/NV_Nav'
import { useState } from 'react'
export function NV_Quanlydonhang() {
    const [show, setShow] = useState(false)
    return (
        <>
            <NV_Nav />
            <main className="nv_trangqldh_main">
                <div className="nv_trangqldh_tieude">Quản lý đơn hàng</div>
                <hr style={{ border: '1px solid rgb(210, 206, 206)', width: '1150px', marginLeft: '25px', marginTop: '25px' }} />
                <div>
                    <table className='nv_qldh_table' width="1150px" height="50px">
                        <tr className='nv_qldh_tr'>
                            <th className='nv_qldh_th'>Mã đơn hàng</th>
                            <th className='nv_qldh_th'>Khách hàng</th>
                            <th className='nv_qldh_th'>Ngày đặt</th>
                            <th className='nv_qldh_th'>Trạng thái</th>
                            <th className='nv_qldh_th'>Tổng tiền</th>
                            <th className='nv_qldh_th'>Thao tác</th>
                        </tr>
                        <tr className='nv_qldh_tr'>
                            <td className="nv_qldh_td nv_trangqldh_madh">DH001</td>
                            <td className="nv_qldh_td nv_trangqldh_kh">Nguyễn Văn A</td>
                            <td className="nv_qldh_td nv_trangqldh_ngaydat">10/10/2024</td>
                            <td className="nv_qldh_td nv_qldh_td_trangthai"><div className="nv_qldh_td nv_trangqldh_trangthai">chờ xác nhận</div></td>
                            <td className="nv_qldh_td nv_trangqldh_tongtien">150.000đ</td>
                            <td className="nv_qldh_td nv_qldh_td_thao tac"><button onClick={() => setShow(true)} className="nv_qldh_td nv_trangqldh_button_xct">Xem chi tiết</button> <button className="nv_trangqldh_button_xn">Xác nhận</button></td>
                        </tr>

                        <tr className='nv_qldh_tr'>
                            <td className="nv_qldh_td nv_trangqldh_madh">DH001</td>
                            <td className="nv_qldh_td nv_trangqldh_kh">Nguyễn Văn A</td>
                            <td className="nv_qldh_td nv_trangqldh_ngaydat">10/10/2024</td>
                            <td className="nv_qldh_td nv_qldh_td_trangthai"><div className="nv_qldh_td nv_trangqldh_trangthai" style={{ backgroundColor: '#d1fae5', color: 'green' }}>đã giao hàng</div></td>
                            <td className="nv_qldh_td nv_trangqldh_tongtien">150.000đ</td>
                            <td className="nv_qldh_td nv_qldh_td_thao tac"><button onClick={() => setShow(true)} className="nv_qldh_td nv_trangqldh_button_xct">Xem chi tiết</button></td>
                        </tr>

                        <tr className='nv_qldh_tr'>
                            <td className="nv_qldh_td nv_trangqldh_madh">DH001</td>
                            <td className="nv_qldh_td nv_trangqldh_kh">Nguyễn Văn A</td>
                            <td className="nv_qldh_td nv_trangqldh_ngaydat">10/10/2024</td>
                            <td className="nv_qldh_td nv_qldh_td_trangthai"><div className="nv_qldh_td nv_trangqldh_trangthai" style={{ backgroundColor: 'rgba(210, 87, 87, 0.8)', color: 'aliceblue' }}>đã hủy</div></td>
                            <td className="nv_qldh_td nv_trangqldh_tongtien">150.000đ</td>
                            <td className="nv_qldh_td nv_qldh_td_thao tac"><button onClick={() => setShow(true)} className="nv_qldh_td nv_trangqldh_button_xct">Xem chi tiết</button></td>
                        </tr>
                    </table>


                </div>



                {show && (
                    <div className='nv_qldh_ctdh'>
                        <div className='nv_qldh_ctdh_tieude'>Chi tiết đơn hàng
                            <svg onClick={() => setShow(false)} xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 8 8"><path fill="" d="M1.41 0L0 1.41l.72.72L2.5 3.94L.72 5.72L0 6.41l1.41 1.44l.72-.72l1.81-1.81l1.78 1.81l.69.72l1.44-1.44l-.72-.69l-1.81-1.78l1.81-1.81l.72-.72L6.41 0l-.69.72L3.94 2.5L2.13.72L1.41 0z" /></svg>
                        </div>

                        <div className='nv_qldh_ctdh_noidung'>
                            <div className='nv_qldh_ctdh_noidung_left'>
                                <div>
                                    <div className='nv_qldh_ctdh_noidung_tieude'>Thông tin khách hàng</div>
                                </div>
                                <div>
                                    <div className="nv_qldh_ctdh_noidung_ct">Tên :Nguyễn Văn A</div>
                                    <div className="nv_qldh_ctdh_noidung_ct">SĐT :0123456789</div>
                                    <div className="nv_qldh_ctdh_noidung_ct">Địa chỉ : 123 Đường ABC, Quận XYZ, TP.HCM</div>
                                </div>
                            </div>

                            <div className='nv_qldh_ctdh_noidung_right'>
                                <div>
                                    <div className='nv_qldh_ctdh_noidung_tieude'>Trạng thái đơn hàng</div>
                                </div>
                                <div className='nv_qldh_ctdh_noidung_right_ct'>
                                    <select name="" id="">
                                        <option value="">chờ xác nhận</option>
                                        <option value="">đã giao hàng</option>
                                        <option value="">đã hủy</option>
                                    </select>
                                    <button>Cập nhật</button>
                                </div>
                            </div>

                        </div>

                        <table className='nv_qldh_ctdh_table'>
                            <tr>
                                <th className="nv_qldh_ctdh_table_th1">Sản phẩm</th>
                                <th className="nv_qldh_ctdh_table_th2">Số lượng</th>
                                <th className="nv_qldh_ctdh_table_th3">Đơn giá</th>
                                <th className="nv_qldh_ctdh_table_th4">Thành tiền</th>
                            </tr>
                            <tr className='nv_qldh_ctdh_table_tr'>
                                <td className='nv_qldh_ctdh_table_td'>Sách marketing</td>
                                <td className='nv_qldh_ctdh_table_td'>1</td>
                                <td className='nv_qldh_ctdh_table_td'>100.000đ</td>
                                <td className='nv_qldh_ctdh_table_td'>100.000đ</td>
                            </tr>
                            <tr className='nv_qldh_ctdh_table_tr'>
                                <td className='nv_qldh_ctdh_table_td'>Sách marketing</td>
                                <td className='nv_qldh_ctdh_table_td'>1</td>
                                <td className='nv_qldh_ctdh_table_td'>100.000đ</td>
                                <td className='nv_qldh_ctdh_table_td'>100.000đ</td>
                            </tr>
                        </table>

                    </div>

                )}
            </main>
        </>

    )
}