






import axios from "axios";




export const search = async (searchTerm, token) => {
    console.log("search called");
  try {
    const { data } = await axios.post(
      `/api/user/search/${searchTerm}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
