import "./QTV_Nav.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Dropdown, Avatar } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useGlobalContext } from "../GlobalContext";

export function QTV_Nav() {
  const location = useLocation();
  const { user, handleLogout } = useGlobalContext();
  const [selected, setSelected] = useState(
    location.pathname.replace("/admin/", "")
  );
  return (
    <nav className="qtv_nav">
      <div className="qtv_nav_tieude">
        <div className="qtv_nav_tieude_text">Quản trị viên</div>
        <hr className="qtv_nav_tieude_hr" />
      </div>
      <div
        className={
          "qtv_nav_chucnang" +
          (selected === "qtvbangdieukhien" ? " qtv_nav_chucnang_selected" : "")
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
        >
          <g>
            <path d="M9.75 15.5a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0Z" />
            <path
              fill-rule="evenodd"
              d="M5.674 3.778C5 4.787 5 6.19 5 9v6c0 2.809 0 4.213.674 5.222a4 4 0 0 0 1.104 1.104C7.787 22 9.19 22 12 22c2.809 0 4.213 0 5.222-.674a4.003 4.003 0 0 0 1.104-1.104C19 19.213 19 17.81 19 15V9c0-2.809 0-4.213-.674-5.222a4.002 4.002 0 0 0-1.104-1.104C16.213 2 14.81 2 12 2c-2.809 0-4.213 0-5.222.674a4 4 0 0 0-1.104 1.104ZM12 11.75a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5ZM11 9.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0ZM10 7a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm5 2.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0ZM14 7a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
              clip-rule="evenodd"
            />
          </g>
        </svg>
        <Link
          to="/admin/qtvbangdieukhien"
          onClick={() => setSelected("qtvbangdieukhien")}
        >
          <div>Bảng điều khiển</div>
        </Link>
      </div>
      <div
        className={
          "qtv_nav_chucnang" +
          (selected === "qtvquanlysach" ? " qtv_nav_chucnang_selected" : "")
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          viewBox="0 0 24 24"
        >
          <path d="M2 16.144V4.998c0-1.098.886-1.99 1.982-1.923c.977.06 2.131.179 3.018.412c1.05.277 2.296.867 3.282 1.388c.307.163.634.275.968.339v15.179a3.44 3.44 0 0 1-.878-.324c-1-.532-2.29-1.15-3.372-1.436c-.877-.231-2.016-.35-2.985-.41C2.906 18.153 2 17.255 2 16.143Zm10.75 4.249a3.44 3.44 0 0 0 .878-.324c1-.532 2.29-1.15 3.372-1.436c.877-.231 2.016-.35 2.985-.41c1.109-.07 2.015-.968 2.015-2.08V4.934c0-1.072-.846-1.953-1.918-1.915c-1.129.04-2.535.156-3.582.47c-.908.271-1.965.816-2.826 1.315a3.51 3.51 0 0 1-.924.37v15.22Z" />
        </svg>
        <Link
          to="/admin/qtvquanlysach"
          onClick={() => setSelected("qtvquanlysach")}
        >
          <div>Quản lý sách</div>
        </Link>
      </div>
      <div
        className={
          "qtv_nav_chucnang" +
          (selected === "qtvquanlytheloai" ? " qtv_nav_chucnang_selected" : "")
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            d="M2.123 12.816c.287 1.003 1.06 1.775 2.605 3.32l1.83 1.83C9.248 20.657 10.592 22 12.262 22c1.671 0 3.015-1.345 5.704-4.034C20.657 15.277 22 13.933 22 12.262c0-1.67-1.345-3.015-4.034-5.704l-1.83-1.83c-1.545-1.545-2.317-2.318-3.32-2.605c-1.003-.288-2.068-.042-4.197.45l-1.228.283c-1.792.413-2.688.62-3.302 1.233c-.613.614-.82 1.51-1.233 3.302l-.284 1.228c-.491 2.13-.737 3.194-.45 4.197Zm8-5.545a2.017 2.017 0 1 1-2.852 2.852a2.017 2.017 0 0 1 2.852-2.852Zm8.928 4.78l-6.979 6.98a.75.75 0 0 1-1.06-1.061l6.978-6.98a.75.75 0 0 1 1.061 1.061Z"
            clip-rule="evenodd"
          />
        </svg>
        <Link
          to="/admin/qtvquanlytheloai"
          onClick={() => setSelected("qtvquanlytheloai")}
        >
          <div>Quản lý thể loại</div>
        </Link>
      </div>
      <div
        className={
          "qtv_nav_chucnang" +
          (selected === "qtvkhachhang" ? " qtv_nav_chucnang_selected" : "")
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          viewBox="0 0 344 384"
        >
          <path d="M170.5 192q-35.5 0-60.5-25t-25-60.5T110 46t60.5-25T231 46t25 60.5t-25 60.5t-60.5 25zm0 43q31.5 0 69.5 9t69.5 29.5T341 320v43H0v-43q0-26 31.5-46.5T101 244t69.5-9z" />
        </svg>
        <Link
          to="/admin/qtvkhachhang"
          onClick={() => setSelected("qtvkhachhang")}
        >
          <div>Khách hàng</div>
        </Link>
      </div>
      <div
        className={
          "qtv_nav_chucnang" +
          (selected === "qtvquanlynhanvien" ? " qtv_nav_chucnang_selected" : "")
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          viewBox="0 0 36 36"
          fill="#000000"
        >
          <g id="clarityEmployeeGroupSolid0">
            <ellipse cx="18" cy="11.28" rx="4.76" ry="4.7" />
            <path d="M10.78 11.75h.48v-.43a6.7 6.7 0 0 1 3.75-6a4.62 4.62 0 1 0-4.21 6.46Zm13.98-.47v.43h.48A4.58 4.58 0 1 0 21 5.29a6.7 6.7 0 0 1 3.76 5.99Zm-2.47 5.17a21.45 21.45 0 0 1 5.71 2a2.71 2.71 0 0 1 .68.53H34v-3.42a.72.72 0 0 0-.38-.64a18 18 0 0 0-8.4-2.05h-.66a6.66 6.66 0 0 1-2.27 3.58ZM6.53 20.92A2.76 2.76 0 0 1 8 18.47a21.45 21.45 0 0 1 5.71-2a6.66 6.66 0 0 1-2.27-3.55h-.66a18 18 0 0 0-8.4 2.05a.72.72 0 0 0-.38.64V22h4.53Zm14.93 5.77h5.96v1.4h-5.96z" />
            <path d="M32.81 21.26h-6.87v-1a1 1 0 0 0-2 0v1H22v-2.83a20.17 20.17 0 0 0-4-.43a19.27 19.27 0 0 0-9.06 2.22a.76.76 0 0 0-.41.68v5.61h7.11v6.09a1 1 0 0 0 1 1h16.17a1 1 0 0 0 1-1V22.26a1 1 0 0 0-1-1Zm-1 10.36H17.64v-8.36h6.3v.91a1 1 0 0 0 2 0v-.91h5.87Z" />
          </g>
        </svg>
        <Link
          to="/admin/qtvquanlynhanvien"
          onClick={() => setSelected("qtvquanlynhanvien")}
        >
          <div>Quản lý nhân viên</div>
        </Link>
      </div>
      <div
        className={
          "qtv_nav_chucnang" +
          (selected === "qtvquanlykhuyenmai"
            ? "  qtv_nav_chucnang_selected"
            : "")
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          viewBox="0 0 628 717"
        >
          <path d="M454 194h121c29 0 53 23 53 53v182H340V217c-10-3-19-7-25-13c-1 0-1-1-2-1c0 0 0 1-1 1c-7 6-15 10-24 13v212H0V247c0-30 23-53 52-53h122c-14-7-27-17-38-26c-48-46-57-110-19-146c16-14 37-22 60-22c33 0 67 13 96 40c16 15 31 36 40 56c10-20 25-41 41-56c28-27 64-40 96-40c24 0 45 8 60 22c38 36 29 100-20 146c-10 9-23 19-36 26zm-178-29c4-9-6-55-39-86c-17-16-40-25-60-25c-6 0-16 1-23 7c-2 2-8 6-8 17c0 13 8 33 27 50c24 23 62 39 90 39c9 0 13-2 13-2zm76 0s5 2 13 2c28 0 66-16 90-39c19-17 25-37 25-50c0-11-5-15-6-17c-7-6-18-7-24-7c-19 0-43 9-60 25c-32 31-43 76-38 87v-1zm-64 552H52c-29 0-52-23-52-52V482h288v235zm287 0H340V482h288v183c0 29-24 52-53 52z" />
        </svg>
        <Link
          to="/admin/qtvquanlykhuyenmai"
          onClick={() => setSelected("qtvquanlykhuyenmai")}
        >
          <div>Quản lý khuyến mãi</div>
        </Link>
      </div>
      {/* <div
        className={
          "qtv_nav_chucnang" +
          (selected === "qtv_lichsu" ? " qtv_nav_chucnang_selected" : "")
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          viewBox="0 0 1025 1024"
        >
          <path
            fill=""
            d="M320.9 704v-32l131-177q5-20 22-33.5t39-13.5q21 0 38 12.5t23 32.5l195 243v32h-32l-225-181l-159 117h-32zm192 320q-104 0-197.5-39.5T150.9 874l91-90q53 53 123 82.5t148 29.5q104 0 192.5-51.5t140-140T896.9 512t-51.5-192.5t-140-140T512.9 128q-94 0-175 43t-135 116l54 54q0 18-12.5 30.5T214.9 384h-171q-18 0-30.5-12.5T.9 341V171q0-17 12.5-29.5T43.9 129l68 67q71-91 176-143.5T512.9 0q104 0 199 40.5t163.5 109t109 163.5t40.5 199t-40.5 199t-109 163.5t-163.5 109t-199 40.5z"
          />
        </svg>
        <Link to="/admin/qtv_lichsu" onClick={() => setSelected("qtv_lichsu")}>
          <div>Lịch sử chỉnh sửa</div>
        </Link>
      </div> */}

      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200">
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: user?.hoTen || user?.userName || "Admin",
                disabled: true,
              },
              {
                type: "divider",
              },
              {
                key: "logout",
                icon: <LogoutOutlined style={{ color: "red" }} />,
                label: "Đăng xuất",
                onClick: handleLogout,
              },
            ],
          }}
          placement="topRight"
          trigger={["hover"]}
        >
          <div className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors">
            <Avatar
              icon={<UserOutlined />}
              className="bg-blue-500"
              size="large"
            />
            <span className="text-lg font-medium text-gray-700">
              {user?.hoTen || user?.userName || "Admin"}
              <br />
              {user?.email}
            </span>
          </div>
        </Dropdown>
      </div>
    </nav>
  );
}
