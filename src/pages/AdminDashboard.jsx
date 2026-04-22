import { useEffect, useState } from "react";

import {
  approveProperty,
  deleteProperty,
  getUsers,
  deleteUser,
  updateUser,
  getPendingProperties,
  getAllPropertiesAdmin
} from "../services/adminService";

export default function AdminDashboard() {
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [tab, setTab] = useState("properties");

  const loadData = async () => {
    try {
      const p = await getPendingProperties();
      setProperties(p.data);

      const u = await getUsers();
      setUsers(u.data);

      const ap = await getAllPropertiesAdmin();
      setAllProperties(ap.data);
    } catch (err) {
      console.error("Load Error:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = async (id) => {
    await approveProperty(id);
    loadData();
  };

  const handleDeleteProperty = async (id) => {
    await deleteProperty(id);
    loadData();
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    loadData();
  };

  const handleRoleChange = async (user) => {
    const updated = {
      ...user,
      role: user.role === "ROLE_ADMIN" ? "ROLE_CUSTOMER" : "ROLE_ADMIN"
    };
    await updateUser(user.id, updated);
    loadData();
  };

  return (
    <div className="container mt-4">

      <h2 className="text-danger fw-bold mb-4">🔥 Admin Dashboard</h2>

      {/* TABS */}
      <div className="mb-4 d-flex gap-2 flex-wrap">
        <button
          className={`btn ${tab === "properties" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setTab("properties")}
        >
          Pending
        </button>

        <button
          className={`btn ${tab === "users" ? "btn-secondary" : "btn-outline-secondary"}`}
          onClick={() => setTab("users")}
        >
          Users
        </button>

        <button
          className={`btn ${tab === "manage" ? "btn-info" : "btn-outline-info"}`}
          onClick={() => setTab("manage")}
        >
          All Properties
        </button>
      </div>

      {/* ================== PENDING ================== */}
      {tab === "properties" && (
        <div className="row">
          {properties.length === 0 && <p>No pending properties</p>}

          {properties.map((p) => (
            <div key={p.id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100 border-0 rounded-4">

                <img
                  src={p.imageUrl}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="card-body">
                  <h5 className="fw-bold">{p.title}</h5>
                  <p className="text-muted">📍 {p.location}</p>
                  <h6 className="text-success fw-bold">₹{p.price}</h6>

                  <span className="badge bg-warning text-dark">
                    {p.status}
                  </span>
                </div>

                <div className="card-footer bg-white border-0">
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleApprove(p.id)}
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteProperty(p.id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================== USERS ================== */}
      {tab === "users" && (
        <div className="row">
          {users.map((u) => (
            <div key={u.id} className="col-md-4 mb-3">
              <div className="card shadow-sm border-0 rounded-3 p-3">

                <h5 className="fw-bold">{u.name}</h5>
                <p className="text-muted mb-1">{u.email}</p>

                <span className="badge bg-dark mb-2">{u.role}</span>

                <div>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleRoleChange(u)}
                  >
                    Toggle Role
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteUser(u.id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================== ALL PROPERTIES ================== */}
      {tab === "manage" && (
        <div className="row">
          {allProperties.length === 0 && <p>No properties found</p>}

          {allProperties.map((p) => (
            <div key={p.id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100 border-0 rounded-4">

                <img
                  src={p.imageUrl}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="card-body">
                  <h5 className="fw-bold">{p.title}</h5>
                  <p className="text-muted">📍 {p.location}</p>
                  <h6 className="text-success fw-bold">₹{p.price}</h6>

                  <span className="badge bg-info">
                    {p.status}
                  </span>
                </div>

                <div className="card-footer bg-white border-0">
                  <button
                    className="btn btn-danger btn-sm w-100"
                    onClick={() => handleDeleteProperty(p.id)}
                  >
                    Delete Property
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
