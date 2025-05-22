import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Adminheader from "./Adminheader";
import Navigation from "./Navigation";
import CategoryTable from "./CategoryTable";

function Categories() {
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState([]);

  const handleDelete = async () => {
    if (selectedCategoriesIds.length === 0) {
      alert("No categories selected");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete selected categories?");
    if (!confirmDelete) return;

    try {
      await axios.post("http://localhost:9000/api/categories/delete-multiple", {
        ids: selectedCategoriesIds,
      });

      alert("Categories deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete categories", error);
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
            <div className="pull-right mb-3">
              <Link to="/add-category" className="btn btn-primary" title="Add New" style={{marginRight:"8px"}}>
                <i className="fa fa-plus"></i>
              </Link>
              {/* <button className="btn btn-default mx-1" title="Reload" onClick={() => window.location.reload()}>
                <i className="fa fa-refresh"></i>
              </button> */}
              <button
                type="button"
                className="btn btn-danger"
                title="Delete"
                onClick={handleDelete}
              >
                <i className="fa fa-trash-o"></i>
              </button>
            </div>

            <h2 style={{ fontWeight: "300", color: "#4c4d5a", display:"inline-block" }}>Categories</h2>

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
                <span style={{ color: "#007bff" }}>Categories</span>
              </li>
            </ul>

            <div className="panel panel-default mt-3">
              <div className="panel-heading">
                <h3 className="panel-title">
                  <i className="fa fa-list"></i> Category List
                </h3>
              </div>
              <div className="panel-body">
                <CategoryTable onSelectionChange={setSelectedCategoriesIds} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Categories;
