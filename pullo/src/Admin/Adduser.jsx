import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Adminheader from "./Adminheader";
import Navigation from "./Navigation";
import axios from "axios";

function Adduser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    photo: null,
    permissions: {
      dashboard: false,
      catalog: false,
      users: false,
      order: false,
    },
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [name]: checked,
      },
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const { email, username, password, confirmPassword, phone } = formData;
    if (!email || !username || !password || !confirmPassword || !phone) {
      alert("All fields are required");
      return false;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "permissions") {
        data.append(key, JSON.stringify(value));
      } else if (key !== "photo") {
        data.append(key, value);
      }
    });

    if (photo) {
      data.append("photo", photo);
    }

    try {
      await axios.post("http://localhost:9000/api/admin-users", data, {
  headers: { "Content-Type": "multipart/form-data" },
});

      alert("User added successfully");
      navigate("/user");
    } catch (error) {
      console.error("Failed to save user:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <Adminheader />
      <div style={{ display: "flex" }}>
        <Navigation />
        <div style={{ flex: 1 }}>
          <div className="container-fluid mt-4 page-header">
            <div className="pull-right">
              <Link to="/user" className="btn btn-primary" title="Save">
                <i className="fa fa-save"></i>
              </Link>
              <Link to="/user" className="btn btn-default" title="Cancel">
                <i className="fa fa-reply"></i>
              </Link>
            </div>
            <h2 style={{ fontWeight: "300", color: "#4c4d5a" }}>Add User</h2>
          </div>

          <div className="container mt-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title"><i className="fa fa-user"></i> Add User</h3>
              </div>
              <div className="panel-body">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  {/* Email */}
                  <div style={formRowStyle}>
                    <label style={labelStyle}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    />
                  </div>

                  {/* Username */}
                  <div style={formRowStyle}>
                    <label style={labelStyle}>Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    />
                  </div>

                  {/* Password */}
                  <div style={formRowStyle}>
                    <label style={labelStyle}>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    />
                  </div>

                  {/* Confirm Password */}
                  <div style={formRowStyle}>
                    <label style={labelStyle}>Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    />
                  </div>

                  {/* Phone */}
                  <div style={formRowStyle}>
                    <label style={labelStyle}>Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    />
                  </div>

                  {/* Photo */}
                  <div style={formRowStyle}>
                    <label style={labelStyle}>Photo</label>
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={inputStyle}
                    />
                  </div>

                  {previewImage && (
                    <div style={formRowStyle}>
                      <label style={labelStyle}></label>
                      <img
                        src={previewImage}
                        alt="Preview"
                        style={{ height: "100px", borderRadius: "6px" }}
                      />
                    </div>
                  )}

                  {/* Permissions */}
                  <div style={formRowStyle}>
                    <label style={labelStyle}>Permissions</label>
                    <div style={{ flex: 1 }}>
                      {["dashboard", "catalog", "users", "order"].map((perm) => (
                        <label key={perm} style={{ marginRight: "20px" }}>
                          <input
                            type="checkbox"
                            name={perm}
                            checked={formData.permissions[perm]}
                            onChange={handleCheckboxChange}
                          />{" "}
                          {perm.charAt(0).toUpperCase() + perm.slice(1)}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <button type="submit" className="btn btn-success">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Styles
const formRowStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
};

const labelStyle = {
  width: "150px",
  marginRight: "10px",
  fontWeight: "600",
};

const inputStyle = {
  flex: 1,
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

export default Adduser;
