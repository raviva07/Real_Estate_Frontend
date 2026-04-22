import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProperties } from "../services/propertyService";

export default function Dashboard() {

  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const res = await getAllProperties();

      const approved = res.data.filter(
        (p) => p.status === "APPROVED"
      );

      setProperties(approved);
    } catch (err) {
      console.error("Error loading properties", err);
    }
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center">
        <h2>Properties</h2>
      </div>

      {/* ✅ ONLY LIST (Search UI removed safely) */}
      <div className="row mt-4">

        {properties.length === 0 && <p>No properties found.</p>}

        {properties.map((p) => (
          <div key={p.id} className="col-md-4 mb-4">
  <div className="card property-card h-100">

    <img
      src={p.imageUrl}
      className="card-img-top"
      alt="property"
    />

    <div className="card-body d-flex flex-column">

      <h5 className="fw-bold">{p.title}</h5>

      <p className="text-muted mb-1">📍 {p.location}</p>

      <p className="price-tag">₹{p.price}</p>

      <button
        className="btn btn-dark mt-auto"
        onClick={() => navigate(`/property/${p.id}`)}
      >
        View Details
      </button>

    </div>
  </div>
</div>

        ))}

      </div>

    </div>
  );
}
