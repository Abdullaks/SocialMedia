import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { Login as LoginIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import OTPInput, { ResendOTP } from "otp-input-react";
import OtpTimer from "otp-timer";
import { register, reset } from "../features/auth/authSlice";
const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.name = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.mobile) {
    errors.mobile = "Required";
  } else if (values.mobile.length != 10) {
    errors.mobile = "phone no. must be 10 character long ";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "password must be 8 character long ";
  }
  if (!values.confirmpassword) {
    errors.confirmpassword = "Required";
  } else if (values.password !== values.confirmpassword) {
    errors.confirmpassword = "password does not match ";
  }
  return errors;
};
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [OTP, setOTP] = useState("");
  const [userData, setUserData] = useState({});
  const [open, setOpen] = useState(false);
  // Formik starts
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      mobile: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      console.log(values);
      setUserData(values);
      const checkUser = await axios.post("/api/auth/checkUser", {
        email: values.email,
        username: values.username,
      });
      if (checkUser.data == "emailExist") {
        toast.error("Email is already taken");
      }else if (checkUser.data == "nameExist") {
        toast.error("username is already taken");
      }else{
        const otpData = await axios.post("/api/auth/otpSend", {
          mobile: values.mobile,
        });
        if (otpData.data == "success") {
          setOpen(true);
        }
      }
     
    },
  });
  //formik ends
  const validateOtp = async (e) => {
    e.preventDefault();
    console.log(OTP.length);
    if (OTP.length === 4) {
      console.log(userData);
      const inOtpData = await axios.post("/api/auth/otpConfirmation", {
        mobile: userData.mobile,
        otp: OTP,
      });
      if (inOtpData.data == "otpConfirmed") {
        dispatch(register(userData));
      } else {
        console.log("otp not confirmed");
      }
    } else {
      console.log(" OTP is Not 4 digit");
    }
  };
  const { user, isLoading, isError,isAdmin, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isAdmin) {
      navigate("/admin");
    }
    if (user||isSuccess) {
      navigate("/home");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

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
            SignUp
          </Typography>

          <TextField
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            margin="normal"
            type={"text"}
            variant="outlined"
            placeholder="User Name"
            sx={{
              width: { sm: 200, md: 300 },
              "& .MuiInputBase-root": {
                height: 60,
              },
            }}
          />
          {formik.errors.name ? (
            <Typography color="error.main" variant="body1">
              {formik.errors.username}
            </Typography>
          ) : null}

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
            name="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            margin="normal"
            type={"mobile"}
            variant="outlined"
            placeholder="Phone Number"
            sx={{
              width: { sm: 200, md: 300 },
              "& .MuiInputBase-root": {
                height: 60,
              },
            }}
          />
          {formik.errors.mobile ? (
            <Typography color="error.main" variant="body1">
              {formik.errors.mobile}
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
          <TextField
            name="confirmpassword"
            value={formik.values.confirmpassword}
            onChange={formik.handleChange}
            margin="normal"
            type={"password"}
            variant="outlined"
            placeholder="confirm password"
            sx={{
              width: { sm: 200, md: 300 },
              "& .MuiInputBase-root": {
                height: 60,
              },
            }}
          />
          {formik.errors.confirmpassword ? (
            <Typography color="error.main" variant="body1">
              {formik.errors.confirmpassword}
            </Typography>
          ) : null}

          <Button
            endIcon={<LoginIcon />}
            type="submit"
            sx={{ marginTop: 1, borderRadius: 1, bgcolor: "navyblue" }}
            variant="contained"
          >
            SIGNUP
          </Button>
          <Button sx={{ marginTop: 1, borderRadius: 1 }}>
            <Link to="/"> Login </Link>
          </Button>
        </Box>
      </form>

      <StyledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          p={3}
          textAlign="center"
          bgcolor={"background.default"}
          color={"text.primary"}
          borderRadius={3}
          sx={{
            width: { sm: 300, md: 400 },
          }}
        >
          <Typography variant="h6">Enter Your OTP</Typography>
          <Divider
            textAlign="center"
            sx={{
              width: "100%",

              bgcolor: "background.paper",
              mt: { xs: 1, md: 2 },
              mb: 2,
              color: "gray",
            }}
          ></Divider>
          <Box sx={{ marginLeft: { sm: "50px", md: "100px" } }}>
            <OTPInput
              value={OTP}
              inputStyles={{
                width: "2rem",
                height: "2rem",
                margin: "20px 0.25rem",
                fontSize: "2rem",
                borderRadius: 4,
                border: "1px solid #051b34",
              }}
              onChange={setOTP}
              autoFocus
              OTPLength={4}
              otpType="number"
              disabled={false}
            />
          </Box>
          <OtpTimer
            seconds={0}
            minutes={2}
            ButtonText="Resend OTP"
            buttonColor={"black"}
            background={"none"}          />
          <Divider
            textAlign="center"
            sx={{
              width: "100%",
              // width: { sm: 200, md: 300 },
              bgcolor: "background.paper",
              mt: { xs: 1, md: 2 },
              mb: 2,
              color: "gray",
            }}
          ></Divider>

          <Button
            type="submit"
            onClick={(e) => {
              validateOtp(e);
            }}
            sx={{
              mt: 2,
              borderRadius: 1,
              "&:hover": {
                backgroundColor: "#fff",
                color: "#3c52b2",
              },
              color: "#fff",
              bgcolor: "#1876d2",
            }}
            variant="outlined"
          >
            validate
          </Button>
        </Box>
      </StyledModal>
    </div>
  );
};

export default Signup;
