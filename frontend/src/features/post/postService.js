import axios from "axios";

//Get All posts
const getAllposts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/api/post/getAllPosts", config);
  return response.data;
};

//Comment on Post
const comment = async (Data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post("/api/post/comment", Data, config);
  return response.data;
};

//Save Post
const savePost = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put("/api/post/savePost/" + id, {}, config);
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
  const response = await axios.delete("/api/post/deletePost/" + postId, config);
  console.log("response ",response);
  return response.data;
};

const postService = {
  getAllposts,
  comment,
  savePost,
  deletePost,
};
export default postService;




