import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BannerFormPopup = ({ onClose, onSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    description: "",
    backgroundImage: null,
    shoeImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      await axios.post("http://localhost:9000/api/banners", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Banner added successfully");

      if (typeof onSuccess === "function") onSuccess();
      if (typeof onClose === "function") onClose();
      navigate("/settings");
    } catch (err) {
      console.error("Error saving banner:", err);
      alert("Failed to save banner");
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={{ marginBottom: "20px" }}>Add Banner</h2>
        <form onSubmit={handleSubmit}>
          <div style={formRowStyle}>
            <label style={labelStyle}>Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={formRowStyle}>
            <label style={labelStyle}>Banner Text</label>
            <input
              type="text"
              name="text"
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={formRowStyle}>
            <label style={labelStyle}>Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              required
              style={textareaStyle}
            />
          </div>

          <div style={formRowStyle}>
            <label style={labelStyle}>Background Image</label>
            <input
              type="file"
              name="backgroundImage"
              accept="image/*"
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={formRowStyle}>
            <label style={labelStyle}>Shoe Image</label>
            <input
              type="file"
              name="shoeImage"
              accept="image/*"
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <button type="submit" style={submitStyle}>Submit</button>
            <button
              type="button"
              onClick={() =>
                typeof onClose === "function"
                  ? onClose()
                  : navigate("/settings")
              }
              style={cancelStyle}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Inline styles
const overlayStyle = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "10px",
  width: "500px",
  maxHeight: "90vh",
  overflowY: "auto",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
};

const formRowStyle = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "15px",
};

const labelStyle = {
  fontWeight: "bold",
  marginBottom: "5px",
};

const inputStyle = {
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const textareaStyle = {
  padding: "8px",
  height: "80px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  resize: "vertical",
};

const submitStyle = {
  backgroundColor: "#28a745",
  color: "#fff",
  padding: "10px 20px",
  marginRight: "10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const cancelStyle = {
  backgroundColor: "#ccc",
  color: "#000",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default BannerFormPopup;
