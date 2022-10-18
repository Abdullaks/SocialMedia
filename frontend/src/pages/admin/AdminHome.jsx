import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminFeed from "../../components/admin/AdminFeed";
import AdminNavbar from "../../components/admin/AdminNavbar";
function AdminHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.auth);
  useEffect(() => {
    if (admin) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }, [admin, navigate, dispatch]);
  return (
    <>
      <Box>
        <AdminNavbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <AdminSidebar />
          <AdminFeed />
        </Stack>
      </Box>
    </>
  );
}

export default AdminHome;
