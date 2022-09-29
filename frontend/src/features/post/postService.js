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
const comment = async (Data,token) => { 
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post("/api/post/comment",Data, config);
  return response.data;
};



const postService = {
    getAllposts,
    comment,
};
export default postService;
