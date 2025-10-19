import { createContext, useContext, useEffect, useState } from "react";
import { App } from "antd";
import { useNavigate } from "react-router-dom";
// import { login as handleLogin, getUserInfo } from "@services/AuthService";
import { saveToken, getToken, removeToken } from "./auth/auth";

export const handleLogin = async (data) => {
  // Giả lập delay 1s để giống API thật
  await new Promise((r) => setTimeout(r, 1000));

  // Giả lập gọi axios (nhưng không cần thật sự gọi server)
  if (data.username === "admin" && data.password === "123456") {
    // Trả về giống response từ axios
    return {
      data: {
        token: "fake-token-123",
        user: { id: 1, name: "Admin", role: "admin" },
      },
      status: 200,
    };
  } else {
    // Giả lập lỗi như API trả về
    const error = new Error("Sai tài khoản hoặc mật khẩu!");
    error.response = { status: 401, data: { message: "Unauthorized" } };
    throw error;
  }
};

// Tạo Context
const GlobalContext = createContext(null);

// Provider chính
export const GlobalProvider = ({ children }) => {
  const navigate = useNavigate();
  const { message } = App.useApp();

  // --- Trạng thái toàn cục ---
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]); // giỏ hàng

  const getUserInfo = async (token) => {
    await new Promise((r) => setTimeout(r, 500));
    if (token === "fake-token-123") {
      return {
        data: {
          id: 1,
          username: "admin",
          name: "Quản trị viên",
          email: "admin@example.com",
        },
      };
    } else {
      throw new Error("Token không hợp lệ");
    }
  };

  // --- Khi tải trang, kiểm tra token có sẵn ---
  useEffect(() => {
    const loadToken = async () => {
      const t = await getToken();
      if (t) {
        setToken(t);
        fetchUserInfo(t);
      }
    };
    loadToken();
  }, []);

  // --- Lấy thông tin người dùng ---
  const fetchUserInfo = async (token) => {
    try {
      const res = await getUserInfo(token);
      setUser(res.data);
    } catch (err) {
      console.error(err);
      handleLogout();
    }
  };

  // --- Đăng nhập ---
  const login = async (data) => {
    try {
      setIsLoading(true);
      const res = await handleLogin(data);
      const t = res.data.token;
      await saveToken(t);
      setToken(t);
      await fetchUserInfo(t);
      message.success("Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // --- Đăng xuất ---
  const handleLogout = () => {
    removeToken();
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  // --- Giỏ hàng ---
  const addToCart = (book) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === book.id);
      if (exists) {
        return prev.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
    message.success(`Đã thêm "${book.title}" vào giỏ hàng`);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        handleLogout,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
