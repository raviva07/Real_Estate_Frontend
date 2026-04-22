import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">

      <div className="container">

        {/* LOGO */}
        <Link className="navbar-brand fw-bold text-warning" to="/dashboard">
           🏡 RealEstate
       </Link>

          

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav align-items-center">

            {/* NOT LOGGED IN */}
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}

            {/* USER LOGGED IN */}
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>

                {/* ✅ KEEP SEARCH HERE ONLY */}
                <li className="nav-item">
                  <Link className="nav-link" to="/listings">Search</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/add">Add Property</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/my">My Properties</Link>
                </li>

                {/* ADMIN */}
                {user.role === "ROLE_ADMIN" && (
                  <li className="nav-item">
                    <Link className="nav-link text-warning fw-bold" to="/admin">
                      Admin
                    </Link>
                  </li>
                )}

                <li className="nav-item">
                  <button
                    className="btn btn-danger ms-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}
