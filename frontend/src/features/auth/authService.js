import axios from "axios";

//REGISTER USER
const register = async (userData) => {
  const response = await axios.post("/api/auth/register", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//LOGIN USER
const login = async (userData) => {
  const response = await axios.post("/api/auth/login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data; 
};
//LOGOUT USER
const logout = () => {
  localStorage.removeItem("user");
};
//ADMIN LOGIN 
const adminLogin = async (userData) => {
  const response = await axios.post("/api/auth/adminLogin", userData);
  if (response.data) {
    localStorage.setItem("admin", JSON.stringify(response.data));
  }
  return response.data;
};
//LOGOUT ADMIN
const adminLogout = () => {
  localStorage.removeItem("admin");
};

const updatePassword = async (userData) => {
  const response = await axios.post("/api/auth/updatePassword", userData);
  // if (response.data) {
  //   localStorage.setItem("user", JSON.stringify(response.data));
  // }
  return response.data;
};




const authService = {
  register,
  login,
  logout,
  updatePassword,
  adminLogin,
  adminLogout,
};

export default authService;
