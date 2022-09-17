import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyMobile from "./pages/VerifyMobile";
import ForgetPassword from "./pages/ForgetPassword";
// import Home from "./pages/home/index";
import Profile from "./pages/profile";
import AdminHome from "./pages/admin/AdminHome";

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
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
