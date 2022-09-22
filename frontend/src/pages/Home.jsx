import React, { useState, useEffect } from "react";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";
import Navbar from "../components/Navbar";
import Add from "../components/Add";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/header/index";
function Home() {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Box bgcolor={"background.default"} color={"text.primary"}>
          <Navbar />
          <Header />
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar mode={mode} setMode={setMode} />
            <Feed />
            <Rightbar />
          </Stack>
          <Add />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Home;
