import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPropertyById } from "../services/propertyService";

export default function PropertyDetail() {

  const { id } = useParams();

  const [property, setProperty] = useState(null);

  // ✅ LOAD PROPERTY BY ID
  const loadProperty = async () => {
    try {
      const res = await getPropertyById(id);
      setProperty(res.data);
    } catch (err) {
      console.error("Error loading property:", err);
    }
  };

  useEffect(() => {
    loadProperty();
  }, [id]);

  if (!property) {
    return (
      <div className="container mt-4">
        <p>Loading property...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      <h2>🏠 Property Details</h2>

      <div className="card p-4">

        {/* IMAGE */}
        <img
          src={property.imageUrl}
          alt="property"
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            marginBottom: "20px"
          }}
        />

        {/* DETAILS */}
        <h3>{property.title}</h3>

        <p><strong>Price:</strong> ₹{property.price}</p>

        <p><strong>Location:</strong> {property.location}</p>

        <p><strong>Type:</strong> {property.type}</p>

        <p><strong>Status:</strong> {property.status}</p>

        <p><strong>Owner:</strong> {property.ownerName}</p>

        <hr />

        <p><strong>Description:</strong></p>
        <p>{property.description}</p>

      </div>

    </div>
  );
}
