import './QTV_Quanlynhanvien.css'
import { QTV_Nav } from '../../../nav/QTV_Nav'

export function QTV_Quanlynhanvien() {
    return (
        <>
            <QTV_Nav />
            <main className='qtv_qlnhanvien_main'>
                <div className='qtv_qlnhanvien_tieude'>
                    <div className='qtv_qlnhanvien_tieude_tt'>
                        Quản Lý Nhân Viên
                    </div>
                    <div className='qtv_qlnhanvien_tieude_btn'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 32 32"><path fill="" d="M28.523 23.813c-.518-.51-6.795-2.938-7.934-3.396c-1.133-.45-1.585-1.697-1.585-1.697s-.51.282-.51-.51c0-.793.51.51 1.02-2.548c0 0 1.415-.397 1.134-3.68h-.34s.85-3.51 0-4.698c-.853-1.188-1.187-1.98-3.06-2.548c-1.87-.567-1.19-.454-2.548-.396c-1.36.057-2.492.793-2.492 1.188c0 0-.85.057-1.188.397c-.34.34-.906 1.924-.906 2.32s.283 3.06.566 3.624l-.337.11c-.283 3.284 1.132 3.682 1.132 3.682c.51 3.058 1.02 1.755 1.02 2.548c0 .792-.51.51-.51.51s-.453 1.246-1.585 1.697c-1.132.453-7.416 2.887-7.927 3.396c-.51.52-.453 2.896-.453 2.896h26.954s.063-2.378-.453-2.897zm-6.335 2.25h-4.562v-1.25h4.562v1.25z" /></svg>
                        + Thêm nhân viên
                    </div>
                </div>


                <div className='qtv_qlnhanvien_noidung'>
                    <table className='qtv_qlnhanvien_table'>
                        <tr className='qtv_qlnhanvien_table_tr'>
                            <th className='qtv_qlnv_th qtv_qlnhanvien_table_th1'>NHÂN VIÊN</th>
                            <th className='qtv_qlnv_th qtv_qlnhanvien_table_th2'>SỐ CCCD</th>
                            <th className='qtv_qlnv_th qtv_qlnhanvien_table_th3'>TÊN ĐĂNG NHẬP</th>
                            <th className='qtv_qlnv_th qtv_qlnhanvien_table_th4'>MẬT KHẨU</th>
                            <th className='qtv_qlnv_th qtv_qlnhanvien_table_th5'>THAO TÁC</th>
                        </tr>

                        <tr className='qtv_qlnhanvien_table_tr'>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td1'>Nguyễn Văn A</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td2'>00120000334</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td3'>nguyenvana##</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td4'>nguyenvana99</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td5'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 1025 1023"><path fill="#004cff" d="M896.428 1023h-768q-53 0-90.5-37.5T.428 895V127q0-53 37.5-90t90.5-37h576l-128 127h-384q-27 0-45.5 19t-18.5 45v640q0 27 19 45.5t45 18.5h640q27 0 45.5-18.5t18.5-45.5V447l128-128v576q0 53-37.5 90.5t-90.5 37.5zm-576-464l144 144l-208 64zm208 96l-160-159l479-480q17-16 40.5-16t40.5 16l79 80q16 16 16.5 39.5t-16.5 40.5z" /></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 16 16"><path fill="#ff0000" fill-rule="evenodd" d="M5.75 3V1.5h4.5V3h-4.5Zm-1.5 0V1a1 1 0 0 1 1-1h5.5a1 1 0 0 1 1 1v2h2.5a.75.75 0 0 1 0 1.5h-.365l-.743 9.653A2 2 0 0 1 11.148 16H4.852a2 2 0 0 1-1.994-1.847L2.115 4.5H1.75a.75.75 0 0 1 0-1.5h2.5Zm-.63 1.5h8.76l-.734 9.538a.5.5 0 0 1-.498.462H4.852a.5.5 0 0 1-.498-.462L3.62 4.5Z" clip-rule="evenodd" /></svg>
                            </td>
                        </tr>


                        <tr className='qtv_qlnhanvien_table_tr'>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td1'>Nguyễn Văn A</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td2'>00120000334</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td3'>nguyenvana##</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td4'>nguyenvana99</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td5'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 1025 1023"><path fill="#004cff" d="M896.428 1023h-768q-53 0-90.5-37.5T.428 895V127q0-53 37.5-90t90.5-37h576l-128 127h-384q-27 0-45.5 19t-18.5 45v640q0 27 19 45.5t45 18.5h640q27 0 45.5-18.5t18.5-45.5V447l128-128v576q0 53-37.5 90.5t-90.5 37.5zm-576-464l144 144l-208 64zm208 96l-160-159l479-480q17-16 40.5-16t40.5 16l79 80q16 16 16.5 39.5t-16.5 40.5z" /></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 16 16"><path fill="#ff0000" fill-rule="evenodd" d="M5.75 3V1.5h4.5V3h-4.5Zm-1.5 0V1a1 1 0 0 1 1-1h5.5a1 1 0 0 1 1 1v2h2.5a.75.75 0 0 1 0 1.5h-.365l-.743 9.653A2 2 0 0 1 11.148 16H4.852a2 2 0 0 1-1.994-1.847L2.115 4.5H1.75a.75.75 0 0 1 0-1.5h2.5Zm-.63 1.5h8.76l-.734 9.538a.5.5 0 0 1-.498.462H4.852a.5.5 0 0 1-.498-.462L3.62 4.5Z" clip-rule="evenodd" /></svg>
                            </td>
                        </tr>


                        <tr className='qtv_qlnhanvien_table_tr'>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td1'>Nguyễn Văn A</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td2'>00120000334</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td3'>nguyenvana##</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td4'>nguyenvana99</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td5'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 1025 1023"><path fill="#004cff" d="M896.428 1023h-768q-53 0-90.5-37.5T.428 895V127q0-53 37.5-90t90.5-37h576l-128 127h-384q-27 0-45.5 19t-18.5 45v640q0 27 19 45.5t45 18.5h640q27 0 45.5-18.5t18.5-45.5V447l128-128v576q0 53-37.5 90.5t-90.5 37.5zm-576-464l144 144l-208 64zm208 96l-160-159l479-480q17-16 40.5-16t40.5 16l79 80q16 16 16.5 39.5t-16.5 40.5z" /></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 16 16"><path fill="#ff0000" fill-rule="evenodd" d="M5.75 3V1.5h4.5V3h-4.5Zm-1.5 0V1a1 1 0 0 1 1-1h5.5a1 1 0 0 1 1 1v2h2.5a.75.75 0 0 1 0 1.5h-.365l-.743 9.653A2 2 0 0 1 11.148 16H4.852a2 2 0 0 1-1.994-1.847L2.115 4.5H1.75a.75.75 0 0 1 0-1.5h2.5Zm-.63 1.5h8.76l-.734 9.538a.5.5 0 0 1-.498.462H4.852a.5.5 0 0 1-.498-.462L3.62 4.5Z" clip-rule="evenodd" /></svg>
                            </td>
                        </tr>

                        <tr className='qtv_qlnhanvien_table_tr'>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td1'>Nguyễn Văn A</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td2'>00120000334</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td3'>nguyenvana##</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td4'>nguyenvana99</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td5'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 1025 1023"><path fill="#004cff" d="M896.428 1023h-768q-53 0-90.5-37.5T.428 895V127q0-53 37.5-90t90.5-37h576l-128 127h-384q-27 0-45.5 19t-18.5 45v640q0 27 19 45.5t45 18.5h640q27 0 45.5-18.5t18.5-45.5V447l128-128v576q0 53-37.5 90.5t-90.5 37.5zm-576-464l144 144l-208 64zm208 96l-160-159l479-480q17-16 40.5-16t40.5 16l79 80q16 16 16.5 39.5t-16.5 40.5z" /></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 16 16"><path fill="#ff0000" fill-rule="evenodd" d="M5.75 3V1.5h4.5V3h-4.5Zm-1.5 0V1a1 1 0 0 1 1-1h5.5a1 1 0 0 1 1 1v2h2.5a.75.75 0 0 1 0 1.5h-.365l-.743 9.653A2 2 0 0 1 11.148 16H4.852a2 2 0 0 1-1.994-1.847L2.115 4.5H1.75a.75.75 0 0 1 0-1.5h2.5Zm-.63 1.5h8.76l-.734 9.538a.5.5 0 0 1-.498.462H4.852a.5.5 0 0 1-.498-.462L3.62 4.5Z" clip-rule="evenodd" /></svg>
                            </td>
                        </tr>

                        <tr className='qtv_qlnhanvien_table_tr'>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td1'>Nguyễn Văn A</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td2'>00120000334</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td3'>nguyenvana##</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td4'>nguyenvana99</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td5'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 1025 1023"><path fill="#004cff" d="M896.428 1023h-768q-53 0-90.5-37.5T.428 895V127q0-53 37.5-90t90.5-37h576l-128 127h-384q-27 0-45.5 19t-18.5 45v640q0 27 19 45.5t45 18.5h640q27 0 45.5-18.5t18.5-45.5V447l128-128v576q0 53-37.5 90.5t-90.5 37.5zm-576-464l144 144l-208 64zm208 96l-160-159l479-480q17-16 40.5-16t40.5 16l79 80q16 16 16.5 39.5t-16.5 40.5z" /></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 16 16"><path fill="#ff0000" fill-rule="evenodd" d="M5.75 3V1.5h4.5V3h-4.5Zm-1.5 0V1a1 1 0 0 1 1-1h5.5a1 1 0 0 1 1 1v2h2.5a.75.75 0 0 1 0 1.5h-.365l-.743 9.653A2 2 0 0 1 11.148 16H4.852a2 2 0 0 1-1.994-1.847L2.115 4.5H1.75a.75.75 0 0 1 0-1.5h2.5Zm-.63 1.5h8.76l-.734 9.538a.5.5 0 0 1-.498.462H4.852a.5.5 0 0 1-.498-.462L3.62 4.5Z" clip-rule="evenodd" /></svg>
                            </td>
                        </tr>

                        <tr className='qtv_qlnhanvien_table_tr'>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td1'>Nguyễn Văn A</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td2'>00120000334</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td3'>nguyenvana##</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td4'>nguyenvana99</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td5'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 1025 1023"><path fill="#004cff" d="M896.428 1023h-768q-53 0-90.5-37.5T.428 895V127q0-53 37.5-90t90.5-37h576l-128 127h-384q-27 0-45.5 19t-18.5 45v640q0 27 19 45.5t45 18.5h640q27 0 45.5-18.5t18.5-45.5V447l128-128v576q0 53-37.5 90.5t-90.5 37.5zm-576-464l144 144l-208 64zm208 96l-160-159l479-480q17-16 40.5-16t40.5 16l79 80q16 16 16.5 39.5t-16.5 40.5z" /></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 16 16"><path fill="#ff0000" fill-rule="evenodd" d="M5.75 3V1.5h4.5V3h-4.5Zm-1.5 0V1a1 1 0 0 1 1-1h5.5a1 1 0 0 1 1 1v2h2.5a.75.75 0 0 1 0 1.5h-.365l-.743 9.653A2 2 0 0 1 11.148 16H4.852a2 2 0 0 1-1.994-1.847L2.115 4.5H1.75a.75.75 0 0 1 0-1.5h2.5Zm-.63 1.5h8.76l-.734 9.538a.5.5 0 0 1-.498.462H4.852a.5.5 0 0 1-.498-.462L3.62 4.5Z" clip-rule="evenodd" /></svg>
                            </td>
                        </tr>

                        <tr className='qtv_qlnhanvien_table_tr'>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td1'>Nguyễn Văn A</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td2'>00120000334</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td3'>nguyenvana##</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td4'>nguyenvana99</td>
                            <td className='qtv_qlnv_td qtv_qlnhanvien_table_td5'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 1025 1023"><path fill="#004cff" d="M896.428 1023h-768q-53 0-90.5-37.5T.428 895V127q0-53 37.5-90t90.5-37h576l-128 127h-384q-27 0-45.5 19t-18.5 45v640q0 27 19 45.5t45 18.5h640q27 0 45.5-18.5t18.5-45.5V447l128-128v576q0 53-37.5 90.5t-90.5 37.5zm-576-464l144 144l-208 64zm208 96l-160-159l479-480q17-16 40.5-16t40.5 16l79 80q16 16 16.5 39.5t-16.5 40.5z" /></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 16 16"><path fill="#ff0000" fill-rule="evenodd" d="M5.75 3V1.5h4.5V3h-4.5Zm-1.5 0V1a1 1 0 0 1 1-1h5.5a1 1 0 0 1 1 1v2h2.5a.75.75 0 0 1 0 1.5h-.365l-.743 9.653A2 2 0 0 1 11.148 16H4.852a2 2 0 0 1-1.994-1.847L2.115 4.5H1.75a.75.75 0 0 1 0-1.5h2.5Zm-.63 1.5h8.76l-.734 9.538a.5.5 0 0 1-.498.462H4.852a.5.5 0 0 1-.498-.462L3.62 4.5Z" clip-rule="evenodd" /></svg>
                            </td>
                        </tr>

                    </table>
                </div>


                <div className='qtv_qlnhanvien_themnhanvien'>
                    <div className='qtv_qlnhanvien_themnhanvien_tieude'>Thêm nhân viên mới </div>
                    <div className='qtv_qlnhanvien_themnhanvien_noidung'>
                        <div className='qtv_qlnhanvien_themnhanvien_nhapdl'>
                        <div className='qtv_qlnhanvien_themnhanvien_nhapdl_nhan'>Họ và tên</div>
                        <input type="text" placeholder="Nhập họ và tên" />
                        </div>
                    </div>

                    <div className='qtv_qlnhanvien_themnhanvien_noidung'>
                        <div className='qtv_qlnhanvien_themnhanvien_nhapdl'>
                        <div className='qtv_qlnhanvien_themnhanvien_nhapdl_nhan'>Số CCCD</div>
                        <input type="text" placeholder="Nhập dữ liệu" />
                        </div>
                    </div>

                    <div className='qtv_qlnhanvien_themnhanvien_noidung'>
                        <div className='qtv_qlnhanvien_themnhanvien_nhapdl'>
                        <div className='qtv_qlnhanvien_themnhanvien_nhapdl_nhan'>Tên đăng nhập</div>
                        <input type="text" placeholder="Nhập dữ liệu" />
                        </div>
                    </div>

                    <div className='qtv_qlnhanvien_themnhanvien_noidung'>
                        <div className='qtv_qlnhanvien_themnhanvien_nhapdl'>
                        <div className='qtv_qlnhanvien_themnhanvien_nhapdl_nhan'>Mật khẩu</div>
                        <input type="text" placeholder="Nhập dữ liệu" />
                        </div>
                    </div>
                    

                    <div className='qtv_qlnhanvien_themnhanvien_button'>
                       <div className='qtv_qlnhanvien_themnhanvien_button_nhan'>Thêm nhân viên</div>
                    </div>
                    
                </div>


                <div className='qtv_qlnhanvien_suanhanvien'>
                    <div className='qtv_qlnhanvien_suanhanvien_tieude'>Sửa thông tin nhân viên</div>
                    <div className='qtv_qlnhanvien_suanhanvien_noidung'>
                        <div className='qtv_qlnhanvien_suanhanvien_nhapdl'>
                        <div className='qtv_qlnhanvien_suanhanvien_nhapdl_nhan'>Họ và tên</div>
                        <input type="text" placeholder="Nhập họ và tên" />
                        </div>
                    </div>

                    <div className='qtv_qlnhanvien_suanhanvien_noidung'>
                        <div className='qtv_qlnhanvien_suanhanvien_nhapdl'>
                        <div className='qtv_qlnhanvien_suanhanvien_nhapdl_nhan'>Số CCCD</div>
                        <input type="text" placeholder="Nhập dữ liệu" />
                        </div>
                    </div>

                    <div className='qtv_qlnhanvien_suanhanvien_noidung'>
                        <div className='qtv_qlnhanvien_suanhanvien_nhapdl'>
                        <div className='qtv_qlnhanvien_suanhanvien_nhapdl_nhan'>Tên đăng nhập</div>
                        <input type="text" placeholder="Nhập dữ liệu" />
                        </div>
                    </div>

                    <div className='qtv_qlnhanvien_suanhanvien_noidung'>
                        <div className='qtv_qlnhanvien_suanhanvien_nhapdl'>
                        <div className='qtv_qlnhanvien_suanhanvien_nhapdl_nhan'>Mật khẩu</div>
                        <input type="text" placeholder="Nhập dữ liệu" />
                        </div>
                    </div>
                    

                    <div className='qtv_qlnhanvien_suanhanvien_button'>
                       <div className='qtv_qlnhanvien_suanhanvien_button_nhan1'>Lưu thông tin</div>
                        <div className='qtv_qlnhanvien_suanhanvien_button_nhan2'>Hủy bỏ</div>
                    </div>
                    
                </div>


            </main>



        </>
    )
}
