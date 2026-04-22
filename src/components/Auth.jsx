import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Auth({ type = "login" }) {

  const navigate = useNavigate();
  const { login, register } = useAuth();

  const isLogin = type === "login";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "ROLE_CUSTOMER"
  });

  const [error, setError] = useState("");

  // 🔥 HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {

      if (isLogin) {
        const user = await login({
          email: form.email,
          password: form.password
        });

        // Redirect based on role
        if (user.role === "ROLE_ADMIN") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }

      } else {
        await register(form);

        alert("Registration successful ✅ Please login");
        navigate("/login");
      }

    } catch (err) {
      setError("Something went wrong ❌");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <div className="card p-4 shadow">

        <h3 className="text-center mb-3">
          {isLogin ? "Login" : "Register"}
        </h3>

        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleSubmit}>

          {/* NAME (REGISTER ONLY) */}
          {!isLogin && (
            <input
              type="text"
              name="name"
              className="form-control mb-2"
              placeholder="Name"
              onChange={handleChange}
              required
            />
          )}

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            className="form-control mb-2"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            className="form-control mb-2"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          {/* ROLE (REGISTER ONLY) */}
          {!isLogin && (
            <select
              name="role"
              className="form-select mb-3"
              onChange={handleChange}
            >
              <option value="ROLE_USER">User</option>
              <option value="ROLE_ADMIN">Admin</option>
            </select>
          )}

          <button className="btn btn-primary w-100">
            {isLogin ? "Login" : "Register"}
          </button>

        </form>

        {/* SWITCH LINKS */}
        <div className="text-center mt-3">
          {isLogin ? (
            <p>
              Don't have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
