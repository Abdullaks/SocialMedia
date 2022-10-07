import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import adminReducer from '../features/admin/adminSlice'
import postReducer from '../features/post/postSlice'
import profileReducer from '../features/profile/profileSlice'
import chatReducer from '../features/chat/chatSlice'

export const store = configureStore({
    reducer: {
     auth:authReducer,
     users:adminReducer,
     posts:postReducer,
     profile:profileReducer,
     chat:chatReducer,
    },
  }); 


  