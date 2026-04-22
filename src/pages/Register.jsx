import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "ROLE_CUSTOMER",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert("Registered Successfully ✅");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration Failed ❌");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "450px" }}>
        <h2 className="text-center mb-4 text-success">Register</h2>
        <form onSubmit={handleRegister}>
          <input
            className="form-control mb-3"
            placeholder="Name"
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
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
          <select
            className="form-select mb-3"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="ROLE_CUSTOMER">User</option>
            <option value="ROLE_ADMIN">Admin</option>
          </select>
          <button className="btn btn-success w-100">Register</button>
          <p className="mt-3 text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
