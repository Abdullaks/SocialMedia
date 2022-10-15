import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyMobile from "./pages/auth/VerifyMobile";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Home from "./pages/home/index";
import Profile from "./pages/profile";
import AdminHome from "./pages/admin/AdminHome";
import EditPost from "./components/post/EditPost";
import Chat from "./pages/chat/Chat";
import Friend from "./pages/friends/Friend";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verifyMobile" element={<VerifyMobile />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/editPost/:id" element={<EditPost />} />
          <Route path="/friends" element={<Friend />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
