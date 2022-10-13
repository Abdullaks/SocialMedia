import axios from "axios";
const baseUrl = "http://localhost:8800";
//Get user
const getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${baseUrl}/api/admin/`, config);
  return response.data;
};
   
//Delete user
const deleteUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    `${baseUrl}/api/admin/deleteUser/` + userId,
    config
  );
  return response.data;
};
//Block user
const blockUser = async (userId, token) => {
    const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${baseUrl}/api/admin/blockUser/` + userId, config);
  return response.data;
};
//Unblock user
const unBlockUser = async (userId, token) => {
  const config = { 
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${baseUrl}/api/admin/unBlockUser/` + userId,
    config
  );
  return response.data;
};


const adminService = {
  getAllUsers,
  deleteUser,
  blockUser,
  unBlockUser,
};
export default adminService;
