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




//update profile Bio
const updateBio = async (infos, token) => {
  console.log(infos,"service called");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log("config done");
  const response = await axios.put("/api/user/updateBio" ,infos ,config);
  console.log(response.data,"response");

  return response.data;
};














const profileService = {
  getProfile,
  updateBio,
};
export default profileService;
