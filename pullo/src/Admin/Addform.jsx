import React, { useState, useEffect } from "react";
import Adminheader from "./Adminheader";
import Navigation from "./Navigation";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function AddCategoryForm() {
  const [categoryName, setCategoryName] = useState("");
  const [status, setStatus] = useState("Enable");
  const { id } = useParams(); 
  const navigate = useNavigate();

  // Fetch category details if in edit mode
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:9000/api/categories/${id}`)
        .then(res => {
          setCategoryName(res.data.name || "");
          setStatus(res.data.status || "Enable");
        })
        .catch(err => {
          console.error("Failed to fetch category:", err);
          alert("Category not found");
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Edit existing category
        const response = await axios.put(`http://localhost:9000/api/categories/${id}`, {
          name: categoryName,
          status,
        });
        if (response.status === 200) {
          alert("Category updated successfully!");
        }
      } else {
        // Add new category
        const response = await axios.post("http://localhost:9000/api/categories", {
          name: categoryName,
          status,
        });
        if (response.status === 201 || response.status === 200) {
          alert("Category added successfully!");
        }
      }
      navigate("/categories");
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Failed to save category.");
    }
  };

  const formRowStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "60px",
  };

  const labelStyle = {
    minWidth: "120px",
    marginRight: "10px",
    fontWeight: "500",
  };

  const inputStyle = {
    flex: 1,
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  return (
    <>
      <Adminheader />
      <div style={{ display: "flex" }}>
        <Navigation />
        <div style={{ flex: 1 }}>
          <div className="container-fluid mt-4 page-header"> 
            <div className="pull-right">
              <Link to="/categories" className="btn btn-primary" title="Save">
                <i className="fa fa-save"></i>
              </Link>
              <Link to="/categories" className="btn btn-default" title="Cancel">
                <i className="fa fa-reply"></i>
              </Link>
            </div>
            <h2 style={{ fontWeight: "300", color: "#4c4d5a", display:"contents"}}>
              {id ? "Edit Category" : " Category"}
            </h2>
            <ul
              className="breadcrumb ms-3"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                listStyle: "none",
                padding: 0,
                marginTop: "10px",
                color: "#007bff",
              }}
            >
              <li>
                <a href="#" style={{ textDecoration: "none", color: "#999999" }}>
                  Home
                </a>
              </li>
              <li>
                <a href="#" style={{ textDecoration: "none", color: "#007bff" }}>
              Category
                </a>
              </li>
            </ul>
          </div>

          <div className="container-fluid" style={{ padding: "20px" }}>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">
                  <i className="fa fa-pencil"></i> {id ? "Edit Category" : "Add Category"}
                </h3>
              </div>
              <div className="panel-body">
                <form onSubmit={handleSubmit}>
                  <div style={formRowStyle}>
                    <label htmlFor="categoryName" style={labelStyle}>
                      Category Name
                    </label>
                    <input
                      type="text"
                      id="categoryName"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      required
                      placeholder="Enter category name"
                      style={inputStyle}
                    />
                  </div>

                  <div style={formRowStyle}>
                    <label htmlFor="status" style={labelStyle}>
                      Status
                    </label>
                    <select
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)} 
                      required
                      style={inputStyle}
                    > 
                      <option value="Enable">Enable</option>
                      <option value="Disable">Disable</option> 
                    </select> 
                  </div>

                  <div style={{ textAlign: "right", marginTop: "20px" }}>
                    <button type="submit" className="btn btn-success">
                      {id ? "Update" : "Submit"}
                    </button>
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

export default AddCategoryForm;
