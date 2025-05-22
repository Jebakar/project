import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import shoesimg4 from "./images/shoes-img4.png";
import shoesimg5 from "./images/shoes-img5.png";
import shoesimg6 from "./images/shoes-img6.png";
import shoesimg7 from "./images/shoes-img7.png";
import shoesimg8 from "./images/shoes-img8.png";
import shoesimg9 from "./images/shoes-img9.png";
import staricon from "./images/star-icon.png";

// Dummy data
export const productsData = [
  { id: "1", name: "Best Shoes", price: 60, image: shoesimg4, category: "best" },
  { id: "2", name: "Stylish Shoes", price: 100, image: shoesimg5, category: "stylish" },
  { id: "3", name: "Casual Shoes", price: 50, image: shoesimg6, category: "casual" },
  { id: "4", name: "Running Shoes", price: 70, image: shoesimg7, category: "running" },
  { id: "5", name: "Comfort Shoes", price: 100, image: shoesimg8, category: "comfort" },
  { id: "6", name: "Sports Shoes", price: 90, image: shoesimg9, category: "sports" },
];

function Products() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
  };

  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.warn("Please sign in to add products to your cart.");
      navigate("/signin");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.unshift({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    window.dispatchEvent(new Event("storage"));
    toast.success(`${product.name} added to cart!`);
  };

  useEffect(() => {
    updateCartCount();
    const handleStorageChange = () => updateCartCount();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="collection_section layout_padding">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      <div className="container">
        <h1 className="new_text"><strong>New Arrivals Products</strong></h1>
        <p className="consectetur_text ml">
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className="layout_padding gallery_section">
        <div className="container">
          <div className="row arr">
            {productsData.map((product) => (
              <div className="col-sm-4" key={product.id} style={{ marginBottom: "30px" }}>
                <div className="best_shoes" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                  <p className="best_text past">{product.name}</p>
                  <div className="shoes_icon">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="star_text">
                    <div className="left_part">
                      <ul>
                        {[...Array(5)].map((_, i) => (
                          <li key={i}><a href="#"><img src={staricon} alt="star" /></a></li>
                        ))}
                      </ul>
                    </div>
                    <div className="right_part">
                      <div className="shoes_price">
                        $ <span style={{ color: "#ff4e5b" }}>{product.price}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "auto" }}>
                    {/* <button
                      style={{ backgroundColor: "#ff4e5b", color: "#fff", border: "none", borderRadius: "5px", padding: "8px 16px", cursor: "pointer" }}
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button> */}
                    <button
                      style={{ backgroundColor: "#000", color: "#fff", border: "none", borderRadius: "5px", padding: "8px 16px", cursor: "pointer" }}
                      onClick={() => navigate(`/shoes/${product.category}`)}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="buy_now_bt" style={{ marginTop: "30px", textAlign: "center" }}>
            <button className="buy_text">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
