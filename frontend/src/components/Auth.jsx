// import { Box, Button, TextField, Typography } from "@mui/material";
// import React from "react";
// import { useFormik } from "formik";
// import { Login as LoginIcon } from "@mui/icons-material";
// import {Link} from 'react-router-dom'
// const validate = (values) => {
//   const errors = {};

//   if (!values.email) {
//     errors.email = "Required";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = "Invalid email address";
//   }

//   if (!values.password) {
//     errors.password = "Required";
//   } else if (values.password.length < 8) {
//     errors.password = "password must be 8 character long ";
//   }
//   return errors;
// };

// function Auth() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   // Formik starts
//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validate,
//     onSubmit: async (values) => {
//       const userData = {
//         email: values.email,
//         password: values.password,
//       };
//     //   dispatch(login(userData));
//     },
//   });
//   //formik ends
//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit}>
//         <Box
//           display="flex"
//           flexDirection={"column"}
//           margin="auto"
//           maxWidth={400}
//           alignItems="center"
//           justifyContent={"center"}
//           marginTop={5}
//           padding={3}
//           borderRadius={5}
//           boxShadow={"5px 5px 10px #ccc"}
//           sx={{
//             ":hover": {
//               boxShadow: "10px 10px 20px #ccc",
//             },
//           }}
//         >
//           <Typography
//             sx={{ color: "navyblue" }}
//             variant="h3"
//             padding={3}
//             textAlign="center"
//           >
//             Login
//           </Typography>

//           <TextField
//             name="email"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             margin="normal"
//             type={"email"}
//             variant="outlined"
//             placeholder="Email"
//             sx={{
//               width: { sm: 200, md: 300 },
//               "& .MuiInputBase-root": {
//                 height: 60,
//               },
//             }}
//           />
//           {formik.errors.email ? (
//             <Typography variant="body1">{formik.errors.email}</Typography>
//           ) : null}

//           <TextField
//             name="password"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             margin="normal"
//             type={"password"}
//             variant="outlined"
//             placeholder="Password"
//             sx={{
//               width: { sm: 200, md: 300 },
//               "& .MuiInputBase-root": {
//                 height: 60,
//               },
//             }}
//           />
//           {formik.errors.password ? (
//             <Typography variant="body1">{formik.errors.password}</Typography>
//           ) : null}

//           <Button
//             endIcon={<LoginIcon />}
//             type="submit"
//             sx={{ marginTop: 1, borderRadius: 1, bgcolor: "navyblue" }}
//             variant="contained"
//           >
//             login
//           </Button>
//           <Link to='/signup'> Signup </Link>
//         </Box>
//       </form>
//     </div>
//   );
// }

// export default Auth;
