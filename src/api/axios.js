import axios from "axios";

// ✅ BASE URL (CHANGE if needed)
const API = axios.create({
  baseURL: "http://localhost:8080/api"
});

// ✅ ADD TOKEN TO EVERY REQUEST
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
