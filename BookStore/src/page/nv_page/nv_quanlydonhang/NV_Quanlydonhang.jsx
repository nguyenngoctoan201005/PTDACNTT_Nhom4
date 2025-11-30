import './NV_Quanlydonhang.css'
import { NV_Nav } from '../../../nav/NV_Nav'
export function NV_Quanlydonhang() {
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
                            <td><div className="nv_qldh_td nv_trangqldh_trangthai">chờ xác nhận</div></td>
                            <td className="nv_qldh_td nv_trangqldh_tongtien">150.000đ</td>
                            <td><button className="nv_qldh_td nv_trangqldh_button_xct">Xem chi tiết</button> <button className="nv_trangqldh_button_xn">Xác nhận</button></td>
                        </tr>

                        <tr className='nv_qldh_tr'>
                            <td className="nv_qldh_td nv_trangqldh_madh">DH001</td>
                            <td className="nv_qldh_td nv_trangqldh_kh">Nguyễn Văn A</td>
                            <td className="nv_qldh_td nv_trangqldh_ngaydat">10/10/2024</td>
                            <td><div className="nv_qldh_td nv_trangqldh_trangthai" style={{ backgroundColor: '#d1fae5', color: 'green' }}>đã giao hàng</div></td>
                            <td className="nv_qldh_td nv_trangqldh_tongtien">150.000đ</td>
                            <td><button className="nv_qldh_td nv_trangqldh_button_xct">Xem chi tiết</button></td>
                        </tr>

                        <tr className='nv_qldh_tr'>
                            <td className="nv_qldh_td nv_trangqldh_madh">DH001</td>
                            <td className="nv_qldh_td nv_trangqldh_kh">Nguyễn Văn A</td>
                            <td className="nv_qldh_td nv_trangqldh_ngaydat">10/10/2024</td>
                            <td><div className="nv_qldh_td nv_trangqldh_trangthai" style={{ backgroundColor: 'rgba(210, 87, 87, 0.8)', color: 'aliceblue' }}>đã hủy</div></td>
                            <td className="nv_qldh_td nv_trangqldh_tongtien">150.000đ</td>
                            <td><button className="nv_qldh_td nv_trangqldh_button_xct">Xem chi tiết</button></td>
                        </tr>
                    </table>
                </div>
            </main>
        </>

    )
}