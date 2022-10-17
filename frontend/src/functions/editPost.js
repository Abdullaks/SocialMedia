import axios from "axios";
const baseUrl = "http://localhost:8800";

export const editPost = async (
  type,
  background,
  text,
  images,
  user,
  token,
  id
) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/api/post/editPost/${id}`,
      {
        type,
        background,
        text,
        images,
        user,
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

// Get A post
export const getAPost = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `${baseUrl}/api/post/getAPost/` + id,
    config
  );
  return response.data;
};
