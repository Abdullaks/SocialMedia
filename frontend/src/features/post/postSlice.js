import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";


const initialState = {
    posts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  };



//Get All posts
export const getAllposts = createAsyncThunk(
    "post/getAllposts",
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await postService.getAllposts(token);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );



  export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllposts.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllposts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.posts = action.payload;
        })
        .addCase(getAllposts.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        
    },
  });
  
  export const { reset } = postSlice.actions;
  export default postSlice.reducer;