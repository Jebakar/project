import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import adminlogo from "../images/adminlogo.png";
import { FaLock, FaUser } from "react-icons/fa";
import { GrKey } from "react-icons/gr";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [firstName, setFirstName] = useState(""); // firstName instead of username
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send firstName and password to the backend for authentication
      const res = await axios.post("http://localhost:9000/api/admin/login", {
        firstName,  // Send 'firstName' instead of email
        password,
      });

      // On success, store the token in localStorage
      localStorage.setItem("adminToken", res.data.token);
      alert("Login successful");
      navigate("/admin/dashboard");  // Redirect to dashboard on successful login
    } catch (err) {
      // Handle errors if login fails
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div id="container" className="font">
      <header className="navbar navbar-static-top" id="header">
        <div className="container-fluid">
          <div id="header-logo" className="navbar-header" style={{ padding: "10px" }}>
            <a href="/admin/login" className="navbar-brand">
              <img src={adminlogo} alt="Admin" title="Admin" />
            </a>
          </div>
        </div>
      </header>

      <div id="content">
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-sm-offset-4 col-sm-4 mx-auto">
              <div className="panel panel-default border rounded shadow-sm">
                <div className="panel-heading mb-3 p-3">
                  <h1 className="panel-title">
                    <FaLock style={{ marginRight: "5px" }} />
                    Please enter your login details.
                  </h1>
                </div>
                <div className="panel-body p-3">
                  {error && (
                    <div className="alert alert-danger alert-dismissible" style={{ fontSize: "12px" }}>
                      <i className="fa fa-exclamation-circle"></i> {error}
                      <button type="button" className="close" onClick={() => setError("")}>
                        ×
                      </button>
                    </div>
                  )}
                  <form onSubmit={handleLogin}>
                    <div className="form-group ad">
                      <label htmlFor="input-firstName">Username</label>
                      <div className="input-group">
                        <span className="input-group-addon px-2 bg-light border">
                          <FaUser style={{ marginTop: "10px" }} />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="input-firstName"
                          placeholder="Admin"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group ad">
                      <label htmlFor="input-password">Password</label>
                      <div className="input-group">
                        <span className="input-group-addon px-2 bg-light border">
                          <FaLock style={{ marginTop: "10px" }} />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          id="input-password"
                          placeholder="********"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <span className="help-block">
                        <Link to="/admin/forgot-password" style={{textDecoration:"none"}}>Forgotten Password</Link>
                      </span>
                    </div>
                    <div className="text-right" style={{ textAlign: "end" }}>
                      <button type="submit" className="btn btn-primary" style={{borderRadius:"0"}}>
                        <GrKey />
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <footer className="text-center mt-4" style={{ fontSize: "13px" }}>
                <a href="/" style={{ textDecoration: "none" }}>
                  Pullo
                </a>{" "}
                © 2024-2025 All Rights Reserved.
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
