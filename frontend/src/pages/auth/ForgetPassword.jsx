import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { updatePassword } from "../../features/auth/authSlice";

const validate = (values) => {
  const errors = {};
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

function ForgetPassword() {
  const dispatch = useDispatch();
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
      const mobile = JSON.parse(localStorage.getItem("mobile"));

      dispatch(
        updatePassword({
          mobile,
          password: values.password,
        })
      );
      await localStorage.removeItem("mobile");
    },
  });
  //formik ends

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
            Change Password
          </Typography>

          <TextField
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            margin="normal"
            type={"password"}
            variant="outlined"
            placeholder=" Enter new Password"
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
            placeholder="Confirm password"
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
            type="submit"
            sx={{ marginTop: 1, borderRadius: 1, bgcolor: "navyblue" }}
            variant="contained"
          >
            Confirm
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default ForgetPassword;
