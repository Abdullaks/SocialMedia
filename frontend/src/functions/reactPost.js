import axios from "axios";
export const reactPost = async (postId, react, token) => {
  try {
    const { data } = await axios.put(
      '/api/post/reactPost',
      {
        postId,
        react,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};
