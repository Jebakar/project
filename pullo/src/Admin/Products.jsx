import { useState } from "react";
import Adminheader from "./Adminheader";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import ProductTable from "./AdminProductTable";
import axios from "axios";

function Productsadmin() {
  const [selectedProductIds, setSelectedProductIds] = useState([]); 

  const handleDelete = async () => {
    if (selectedProductIds.length === 0) {
      alert("No products selected");
      return;
    }

    const confirm = window.confirm("Are you sure you want to delete selected products?");
    if (!confirm) return; 

    try { 
      await axios.post("http://localhost:9000/api/products/delete-multiple", {
        ids: selectedProductIds,
      });

      alert("Products deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete products", error);
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <Adminheader />
      <div style={{ display: "flex" }}>
        <Navigation />
        <div id="db" style={{ padding: "20px", flex: 1 }}>
          <div className="container-fluid">
            <div className="pull-right" style={{ marginBottom: "10px" }}>
              <Link to="/add-product" className="btn btn-primary" title="Add New" style={{marginRight:"8px"}}>
                <i className="fa fa-plus"></i>
              </Link>
              <button
                type="button"
                className="btn btn-danger" 
                title="Delete" 
                onClick={handleDelete} 
              >
                <i className="fa fa-trash-o"></i> 
              </button>
            </div>

            <h2 style={{ fontWeight: "300", color: "#4c4d5a", display: "inline-block" }}>
              Products
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
                Products 
                </a> 
              </li> 
            </ul> 

            <div className="panel panel-default"> 
              <div className="panel-heading">  
                <h3 className="panel-title">  
                  <i className="fa fa-list"></i> Products List 
                </h3>  
              </div>  
              <div className="panel-body">   
                <ProductTable onSelectionChange={setSelectedProductIds} /> 
              </div>  
            </div>
          </div> 
        </div> 
      </div>
    </>
  );
}

export default Productsadmin;
