import { useNavigate } from "react-router-dom";

export default function PropertyCard({ property }) {
  const navigate = useNavigate();

  const openDetails = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card border-0 shadow-lg h-100 rounded-4 overflow-hidden">

        {/* ✅ IMAGE WITH OVERLAY */}
        <div className="position-relative">
          <img
            src={property.imageUrl || "https://via.placeholder.com/300x200"}
            className="card-img-top"
            alt={property.title}
            style={{ height: "220px", objectFit: "cover" }}
          />

          {/* STATUS BADGE OVER IMAGE */}
          <span
            className={`position-absolute top-0 end-0 m-2 badge px-3 py-2 ${
              property.status === "APPROVED"
                ? "bg-success"
                : property.status === "PENDING"
                ? "bg-warning text-dark"
                : "bg-secondary"
            }`}
          >
            {property.status}
          </span>
        </div>

        {/* ✅ CONTENT */}
        <div className="card-body d-flex flex-column">

          <h5 className="card-title fw-bold text-dark mb-2">
            {property.title}
          </h5>

          <p className="text-muted mb-2">
            📍 {property.location}
          </p>

          <h6 className="text-success fw-bold mb-2">
            ₹ {property.price}
          </h6>

          <p className="mb-3">
            <span className="badge bg-light text-dark border">
              {property.type}
            </span>
          </p>

          {/* PUSH BUTTON DOWN */}
          <div className="mt-auto">
            <button
              className="btn btn-primary w-100 rounded-pill fw-semibold"
              onClick={openDetails}
            >
              View Details →
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

