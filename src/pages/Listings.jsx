import { useEffect, useState } from "react";
import { getAllProperties, searchProperties } from "../services/propertyService";
import { Link } from "react-router-dom";

export default function Listings() {
  const [properties, setProperties] = useState([]);

  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    type: "",
    minPrice: "",
    maxPrice: ""
  });

  const loadProperties = async () => {
    try {
      const res = await getAllProperties();
      const approved = res.data.filter(p => p.status === "APPROVED");
      setProperties(approved);
    } catch (err) {
      console.error("Load error:", err);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const handleSearch = async () => {
    try {
      const res = await searchProperties(filters);
      const approved = res.data.filter(p => p.status === "APPROVED");
      setProperties(approved);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🏠 Search Properties</h2>

      {/* ================= SEARCH ================= */}
      <div className="d-flex justify-content-center mb-4">
        <div className="card shadow-sm p-4" style={{ width: "400px" }}>
          <h5 className="text-center mb-3">Filters</h5>

          <input
            className="form-control mb-2"
            placeholder="Keyword"
            value={filters.keyword}
            onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
          />

          <input
            className="form-control mb-2"
            placeholder="Location"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />

          <select
            className="form-select mb-2"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">All Types</option>
            <option value="SALE">SALE</option>
            <option value="RENT">RENT</option>
          </select>

          <input
            className="form-control mb-2"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          />

          <input
            className="form-control mb-2"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          />

          <button className="btn btn-primary w-100" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {/* ================= PROPERTIES ================= */}
      <div className="row">
        {properties.length === 0 && <p>No properties found.</p>}

        {properties.map((p) => (
          <div key={p.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={p.imageUrl}
                alt="property"
                style={{ height: "200px", objectFit: "cover" }}
                className="card-img-top"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="fw-bold">{p.title}</h5>
                <p className="text-success fw-bold">₹{p.price}</p>
                <p className="text-muted">{p.location}</p>
                <Link to={`/property/${p.id}`} className="btn btn-dark mt-auto">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


