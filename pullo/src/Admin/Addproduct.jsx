import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Adminheader from "./Adminheader";
import Navigation from "./Navigation";
import axios from "axios";

function Addproduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    category: "",
    productName: "",
    price: "",
    quantity: "",
    status: "active",
    rating: "5",
    image: null,
  }); 

  const [categories, setCategories] = useState([]); // <-- Added
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch categories on mount
 useEffect(() => {
  axios.get("http://localhost:9000/api/categories")
    .then((res) => {
      if (Array.isArray(res.data.categories)) {
        setCategories(res.data.categories); 
      } else {
        console.error("Expected array but got:", res.data);
      }
    })
    .catch((err) => { 
      console.error("Failed to fetch categories:", err);
    });
}, []);

  // Fetch product if editing
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:9000/api/products/${id}`)
        .then((res) => {
          const product = res.data;
          setFormData({ 
            category: product.category || "",
            productName: product.productName || "",
            price: product.price || "",
            quantity: product.quantity || "",
            status: product.status || "active",
            rating: product.rating?.toString() || "5",
            image: product.image || "",
          });

          if (product.image) {
            setPreviewImage(`http://localhost:9000/${product.image}`);
          }

          setImage(null);
        })
        .catch((err) => {
          console.error("Failed to fetch product:", err);
          alert("Product not found");
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "image") {
        data.append(key, value);
      }
    }); 

    if (image) { 
      data.append("image", image); 
    }

    try {
      if (id) {
        if (id.length === 24) { 
          await axios.put(`http://localhost:9000/api/products/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          alert("Product updated successfully"); 
        } else {
          alert("Invalid product ID."); 
          return; 
        } 
      } else {
        await axios.post("http://localhost:9000/api/products", data, {
          headers: { "Content-Type": "multipart/form-data" },
        }); 
        alert("Product added successfully");
      }

      navigate("/products");
    } catch (error) {
      console.error("Failed to save product:", error);
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
              <Link to="/products" className="btn btn-primary" title="Save">
                <i className="fa fa-save"></i>
              </Link>
              <Link to="/products" className="btn btn-default" title="Cancel">
                <i className="fa fa-reply"></i>
              </Link>
            </div>
            <h2
              style={{
                fontWeight: "300",
                color: "#4c4d5a",
                display: "contents",
              }}
            >
              {id ? "Edit Product" : "Add Product"}
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
                <a
                  href="#"
                  style={{ textDecoration: "none", color: "#999999" }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  style={{ textDecoration: "none", color: "#007bff" }}
                >
                  Products
                </a>
              </li>
            </ul>
          </div>

          <div className="container mt-4">
            <div className="container-fluid" style={{ padding: "20px" }}>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    <i className="fa fa-pencil"></i>{" "}
                    {id ? "Edit Product" : "Add Product"}
                  </h3>
                </div>

                <div className="panel-body">
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    {/* Category Dropdown */}
                    <div style={formRowStyle}>
                      <label style={labelStyle}>Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                      >
                        <option value="">Select</option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Product Name */} 
                    <div style={formRowStyle}>
                      <label style={labelStyle}>Product Name</label>
                      <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                      />
                    </div>

                    {/* Star Rating */}
                    <div style={formRowStyle}>
                      <label style={labelStyle}>Star Rating</label>
                      <select
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                      >
                        <option value="1">★☆☆☆☆ (1)</option>
                        <option value="2">★★☆☆☆ (2)</option>
                        <option value="3">★★★☆☆ (3)</option>
                        <option value="4">★★★★☆ (4)</option>
                        <option value="5">★★★★★ (5)</option>
                      </select>
                    </div>

                    {/* Preview Image */}
                    {previewImage && (
                      <div style={formRowStyle}>
                        <label style={labelStyle}>Image</label>
                        <img
                          src={previewImage}
                          alt="Preview"
                          style={{ height: "100px" }}
                        />
                      </div>
                    )}

                    {/* Upload Image */}
                    <div style={formRowStyle}>
                      <label style={labelStyle}>Upload Image</label>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={inputStyle}
                      />
                    </div>

                    {/* Price */}
                    <div style={formRowStyle}>
                      <label style={labelStyle}>Price</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                        style={inputStyle}
                      />
                    </div>

                    {/* Quantity */}
                    <div style={formRowStyle}>
                      <label style={labelStyle}>Quantity</label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        min="0"
                        style={inputStyle}
                      />
                    </div>

                    {/* Status */}
                    <div style={formRowStyle}>
                      <label style={labelStyle}>Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        style={inputStyle}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>

                    {/* Submit Button */}
                    <div style={{ marginTop: "20px", textAlign: "right" }}>
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

export default Addproduct;
