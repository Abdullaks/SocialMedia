import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "./profileService";

 
const initialState = {
    profile: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  };



//Get Profile 
// export const getAllposts = createAsyncThunk(
//     "post/getAllposts",
//     async (_, thunkAPI) => {
//       try {
//         const token = thunkAPI.getState().auth.user.token;
//         return await postService.getAllposts(token);
//       } catch (error) {
//         const message =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();
//         return thunkAPI.rejectWithValue(message);
//       }
//     }
//   );


export function profileReducer(state, action) {
    switch (action.type) {
      case "PROFILE_REQUEST":
        return { ...state, loading: true, error: "" };
      case "PROFILE_SUCCESS":
        return {
          ...state,
          loading: false,
          profile: action.payload,
          error: "",
        };
      case "PROFILE_ERROR":
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  }


  export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
    //   builder
    //     .addCase(getAllposts.pending, (state) => {
    //       state.isLoading = true;
    //     })
    //     .addCase(getAllposts.fulfilled, (state, action) => {
    //       state.isLoading = false;
    //       state.isSuccess = true;
    //       state.posts = action.payload;
    //     })
    //     .addCase(getAllposts.rejected, (state, action) => {
    //       state.isLoading = false;
    //       state.isError = true;
    //       state.message = action.payload;
    //     })
        
    },
  });
  
  export const { reset } = profileSlice.actions;
  export default profileSlice.reducer;