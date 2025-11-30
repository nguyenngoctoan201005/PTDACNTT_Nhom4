import './NV_Baotrisach.css'
import { NV_Nav } from '../../../nav/NV_Nav'
export function NV_Baotrisach() {
    return (
        <>
            <NV_Nav />
            <main className='nv_trangbts_main'>
                <div className="nv_trangbts_tieude">Bảo trì sách </div>
                <hr style={{ border: '1px solid rgb(210, 206, 206)', width: '1150px', marginLeft: '25px', marginTop: '25px' }} />


                <div className="nv_trangbts_noidung">
                    <div className="nv_trangbts_noidung_tieude">Thông tin sách</div>

                    <table className='nv_trangbts_noidung_table' width="1150px" height="50px">
                        <tr className="nv_trangbts_noidung_thongtinsach">
                            <th style={{ width: '70px' }} className='trangbts_th'>Mã sách</th>
                            <th style={{ width: '280px' }} className='trangbts_th'>Tên sách</th>
                            <th className='trangbts_th'>Tác giả</th>
                            <th className='trangbts_th'>Thể loại</th>
                            <th className='trangbts_th'>Giá bán</th>
                            <th style={{ width: '50px ' }} className='trangbts_th'>Tồn kho</th>
                            <th className='trangbts_th'>Thao tác</th>

                        </tr>

                        <tr>
                            <td className='trangbts_td'>S001</td>
                            <td className='trangbts_td'>Nhà giả kim</td>
                            <td className='trangbts_td'>Paulo Coelho</td>
                            <td className='trangbts_td'>Văn học</td>
                            <td className='trangbts_td'>120,000 VND</td>
                            <td className='trangbts_td'>50</td>
                            <td className='trangbts_td'><button className="nv_trangbts_noidung_button">Chỉnh sửa</button></td>
                        </tr>

                        <tr>
                            <td className='trangbts_td'>S001</td>
                            <td className='trangbts_td'>Nhà giả kim</td>
                            <td className='trangbts_td'>Paulo Coelho</td>
                            <td className='trangbts_td'>Văn học</td>
                            <td className='trangbts_td'>120,000 VND</td>
                            <td className='trangbts_td'>50</td>
                            <td className='trangbts_td'><button className="nv_trangbts_noidung_button">Chỉnh sửa</button></td>
                        </tr>

                        <tr>
                            <td className='trangbts_td'>S001</td>
                            <td className='trangbts_td'>Nhà giả kim</td>
                            <td className='trangbts_td'>Paulo Coelho</td>
                            <td className='trangbts_td'>Văn học</td>
                            <td className='trangbts_td'>120,000 VND</td>
                            <td className='trangbts_td'>50</td>
                            <td className='trangbts_td'><button className="nv_trangbts_noidung_button">Chỉnh sửa</button></td>
                        </tr>

                        <tr>
                            <td className='trangbts_td'>S001</td>
                            <td className='trangbts_td'>Nhà giả kim</td>
                            <td className='trangbts_td'>Paulo Coelho</td>
                            <td className='trangbts_td'>Văn học</td>
                            <td className='trangbts_td'>120,000 VND</td>
                            <td className='trangbts_td'>50</td>
                            <td className='trangbts_td'><button className="nv_trangbts_noidung_button">Chỉnh sửa</button></td>
                        </tr>

                        <tr>
                            <td className='trangbts_td'>S001</td>
                            <td className='trangbts_td'>Nhà giả kim</td>
                            <td className='trangbts_td'>Paulo Coelho</td>
                            <td className='trangbts_td'>Văn học</td>
                            <td className='trangbts_td'>120,000 VND</td>
                            <td className='trangbts_td'>50</td>
                            <td className='trangbts_td'><button className="nv_trangbts_noidung_button">Chỉnh sửa</button></td>
                        </tr>

                        <tr>
                            <td className='trangbts_td'>S001</td>
                            <td className='trangbts_td'>Nhà giả kim</td>
                            <td className='trangbts_td'>Paulo Coelho</td>
                            <td className='trangbts_td'>Văn học</td>
                            <td className='trangbts_td'>120,000 VND</td>
                            <td className='trangbts_td'>50</td>
                            <td className='trangbts_td'><button className="nv_trangbts_noidung_button">Chỉnh sửa</button></td>
                        </tr>
                    </table>
                </div>

            </main>
        </>
    )

}