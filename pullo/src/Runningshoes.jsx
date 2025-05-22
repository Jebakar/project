// import React, { useEffect, useState } from "react";
// import run1 from "./images/run1.jpeg"; // Replace with actual image paths
// import run2 from "./images/run2.jpeg";
// import run3 from "./images/run3.jpeg";
// import staricon from "./images/star-icon.png";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import Header2 from "./Header2";
// import Footer from "./Footer";

// // Running shoes data
// const runningShoesData = [ 
//   { id: "r1", name: "Speed Runners", price: 95, image: run1 },  
//   { id: "r2", name: "Trail Blazers", price: 110, image: run2 },  
//   { id: "r3", name: "Power Sprint", price: 105, image: run3 },  
// ]; 

// function RunningShoes() { 
//   const navigate = useNavigate(); 
//   const [cartCount, setCartCount] = useState(0); 

//   const updateCartCount = () => { 
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartCount(cart.reduce((total, item) => total + item.quantity, 0)); 
//   };

//   const handleAddToCart = (product) => {
//     const user = JSON.parse(localStorage.getItem("user")); 
//     if (!user) {
//       toast.warn("Please sign in to add products to your cart."); 
//       navigate("/signin");
//       return;
//     } 

//     if (!product || !product.id) {
//       console.error("Invalid product.");
//       return;
//     } 

//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const index = cart.findIndex((item) => item.id === product.id);

//     if (index !== -1) { 
//       cart[index].quantity += 1;
//     } else {
//       cart.unshift({ ...product, quantity: 1 });
//     } 

//     localStorage.setItem("cart", JSON.stringify(cart));
//     updateCartCount();
//     window.dispatchEvent(new Event("storage"));

//     toast.success(`${product.name} added to cart!`);
//   }; 

//   useEffect(() => { 
//     updateCartCount(); 
//     const handleStorageChange = () => updateCartCount();
//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []); 

//   return ( 
//     <>  
//      <div className="bg-dark"> 
//       <Header2 />
//      </div>
//       <div className="collection_section layout_padding">
//       <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

//       <div className="container">
//         <h1 className="new_text"><strong>Running Shoes Collection</strong></h1>
//         <p className="consectetur_text ml">
//           Lightweight, durable, and built for performance.
//         </p>
//       </div>

//       <div className="layout_padding gallery_section">
//         <div className="container">
//           <div className="row arr">
//             {runningShoesData.map((product) => (
//               <div className="col-sm-4" key={product.id} style={{ marginBottom: "30px" }}>
//                 <div className="best_shoes" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
//                   <p className="best_text past">{product.name}</p>
//                   <div className="shoes_icon">
//                     <img src={product.image} alt={product.name} />
//                   </div>

//                   <div className="star_text"> 
//                     <div className="left_part"> 
//                       <ul>
//                         {[...Array(5)].map((_, i) => (
//                           <li key={i}><a href="#"><img src={staricon} alt="star" /></a></li>
//                         ))}
//                       </ul> 
//                     </div> 
//                     <div className="right_part">
//                       <div className="shoes_price"> 
//                         $ <span style={{ color: "#ff4e5b" }}>{product.price}</span>
//                       </div> 
//                     </div> 
//                   </div> 

//                   <div style={{ display: "flex", justifyContent: "center", marginTop: "auto" }}> 
//                     <button 
//                       style={{ 
//                         backgroundColor: "#ff4e5b", 
//                         color: "#fff", 
//                         border: "none",
//                         borderRadius: "5px", 
//                         padding: "8px 16px", 
//                         cursor: "pointer" 
//                       }} 
//                       onClick={() => handleAddToCart(product)}
//                     > 
//                       Add to Cart
//                     </button> 
//                   </div> 
//                 </div> 
//               </div> 
//             ))}
//           </div> 

//           <div className="buy_now_bt" style={{ marginTop: "30px", textAlign: "center" }}>
//             <button className="buy_text">Buy Now</button> 
//           </div>
//         </div>
//       </div> 
//       <div>
//         <Footer />
//       </div>
//     </div>
//     </>

//   );
// }

// export default RunningShoes;

import React, { useEffect, useState } from "react";
import staricon from "./images/star-icon.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header2 from "./Header2";
import Footer from "./Footer";
import axios from "axios";

function RunningShoes() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([]);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
  };

  const fetchRunningShoes = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/products/category/running"); 
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch running shoes:", err);
    } 
  }; 

  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.warn("Please sign in to add products to your cart.");
      navigate("/signin");
      return;
    }

    if (!product || !product._id) {
      console.error("Invalid product.");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex((item) => item._id === product._id);

    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.unshift({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    window.dispatchEvent(new Event("storage"));
    toast.success(`${product.productName} added to cart!`);
  };

  useEffect(() => {
    fetchRunningShoes();
    updateCartCount();
    const handleStorageChange = () => updateCartCount();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      <div className="bg-dark">
        <Header2 /> 
      </div>
      <div className="collection_section layout_padding"> 
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar /> 
        <div className="container"> 
          <h1 className="new_text"><strong>Running Shoes Collection</strong></h1>  
          <p className="consectetur_text ml"> 
            Lightweight, durable, and built for performance. 
          </p> 
        </div>

        <div className="layout_padding gallery_section">  
          <div className="container"> 
            <div className="row arr"> 
              {products.map((product) => ( 
                <div className="col-sm-4" key={product._id} style={{ marginBottom: "30px" }}>
                  <div className="best_shoes" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                    <p className="best_text past">{product.productName}</p>
                    <div className="shoes_icon">
                      <img src={`http://localhost:9000/${product.image}`} alt={product.name} />
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

                    <div style={{ display: "flex", justifyContent: "center", marginTop: "auto" }}>
                      <button
                        style={{
                          backgroundColor: "#ff4e5b",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          padding: "8px 16px",
                          cursor: "pointer"
                        }}
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
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
        <Footer /> 
      </div> 
    </> 
  ); 
} 

export default RunningShoes; 
