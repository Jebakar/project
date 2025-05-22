import { FaBars, FaTags, FaChevronRight, FaUser } from "react-icons/fa";
import { AiTwotoneDashboard } from "react-icons/ai";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
function Navigation() {
  const [isCatalogOpen, setIsCatalogOpen] = useState(true);
  const location = useLocation();

  const toggleCatalog = () => {
    setIsCatalogOpen((prev) => !prev);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      id="column-left" 
      style={{
        position: "relative",
        width: "230px",
        background: "#19222E",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <div
        id="navigation"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "12px 16px",
          borderBottom: "1px solid #2a2f3a",
        }}
      >
        <FaBars style={{ marginRight: "10px", color: "#fff", marginTop: "-1px" }} /> 
        <span style={{ fontSize: "16px", color: "#fff" }}>Navigation</span>
      </div> 

      <ul id="menu" style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
        <li id="menu-dashboard" style={{ marginLeft: "19px", marginTop: "15px" }}>
          <Link
            to="/admin/dashboard" 
            className={`nav-link ${isActive("/admin/dashboard") ? "active" : ""}`} 
            style={{ display: "flex", alignItems: "center", color: "#fff", textDecoration: "none" }}
          >
            <AiTwotoneDashboard style={{ marginRight: "10px", fontSize: "20px" }} /> 
            Dashboard
          </Link> 
        </li>

        <li id="menu-catalog" style={{ padding: "12px 16px" }}>
          <div
            onClick={toggleCatalog} 
            className="parent"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer", 
              color: "#ddd",
              marginLeft: "14px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaTags style={{ marginRight: "10px" }} /> 
              Catalog
            </div>
            <FaChevronRight 
              style={{
                transform: isCatalogOpen ? "rotate(90deg)" : "rotate(0)",
                transition: "0.2s",
                fontSize: "12px",
              }}
            />
          </div>

          {isCatalogOpen && (
            <ul id="collapse1" style={{ listStyle: "none", paddingLeft: "20px", marginTop: "8px", color: "#7f8a9b" }}>
              <li>
                <Link
                  to="/categories"
                  className={`nav-link ${isActive("/categories") ? "active" : ""}`}
                  style={{ textDecoration: "none", color: isActive("/categories") ? "#fff" : "#7f8a9b" }}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className={`nav-link ${isActive("/products") ? "active" : ""}`} 
                  style={{ textDecoration: "none", color: isActive("/products") ? "#fff" : "#7f8a9b" }}
                > 
                  Products
                </Link> 
              </li> 
            </ul> 
          )} 
        </li> 

        <li style={{ padding: "12px 16px", }}> 
          <Link 
            to="/user" 
            className={`nav-link ${isActive("/user") ? "active" : ""}`}
            style={{ display: "flex", alignItems: "center", color: isActive("/user") ?  "#fff": "#7f8a9b", textDecoration: "none" }}
          >
            <FaUser style={{ marginRight: "10px", fontSize: "20px" }} />
            User 
          </Link> 
        </li>

         <li style={{ padding: "12px 16px", }}> 
          <Link
            to="/order"
            className={`nav-link ${isActive("/order") ? "active" : ""}`}
            style={{ display: "flex", alignItems: "center", color: isActive("/user") ?  "#fff": "#7f8a9b", textDecoration: "none" }}
          >
            <FaShoppingCart style={{ marginRight: "10px", fontSize: "20px" }} />
            Order
          </Link>
        </li>
         <li style={{ padding: "12px 16px", }}>
          <Link
            to="/settings"
            className={`nav-link ${isActive("/settings") ? "active" : ""}`}
            style={{ display: "flex", alignItems: "center", color: isActive("/user") ?  "#fff": "#7f8a9b", textDecoration: "none" }}
          >
            <IoSettings style={{ marginRight: "10px", fontSize: "20px" }} />
            Settings
          </Link> 
        </li> 
      </ul>
      
    </nav>
  );
}

export default Navigation;
