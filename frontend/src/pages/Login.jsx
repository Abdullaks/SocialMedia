import { Box, Button, TextField, Typography } from "@mui/material";
import React,{ useEffect } from "react";
import { useFormik } from "formik";
import { Login as LoginIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login,adminLogin, reset } from "../features/auth/authSlice";
import {toast} from 'react-toastify'
const ADMIN_EMAIL=process.env.ADMIN_EMAIL
const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "password must be 8 character long ";
  }
  return errors;
};

const Login = () => {                   
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  // Formik starts
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      const userData = {
        email: values.email,
        password: values.password,
      };
      if (userData.email ==="admin123@gmail.com") {
        dispatch(adminLogin(userData));
      }else{
        dispatch(login(userData));
      }
    },
  });
  //formik ends
  const { user, isLoading, isError, isSuccess,isAdmin, message } = useSelector( (state) => state.auth);
      //  console.log(isError)
      //  console.log(message);;
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isAdmin) {
      navigate("/admin");
    }
    if (user ||isSuccess) { 
      navigate("/home");
    }
    dispatch(reset());
  }, [user, isError,isAdmin, isSuccess, message, navigate, dispatch])

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          margin="auto"
          maxWidth={400}
          alignItems="center"
          justifyContent={"center"}
          marginTop={5}
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Typography
            sx={{ color: "navyblue" }}
            variant="h3"
            padding={3}
            textAlign="center"
          >
            Login
          </Typography>

          <TextField
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            margin="normal"
            type={"email"}
            variant="outlined"
            placeholder="Email"
            sx={{
              width: { sm: 200, md: 300 },
              "& .MuiInputBase-root": {
                height: 60,
              },
            }}
          />
          {formik.errors.email ? (
            <Typography color="error.main" variant="body1">
              {formik.errors.email}
            </Typography>
          ) : null}

          <TextField
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            margin="normal"
            type={"password"}
            variant="outlined"
            placeholder="Password"
            sx={{
              width: { sm: 200, md: 300 },
              "& .MuiInputBase-root": {
                height: 60,
              },
            }}
          />
          {formik.errors.password ? (
            <Typography color="error.main" variant="body1">
              {formik.errors.password}
            </Typography>
          ) : null}

          <Button
            endIcon={<LoginIcon />}
            type="submit"
            sx={{ marginTop: 1, borderRadius: 1, bgcolor: "navyblue" }}
            variant="contained"
          >
            login
          </Button>
          <div >

          <Button sx={{ marginTop: 2, borderRadius: 1  }}>
            <Link to="/signup"> Signup </Link>
          </Button>
          <Button sx={{ marginTop: 2 }}>
            <Link to="/verifyMobile"> Forgot Password? </Link>
          </Button>
          </div>
        </Box>
      </form>
    </div>
  );
};

export default Login;
  