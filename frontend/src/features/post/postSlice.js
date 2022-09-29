import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";


const initialState = {
    posts: [],
    comments:[],
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

  //Comment
export const comment = createAsyncThunk(
  "post/comment",
  async (Data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.comment(Data,token);
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

  //like
  // export const like = createAsyncThunk(
  //   "post/like",
  //   async (Data, thunkAPI) => {
  //     try {
  //       const token = thunkAPI.getState().auth.user.token;
  //       return await postService.like(Data,token);
  //     } catch (error) {
  //       const message =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();
  //       return thunkAPI.rejectWithValue(message);
  //     }
  //   }
  // );



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
          state.posts = action?.payload;
        })
        .addCase(getAllposts.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(comment.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(comment.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.comments.push(action?.payload)
        })
        .addCase(comment.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        
    },
  });
  
  export const { reset } = postSlice.actions;
  export default postSlice.reducer;