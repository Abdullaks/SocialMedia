import axios from "axios";
const baseUrl = "http://localhost:8800";

//Get All posts
const getAllposts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${baseUrl}/api/post/getAllPosts`, config);
  return response.data;
};


//Comment on Post
const comment = async (Data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${baseUrl}/api/post/comment`, Data, config);
  return response.data;
};

//Save Post
const savePost = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${baseUrl}/api/post/savePost/` + id,
    {},
    config
  );
  return response.data;
};

//Delete post
const deletePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log("service ",config);
  const response = await axios.delete(`${baseUrl}/api/post/deletePost/` + postId, config);
  return response.data;                
};
//Edit post
// const editPost = async (postId,data, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   console.log("service ",config);
//   const response = await axios.put("/api/post/editPost/" + postId,data, config);
//   console.log("response ",response);
//   return response.data;
// };

const postService = {
  getAllposts,
  comment,
  savePost,
  deletePost,
  // editPost,
};
export default postService;




