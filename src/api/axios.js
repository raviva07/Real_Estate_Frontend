import axios from "axios";

// ✅ ONE API INSTANCE ONLY
const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://realestate-backend-vf8j.onrender.com/api",
});

// ✅ REQUEST INTERCEPTOR
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// ✅ RESPONSE INTERCEPTOR
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response || error.message);

    if (error?.response?.status === 403) {
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  }
);

export default API;
