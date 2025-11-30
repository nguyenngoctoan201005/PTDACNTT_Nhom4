import './QTV_Xemxoasach.css'
import { QTV_Nav } from '../../../../nav/QTV_Nav'
import { useState } from 'react'
export function QTV_Xemxoasach() {

    const [showXemSach, setShowXemSach] = useState(false)
    return (
        <>
            <QTV_Nav />
            <main className='qtv_trangqls_main'>
                <div className='qtv_trangqls_header'>
                    <div className='qtv_trangqls_header_tieude'>Quản lý sách</div>
                    <div className='qtv_trangqls_header_btn'>+ Thêm sách mới</div>
                </div>

                <div className='qtv_trangqls_noidung'>
                    <table className='qtv_trangqls_noidung_table'>
                        <tr className='qtv_trangqls_tr'>
                            <th className='qtv_trangqls_th qtv_qls_th1'>Tên sách</th>
                            <th className='qtv_trangqls_th qtv_qls_th2'>Giá</th>
                            <th className='qtv_trangqls_th qtv_qls_th3'>Tồn kho</th>
                            <th className='qtv_trangqls_th qtv_qls_th4'>Trạng thái</th>
                            <th className='qtv_trangqls_th qtv_qls_th5'>Thao tác</th>
                        </tr>
                        <tr className='qtv_trangqls_tr'>
                            <td className='qtv_trangqls_td qtv_qls_td1'>
                                <div className='qtv_trangqls_td_anh qtv_qls_td1_anh'>
                                    <img src="" alt="" />
                                </div>
                                <div>
                                    Tên sách
                                </div>
                            </td>
                            <td className='qtv_trangqls_td qtv_qls_td2'>100.000 VND</td>
                            <td className='qtv_trangqls_td qtv_qls_td3'>10</td>
                            <td className='qtv_trangqls_td qtv_qls_td4'>Còn hàng</td>
                            <td className='qtv_trangqls_td qtv_qls_td5'>
                                <svg onClick={() => setShowXemSach(true)} className='qtv_qls_td5_svg1' xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 472 384"><path fill="#3b82f7" d="M235 32q79 0 142.5 44.5T469 192q-28 71-91.5 115.5T235 352T92 307.5T0 192q28-71 92-115.5T235 32zm0 267q44 0 75-31.5t31-75.5t-31-75.5T235 85t-75.5 31.5T128 192t31.5 75.5T235 299zm-.5-171q26.5 0 45.5 18.5t19 45.5t-19 45.5t-45.5 18.5t-45-18.5T171 192t18.5-45.5t45-18.5z" /></svg>
                                <svg  className='qtv_qls_td5_svg2' xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 16 16"><path fill="#ef4444" d="M2 5v10c0 .55.45 1 1 1h9c.55 0 1-.45 1-1V5H2zm3 9H4V7h1v7zm2 0H6V7h1v7zm2 0H8V7h1v7zm2 0h-1V7h1v7zm2.25-12H10V.75A.753.753 0 0 0 9.25 0h-3.5A.753.753 0 0 0 5 .75V2H1.75a.752.752 0 0 0-.75.75V4h13V2.75a.752.752 0 0 0-.75-.75zM9 2H6v-.987h3V2z" /></svg>
                            </td>
                        </tr>


                    </table>
                </div>



                {showXemSach && (
                    <div className='qtv_trangqls_xem'>
                    <div className='qtv_trangqls_xem_tieude'>
                        <div>Chi tiết sách</div>
                        <svg onClick={() => setShowXemSach(false)} xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 8 8"><path fill="" d="M1.41 0L0 1.41l.72.72L2.5 3.94L.72 5.72L0 6.41l1.41 1.44l.72-.72l1.81-1.81l1.78 1.81l.69.72l1.44-1.44l-.72-.69l-1.81-1.78l1.81-1.81l.72-.72L6.41 0l-.69.72L3.94 2.5L2.13.72L1.41 0z" /></svg>
                    </div>
                    <hr className='qtv_trangqls_xem_hr' />

                    <div className='qtv_trangqls_xem_noidung'>
                        <div className='qtv_trangqls_xem_noidung_anh'>
                            <img src="" alt="" />
                        </div>

                        <div className='qtv_trangqls_xem_noidung_thongtin'>
                            <div className='qtv_trangqls_xem_noidung_thongtin_tensach'>Đắc nhân tâm</div>

                            <div className='xemsach_mota_cacdong qtv_trangqls_xem_noidung_thongtin_masach'>
                                <span className='xemsach_tieude'>Mã sách:</span> <span className='xemsach_giatri'>123456</span>
                            </div>

                            <div className='xemsach_mota_cacdong qtv_trangqls_xem_noidung_thongtin_tacgia'>
                                <span className='xemsach_tieude'>Tác giả:</span> <span className='xemsach_giatri'>Dale Carnegie</span>
                            </div>

                            <div className='xemsach_mota_cacdong qtv_trangqls_xem_noidung_thongtin_nxb'>
                                <span className='xemsach_tieude'>NXB:</span> <span className='xemsach_giatri'>FTC</span>
                            </div>

                            <div className='xemsach_mota_cacdong qtv_trangqls_xem_noidung_thongtin_theloai'>
                                <span className='xemsach_tieude'>Thể loại :</span> <span className='xemsach_giatri'>Kinh doanh</span>
                            </div>

                            <div className='xemsach_mota_cacdong qtv_trangqls_xem_noidung_thongtin_soluong'>
                                <span className='xemsach_tieude'>Số lượng:</span> <span className='xemsach_giatri'>10</span>
                            </div>

                            <div className='xemsach_mota_cacdong qtv_trangqls_xem_noidung_thongtin_gia'>
                                <span className='xemsach_tieude'>Giá:</span> <span className='xemsach_giatri_gia'>100.000 VND</span>
                            </div>

                            <div className='xemsach_mota_cacdong qtv_trangqls_xem_noidung_thongtin_mota'>
                                <span className='xemsach_tieude'>Mô tả:</span>
                                <div className='qtv_trangqls_xem_noidung_thongtin_mota_noidung'>
                                    Một trong những cuốn sách kinh điển nhất về nghệ thuật ứng xử, giao tiếp và thuyết phục người khác. Cuốn sách giúp bạn thành công hơn trong công việc và cuộc sống.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}

            </main>
        </>
    )
}
