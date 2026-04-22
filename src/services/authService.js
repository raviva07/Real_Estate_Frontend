import api from "../api/axios";


// ================== AUTH ==================

// ✅ REGISTER (ROLE BASED)
export const register = (data) => {
  return api.post("/auth/register", data);
};

// ✅ LOGIN
export const login = async (data) => {
  const res = await api.post("/auth/login", data);

  // Save token
  localStorage.setItem("token", res.data.token);

  return res;
};

// ✅ LOGOUT
export const logout = () => {
  localStorage.removeItem("token");
};

// ✅ GET TOKEN
export const getToken = () => {
  return localStorage.getItem("token");
};


