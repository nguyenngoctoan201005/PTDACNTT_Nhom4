import { createContext, useContext, useEffect, useState } from "react";
import { App } from "antd";
import { useNavigate } from "react-router-dom";
import { saveToken, getToken, removeToken } from "./auth/auth";
import { login as handleLogin, getUserInfo } from "./api/authService";

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
