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
export const getProfile = createAsyncThunk(
    "user/getProfile",
    async (username, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await profileService.getProfile(username,token);
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
                                     

//update Profile  Bio
export const updateBio = createAsyncThunk(
  "user/updateBio",
  async (infos, thunkAPI) => {
    try {
      console.log(infos,"slice called");
      const token = thunkAPI.getState().auth.user.token;
      return await profileService.updateBio(infos,token);
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

  


  export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(getProfile.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getProfile.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.profile = action.payload;
        })
        .addCase(getProfile.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        
    },
  });
  
  export const { reset } = profileSlice.actions;
  export default profileSlice.reducer;