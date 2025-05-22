import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [signupSuccessMessage, setSignupSuccessMessage] = useState("");
  const [signupErrorMessage, setSignupErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      number: "",
      dob: "",
      gender: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().min(2).required("First name is required"),
      lastName: Yup.string().min(2).required("Last name is required"),
      email: Yup.string().email().required("Email is required"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .matches(/[0-9]/, "Must include a number")
        .matches(/[a-z]/, "Must include lowercase")
        .matches(/[A-Z]/, "Must include uppercase")
        .matches(/[^\w]/, "Must include a symbol")
        .required("Password is required"),
      number: Yup.string()
        .matches(/^\d{10}$/, "Must be 10 digits")
        .required("Mobile number is required"),
      dob: Yup.date().max(new Date()).required("Date of birth is required"),
      gender: Yup.string().required("Please select your gender"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:9000/signup", values);
        setSignupSuccessMessage("Successfully signed up! Redirecting to Sign In...");
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } catch (error) {
        console.error("Error during signup:", error.response || error.message);
        const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
        setSignupErrorMessage(errorMessage);
      }
    },
  });

  return (
    <div className="signup-bg">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card p-4 glass-card">
              <h3 className="text-center mb-4">Sign Up</h3>

              {/* Success Message */}
              {signupSuccessMessage && (
                <div className="alert alert-success mb-3">{signupSuccessMessage}</div>
              )}

              {/* Error Message */}
              {signupErrorMessage && (
                <div className="alert alert-danger mb-3">{signupErrorMessage}</div>
              )}

              <form onSubmit={formik.handleSubmit}>
                {/* First Name */}
                <div className="mb-3">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    {...formik.getFieldProps("firstName")}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <div className="text-danger small">{formik.errors.firstName}</div>
                  )}
                </div>

                {/* Last Name */}
                <div className="mb-3">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    {...formik.getFieldProps("lastName")}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <div className="text-danger small">{formik.errors.lastName}</div>
                  )}
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-danger small">{formik.errors.email}</div>
                  )}
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    {...formik.getFieldProps("password")}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-danger small">{formik.errors.password}</div>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="mb-3">
                  <label>Mobile Number</label>
                  <input
                    type="tel"
                    name="number"
                    className="form-control"
                    {...formik.getFieldProps("number")}
                  />
                  {formik.touched.number && formik.errors.number && (
                    <div className="text-danger small">{formik.errors.number}</div>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="mb-3">
                  <label htmlFor="dob" className="form-label">Date of Birth</label>
                  <div
                    className="form-control p-0"
                    onClick={() => document.getElementById("dob").showPicker?.()}
                    style={{ cursor: "pointer" }}
                  >
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      className="border-0 w-100 p-2"
                      style={{ backgroundColor: "transparent" }}
                      {...formik.getFieldProps("dob")}
                    />
                  </div>
                  {formik.touched.dob && formik.errors.dob && (
                    <div className="text-danger small">{formik.errors.dob}</div>
                  )}
                </div>

                {/* Gender */}
                <div className="mb-3">
                  <label className="form-label">Gender</label>

                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="genderMale"
                      name="gender"
                      value="Male"
                      checked={formik.values.gender === "Male"}
                      onChange={formik.handleChange}
                    />
                    <label className="form-check-label" htmlFor="genderMale">
                      Male
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="genderFemale"
                      name="gender"
                      value="Female"
                      checked={formik.values.gender === "Female"}
                      onChange={formik.handleChange}
                    />
                    <label className="form-check-label" htmlFor="genderFemale">
                      Female
                    </label>
                  </div>

                  {formik.touched.gender && formik.errors.gender && (
                    <div className="text-danger small">{formik.errors.gender}</div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
