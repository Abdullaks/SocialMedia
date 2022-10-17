import "./style.css";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";
import { login, adminLogin, reset } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
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
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const userData = {
        email: values.email,
        password: values.password,
      };
      if (userData.email === "admin123@gmail.com") {
        dispatch(adminLogin(userData));
        setLoading(false);
      } else {
        dispatch(login(userData));
        setLoading(false);
      }
    },
  });
  //formik ends
  const { user, isError, isSuccess, isAdmin, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isAdmin) {
      navigate("/admin");
    }
    if (user || isSuccess) {
      navigate("/home");
    }
    dispatch(reset());
  }, [user, isError, isAdmin, isSuccess, message, navigate, dispatch]);

  return (
    <>
      <div className="login">
        <div className="login_wrapper">
          <div className="login_wrap">
            <div className="login_1">
              <img src="../../icons/facebook.svg" alt="" />
              <span></span>
            </div>
            <div className="login_2">
              <div className="login_2_wrap">
                <form onSubmit={formik.handleSubmit}>
                  <div className="input_wrap">
                    <input
                      className="input_border"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      type={"email"}
                      placeholder="Email"
                    />
                    {formik.errors.email ? (
                      <div className="error_text">{formik.errors.email}</div>
                    ) : null}
                    <input
                      className="input_border"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      type={"password"}
                      placeholder="Password"
                    />
                    {formik.errors.password ? (
                      <div className="error_text">{formik.errors.password}</div>
                    ) : null}
                  </div>
                  <button type="submit" className="blue_btn">
                    Log In
                  </button>
                </form>
                <Link to="/verifyMobile" className="forgot_password">
                  Forgotten password?
                </Link>
                <DotLoader color="#1876f2" loading={loading} size={30} />
                <div className="sign_splitter"></div>
                <Link to="/signup">
                  <span
                    className="blue_btn "
                    style={{ backgroundColor: "#42b72a", border: "none" }}
                  >
                    Create Account
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
