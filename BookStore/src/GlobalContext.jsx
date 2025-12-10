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
import { login as handleLogin, getUserInfo } from "./api/authService";
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
      if (storedToken) {
        setToken(storedToken);
        await fetchUserInfo(storedToken);
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

  const login = async (data) => {
    try {
      setIsLoading(true);
      const res = await handleLogin(data);
      const t = res.result.token;
      const roles = res.result.roles;
      await saveToken(t);
      setToken(t);
      await saveRoles(roles);
      setRoles(roles);
      await fetchUserInfo(t);
      await fetchCart();
      message.success("Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    removeToken();
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  const fetchCart = async () => {
    try {
      const res = await getGioHang();
      setCart(res.result || []);

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

  const isAuthenticated = !!user;

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
