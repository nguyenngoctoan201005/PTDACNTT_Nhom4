import { createContext, useContext, useEffect, useState } from "react";
import { App } from "antd";
import { useNavigate } from "react-router-dom";
import {
  saveToken,
  getToken,
  removeToken,
  saveRoles,
  getRoles,
  removeRoles,
} from "./auth/auth";
import {
  login as handleLogin,
  getUserInfo,
  getNhanVienInfo,
} from "./api/authService";
import {
  insertGioHang,
  updateSoLuongGioHang,
  deleteSachFromGioHang,
  getGioHang,
} from "./api/gioHangService";

const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const navigate = useNavigate();
  const { message } = App.useApp();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [loadingAuth, setLoadingAuth] = useState(true);

  const [cart, setCart] = useState([]);
  const [cartAmount, setCartAmount] = useState(0);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = await getToken();
      const storedRoles = await getRoles();
      if (storedToken) {
        setToken(storedToken);
        if (storedRoles) {
          setRoles(storedRoles);
        }
        if (storedRoles.includes("STAFF")) {
          await fetchNhanVienInfo();
        } else {
          await fetchUserInfo(storedToken);
        }
        await fetchCart();
      }
      setLoadingAuth(false);
    };
    initAuth();
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const res = await getUserInfo(token);
      setUser(res.result);
    } catch (error) {
      console.error("Fetch user error:", error);
      handleLogout();
    }
  };

  const fetchNhanVienInfo = async () => {
    try {
      const res = await getNhanVienInfo();
      setUser(res.result);
    } catch (error) {
      console.error("Fetch nhan vien error:", error || "Unknown error");
      handleLogout();
    }
  };

  const login = async (data) => {
    try {
      setIsLoading(true);
      const res = await handleLogin(data);
      const t = res.result.token;
      const roles = res.result.roles || ["USER"];
      await saveToken(t);
      setToken(t);
      await saveRoles(roles);
      setRoles(roles);
      if (roles.includes("STAFF")) {
        await fetchNhanVienInfo();
      } else {
        await fetchUserInfo(t);
      }
      await fetchCart();
      message.success("Đăng nhập thành công!");
      if (roles.includes("ADMIN")) {
        navigate("/admin");
      } else if (roles.includes("STAFF")) {
        navigate("/nhanvien");
      } else {
        navigate("/");
      }
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    // Navigate to login first (replace history) to avoid briefly rendering
    // protected layouts (which may show a RequireLoginPage) during state reset.
    navigate("/login", { replace: true });
    removeToken();
    removeRoles();
    setToken(null);
    setRoles([]);
    setUser(null);
  };

  const fetchCart = async () => {
    try {
      const res = await getGioHang();
      setCart(res?.result || { chiTietGHResponses: [] });

      let total = 0;
      res.result.chiTietGHResponses.forEach((g) => {
        total += g.soLuong;
      });

      setCartAmount(total);
    } catch (e) {
      console.error("Fetch cart error:", e);
    }
  };

  // Thêm sách vào giỏ
  const addToCart = async ({ maSach, soLuong }) => {
    if (!token) return message.warning("Bạn cần đăng nhập để thêm vào giỏ!");

    try {
      await insertGioHang({ maSach, soLuong });
      message.success("Đã thêm vào giỏ hàng!");

      await fetchCart();
    } catch (e) {
      console.error(e);
      message.error("Không thể thêm vào giỏ hàng!");
    }
  };

  // Cập nhật số lượng sách
  const updateCartQty = async (maSach, soLuong) => {
    try {
      await updateSoLuongGioHang({ maSach, soLuong });
      await fetchCart();
    } catch (e) {
      console.error(e);
      message.error("Không thể cập nhật số lượng!");
    }
  };

  // Xóa sách khỏi giỏ
  const deleteCartItem = async (maSach) => {
    try {
      await deleteSachFromGioHang(maSach);
      message.success("Đã xóa khỏi giỏ hàng!");
      await fetchCart();
    } catch (e) {
      console.error(e);
      message.error("Không thể xóa sách!");
    }
  };

  const isAuthenticated = !!token;

  return (
    <GlobalContext.Provider
      value={{
        user,
        token,
        roles,
        isAuthenticated,
        isLoading,
        loadingAuth,
        login,
        handleLogout,
        cart,
        cartAmount,
        setCart,
        addToCart,
        updateCartQty,
        deleteCartItem,
        fetchCart,
      }}
    >
      {!loadingAuth && children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
