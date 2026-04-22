import api from "../api/axios";

// ================== PROPERTY APIs ==================

// ✅ GET ALL PROPERTIES
export const getAllProperties = () => {
  return api.get("/properties");
};

// 🔥 ALIAS (for Dashboard compatibility)
export const getAll = getAllProperties;


// ✅ GET PROPERTY BY ID
export const getPropertyById = (id) => {
  return api.get(`/properties/${id}`);
};

// ✅ CREATE PROPERTY
export const createProperty = (data) => {
  return api.post("/properties", data);
};

// ✅ DELETE PROPERTY (USER SIDE)
export const deleteProperty = (id) => {
  return api.delete(`/properties/${id}`);
};

// ✅ MY PROPERTIES
export const getMyProperties = () => {
  return api.get("/properties/my");
};

// ✅ SEARCH PROPERTIES
export const searchProperties = (filters) => {
  return api.get("/properties/search", {
    params: filters,
  });
};

// 🔥 ALIAS (for Dashboard compatibility)
export const search = searchProperties;


// ================== IMAGE APIs ==================

// ✅ UPLOAD FILE IMAGE
export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/properties/upload-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ UPLOAD IMAGE URL
export const uploadImageUrl = (url) => {
  return api.post("/properties/upload-image-url", { url });
};
