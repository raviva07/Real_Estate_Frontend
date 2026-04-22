import { useState } from "react";

export default function PropertyForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    type: "SALE",
    imageUrl: ""
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submit = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,
      file // pass file also
    });
  };

  return (
    <form onSubmit={submit} className="card p-4 shadow">

      <h4 className="mb-3">Property Details</h4>

      {/* TITLE */}
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="form-control mb-2"
        onChange={handleChange}
        required
      />

      {/* DESCRIPTION */}
      <textarea
        name="description"
        placeholder="Description"
        className="form-control mb-2"
        onChange={handleChange}
        required
      />

      {/* PRICE */}
      <input
        type="number"
        name="price"
        placeholder="Price"
        className="form-control mb-2"
        onChange={handleChange}
        required
      />

      {/* LOCATION */}
      <input
        type="text"
        name="location"
        placeholder="Location"
        className="form-control mb-2"
        onChange={handleChange}
        required
      />

      {/* TYPE */}
      <select
        name="type"
        className="form-select mb-2"
        onChange={handleChange}
      >
        <option value="SALE">SALE</option>
        <option value="RENT">RENT</option>
      </select>

      {/* IMAGE URL */}
      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL (optional)"
        className="form-control mb-2"
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
      <button type="submit" className="btn btn-primary">
        Submit Property
      </button>

    </form>
  );
}
