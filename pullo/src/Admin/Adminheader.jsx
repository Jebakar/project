import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import profileimg from "../images/profile-45x45.png";
import adminlogo from "../images/adminlogo.png";
import Navigation from "./Navigation";
import Dashboard from "./Dashboard";

function Adminheader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/admin/login";
  };

  return (
    <div>
      <header className="navbar-header  border-bottom d-flex justify-content-between align-items-center font" >
        <div className="d-flex align-items-center ms-3 p-3" style={{borderRight:"1px solid #eee"}}>
          <a href="/admin/login" className="navbar-brand">
            <img src={adminlogo} alt="Admin" title="Admin" />
          </a>
        </div>

        <div className="d-flex align-items-center position-relative me-3 " ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="btn btn-link dropdown-toggle d-flex align-items-center text-decoration-none"
            style={{ color: "#6d6d6d" }}
          >
            <img
              src={profileimg}
              alt="Demo Admin"
              className="img-circle me-2"
              width="32"
              height="32"
            />
            <span className="ms-1" style={{ fontSize: "13px" }}>Demo Admin</span>
          </button>

          {isDropdownOpen && (
            <ul className="dropdown-menu show position-absolute  mt-2" style={{ zIndex: "1000" ,top:"100%"}}>
              <li>
                <a
                  href="https://www.ecomdeveloper.com/demo/admin/index.php?route=common/profile&user_token=UepP4OhcLUMwA2IIzORC2MTBJw866Or0"
                  className="dropdown-item d-flex align-items-center"
                >
                  <FaUserCircle className="me-2" />
                  Your Profile
                </a>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li className="dropdown-header">Stores</li>
              <li>
                <a href="#" className="dropdown-item">
                  MyShop
                </a>
              </li>
            </ul>
          )}

          <a
            onClick={handleLogout}
            className=" ms-3"
            style={{ textDecoration: "none", fontSize: "13px", cursor: "pointer", color:"#6d6d6d"}}
          >
            <FaSignOutAlt className="me-2" />
            Logout
          </a>
        </div>
      </header>

      {/* <main className="p-4">
        <h2>Welcome to Admin Dashboard</h2>
        <p>This is your main content area.</p>
      </main> */}
      {/* <Navigation /> */}
       {/* <Dashboard />  */}
    </div>
  );
}

export default Adminheader;
