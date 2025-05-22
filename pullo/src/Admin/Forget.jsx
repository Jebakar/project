import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import adminlogo from "../images/adminlogo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { MdEmail } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { FaReply } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("Warning: The E-Mail Address was not found in our records, please try again!");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate error for now; replace with real API call
    if (email !== "admin@example.com") {
      setError("Warning: The E-Mail Address was not found in our records, please try again!");
    } else {
      setError("");
      alert("Password reset link sent!");
    }
  };

  return (
    <div id="container font">
      <header id="header" className="navbar navbar-static-top">
        <div className="container-fluid">
          <div id="header-logo" className="navbar-header p-2">
            <a href="/admin/login" className="navbar-brand">
              <img src={adminlogo} alt="OpenCart" title="OpenCart" />
            </a>
          </div>
        </div>
      </header>

      <div id="content">
        <div className="container-fluid mt-4">
          <div className="row justify-content-center">
            <div className="col-sm-4">
              <div className="panel panel-default border rounded shadow-sm">
                <div className="panel-heading p-3">
                  <h1 className="panel-title" style={{fontWeight:"normal"}}>
                  <FontAwesomeIcon icon={faRotateRight} style={{marginRight:"5px", }}/>

                   
                    Forgot Your Password?
                  </h1>
                </div>
                <div className="panel-body p-3">
                  {error && (
                    <div className="alert alert-danger alert-dismissible" style={{ fontSize: "13px" }}>
                      
                      {error}
                      <button
                        type="button"
                        className="close"
                        onClick={() => setError("")}
                        style={{ border: "none", background: "transparent", float: "right" }}
                      >
                        ×
                      </button>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="input-email" style={{fontWeight:"bold", color:"#545454", fontSize:"13px"}}>E-Mail Address</label>
                      <div className="input-group">
                        <span className="input-group-addon px-2 bg-light border ">
                        <MdEmail style={{color:"#555"}}/>
                        </span>
                        <input style={{fontSize:"13px"}}
                          type="email"
                          name="email"
                          value={email}
                          placeholder="E-Mail Address"
                          id="input-email"
                          className="form-control"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="text-right mt-3" style={{textAlign:"right"}}>
                      <button type="submit" className="btn btn-primary me-2" style={{fontSize:"13px", borderRadius:"0px"}}>
                      <FaCheck style={{marginRight:"5px"}}/>
                        Reset
                      </button>
                      <a 
                        href="/admin" 
                        className="btn btn-secondary" 
                        style={{fontSize:"13px", backgroundColor:"white", borderRadius:"0px"}}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Cancel"
                        onClick={() => navigate("/admin/login")}
>
                      <FaReply style={{color:"#545454"}}/>
                      </a>
                    </div>
                  </form>
                </div>
              </div>
              <footer className="text-center mt-4" style={{ fontSize: "13px" }}>
                <a href="/" style={{ textDecoration: "none" }}>MyShop</a> © 2024-2025 All Rights Reserved.
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
