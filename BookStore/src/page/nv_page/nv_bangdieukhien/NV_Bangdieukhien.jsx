import './NV_Bangdieukhien.css'
import { NV_Nav } from '../../../nav/NV_Nav'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

export function NV_Bangdieukhien() {



    return (
        <>
            <NV_Nav />
            <main className='nv_trangbdk_main'>
                <div className="nv_trangbdk_tieude">Bảng điều khiển</div>
                <hr style={{ border: '1px solid rgb(210, 206, 206)', width: '1200px', marginLeft: '25px', marginTop: '25px' }} />
                <div className="nv_trangbdk_noidung">

                    <div className='nv_trangbdk_noidung_tang1'>
                        <div className='nv_trangbdk_noidung_tang1_lf nv_trangbdk_noidung_tang1_ov'>
                            <div className='nv_trangbdk_noidung_tang1_lf_tieude nv_trangbdk_noidung_tang1_tieude'>
                                <div className='nv_trangbdk_noidung_tang1_lf_tieude_nd nv_trangbdk_noidung_tang1_tieude_nd'>Thống kê tổng quan</div>
                                <div className='nv_trangbdk_noidung_tang1_lf_tieude_ico'><svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="#000000"><g fill="none" stroke="#000000" stroke-width="1.5"><path d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z" /><path stroke-linecap="round" stroke-linejoin="round" d="m7 14l2.293-2.293a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 0 1.414 0L17 10m0 0v2.5m0-2.5h-2.5" /></g></svg></div>
                            </div>

                            <div className='nv_trangbdk_noidung_tang1_lf_cond'>
                                <div className='nv_trangbdk_noidung_tang1_lf_cond_1'>
                                    <div className='nv_trangbdk_noidung_tang1_lf_cond_1_ico'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="rgb(37 99 235)"><g fill="rgb(37 99 235)"><path d="M2.084 2.751a.75.75 0 0 1 .956-.459l.301.106c.617.217 1.14.401 1.553.603c.44.217.818.483 1.102.899c.282.412.399.865.452 1.362c.024.222.037.468.044.738H17.13c1.685 0 3.202 0 3.646.577c.444.577.27 1.447-.077 3.186l-.5 2.425c-.315 1.528-.472 2.293-1.024 2.742c-.552.45-1.332.45-2.893.45h-5.303c-2.79 0-4.184 0-5.05-.914c-.866-.914-.93-1.884-.93-4.826V7.038c0-.74 0-1.235-.042-1.615c-.04-.363-.109-.545-.2-.677c-.087-.129-.22-.25-.524-.398c-.323-.158-.762-.314-1.43-.549l-.26-.091a.75.75 0 0 1-.46-.957Z" opacity=".5" /><path d="M7.5 18a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3Zm9 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3Zm-.958-8.483a.75.75 0 1 0-1.086-1.034l-2.314 2.43l-.6-.63a.75.75 0 1 0-1.086 1.034l1.143 1.2a.75.75 0 0 0 1.086 0l2.857-3Z" /></g></svg>
                                    </div>
                                    <div className='nv_trangbdk_noidung_tang1_lf_cond_1_nd'>
                                        <div className='nv_trangbdk_noidung_tang1_lf_cond_1_nd_tieude'>Tổng đơn hàng</div>
                                        <div className='nv_trangbdk_noidung_tang1_lf_cond_1_nd_dulieu'>1,200</div>
                                    </div>
                                </div>

                                <div className='nv_trangbdk_noidung_tang1_lf_cond_1'>
                                    <div className='nv_trangbdk_noidung_tang1_lf_cond_2_ico'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="#16a34a"><g fill="#16a34a"><path d="M11.25 7.847c-.936.256-1.5.975-1.5 1.653s.564 1.397 1.5 1.652V7.848Zm1.5 5.001v3.304c.936-.255 1.5-.974 1.5-1.652c0-.678-.564-1.397-1.5-1.652Z" /><path fill-rule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10ZM12 5.25a.75.75 0 0 1 .75.75v.317c1.63.292 3 1.517 3 3.183a.75.75 0 0 1-1.5 0c0-.678-.564-1.397-1.5-1.653v3.47c1.63.292 3 1.517 3 3.183s-1.37 2.891-3 3.183V18a.75.75 0 0 1-1.5 0v-.317c-1.63-.292-3-1.517-3-3.183a.75.75 0 0 1 1.5 0c0 .678.564 1.397 1.5 1.652v-3.469c-1.63-.292-3-1.517-3-3.183s1.37-2.891 3-3.183V6a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" /></g></svg>
                                    </div>
                                    <div className='nv_trangbdk_noidung_tang1_lf_cond_1_nd'>
                                        <div className='nv_trangbdk_noidung_tang1_lf_cond_1_nd_tieude'>Tổng doanh thu</div>
                                        <div className='nv_trangbdk_noidung_tang1_lf_cond_1_nd_dulieu'>150.000.000</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='nv_trangbdk_noidung_tang1_rg nv_trangbdk_noidung_tang1_ov'>
                            <div className='nv_trangbdk_noidung_tang1_rg_tieude nv_trangbdk_noidung_tang1_tieude'>
                                <div className='nv_trangbdk_noidung_tang1_rg_tieude_nd nv_trangbdk_noidung_tang1_tieude_nd'>Thông báo đơn hàng mới</div>
                                <div className='nv_trangbdk_noidung_tang1_rg_tieude_thbao'>3 mới</div>
                            </div>

                            <div className='nv_trangbdk_noidung_tang1_rg_donhang'>
                                <div className='nv_trangbdk_noidung_tang1_rg_donhang_dulieu'>
                                    <div className='nv_trangbdk_noidung_tang1_rg_donhang_dulieu_madh'>Đơn hàng DH001</div>
                                    <div className='nv_trangbdk_noidung_tang1_rg_donhang_dulieu_thongtin'>Nguyễn Văn A - 2 sản phẩm</div>
                                </div>
                                <div className='nv_trangbdk_noidung_tang1_rg_donhang_dulieu_tongtien'>
                                    1.250.000đ
                                </div>
                            </div>

                            <div className='nv_trangbdk_noidung_tang1_rg_donhang'>
                                <div className='nv_trangbdk_noidung_tang1_rg_donhang_dulieu'>
                                    <div className='nv_trangbdk_noidung_tang1_rg_donhang_dulieu_madh'>Đơn hàng DH001</div>
                                    <div className='nv_trangbdk_noidung_tang1_rg_donhang_dulieu_thongtin'>Nguyễn Văn A - 2 sản phẩm</div>
                                </div>
                                <div className='nv_trangbdk_noidung_tang1_rg_donhang_dulieu_tongtien'>
                                    1.250.000đ
                                </div>
                            </div>

                            <div className='nv_trangbdk_noidung_tang1_rg_tbdonhang_ft'>
                                Xem tất cả đơn hàng
                            </div>

                        </div>
                    </div>




                    <div className='nv_trangbdk_noidung_tang2'>
                        <div className='nv_trangbdk_noidung_tang2_header'>
                            <div className='nv_trangbdk_noidung_tang2_header_tieude'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#B91C1C" fill-rule="evenodd" d="M3 10.417c0-3.198 0-4.797.378-5.335c.377-.537 1.88-1.052 4.887-2.081l.573-.196C10.405 2.268 11.188 2 12 2c.811 0 1.595.268 3.162.805l.573.196c3.007 1.029 4.51 1.544 4.887 2.081C21 5.62 21 7.22 21 10.417v1.574c0 5.638-4.239 8.375-6.899 9.536C13.38 21.842 13.02 22 12 22s-1.38-.158-2.101-.473C7.239 20.365 3 17.63 3 11.991v-1.574Zm9-3.167a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75ZM12 16a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z" clip-rule="evenodd" /></svg>
                                Cảnh báo tồn kho thấp
                            </div>
                            <div className='nv_trangbdk_noidung_tang2_header_tb'>9 sản phẩm</div>
                        </div>

                        <div className='nv_trangbdk_noidung_tang2_table'>
                            <table >
                                <tr className='nv_trangbdk_noidung_tang2_tr'>
                                    <th className='cbtk_th cbtk_th1'>Sản phẩm</th>
                                    <th className='cbtk_th cbtk_th2'>Mã sản phẩm </th>
                                    <th className='cbtk_th cbtk_th3'>Số lượng còn lại</th>
                                    <th className='cbtk_th cbtk_th4'>Hành động</th>
                                </tr>

                                <tr className='nv_trangbdk_noidung_tang2_tr'>
                                    <td className='cbtk_td cbtk_td1'>Đắc nhân tâm</td>
                                    <td className='cbtk_td cbtk_td2'>S001</td>
                                    <td className='cbtk_td cbtk_td3'>3</td>
                                    <td className='cbtk_td cbtk_td4'>Chỉnh sửa</td>
                                </tr>

                                <tr className='nv_trangbdk_noidung_tang2_tr'>
                                    <td className='cbtk_td cbtk_td1'>Đắc nhân tâm</td>
                                    <td className='cbtk_td cbtk_td2'>S001</td>
                                    <td className='cbtk_td cbtk_td3'>3</td>
                                    <td className='cbtk_td cbtk_td4'>Chỉnh sửa</td>
                                </tr>

                                <tr className='nv_trangbdk_noidung_tang2_tr'>
                                    <td className='cbtk_td cbtk_td1'>Đắc nhân tâm</td>
                                    <td className='cbtk_td cbtk_td2'>S001</td>
                                    <td className='cbtk_td cbtk_td3'>3</td>
                                    <td className='cbtk_td cbtk_td4'>Chỉnh sửa</td>
                                </tr>

                            </table>
                        </div>

                    </div>


                    <div className='nv_trangbdk_noidung_tang3'>
                        <div className='nv_trangbdk_noidung_tang3_lf'>
                            <div className='nv_trangbdk_noidung_tang3_lf_tieude'>
                                <div className='nv_trangbdk_noidung_tang3_lf_tieude_ndtt'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="none" stroke="rgb(194 65 12) " stroke-linecap="round" stroke-width="1.5" d="m13 15.232l6.097 4.46c1.302.897 2.903-.27 2.903-2.118V15m-9-6.232l6.097-4.46C20.399 3.411 22 4.578 22 6.426V11M6.63 7.708l3.71-2.438c1.193-.785 2.66.237 2.66 1.853v9.754c0 1.616-1.467 2.638-2.661 1.853L2.92 13.853c-1.228-.807-1.228-2.899 0-3.706l.928-.61" /></svg>
                                    Yêu cầu trả hàng
                                </div>
                                <div className='nv_trangbdk_noidung_tang3_lf_tieude_thbao'>
                                    9 yêu cầu
                                </div>

                            </div>
                            <div className='nv_trangbdk_noidung_tang3_lf_noidung'>
                                <div className='nv_trangbdk_noidung_tang3_lf_noidung_caco' >
                                    <div className='nv_trangbdk_noidung_tang3_lf_noidung_caco_dulieu1'>Đơn hàng : DH001</div>
                                    <div className='nv_trangbdk_noidung_tang3_lf_noidung_caco_dulieu2'>Lý do : Sách bị hư hỏng</div>
                                    <div className='nv_trangbdk_noidung_tang3_lf_noidung_caco_dulieu2'>Khách hàng : Nguyễn Thị A</div>
                                </div>

                                <div className='nv_trangbdk_noidung_tang3_lf_noidung_caco' >
                                    <div className='nv_trangbdk_noidung_tang3_lf_noidung_caco_dulieu1'>Đơn hàng : DH001</div>
                                    <div className='nv_trangbdk_noidung_tang3_lf_noidung_caco_dulieu2'>Lý do : Sách bị hư hỏng</div>
                                    <div className='nv_trangbdk_noidung_tang3_lf_noidung_caco_dulieu2'>Khách hàng : Nguyễn Thị A</div>
                                </div>

                                <div className='nv_trangbdk_noidung_tang3_lf_noidung_caco_ft'>
                                    Xem tất cả
                                </div>
                            </div>

                        </div>

                        <div className='nv_trangbdk_noidung_tang3_rg'>
                            <div className='nv_trangbdk_noidung_tang3_rg_tieude'>
                                <div className='nv_trangbdk_noidung_tang3_rg_tieude_ndtt'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none"><g clip-path="url(#solarSmartphoneUpdateBroken0)"><path stroke="#A16207" stroke-linecap="round" stroke-width="1.5" d="M20 10c0-3.771 0-5.657-1.172-6.828C17.765 2.109 16.114 2.01 13 2m7 12c0 3.771 0 5.657-1.172 6.828C17.657 22 15.771 22 12 22c-3.771 0-5.657 0-6.828-1.172C4 19.657 4 17.771 4 14v-2.999" /><path fill="#A16207" d="M2.73 4h-.75h.75Zm0 .8l-.554.506a.75.75 0 0 0 1.108 0L2.73 4.8Zm1.284-.294a.75.75 0 1 0-1.108-1.012l1.108 1.012Zm-1.46-1.012a.75.75 0 0 0-1.108 1.012l1.108-1.012ZM10.27 3.2l.554-.506a.75.75 0 0 0-1.108 0l.554.506Zm-1.284.294a.75.75 0 0 0 1.108 1.012L8.986 3.494Zm1.46 1.012a.75.75 0 0 0 1.108-1.012l-1.108 1.012Zm-5.87 1.8A.75.75 0 0 0 3.461 7.31l1.115-1.003ZM8.54 1.83A.75.75 0 0 0 9.71.892l-1.17.938ZM6.38-.75c-2.494 0-4.4 2.193-4.4 4.75h1.5c0-1.86 1.36-3.25 2.9-3.25v-1.5ZM1.981 4v.8h1.5V4h-1.5Zm1.303 1.306l.73-.8l-1.108-1.012l-.73.8l1.108 1.012Zm0-1.012l-.73-.8l-1.108 1.012l.73.8l1.108-1.012ZM6.62 8.75c2.494 0 4.4-2.193 4.4-4.75h-1.5c0 1.86-1.36 3.25-2.9 3.25v1.5ZM11.02 4v-.8h-1.5V4h1.5ZM9.717 2.694l-.73.8l1.108 1.012l.73-.8l-1.108-1.012Zm0 1.012l.73.8l1.108-1.012l-.73-.8l-1.108 1.012ZM3.46 7.309c.79.879 1.908 1.441 3.158 1.441v-1.5c-.785 0-1.509-.35-2.043-.944L3.461 7.31ZM9.71.892C8.914-.1 7.726-.75 6.381-.75v1.5c.843 0 1.617.404 2.159 1.08L9.71.892Z" /><path stroke="#A16207" stroke-linecap="round" stroke-width="1.5" d="M15 19H9" /></g><defs><clipPath id="solarSmartphoneUpdateBroken0"><path fill="#A16207" d="M0 0h24v24H0z" /></clipPath></defs></g></svg>
                                    Đơn hàng cần cập nhật trạng thái
                                </div>
                                <div className='nv_trangbdk_noidung_tang3_rg_tieude_thbao'>
                                    9 đơn hàng
                                </div>

                            </div>
                            <div className='nv_trangbdk_noidung_tang3_rg_noidung'>
                                <div className='nv_trangbdk_noidung_tang3_rg_noidung_caco' >
                                    <div className='nv_trangbdk_noidung_tang3_rg_noidung_caco_dulieu1'>Đơn hàng : DH001</div>
                                    <div className='nv_trangbdk_noidung_tang3_rg_noidung_caco_dulieu2'>Trạng thái : Chờ xác nhận</div>
                                    <div className='nv_trangbdk_noidung_tang3_rg_noidung_caco_dulieu2'>Khách hàng : Nguyễn Thị A</div>
                                </div>

                                <div className='nv_trangbdk_noidung_tang3_rg_noidung_caco' >
                                    <div className='nv_trangbdk_noidung_tang3_rg_noidung_caco_dulieu1'>Đơn hàng : DH001</div>
                                    <div className='nv_trangbdk_noidung_tang3_rg_noidung_caco_dulieu2'>Trạng thái : Chờ xác nhận</div>
                                    <div className='nv_trangbdk_noidung_tang3_rg_noidung_caco_dulieu2'>Khách hàng : Nguyễn Thị A</div>
                                </div>
                                <div className='nv_trangbdk_noidung_tang3_lf_noidung_caco_ft'>
                                    Xem tất cả
                                </div>
                            </div>

                        </div>

                    </div>


                    <div className='nv_trangbdk_noidung_tang4'>
                        <div className='nv_trangbdk_noidung_tang4_lf'>
                            <div className='nv_trangbdk_noidung_tang4_lf_tieude'>
                                <div className='nv_trangbdk_noidung_tang4_lf_tieude_ndtt'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#374151" d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182c.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506c-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452c-.347 0-.674.15-1.329.452l-.595.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882c.293-.941 1.523-1.22 3.983-1.776l.636-.144c.699-.158 1.048-.237 1.329-.45c.28-.213.46-.536.82-1.182l.328-.588Z" /></svg>
                                    Đánh giá mới
                                </div>
                                <div className='nv_trangbdk_noidung_tang4_lf_tieude_thbao'>
                                    9 đánh giá
                                </div>
                            </div>

                            <div className='nv_trangbdk_noidung_tang4_lf_noidung'>
                                <div className='nv_trangbdk_noidung_tang4_lf_noidung_caco' >
                                    <div className='nv_trangbdk_noidung_tang4_lf_noidung_caco_dulieu1'>Đơn hàng : DH001</div>
                                    <div className='nv_trangbdk_noidung_tang4_lf_noidung_caco_dulieu2'>Số sao : 5 sao</div>
                                    <div className='nv_trangbdk_noidung_tang4_lf_noidung_caco_dulieu2'>Khách hàng : Nguyễn Thị A</div>
                                </div>

                                <div className='nv_trangbdk_noidung_tang4_lf_noidung_caco' >
                                    <div className='nv_trangbdk_noidung_tang4_lf_noidung_caco_dulieu1'>Đơn hàng : DH001</div>
                                    <div className='nv_trangbdk_noidung_tang4_lf_noidung_caco_dulieu2'>Số sao : 5 sao</div>
                                    <div className='nv_trangbdk_noidung_tang4_lf_noidung_caco_dulieu2'>Khách hàng : Nguyễn Thị A</div>
                                </div>
                                <div className='nv_trangbdk_noidung_tang4_lf_noidung_caco_ft'>
                                    Xem tất cả
                                </div>
                            </div>
                        </div>


                        <div className='nv_trangbdk_noidung_tang4_rg'>
                            <div className='nv_trangbdk_noidung_tang4_rg_tieude'>
                                <div className='nv_trangbdk_noidung_tang4_rg_tieude_ndtt'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#000000"><g fill="#000000"><path fill-rule="evenodd" d="M4.727 2.712c.306-.299.734-.494 1.544-.6C7.105 2.002 8.209 2 9.793 2h4.414c1.584 0 2.688.002 3.522.112c.81.106 1.238.301 1.544.6c.305.3.504.72.613 1.513c.112.817.114 1.899.114 3.45v7.839H7.346c-.903 0-1.519-.001-2.047.138c-.472.124-.91.326-1.299.592V7.676c0-1.552.002-2.634.114-3.451c.109-.793.308-1.213.613-1.513Zm2.86 3.072a.82.82 0 0 0-.828.81c0 .448.37.811.827.811h8.828a.82.82 0 0 0 .827-.81a.82.82 0 0 0-.827-.811H7.586Zm-.828 4.594c0-.447.37-.81.827-.81h5.517a.82.82 0 0 1 .828.81a.82.82 0 0 1-.828.811H7.586a.82.82 0 0 1-.827-.81Z" clip-rule="evenodd" /><path d="M7.473 17.135c-1.079 0-1.456.007-1.746.083a2.464 2.464 0 0 0-1.697 1.538c.016.382.043.719.084 1.019c.109.793.308 1.213.613 1.513c.306.299.734.494 1.544.6c.834.11 1.938.112 3.522.112h4.414c1.584 0 2.688-.002 3.522-.111c.81-.107 1.238-.302 1.544-.601c.216-.213.38-.486.495-.91H7.586a.82.82 0 0 1-.827-.81c0-.448.37-.811.827-.811H19.97c.02-.466.027-1 .03-1.622H7.472Z" /></g></svg>                                    Sách mới thêm gần đây
                                </div>
                                <div className='nv_trangbdk_noidung_tang4_rg_tieude_thbao'>
                                    9 sách mới
                                </div>
                            </div>

                            <div className='nv_trangbdk_noidung_tang4_rg_noidung'>
                                <div className='nv_trangbdk_noidung_tang4_rg_noidung_caco' >
                                    <div className='nv_trangbdk_noidung_tang4_rg_noidung_caco_dulieu1'>Mã sách : DH001</div>
                                    <div className='nv_trangbdk_noidung_tang4_rg_noidung_caco_dulieu2'>Thể loại : Văn học</div>
                                    <div className='nv_trangbdk_noidung_tang4_rg_noidung_caco_dulieu2'>Số lượng : 50</div>
                                </div>

                                <div className='nv_trangbdk_noidung_tang4_rg_noidung_caco' >
                                    <div className='nv_trangbdk_noidung_tang4_rg_noidung_caco_dulieu1'>Mã sách : DH001</div>
                                    <div className='nv_trangbdk_noidung_tang4_rg_noidung_caco_dulieu2'>Thể loại : Văn học</div>
                                    <div className='nv_trangbdk_noidung_tang4_rg_noidung_caco_dulieu2'>Số lượng : 50</div>
                                </div>
                                <div className='nv_trangbdk_noidung_tang4_lf_noidung_caco_ft'>
                                    Xem tất cả
                                </div>
                            </div>
                        </div>



                    </div>










                </div>
            </main>
        </>

    )
}