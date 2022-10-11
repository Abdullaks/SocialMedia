import axios from "axios";

//Get user
const getAllUsers = async (search, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `/api/user/searchChat?search=${search}`,
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

  const response = await axios.post("/api/chat", { userId }, config);
  return response.data;
};

const chatService = {
  getAllUsers,
  createChat,
};
export default chatService;
