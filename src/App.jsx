import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Listings from "./pages/Listings";
import PropertyDetail from "./pages/PropertyDetail";
import AdminDashboard from "./pages/AdminDashboard";

import CreateProperty from "./components/CreateProperty";
import MyProperties from "./components/MyProperties";

import { useAuth } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";



export default function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Navbar />

      <Routes>

        {/* 🔓 PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 👤 USER ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/listings"
          element={
            <ProtectedRoute>
              <Listings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/property/:id"
          element={
            <ProtectedRoute>
              <PropertyDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <CreateProperty />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my"
          element={
            <ProtectedRoute>
              <MyProperties />
            </ProtectedRoute>
          }
        />

        {/* 🔐 ADMIN ROUTE */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              {user?.role === "ROLE_ADMIN" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/dashboard" />
              )}
            </ProtectedRoute>
          }
        />

        {/* ❌ FALLBACK */}
        <Route path="*" element={<Navigate to="/login" />} />

        <Route path="/" element={<LandingPage />} />

      </Routes>
    </Router>
  );
}
