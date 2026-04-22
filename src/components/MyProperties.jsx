import { useEffect, useState } from "react";
import { getMyProperties, deleteProperty } from "../services/propertyService";

export default function MyProperties() {

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔥 LOAD USER PROPERTIES
  const loadProperties = async () => {
    try {
      setLoading(true);
      const res = await getMyProperties();
      setProperties(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load properties ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  // 🔥 DELETE PROPERTY
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this property?")) return;

    try {
      await deleteProperty(id);
      loadProperties(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Delete failed ❌");
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4 text-center">My Properties</h2>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {!loading && properties.length === 0 && (
        <p className="text-center">No properties found.</p>
      )}

      <div className="row">

        {properties.map((p) => (
          <div key={p.id} className="col-md-4 mb-4">

            <div className="card shadow h-100">

              {/* 🔥 IMAGE */}
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}

              <div className="card-body">

                <h5>{p.title}</h5>

                <p className="mb-1">₹ {p.price}</p>
                <p className="text-muted">{p.location}</p>

                {/* STATUS */}
                <span
                  className={`badge ${
                    p.status === "APPROVED"
                      ? "bg-success"
                      : "bg-warning text-dark"
                  }`}
                >
                  {p.status}
                </span>

              </div>

              <div className="card-footer text-center">

                {/* DELETE BUTTON */}
                <button
                  className="btn btn-danger w-100"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}
