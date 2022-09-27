import axios from "axios";

//Get profile
const getProfile = async (username, token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/api/user/getProfile/" + username, config);
  return response.data;
};














const profileService = {
  getProfile,
};
export default profileService;
