import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // 🔥 add loading state

  // 🔥 Load user from localStorage on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // ✅ only render children after restoring
  }, []);

  const login = async (data) => {
    try {
      const res = await authService.login(data);
      const jwt = res.data.token;

      const payload = JSON.parse(atob(jwt.split(".")[1]));
      const userData = { email: payload.sub, role: payload.role };

      setToken(jwt);
      setUser(userData);

      localStorage.setItem("token", jwt);
      localStorage.setItem("user", JSON.stringify(userData));

      return userData;
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  const register = async (data) => {
    try {
      return await authService.register(data);
    } catch (err) {
      console.error("Register failed:", err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null); // ✅ clear token too
  };

  const isAuthenticated = () => {
    return !!token;
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, isAuthenticated }}
    >
      {loading ? null : children} {/* ✅ wait until restored */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
