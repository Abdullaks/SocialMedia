import React, { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import OTPInput from "otp-input-react";
import OtpTimer from "otp-timer";
import { useNavigate } from "react-router-dom";
const baseUrl = "http://localhost:8800";
const validate = (values) => {
  const errors = {};

  if (!values.mobile) {
    errors.mobile = "Required";
  } else if (values.mobile.length != 10) {
    errors.mobile = "phone no. must be 10 character long ";
  }
  return errors;
};
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
function VerifyMobile() {
  const [OTP, setOTP] = useState("");
  const [mobile, setMobile] = useState({});
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // Formik starts
  const formik = useFormik({
    initialValues: {
      mobile: "",
    },
    validate,
    onSubmit: async (values) => {
      setMobile(values);
      const verifyMobile = await axios.post(
        `${baseUrl}/api/auth/verifyMobile`,
        {
          mobile: values.mobile,
        }
      );
      if (verifyMobile.data == "noMobile") {
        toast.error(" User not registered,Please check Mobile Number ");
      } else {
        localStorage.setItem("mobile", JSON.stringify(verifyMobile.data));
        const otpData = await axios.post(`${baseUrl}/api/auth/otpSend`, {
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
    if (OTP.length === 4) {
      const inOtpData = await axios.post(
        `${baseUrl}/api/auth/otpConfirmation`,
        {
          mobile: mobile.mobile,
          otp: OTP,
        }
      );
      console.log(inOtpData);
      if (inOtpData.data == "otpConfirmed") {
        navigate("/forgetPassword");
      } else {
        console.log("otp not Correct");
      }
    } else {
      console.log(" OTP is Not 4 digit");
    }
  };
  return (
    <div>
      {" "}
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
            variant="h4"
            padding={3}
            textAlign="center"
          >
            Verify Phone
          </Typography>
          <TextField
            name="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            margin="normal"
            type={"mobile"}
            variant="outlined"
            placeholder="Enter your Phone Number"
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
          <Button
            type="submit"
            sx={{ marginTop: 1, borderRadius: 1, bgcolor: "navyblue" }}
            variant="contained"
          >
            Send OTP
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
            minutes={10}
            ButtonText="Resend OTP"
            buttonColor={"black"}
            background={"none"}
          />
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
            Validate
          </Button>
        </Box>
      </StyledModal>
    </div>
  );
}

export default VerifyMobile;
