// import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
// import adminService from './adminService'

// const initialState={
//     users: [],
//     isError: false,
//     isSuccess: false,
//     isLoading: false,
//     message: "",
//   }

// //Get All users 
// export const geAllUsers=createAsyncThunk(
//     'admin/getAllUsers', async(_,thunkAPI)=>{
//         try {
//             const token=thunkAPI.getState().auth.user.token
//             return await adminService.geAllUsers(token)
//         } catch (error) {
//             const message =
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString()
//           return thunkAPI.rejectWithValue(message) 
//         }
//     }
// )







//   export const adminSlice=createSlice({
//     name:'users',
//     initialState,
//     reducers:{
//         reset:(state)=>initialState,
//     },
//     extraReducers:(builder)=>{
//         builder
//         .addCase(geAllUsers.pending,(state)=>{
//             state.isLoading=true
//         })
//         .addCase(geAllUsers.fulfilled,(state,action)=>{
//             state.isLoading=false
//             state.isSuccess=true
//             state.users=action.payload

//         }) 
//         .addCase(geAllUsers.rejected,(state,action)=>{
//             state.isLoading=false 
//             state.isError=true
//             state.message=action.payload
//         })
        
        
//     },
// })












//   export const {reset}=adminSlice.actions
// export default adminSlice.reducer