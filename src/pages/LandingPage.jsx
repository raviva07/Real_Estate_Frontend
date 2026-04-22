import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative"
      }}
    >
      {/* 🔥 Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.6)",
          zIndex: 1   // ✅ make sure overlay stays behind content
        }}
      />

      {/* 🔥 Content */}
      <div
        className="d-flex flex-column justify-content-center align-items-center text-white"
        style={{ height: "100%", position: "relative", zIndex: 2 }}
      >
        <h1 className="fw-bold mb-3" style={{ fontSize: "4rem" }}>
          🏡 RealEstate
        </h1>

        <p className="mb-4 fs-5">
          Find your dream home easily
        </p>

        <div>
          <button
            className="btn btn-success me-3 px-4"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="btn btn-outline-light px-4"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
