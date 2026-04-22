export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

//export const getToken = () => {
 // return localStorage.getItem("token");
//};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getRole = () => localStorage.getItem("role");

export const isLoggedIn = () => !!getToken();
export const getToken = () => {
  return localStorage.getItem("token");
};
