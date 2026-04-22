import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // NOT LOGGED IN
  if (!user) {
    return <Navigate to="/login" />;
  }

  // LOGGED IN → ALLOW
  return children;
}
