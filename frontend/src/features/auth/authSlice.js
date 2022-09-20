import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));
const admin = JSON.parse(localStorage.getItem("admin"));
const initialState = {
  user: user ? user : null,
  admin: admin ? admin : null,
  isAdmin: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
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

//LOGIN USER
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//LOGIN ADMIN
export const adminLogin = createAsyncThunk("auth/adminLogin", async (admin, thunkAPI) => {
  try {
    return await authService.adminLogin(admin);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
//lOGOUT ADMIN
export const adminLogout = createAsyncThunk("auth/adminLogout", async () => {
  await authService.adminLogout();
});

//lOGOUT USER
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});


export const updatePassword = createAsyncThunk("auth/updatePassword", async (Data, thunkAPI) => {
  try {
    return await authService.updatePassword(Data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});



export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isAdmin = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(adminLogin.pending, (state) => {
              state.isLoading = true
          })
          .addCase(adminLogin.fulfilled, (state, action) => {
              state.isLoading = false
              state.isAdmin = true
              state.admin = action.payload
          })
          .addCase(adminLogin.rejected, (state, action) => {
              state.isLoading = false
              state.isError = true
              state.message = action.payload
              state.admin = null
          })
          .addCase(adminLogout.fulfilled, (state) => {
            state.admin = null
        })

    }

})









export const { reset } = authSlice.actions;
export default authSlice.reducer;
