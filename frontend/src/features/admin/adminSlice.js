import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import adminService from './adminService'

const initialState={
    users: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  }

//Get All users 
export const  getAllUsers=createAsyncThunk(
    'admin/getAllUsers', async(_,thunkAPI)=>{
        try {
            const token=thunkAPI.getState().auth.admin.token
            return await adminService.getAllUsers(token)
        } catch (error) {
            const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          return thunkAPI.rejectWithValue(message) 
        }
    }
)

 
//Delete user  
export const deleteUser=createAsyncThunk(
    'admin/deleteUser',async(id,thunkAPI)=>{
        console.log(id,'deleteUser called  with slice')
        try {
            const token = thunkAPI.getState().auth.admin.token
             return await adminService.deleteUser(id,token)
        } catch (error) {
            const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          return thunkAPI.rejectWithValue(message)
        }
    }
    )
    
//SLICE
export const adminSlice=createSlice({
    name:'users',
    initialState,
    reducers:{
        reset:(state)=>initialState,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAllUsers.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getAllUsers.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.users=action.payload

        }) 
        .addCase(getAllUsers.rejected,(state,action)=>{
            state.isLoading=false 
            state.isError=true
            state.message=action.payload
        })
        .addCase(deleteUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.users=state.users.filter((user)=>user._id !==action.payload.id)
        })
        .addCase(deleteUser.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        
        
    },
})

  export const {reset}=adminSlice.actions
export default adminSlice.reducer