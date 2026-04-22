import api from "../api/axios";


// ================== PROPERTY ADMIN ==================

// ✅ APPROVE PROPERTY
export const approveProperty = (id) => {
  return api.put(`/admin/properties/${id}/approve`);
};

// ✅ DELETE PROPERTY (ADMIN)
export const deleteProperty = (id) => {
  return api.delete(`/admin/properties/${id}`);
};


// ================== USER ADMIN ==================

// ✅ GET ALL USERS
export const getUsers = () => {
  return api.get("/admin/users");
};

// ✅ DELETE USER
export const deleteUser = (id) => {
  return api.delete(`/admin/users/${id}`);
};

// ✅ UPDATE USER ROLE
export const updateUser = (id, data) => {
  return api.put(`/admin/users/${id}`, data);
};
// ✅ GET PENDING PROPERTIES (ADMIN)
export const getPendingProperties = () => {
  return api.get("/admin/properties/pending");
};

// ✅ GET ALL PROPERTIES (ADMIN)
export const getAllPropertiesAdmin = () => {
  return api.get("/properties"); // or /admin/properties if you expose it
};

