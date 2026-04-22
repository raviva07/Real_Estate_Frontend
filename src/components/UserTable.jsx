export default function PropertyTable({
  properties,
  onApprove,
  onDelete
}) {
  if (!properties || properties.length === 0) {
    return <p>No properties found.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">

        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Location</th>
            <th>Type</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {properties.map((p) => (
            <tr key={p.id}>

              <td>
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  width="100"
                  height="70"
                  style={{ objectFit: "cover" }}
                />
              </td>

              <td>{p.title}</td>
              <td>₹{p.price}</td>
              <td>{p.location}</td>
              <td>{p.type}</td>
              <td>
                <span className={
                  p.status === "APPROVED"
                    ? "badge bg-success"
                    : "badge bg-warning text-dark"
                }>
                  {p.status}
                </span>
              </td>
              <td>{p.ownerName}</td>

              <td>
                {/* APPROVE BUTTON */}
                {p.status === "PENDING" && (
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => onApprove(p.id)}
                  >
                    Approve
                  </button>
                )}

                {/* DELETE BUTTON */}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(p.id)}
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
