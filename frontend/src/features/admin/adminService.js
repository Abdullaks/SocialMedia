import axios from "axios";

//Get user
const getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/api/admin/", config);
  return response.data;
};

//Delete user
const deleteUser = async (userId, token) => {
  console.log("deleteUser called service");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    "/api/admin/deleteUser/" + userId,
    config
  );
  console.log(response.data);
  return response.data;
};
//Block user
const blockUser = async (userId, token) => {
  console.log("blockUser called service");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put("/api/admin/blockUser/" + userId, config);
  console.log(response.data);
  return response.data;
};
//Unblock user
const unBlockUser = async (userId, token) => {
  console.log("blockUser called service");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put("/api/admin/unBlockUser/" + userId, config);
  console.log(response.data);
  return response.data;
};

const adminService = {
  getAllUsers,
  deleteUser,
  blockUser,
  unBlockUser,
};
export default adminService;
