import axios from "axios";
const baseUrl = "http://localhost:8800";

//Get profile
const getProfile = async (username, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${baseUrl}/api/user/getProfile/` + username, config);
  return response.data;
};

//update profile Bio
const updateBio = async (infos, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${baseUrl}/api/user/updateBio`,
    infos,
    config
  );
  return response.data;
};

//Follow user
const followUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${baseUrl}/api/user/follow/` + id,
    {},
    config
  );
  return response.data;
};

//Unfollow User
const unFollowUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${baseUrl}/api/user/unfollow/` + id,
    {},
    config
  );
  return response.data;
};

// export const f = async (id, token) => {
//   try {
//     const { data } = await axios.put(
//       `${process.env.REACT_APP_BACKEND_URL}/follow/${id}`,
//       {},

//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     console.log(data);
//     return `ok`;
//   } catch (error) {
//     console.log(error.response.data.message);
//     return error.response.data.message;
//   }
// };
// export const unfollow = async (id, token) => {
//   try {
//     const { data } = await axios.put(
//       `${process.env.REACT_APP_BACKEND_URL}/unfollow/${id}`,
//       {},

//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return `ok`;
//   } catch (error) {
//     return error.response.data.message;
//   }
// };


const search = async (searchTerm, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${baseUrl}/api/user/search` + searchTerm,
    {},
    config
  );
  return response.data;
};







const profileService = {
  getProfile,
  updateBio,
  followUser,
  unFollowUser,
  search,

};
export default profileService;
