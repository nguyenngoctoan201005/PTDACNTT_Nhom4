import { createContext, useContext, useEffect, useState } from "react";
import { App } from "antd";
import { useNavigate } from "react-router-dom";
import { saveToken, getToken, removeToken } from "./auth/auth";

export const handleLogin = async (data) => {
  await new Promise((r) => setTimeout(r, 1000));
  if (data.username === "admin" && data.password === "123456") {
    return {
      data: {
        token: "fake-token-123",
        user: { id: 1, name: "Admin", role: "admin" },
      },
      status: 200,
    };
  } else {
    const error = new Error("Sai tài khoản hoặc mật khẩu!");
    error.response = { status: 401, data: { message: "Unauthorized" } };
    throw error;
  }
};

const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const navigate = useNavigate();
  const { message } = App.useApp();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ loadingAuth: trạng thái kiểm tra token từ storage
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [cart, setCart] = useState([]);

  // Fake API get user info
  const getUserInfo = async (token) => {
    await new Promise((r) => setTimeout(r, 500));
    if (token === "fake-token-123") {
      return {
        data: {
          id: 1,
          username: "admin",
          name: "Quản trị viên",
          email: "admin@example.com",
          phone_number: "0987654321",
          city_code: 1,
          ward_code: 4,
        },
      };
    }
    throw new Error("Token không hợp lệ");
  };

  // ✅ Kiểm tra token khi load app
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = await getToken();
      if (storedToken) {
        setToken(storedToken);
        await fetchUserInfo(storedToken);
      }
      setLoadingAuth(false);
    };
    initAuth();
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const res = await getUserInfo(token);
      setUser(res.data);
    } catch (error) {
      console.error("Fetch user error:", error);
      handleLogout();
    }
  };

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

  const handleLogout = () => {
    removeToken();
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  // ✅ Trạng thái xác thực toàn cục
  const isAuthenticated = !!user;

  return (
    <GlobalContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        loadingAuth,
        login,
        handleLogout,
        cart,
        setCart,
      }}
    >
      {!loadingAuth && children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
