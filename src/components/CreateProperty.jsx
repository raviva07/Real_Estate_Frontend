import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createProperty,
  uploadImage
} from "../services/propertyService";

export default function CreateProperty() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    type: "SALE",
    imageUrl: ""
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 SUBMIT PROPERTY
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      let finalImageUrl = form.imageUrl;

      // ✅ FILE UPLOAD
      if (file) {
        const res = await uploadImage(file);
        finalImageUrl = res.data;
      }

      // ✅ CREATE PROPERTY
      await createProperty({
        title: form.title,
        description: form.description,
        price: Number(form.price),
        location: form.location,
        type: form.type,
        imageUrl: finalImageUrl
      });

      alert("Property Added Successfully ✅");

      // redirect after success
      navigate("/my");

    } catch (err) {
      console.error(err);
      setError("Failed to create property ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <div className="card p-4 shadow">

        <h3 className="text-center mb-3">Add Property</h3>

        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleSubmit}>

          {/* TITLE */}
          <input
            type="text"
            name="title"
            className="form-control mb-2"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            className="form-control mb-2"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />

          {/* PRICE */}
          <input
            type="number"
            name="price"
            className="form-control mb-2"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />

          {/* LOCATION */}
          <input
            type="text"
            name="location"
            className="form-control mb-2"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />

          {/* TYPE */}
          <select
            name="type"
            className="form-select mb-3"
            value={form.type}
            onChange={handleChange}
          >
            <option value="SALE">SALE</option>
            <option value="RENT">RENT</option>
          </select>

          {/* IMAGE URL */}
          <input
            type="text"
            name="imageUrl"
            className="form-control mb-2"
            placeholder="Image URL (optional)"
            value={form.imageUrl}
            onChange={handleChange}
          />

          <p className="text-center">OR</p>

          {/* FILE UPLOAD */}
          <input
            type="file"
            className="form-control mb-3"
            onChange={(e) => setFile(e.target.files[0])}
          />

          {/* SUBMIT */}
          <button
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Property"}
          </button>

        </form>

      </div>
    </div>
  );
}

