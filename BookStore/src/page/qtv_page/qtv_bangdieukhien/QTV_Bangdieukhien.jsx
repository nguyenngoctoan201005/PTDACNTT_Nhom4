import {QTV_Nav} from '../../../nav/QTV_Nav.jsx'
import './QTV_Bangdieukhien.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
export function QTV_Bangdieukhien() {

    
    return (
        <>
            <QTV_Nav />
            <main className='qtv_trangbdk_main'>
                <div className='qtv_trangbdk_tieude'>Bảng điều khiển</div>
                <div className='qtv_trangbdk_noidung'>
                    <div className='qtv_trangbdk_noidung_tang1'>

                        <div className='bdkcaco qtv_trangbdk_noidung_othu1'>
                            <div className='bdkcaco_tieude qtv_trangbdk_noidung_othu1_tieude'>
                                <div className='bdkcaco_tieude_text qtv_trangbdk_noidung_othu1_tieude_text'>
                                    DOANH THU
                                </div>
                                <div className='bdkcaco_tieude_icon qtv_trangbdk_noidung_othu1_tieude_icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 32 32"><path fill="rgb(34 197 94)" d="M16 1.466C7.973 1.466 1.466 7.973 1.466 16c0 8.027 6.507 14.534 14.534 14.534c8.027 0 14.534-6.507 14.534-14.534c0-8.027-6.507-14.534-14.534-14.534zm1.255 22.414v2.047h-1.958v-2.024c-3.213-.44-4.62-3.08-4.62-3.08l2-1.673s1.277 2.223 3.587 2.223c1.276 0 2.244-.683 2.244-1.85c0-2.728-7.35-2.397-7.35-7.458c0-2.2 1.74-3.785 4.138-4.16V5.86h1.958v2.045c1.672.22 3.652 1.1 3.652 2.993v1.452H18.31v-.704c0-.726-.925-1.21-1.96-1.21c-1.32 0-2.287.66-2.287 1.584c0 2.794 7.35 2.112 7.35 7.415c0 2.18-1.628 4.07-4.158 4.445z" /></svg>
                                </div>
                            </div>



                            <div className='bdkcaco_dlchinh qtv_trangbdk_noidung_othu1_dlchinh'>
                                <div className='bdkcaco_dlchinh_tieude qtv_trangbdk_noidung_othu1_dlchinh_tieude'>
                                    TỔNG DOANH THU
                                </div>
                                <div className='bdkcaco_dlchinh_giatri qtv_trangbdk_noidung_othu1_dlchinh_giatri'>
                                    1.234 tỷ VNĐ
                                </div>
                            </div>

                            <hr className='qtv_trangbd_hr1' />


                            <div className='bdkcaco_dltop qtv_trangbdk_noidung_othu1_dltop'>
                                <div className='bdkcaco_dltop_tieude qtv_trangbdk_noidung_othu1_dltop_tieude'>Top 5 sách bán chạy nhất :</div>
                                <div className='bdkcaco_dltop_dl qtv_trangbdk_noidung_othu1_dltop_dl'>
                                    <div className='bdkcaco_dltop_dl_giatri qtv_trangbdk_noidung_othu1_dltop_dl_giatri toro_bgr1'>
                                        <div className='bdkcaco_dltop_dl_giatri1 qtv_trangbdk_noidung_othu1_dltop_dl_giatri1 toro_ten1'>1.Đắc nhân tâm</div>
                                        <div className='bdkcaco_dltop_dl_giatri2 qtv_trangbdk_noidung_othu1_dltop_dl_giatri2 toro_sl1'>1200</div>
                                    </div>

                                    <div className='bdkcaco_dltop_dl_giatri qtv_trangbdk_noidung_othu1_dltop_dl_giatri'>
                                        <div className='bdkcaco_dltop_dl_giatri1 qtv_trangbdk_noidung_othu1_dltop_dl_giatri1'>2.Đắc nhân tâm</div>
                                        <div className='bdkcaco_dltop_dl_giatri2 qtv_trangbdk_noidung_othu1_dltop_dl_giatri2'>1100</div>
                                    </div>

                                    <div className='bdkcaco_dltop_dl_giatri qtv_trangbdk_noidung_othu1_dltop_dl_giatri'>
                                        <div className='bdkcaco_dltop_dl_giatri1 qtv_trangbdk_noidung_othu1_dltop_dl_giatri1'>3.Đắc nhân tâm</div>
                                        <div className='bdkcaco_dltop_dl_giatri2 qtv_trangbdk_noidung_othu1_dltop_dl_giatri2'>1100</div>
                                    </div>

                                    <div className='bdkcaco_dltop_dl_giatri qtv_trangbdk_noidung_othu1_dltop_dl_giatri'>
                                        <div className='bdkcaco_dltop_dl_giatri1 qtv_trangbdk_noidung_othu1_dltop_dl_giatri1'>4.Đắc nhân tâm</div>
                                        <div className='bdkcaco_dltop_dl_giatri2 qtv_trangbdk_noidung_othu1_dltop_dl_giatri2'>1000</div>
                                    </div>

                                    <div className='bdkcaco_dltop_dl_giatri qtv_trangbdk_noidung_othu1_dltop_dl_giatri'>
                                        <div className='bdkcaco_dltop_dl_giatri1 qtv_trangbdk_noidung_othu1_dltop_dl_giatri1'>5.Đắc nhân tâm</div>
                                        <div className='bdkcaco_dltop_dl_giatri2 qtv_trangbdk_noidung_othu1_dltop_dl_giatri2'>1000</div>
                                    </div>
                                </div>
                            </div>

                            <div className='bdkcaco_ft qtv_trangbdk_noidung_othu1_ft'>
                                Đơn vị tính : cuốn sách
                            </div>


                        </div>







                        <div className='bdkcaco qtv_trangbdk_noidung_othu2'>
                            <div className='bdkcaco_tieude qtv_trangbdk_noidung_othu2_tieude'>
                                <div className='bdkcaco_tieude_text qtv_trangbdk_noidung_othu2_tieude_text'>
                                    ĐƠN HÀNG
                                </div>
                                <div className='bdkcaco_tieude_icon qtv_trangbdk_noidung_othu2_tieude_icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><path fill="rgb(59 130 246)" d="M7 14h2a1 1 0 0 0 0-2H7a1 1 0 0 0 0 2Zm6 2H7a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Zm6-14H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3Zm-5 2v3.29l-1.51-.84a1 1 0 0 0-1 0L10 7.29V4Zm6 15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3v5a1 1 0 0 0 .5.86a1 1 0 0 0 1 0L12 8.47l2.51 1.4A1 1 0 0 0 15 10a1 1 0 0 0 1-1V4h3a1 1 0 0 1 1 1Z" /></svg>
                                </div>
                            </div>



                            <div className='bdkcaco_dlchinh qtv_trangbdk_noidung_othu2_dlchinh'>
                                <div className='bdkcaco_dlchinh_tieude qtv_trangbdk_noidung_othu2_dlchinh_tieude'>
                                    TỔNG ĐƠN HÀNG
                                </div>
                                <div className='bdkcaco_dlchinh_giatri qtv_trangbdk_noidung_othu2_dlchinh_giatri'>
                                    1.234 đơn hàng
                                </div>
                            </div>

                            <hr className='qtv_trangbd_hr1' />

                            <div className='bdkcaco_dlphu qtv_trangbdk_noidung_othu2_dlphu'>
                                <div className='bdkcaco_dlphu1dong qtv_trangbdk_noidung_othu2_dlphu1'>
                                    <div className='bdkcaco_dlphu1dong_tieude qtv_trangbdk_noidung_othu2_dlphu_tieude'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 15 15"><path fill="rgb(22 163 74)" fill-rule="evenodd" d="M0 7.5a7.5 7.5 0 1 1 15 0a7.5 7.5 0 0 1-15 0Zm7.072 3.21l4.318-5.398l-.78-.624l-3.682 4.601L4.32 7.116l-.64.768l3.392 2.827Z" clip-rule="evenodd" /></svg>
                                        Hoàn thành
                                    </div>
                                    <div className='bdkcaco_dlphu1dong_giatri qtv_trangbdk_noidung_othu2_dlphu_giatri1'>
                                        1234
                                    </div>
                                </div>

                                <div className='bdkcaco_dlphu1dong qtv_trangbdk_noidung_othu2_dlphu1'>
                                    <div className='bdkcaco_dlphu1dong_tieude qtv_trangbdk_noidung_othu2_dlphu_tieude'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 1000 1000"><path fill="#DC2626" d="M1000 501q0 136-67 251T751 934t-251 67t-251-67T67 752T0 501t67-251T249 68T500 1t251 67t182 182t67 251zM661 733l71-71l-161-161l161-161l-71-71l-161 161l-161-161l-71 71l161 161l-161 161l71 71l161-161z" /></svg>                                        Đã hủy
                                    </div>
                                    <div className='bdkcaco_dlphu1dong_giatri qtv_trangbdk_noidung_othu2_dlphu_giatri2'>
                                        50
                                    </div>
                                </div>

                                <div className='bdkcaco_dlphu1dong qtv_trangbdk_noidung_othu2_dlphu1'>
                                    <div className='bdkcaco_dlphu1dong_tieude qtv_trangbdk_noidung_othu2_dlphu_tieude'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><mask id="ipSBack0"><path fill="#CA8A04" fill-rule="evenodd" stroke="#CA8A04" stroke-linejoin="round" stroke-width="4" d="M44 40.836c-4.893-5.973-9.238-9.362-13.036-10.168c-3.797-.805-7.412-.927-10.846-.365V41L4 23.545L20.118 7v10.167c6.349.05 11.746 2.328 16.192 6.833c4.445 4.505 7.009 10.117 7.69 16.836Z" clip-rule="evenodd" /></mask><path fill="#CA8A04" d="M0 0h48v48H0z" mask="url(#ipSBack0)" /></svg>                                        Yêu cầu trả hàng
                                    </div>
                                    <div className='bdkcaco_dlphu1dong_giatri qtv_trangbdk_noidung_othu2_dlphu_giatri3'>
                                        1234
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>






                    <div className='qtv_trangbdk_noidung_tang2'>

                        <div className='bdkcaco qtv_trangbdk_noidung_othu3'>
                            <div className='bdkcaco_tieude qtv_trangbdk_noidung_othu3_tieude'>
                                <div className='bdkcaco_tieude_text qtv_trangbdk_noidung_othu3_tieude_text'>
                                    TỒN KHO
                                </div>
                                <div className='bdkcaco_tieude_icon qtv_trangbdk_noidung_othu3_tieude_icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 20 20"><path fill="#EA580C" d="M10 2c4.42 0 8 3.58 8 8s-3.58 8-8 8s-8-3.58-8-8s3.58-8 8-8zm1.13 9.38l.35-6.46H8.52l.35 6.46h2.26zm-.09 3.36c.24-.23.37-.55.37-.96c0-.42-.12-.74-.36-.97s-.59-.35-1.06-.35s-.82.12-1.07.35s-.37.55-.37.97c0 .41.13.73.38.96c.26.23.61.34 1.06.34s.8-.11 1.05-.34z" /></svg>                                </div>
                            </div>



                            <div className='bdkcaco_dlchinh qtv_trangbdk_noidung_othu3_dlchinh'>
                                <div className='bdkcaco_dlchinh_tieude qtv_trangbdk_noidung_othu3_dlchinh_tieude'>
                                    TỒN KHO THẤP
                                </div>
                                <div className='bdkcaco_dlchinh_giatri qtv_trangbdk_noidung_othu3_dlchinh_giatri'>
                                    Nhà Giả Kim : 20 cuốn - KhoMB
                                </div>
                            </div>

                            <hr className='qtv_trangbd_hr1' />


                            <div className='bdkcaco_dltop qtv_trangbdk_noidung_othu3_dltop'>
                                <div className='bdkcaco_dltop_tieude qtv_trangbdk_noidung_othu3_dltop_tieude'>Top 5 sách tồn kho cao :</div>
                                <div className='bdkcaco_dltop_dl qtv_trangbdk_noidung_othu3_dltop_dl'>
                                    <div className='bdkcaco_dltop_dl_giatri qtv_trangbdk_noidung_othu3_dltop_dl_giatri toro_bgr2'>
                                        <div className='bdkcaco_dltop_dl_giatri1 qtv_trangbdk_noidung_othu3_dltop_dl_giatri1 toro_ten2'>1.Đắc nhân tâm</div>
                                        <div className='bdkcaco_dltop_dl_giatri2 qtv_trangbdk_noidung_othu3_dltop_dl_giatri2 toro_sl2'>1200</div>
                                    </div>

                                    <div className='bdkcaco_dltop_dl_giatri qtv_trangbdk_noidung_othu3_dltop_dl_giatri'>
                                        <div className='bdkcaco_dltop_dl_giatri1 qtv_trangbdk_noidung_othu3_dltop_dl_giatri1'>2.Đắc nhân tâm</div>
                                        <div className='bdkcaco_dltop_dl_giatri2 qtv_trangbdk_noidung_othu3_dltop_dl_giatri2'>1100</div>
                                    </div>

                                    <div className='bdkcaco_dltop_dl_giatri qtv_trangbdk_noidung_othu3_dltop_dl_giatri'>
                                        <div className='bdkcaco_dltop_dl_giatri1 qtv_trangbdk_noidung_othu3_dltop_dl_giatri1'>3.Đắc nhân tâm</div>
                                        <div className='bdkcaco_dltop_dl_giatri2 qtv_trangbdk_noidung_othu3_dltop_dl_giatri2'>1100</div>
                                    </div>

                                    <div className='bdkcaco_dltop_dl_giatri qtv_trangbdk_noidung_othu3_dltop_dl_giatri'>
                                        <div className='bdkcaco_dltop_dl_giatri1 qtv_trangbdk_noidung_othu3_dltop_dl_giatri1'>4.Đắc nhân tâm</div>
                                        <div className='bdkcaco_dltop_dl_giatri2 qtv_trangbdk_noidung_othu3_dltop_dl_giatri2'>1000</div>
                                    </div>

                                    <div className='bdkcaco_dltop_dl_giatri qtv_trangbdk_noidung_othu3_dltop_dl_giatri'>
                                        <div className='bdkcaco_dltop_dl_giatri1 qtv_trangbdk_noidung_othu3_dltop_dl_giatri1'>5.Đắc nhân tâm</div>
                                        <div className='bdkcaco_dltop_dl_giatri2 qtv_trangbdk_noidung_othu3_dltop_dl_giatri2'>1000</div>
                                    </div>
                                </div>
                            </div>

                            <div className='bdkcaco_ft qtv_trangbdk_noidung_othu3_ft'>
                                Đơn vị tính : cuốn sách
                            </div>


                        </div>







                        <div className='bdkcaco qtv_trangbdk_noidung_othu4'>
                            <div className='bdkcaco_tieude qtv_trangbdk_noidung_othu4_tieude'>
                                <div className='bdkcaco_tieude_text qtv_trangbdk_noidung_othu4_tieude_text'>
                                    KHÁCH HÀNG
                                </div>
                                <div className='bdkcaco_tieude_icon qtv_trangbdk_noidung_othu4_tieude_icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 344 384"><path fill="#9333EA" d="M170.5 192q-35.5 0-60.5-25t-25-60.5T110 46t60.5-25T231 46t25 60.5t-25 60.5t-60.5 25zm0 43q31.5 0 69.5 9t69.5 29.5T341 320v43H0v-43q0-26 31.5-46.5T101 244t69.5-9z" /></svg>                                </div>
                            </div>



                            <div className='bdkcaco_dlchinh qtv_trangbdk_noidung_othu4_dlchinh'>
                                <div className='bdkcaco_dlchinh_tieude qtv_trangbdk_noidung_othu4_dlchinh_tieude'>
                                    TỔNG KHÁCH HÀNG
                                </div>
                                <div className='bdkcaco_dlchinh_giatri qtv_trangbdk_noidung_othu4_dlchinh_giatri'>
                                    8050
                                </div>
                            </div>

                            <hr className='qtv_trangbd_hr1' />


                            <div className='bdkcaco_dltop qtv_trangbdk_noidung_othu4_dltop'>
                                <div className='bdkcaco_dltop_tieude qtv_trangbdk_noidung_othu4_dltop_tieude'>Top 5 khách hàng có chi tiêu cao nhất :</div>
                                <div className='bdkcaco_dltop_dl qtv_trangbdk_noidung_othu4_dltop_dl'>
                                    <div className='bdkcaco_dltop_dl_giatri qtv_trangbdk_noidung_othu4_dltop_dl_giatri toro_bgr2'>
                                        <div className='bdkcaco_dltop_dl_giatri1 qtv_trangbdk_noidung_othu4_dltop_dl_giatri1 toro_ten2'>1.Đắc nhân tâm</div>
                                        <div className='bdkcaco_dltop_dl_giatri2 qtv_trangbdk_noidung_othu4_dltop_dl_giatri2 toro_sl2'>1200</div>
                                    </div>

                                    <div className='bdkcaco_dltop_dl_giatri qtv_trangbdk_noidung_othu4_dltop_dl_giatri'>
                                        <div className='bdkcaco_dltop_dl_giatri1 qtv_trangbdk_noidung_othu4_dltop_dl_giatri1'>2.Đắc nhân tâm</div>
                                        <div className='bdkcaco_dltop_dl_giatri2 qtv_trangbdk_noidung_othu4_dltop_dl_giatri2'>1100</div>
                                    </div>

                                    <div className='bdkcaco_dltop_dl_giatri qtv_trangbdk_noidung_othu4_dltop_dl_giatri'>
                                        <div className='bdkcaco_dltop_dl_giatri1 qtv_trangbdk_noidung_othu4_dltop_dl_giatri1'>3.Đắc nhân tâm</div>
                                        <div className='bdkcaco_dltop_dl_giatri2 qtv_trangbdk_noidung_othu4_dltop_dl_giatri2'>1100</div>
                                    </div>

                                    <div className='bdkcaco_dltop_dl_giatri qtv_trangbdk_noidung_othu4_dltop_dl_giatri'>
                                        <div className='bdkcaco_dltop_dl_giatri1 qtv_trangbdk_noidung_othu4_dltop_dl_giatri1'>4.Đắc nhân tâm</div>
                                        <div className='bdkcaco_dltop_dl_giatri2 qtv_trangbdk_noidung_othu4_dltop_dl_giatri2'>1000</div>
                                    </div>

                                    <div className='bdkcaco_dltop_dl_giatri qtv_trangbdk_noidung_othu4_dltop_dl_giatri'>
                                        <div className='bdkcaco_dltop_dl_giatri1 qtv_trangbdk_noidung_othu4_dltop_dl_giatri1'>5.Đắc nhân tâm</div>
                                        <div className='bdkcaco_dltop_dl_giatri2 qtv_trangbdk_noidung_othu4_dltop_dl_giatri2'>1000</div>
                                    </div>
                                </div>
                            </div>

                            <div className='bdkcaco_ft qtv_trangbdk_noidung_othu4_ft'>
                                Đơn vị tính chi tiêu : Triệu VNĐ
                            </div>


                        </div>
                    </div>


                    <div className='qtv_trangbdk_noidung_tang3'>
                        <div className='qtv_trangbdk_noidung_tang3_box'>
                            <div className='qtv_trangbdk_noidung_tang3_tieude'>
                                Thống kê doanh thu theo tháng trong năm 2025
                            </div>
                            <div className='qtv_trangbdk_noidung_tang3_dulieu'>
                                Dữ liệu ở đây
                            </div>
                        </div>
                            
                    </div>

                </div>
            </main>

        </>

    )
}

