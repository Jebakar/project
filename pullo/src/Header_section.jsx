import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";

function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [shoesDropdownOpen, setShoesDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
    setCartCount(totalQuantity);
  };

  useEffect(() => {
    updateCartCount();

    const handleStorageChange = () => updateCartCount();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <div className="container">
      <div className="row align-items-center side">
        <div className="col-sm-3">
          <div className="logo mb-3">
            <Link to="/">
              <img src={require("./images/logo.png")} alt="logo" />
            </Link>
          </div>
        </div>
        <div className="col-sm-9">
          <nav className="navbar navbar-expand-lg bg-back">
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarTogglerDemo01"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item font">
                    <Link className="nav-link active text-white" to="/">Home</Link>
                  </li> 
                  <li className="nav-item font">
                    <Link className="nav-link text-white" to="/collection">Collection</Link>
                  </li>

                  {/* Shoes with Hover Dropdown */}
                  <li
                    className="nav-item dropdown font position-relative"
                    onMouseEnter={() => setShoesDropdownOpen(true)} 
                    onMouseLeave={() => setShoesDropdownOpen(false)} 
                  >
                    <span className="nav-link text-white" style={{ cursor: "pointer" }}>
                      Shoes
                    </span>

                    {shoesDropdownOpen && (
                      <ul
                        className="dropdown-menu show"
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          zIndex: 1000,
                          backgroundColor: "#fff",
                          minWidth: "200px",
                        }}
                      >
                        <li>
                          <Link className="dropdown-item" to="/shoes/best">Best Shoes</Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/shoes/stylish">Stylish Shoes</Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/shoes/casual">Casual Shoes</Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/shoes/running">Running Shoes</Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/shoes/comfort">Comfort Shoes</Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/shoes/sports">Sports Shoes</Link>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li className="nav-item font d-none">
                    <Link className="nav-link text-white" to="/racingboots">Racing Boots</Link>
                  </li>
                  <li className="nav-item font">
                    <Link className="nav-link text-white" to="/contact">Contact</Link>
                  </li>
                  <li className="nav-item las">
                    <Link className="nav-link text-white d-none">
                      <img src={require("./images/search_icon.png")} alt="search" />
                    </Link>
                  </li>

                  {/* User Dropdown */} 
                  {user ? (
                    <li 
                      className="nav-item font position-relative"
                      onMouseEnter={() => setUserDropdownOpen(true)}
                      onMouseLeave={() => setUserDropdownOpen(false)}
                    >
                      <span className="nav-link text-white" style={{ cursor: "pointer" }}>
                        Welcome, {user.firstName}! 
                      </span>

                      {userDropdownOpen && (  
                        <div
                          className="dropdown-menu show"  
                          style={{
                            position: "absolute",  
                            top: "100%",
                            right: 0,
                            zIndex: 1000, 
                            backgroundColor: "#fff", 
                          }}
                        >
                          <Link className="dropdown-item" to="/my-orders">My Orders</Link>
                          <button className="dropdown-item" onClick={handleLogout}> 
                            <IoLogOutOutline style={{ fontSize: "24px", marginRight: "8px" }} />   
                            Logout
                          </button>  
                        </div> 
                      )} 
                    </li> 
                  ) : ( 
                    <li className="nav-item font d-flex justify-content-center align-items-center text-white ms-4 user">
                      <Link className="nav-link d-inline p-0 me-1 text-white" to="/signin">Sign In</Link>
                      |
                      <Link className="nav-link d-inline p-0 ms-1 text-white" to="/signup">Sign Up</Link>
                    </li>
                  )}

                  {/* Cart Icon */}
                  <li className="nav-item las ms-2 position-relative">
                    <Link className="nav-link text-white" to="/cart">
                      <img src={require("./images/shop_icon.png")} alt="shop" /> 
                      {cartCount > 0 && (
                        <span
                          className="cart-notification"
                          style={{
                            position: "absolute",
                            top: "-5px",
                            right: "0px",
                            background: "red",
                            color: "white",
                            borderRadius: "50%",
                            padding: "2px 6px",
                            fontSize: "12px",
                          }}
                        >
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
