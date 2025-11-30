import './NV_Chitietdonhang.css'
import { NV_Nav } from '../../../nav/NV_Nav'
export function NV_Chitietdonhang() {
    return (

        <>
            <NV_Nav />
            <main className='nv_trangctdh_main'>
                <div className="nv_trangctdh_tieude">Chi tiết đơn hàng</div>
                <hr style={{ border: '1px solid rgb(210, 206, 206)', width: '1150px', marginLeft: '25px', marginTop: '25px' }} />

                <div className="nv_trangctdh_caco">
                    <div className="nv_trangctdh_caco_tieude">Chi tiết đơn hàng mã DH001</div>
                    <div className="nv_trangctdh_caco_nhan">Mã Đơn Hàng : DH001</div>
                    <div className="nv_trangctdh_caco_nhan">Ngày đặt : 28/9/2025</div>
                    <div className="nv_trangctdh_caco_nhan">Ghi chú : gói hàng cẩn th</div>
                    <div className='nv_trangctdh_caco_cntt'>
                        <span className="nv_trangctdh_caco_nhan">Cập nhật trạng thái : </span>
                        <select name="" id="">
                            <option value="cxn">Chờ xác nhận</option>
                            <option value="cxn">Chờ giao hàng</option>
                            <option value="cxn">Đang giao hàng</option>
                        </select>
                        <button className="nv_trangctdh_caco_button">Cập nhật</button>
                    </div>
                    <div className="nv_trangctdh_caco_trangthaidh">
                        <div style={{ borderRadius: '20px 0px 0px 20px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 15 15">
                                <path fill-rule="evenodd"
                                    d="M0 7.5a7.5 7.5 0 1 1 15 0a7.5 7.5 0 0 1-15 0Zm7.072 3.21l4.318-5.398l-.78-.624l-3.682 4.601L4.32 7.116l-.64.768l3.392 2.827Z"
                                    clip-rule="evenodd" />
                            </svg>



                        </div>

                        <div className="nv_trangctdh_caco_trangthaidh_noidungtrangthai" style={{ borderRadius: '0px 20px 20px 0px' }}>Đã giao hàng thành công</div>
                    </div>
                </div>

                <div className="nv_trangctdh_caco">
                    <div className="nv_trangctdh_caco_tieude">Sản phẩm đã chọn mua</div>
                    <table className='ctdh_tb'>
                        <tr>
                            <th className='ctdh_th ctdh_th1' >Sản phẩm</th>
                            <th className='ctdh_th ctdh_th2' >Đơn giá</th>
                            <th className='ctdh_th ctdh_th3' >Số lượng</th>
                            <th className='ctdh_th ctdh_th4' >Thành tiền</th>
                        </tr>
                        <tr>
                            <td className="ctdh_td nv_trangctdh_caco_sach">
                                <div className="nv_trangctdh_caco_sach_anh">
                                    <img src="../../img/sachtes.png" alt="" />
                                </div>
                                <div className="nv_trangctdh_caco_sach_ten">
                                    <div className="tensach">Tên sách .................</div>
                                </div>
                            </td>
                            <td className="ctdh_td nv_trangctdh_caco_sach_gia">50.000đ</td>
                            <td className="ctdh_td nv_trangctdh_caco_sach_sl">2</td>
                            <td className="ctdh_td nv_trangctdh_caco_sach_ttien">100.000đ</td>
                        </tr>

                        <tr>
                            <td className="ctdh_td nv_trangctdh_caco_sach">
                                <div className="nv_trangctdh_caco_sach_anh">
                                    <img src="../../img/sachtes.png" alt="" />
                                </div>
                                <div className="nv_trangctdh_caco_sach_ten">
                                    <div>Tên sách .................</div>
                                </div>
                            </td>
                            <td className="ctdh_td nv_trangctdh_caco_sach_gia">50.000đ</td>
                            <td className="ctdh_td nv_trangctdh_caco_sach_sl">2</td>
                            <td className="ctdh_td nv_trangctdh_caco_sach_ttien">100.000đ</td>
                        </tr>


                    </table>
                </div>

                <div className="nv_trangctdh_caco_ttkhachhangvathanhtoan">
                    <div className="nv_trangctdh_caco_ttkhachhangvathanhtoan_bang">
                        <div className="nv_trangctdh_caco_ttkhachhangvathanhtoan_bang_tieude">Thông tin khách hàng</div>
                        <div className="nv_trangctdh_caco_ttkhachhangvathanhtoan_bang_thongtin">
                            <div className="tenkh">Tên khách hàng : Phạm Hùng Minh</div>
                            <div className="ttkh">Điện thoại : 099999999</div>
                            <div className="ttkh">Email : abc@gmail.com</div>
                            <div className="ttkh">Địa chỉ : 123/4 abc, phường 5, quận 6, TP.HCM </div>
                        </div>
                    </div>

                    <div className="nv_trangctdh_caco_ttkhachhangvathanhtoan_bang">
                        <div className="nv_trangctdh_caco_ttkhachhangvathanhtoan_bang_tieude">Thông tin thanh toán</div>
                        <div className="nv_trangctdh_caco_ttkhachhangvathanhtoan_bang_thongtin">
                            <div style={{ marginBottom: '10px' }}>
                                <div className="thanhtoan_phuongthuc">Phương thức thanh toán : </div>
                                <div className="thanhtoan_phuongthuc_dulieu">Thanh toán khi nhận hàng</div>
                            </div>
                            <div>
                                <div className="thanhtoan_phuongthuc">Phương thức vận chuyển : </div>
                                <div className="thanhtoan_phuongthuc_dulieu">Vận chuyển tiêu chuẩn</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="nv_trangctdh_caco">
                    <div className="nv_trangctdh_caco_tieude">Tổng kết đơn hàng</div>
                    <div className="nv_trangctdh_caco_dongdulieu">
                        <div className="nv_trangctdh_caco_dongdulieu_thtin">
                            Tạm tính (4 sản phẩm)
                        </div>
                        <div className="nv_trangctdh_caco_dongdulieu_thtin">
                            200.000đ
                        </div>
                    </div>

                    <div className="nv_trangctdh_caco_dongdulieu">
                        <div className="nv_trangctdh_caco_dongdulieu_thtin">
                            Phí vận chuyển
                        </div>
                        <div className="nv_trangctdh_caco_dongdulieu_thtin">
                            30.000đ
                        </div>
                    </div>

                    <div className="nv_trangctdh_caco_dongdulieu">
                        <div className="nv_trangctdh_caco_dongdulieu_thtin">
                            Mã giảm giá (nếu có)
                        </div>
                        <div className="nv_trangctdh_caco_dongdulieu_thtin">
                            -20.000đ
                        </div>
                    </div>
                    <hr style={{ border: '1px solid rgb(210, 206, 206)', width: '1090px', marginLeft: '25px', marginTop: '10px' }} />

                    <div className="nv_trangctdh_caco_dongdulieu">
                        <div className="nv_trangctdh_caco_dongdulieu_thtin" style={{ fontWeight: '600', fontSize: '20px', color: 'red' }}>
                            Tổng cộng
                        </div>
                        <div className="nv_trangctdh_caco_dongdulieu_thtin" style={{ fontWeight: '600', fontSize: '20px', color: 'rgb(255, 0, 0)' }}>
                            210.000đ
                        </div>
                    </div>
                </div>
            </main>
        </>

    )
}