import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import adminReducer from '../features/admin/adminSlice'
import postReducer from '../features/post/postSlice'



export const store = configureStore({
    reducer: {
     auth:authReducer,
     users:adminReducer,
     posts:postReducer,
    },
  }); 