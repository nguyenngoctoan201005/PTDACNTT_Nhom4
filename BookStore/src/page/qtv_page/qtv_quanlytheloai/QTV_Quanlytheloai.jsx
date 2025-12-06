import './QTV_Quanlytheloai.css'
import { QTV_Nav } from '../../../nav/QTV_Nav'
import { useState } from 'react'

export function QTV_Quanlytheloai() {

    const [suaTheloai, setSuaTheloai] = useState(false)
    const [themTheloai, setThemTheloai] = useState(false)

    return (
        <>
            <QTV_Nav />
            <main className='qtv_themtheloaimoi_main'>
                <div className='qtv_themtheloaimoi_header'>
                    <div className='qtv_themtheloaimoi_header_title'>
                        Quản lý thể loại
                    </div>
                    <div onClick={() => setThemTheloai(true)} className='qtv_themtheloaimoi_header_button'>
                        + Thêm thể loại mới
                    </div>
                </div>

                <div className='qtv_themtheloaimoi_content'>
                    <table className='qtv_themtheloaimoi_content_table'>
                        <tr className='themtheloai_tr'>
                            <th className='themtheloai_th qtv_themtheloaimoi_content_th1'>TÊN THỂ LOẠI</th>
                            <th className='themtheloai_th qtv_themtheloaimoi_content_th2'>SỐ SÁCH</th>
                            <th className='themtheloai_th qtv_themtheloaimoi_content_th3'>THAO TÁC</th>
                        </tr>

                        <tr className='themtheloai_tr'>
                            <td className='themtheloai_td qtv_themtheloaimoi_content_td1'>Trinh tham</td>
                            <td className='themtheloai_td qtv_themtheloaimoi_content_td2'>5</td>
                            <td className='themtheloai_td qtv_themtheloaimoi_content_td3'>
                                <svg onClick={() => setSuaTheloai(true)} className='qtv_themtheloaimoi_content_svg1' xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 1025 1023"><path fill="rgba(37,99,235,1)" d="M896.428 1023h-768q-53 0-90.5-37.5T.428 895V127q0-53 37.5-90t90.5-37h576l-128 127h-384q-27 0-45.5 19t-18.5 45v640q0 27 19 45.5t45 18.5h640q27 0 45.5-18.5t18.5-45.5V447l128-128v576q0 53-37.5 90.5t-90.5 37.5zm-576-464l144 144l-208 64zm208 96l-160-159l479-480q17-16 40.5-16t40.5 16l79 80q16 16 16.5 39.5t-16.5 40.5z" /></svg>
                                <svg className='qtv_themtheloaimoi_content_svg2' width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="rgb(239 68 68)" fill-rule="evenodd" d="M19 7a1 1 0 0 1 1 1v11.6a3.4 3.4 0 0 1-3.4 3.4H7.4a3.4 3.4 0 0 1-3.395-3.226L4 19.6V8l.005-.103A1 1 0 0 1 5 7zM8 12v6h2v-6zm3 0v6h2v-6zm3 0v6h2v-6zm1.024-10.988A2.204 2.204 0 0 1 17 3.2V4h4a1 1 0 1 1 0 2H3a1 1 0 0 1 0-2h4v-.8C7 1.988 7.988 1 9.2 1h5.6zM9.2 3c-.108 0-.2.092-.2.2V4h6v-.8a.205.205 0 0 0-.16-.196L14.8 3z" clip-rule="evenodd" /></svg>
                            </td>
                        </tr>

                        


                    </table>

                </div>


                {
                    suaTheloai && (
                        <div className='qtv_xemsuaxoatheloai_suatheloai'>

                            <div className='qtv_xemsuaxoatheloai_suatheloai_title'>
                                Sửa thông tin thể loại
                                <svg onClick={() => setSuaTheloai(false)}  xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 8 8"><path fill="" d="M1.41 0L0 1.41l.72.72L2.5 3.94L.72 5.72L0 6.41l1.41 1.44l.72-.72l1.81-1.81l1.78 1.81l.69.72l1.44-1.44l-.72-.69l-1.81-1.78l1.81-1.81l.72-.72L6.41 0l-.69.72L3.94 2.5L2.13.72L1.41 0z" /></svg>
                            </div>
                            <hr className='qtv_xemsuaxoatheloai_hr' />


                            <div className='qtv_xemsuaxoatheloai_suatheloai_cont'>
                                <div className='qtv_xemsuaxoatheloai_suatheloai_cont_tt'>
                                    Tên thể loại
                                </div>
                                <div className='qtv_xemsuaxoatheloai_suatheloai_cont_inpt'>
                                    <input type="text" placeholder='Enter category name' />
                                </div>
                            </div>

                            <div className='qtv_xemsuaxoatheloai_suatheloai_cont'>
                                <div className='qtv_xemsuaxoatheloai_suatheloai_cont_tt'>
                                    Mô tả
                                </div>
                                <div className='qtv_xemsuaxoatheloai_suatheloai_cont_inpt'>
                                    <textarea placeholder='Enter description' rows="4" cols="70"></textarea>
                                </div>
                            </div>


                            <div className='qtv_xemsuaxoatheloai_suatheloai_cont_btn'>
                                <div onClick={() => setSuaTheloai(false)} className='qtv_xemsuaxoatheloai_suatheloai_cont_btn_huybo'>Hủy bỏ</div>
                                <div className='qtv_xemsuaxoatheloai_suatheloai_cont_btn_luu'>Lưu</div>        
                            </div>

                        </div>
                    )
                }

                
                {themTheloai && (
                <div className='qtv_xemsuaxoatheloai_suatheloai'>

                            <div className='qtv_xemsuaxoatheloai_suatheloai_title'>
                                Thêm thể loại mới
                                <svg onClick={() => setThemTheloai(false)}  xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 8 8"><path fill="" d="M1.41 0L0 1.41l.72.72L2.5 3.94L.72 5.72L0 6.41l1.41 1.44l.72-.72l1.81-1.81l1.78 1.81l.69.72l1.44-1.44l-.72-.69l-1.81-1.78l1.81-1.81l.72-.72L6.41 0l-.69.72L3.94 2.5L2.13.72L1.41 0z" /></svg>
                            </div>
                            <hr className='qtv_xemsuaxoatheloai_hr' />


                            <div className='qtv_xemsuaxoatheloai_suatheloai_cont'>
                                <div className='qtv_xemsuaxoatheloai_suatheloai_cont_tt'>
                                    Tên thể loại
                                </div>
                                <div className='qtv_xemsuaxoatheloai_suatheloai_cont_inpt'>
                                    <input type="text" placeholder='Enter category name' />
                                </div>
                            </div>

                            <div className='qtv_xemsuaxoatheloai_suatheloai_cont'>
                                <div className='qtv_xemsuaxoatheloai_suatheloai_cont_tt'>
                                    Mô tả
                                </div>
                                <div className='qtv_xemsuaxoatheloai_suatheloai_cont_inpt'>
                                    <textarea placeholder='Enter description' rows="4" cols="70"></textarea>
                                </div>
                            </div>


                            <div className='qtv_xemsuaxoatheloai_suatheloai_cont_btn'>
                                <div onClick={() => setThemTheloai(false)} className='qtv_xemsuaxoatheloai_suatheloai_cont_btn_huybo'>Hủy bỏ</div>
                                <div className='qtv_xemsuaxoatheloai_suatheloai_cont_btn_luu'>Lưu</div>        
                            </div>

                        </div>
                )}


            </main>
        </>
    )
}
