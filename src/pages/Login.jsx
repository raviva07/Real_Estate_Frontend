import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await login(form);
      alert("Login Successful ✅");
      if (user.role === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Login Failed ❌");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4 text-primary">Login</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className="btn btn-primary w-100">Login</button>
          <p className="mt-3 text-center">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
