import axios from "axios";
const baseUrl = "http://localhost:8800";

//Get user
const getAllUsers = async (search, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${baseUrl}/api/user/searchChat?search=${search}`,
    config
  );
  return response.data;
};

//chat creation
const createChat = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${baseUrl}/api/chat`, { userId }, config);
  return response.data;
};

const chatService = {
  getAllUsers,
  createChat,
};
export default chatService;
