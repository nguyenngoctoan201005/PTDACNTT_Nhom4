import "./NV_Nav.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Dropdown, Avatar } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useGlobalContext } from "../GlobalContext";

export function NV_Nav() {
  const location = useLocation();
  const { user, handleLogout } = useGlobalContext();
  const [selected, setSelected] = useState(
    location.pathname.replace("/nhanvien/", "")
  );

  return (
    <nav className="nv_nav">
      <div className="nav_tieude">Nhân viên</div>
      <hr
        style={{
          border: "1px solid rgb(210, 206, 206)",
          width: "80%",
          marginLeft: "10%",
        }}
      />

      <div
        className={
          "nav_chucnang" +
          (selected === "bangdieukhien" ? " nav_chucnang_selected" : "")
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
              fillRule="evenodd"
              d="M5.674 3.778C5 4.787 5 6.19 5 9v6c0 2.809 0 4.213.674 5.222a4 4 0 0 0 1.104 1.104C7.787 22 9.19 22 12 22c2.809 0 4.213 0 5.222-.674a4.003 4.003 0 0 0 1.104-1.104C19 19.213 19 17.81 19 15V9c0-2.809 0-4.213-.674-5.222a4.002 4.002 0 0 0-1.104-1.104C16.213 2 14.81 2 12 2c-2.809 0-4.213 0-5.222.674a4 4 0 0 0-1.104 1.104ZM12 11.75a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5ZM11 9.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0ZM10 7a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm5 2.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0ZM14 7a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
              clipRule="evenodd"
            />
          </g>
        </svg>
        <Link
          to="/nhanvien/bangdieukhien"
          onClick={() => setSelected("bangdieukhien")}
        >
          <div>Bảng điều khiển</div>
        </Link>
      </div>

      <div
        className={
          "nav_chucnang" +
          (selected === "quanlydonhang" ? " nav_chucnang_selected" : "")
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
        >
          <path d="M2.237 2.288a.75.75 0 1 0-.474 1.423l.265.089c.676.225 1.124.376 1.453.529c.312.145.447.262.533.382c.087.12.155.284.194.626c.041.361.042.833.042 1.546v2.672c0 1.367 0 2.47.117 3.337c.12.9.38 1.658.982 2.26c.601.602 1.36.86 2.26.981c.866.117 1.969.117 3.336.117H18a.75.75 0 0 0 0-1.5h-7c-1.435 0-2.436-.002-3.192-.103c-.733-.099-1.122-.28-1.399-.556c-.235-.235-.4-.551-.506-1.091h10.12c.959 0 1.438 0 1.814-.248c.376-.248.565-.688.943-1.57l.428-1c.81-1.89 1.215-2.834.77-3.508C19.533 6 18.506 6 16.45 6H5.745a8.996 8.996 0 0 0-.047-.833c-.055-.485-.176-.93-.467-1.333c-.291-.404-.675-.66-1.117-.865c-.417-.194-.946-.37-1.572-.58l-.305-.1ZM7.5 18a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3Zm9 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3Z" />
        </svg>
        <Link
          to="/nhanvien/quanlydonhang"
          onClick={() => setSelected("quanlydonhang")}
        >
          <div>Quản lý đơn hàng</div>
        </Link>
      </div>

      <div
        className={
          "nav_chucnang" +
          (selected === "huyvatrahang" ? " nav_chucnang_selected" : "")
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
        >
          <g fillRule="evenodd" clipRule="evenodd">
            <path d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2h.258c-.405.567-.578 1.205-.662 1.831c-.096.714-.096 1.595-.096 2.577v.184c0 .982 0 1.863.096 2.577c.104.779.348 1.578 1.002 2.233c.655.654 1.454.898 2.233 1.002c.714.096 1.595.096 2.577.096h.184c.982 0 1.863 0 2.577-.096c.626-.084 1.264-.257 1.831-.662V12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22Zm-5.75-8a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75Zm0 3.5a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75Z" />
            <path d="M17.5 11c-2.121 0-3.182 0-3.841-.659C13 9.682 13 8.621 13 6.5c0-2.121 0-3.182.659-3.841C14.318 2 15.379 2 17.5 2c2.121 0 3.182 0 3.841.659C22 3.318 22 4.379 22 6.5c0 2.121 0 3.182-.659 3.841c-.659.659-1.72.659-3.841.659Zm-2.53-7.03a.75.75 0 0 1 1.06 0l1.47 1.47l1.47-1.47a.75.75 0 1 1 1.06 1.06L18.56 6.5l1.47 1.47a.75.75 0 0 1-1.06 1.06L17.5 7.56l-1.47 1.47a.75.75 0 1 1-1.06-1.06l1.47-1.47l-1.47-1.47a.75.75 0 0 1 0-1.06Z" />
          </g>
        </svg>
        <Link
          to="/nhanvien/huyvatrahang"
          onClick={() => setSelected("huyvatrahang")}
        >
          <div>Huỷ/Yêu cầu trả hàng</div>
        </Link>
      </div>

      <div
        className={
          "nav_chucnang" +
          (selected === "baotrisach" ? " nav_chucnang_selected" : "")
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
        >
          <g>
            <path
              fillRule="evenodd"
              d="M4.727 2.712c.306-.299.734-.494 1.544-.6C7.105 2.002 8.209 2 9.793 2h4.414c1.584 0 2.688.002 3.522.112c.81.106 1.238.301 1.544.6c.305.3.504.72.613 1.513c.112.817.114 1.899.114 3.45v7.839H7.346c-.903 0-1.519-.001-2.047.138c-.472.124-.91.326-1.299.592V7.676c0-1.552.002-2.634.114-3.451c.109-.793.308-1.213.613-1.513Zm2.86 3.072a.82.82 0 0 0-.828.81c0 .448.37.811.827.811h8.828a.82.82 0 0 0 .827-.81a.82.82 0 0 0-.827-.811H7.586Zm-.828 4.594c0-.447.37-.81.827-.81h5.517a.82.82 0 0 1 .828.81a.82.82 0 0 1-.828.811H7.586a.82.82 0 0 1-.827-.81Z"
              clipRule="evenodd"
            />
            <path d="M7.473 17.135c-1.079 0-1.456.007-1.746.083a2.464 2.464 0 0 0-1.697 1.538c.016.382.043.719.084 1.019c.109.793.308 1.213.613 1.513c.306.299.734.494 1.544.6c.834.11 1.938.112 3.522.112h4.414c1.584 0 2.688-.002 3.522-.111c.81-.107 1.238-.302 1.544-.601c.216-.213.38-.486.495-.91H7.586a.82.82 0 0 1-.827-.81c0-.448.37-.811.827-.811H19.97c.02-.466.027-1 .03-1.622H7.472Z" />
          </g>
        </svg>
        <Link
          to="/nhanvien/baotrisach"
          onClick={() => setSelected("baotrisach")}
        >
          <div>Bảo trì sách</div>
        </Link>
      </div>

      <div
        className={
          "nav_chucnang" +
          (selected === "quanlydanhgia" ? " nav_chucnang_selected" : "")
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
        >
          <path d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182c.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506c-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452c-.347 0-.674.15-1.329.452l-.595.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882c.293-.941 1.523-1.22 3.983-1.776l.636-.144c.699-.158 1.048-.237 1.329-.45c.28-.213.46-.536.82-1.182l.328-.588Z" />
        </svg>
        <Link
          to="/nhanvien/quanlydanhgia"
          onClick={() => setSelected("quanlydanhgia")}
        >
          <div>Quản lý đánh giá</div>
        </Link>
      </div>

      <div
        className={
          "nav_chucnang" +
          (selected === "thongke" ? " nav_chucnang_selected" : "")
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
        >
          <g>
            <path
              fillRule="evenodd"
              d="M3 10.417c0-3.198 0-4.797.378-5.335c.377-.537 1.88-1.052 4.887-2.081l.573-.196C10.405 2.268 11.188 2 12 2c.811 0 1.595.268 3.162.805l.573.196c3.007 1.029 4.51 1.544 4.887 2.081C21 5.62 21 7.22 21 10.417v1.574c0 5.638-4.239 8.375-6.899 9.536C13.38 21.842 13.02 22 12 22s-1.38-.158-2.101-.473C7.239 20.365 3 17.63 3 11.991v-1.574Zm9-3.167a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75ZM12 16a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
              clipRule="evenodd"
            />
          </g>
        </svg>
        <Link to="/nhanvien/thongke" onClick={() => setSelected("thongke")}>
          <div>Thống kê doanh thu</div>
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 group">
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: user?.hoTen || user?.userName || "Nhân viên",
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
          <div className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors">
            <Avatar
              icon={<UserOutlined />}
              className="bg-blue-500"
              size="large"
            />
            <span className="text-lg font-medium text-white group-hover:text-gray-700">
              {user?.hoTen || user?.userName || "Nhân viên"}
              <br />
              {user?.email}
            </span>
          </div>
        </Dropdown>
      </div>
    </nav>
  );
}
