// import React, { useEffect, useState } from "react";
// import comfort1 from "./images/comfort1.webp"; // Replace with real image paths
// import comfort2 from "./images/comfort2.webp";
// import comfort3 from "./images/comfort3.jpeg";
// import staricon from "./images/star-icon.png";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import Header2 from "./Header2";
// import Footer from "./Footer";

// // Comfort shoes data
// const comfortShoesData = [
//   { id: "c1", name: "Cloud Comfort", price: 85, image: comfort1 },
//   { id: "c2", name: "Everyday Ease", price: 95, image: comfort2 },
//   { id: "c3", name: "Relax Walkers", price: 90, image: comfort3 },
// ]; 

// function ComfortShoes() {
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
//     <div className="bg-dark"> 
//         <Header2 />
//     </div>
//     <div className="collection_section layout_padding">
//       <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

//       <div className="container">
//         <h1 className="new_text"><strong>Comfort Shoes Collection</strong></h1>
//         <p className="consectetur_text ml">
//           Walk all day with ease and cushion-soft support.
//         </p>
//       </div>

//       <div className="layout_padding gallery_section">
//         <div className="container">
//           <div className="row arr">
//             {comfortShoesData.map((product) => ( 
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

// export default ComfortShoes;

import React, { useEffect, useState } from "react";
import axios from "axios";
import staricon from "./images/star-icon.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header2 from "./Header2";
import Footer from "./Footer";

function ComfortShoes() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([]);

  const fetchComfortShoes = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/products/category/comfort");
      console.log("Fetched comfort products:", res.data);
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to fetch products");
      console.error(err);
    }
  };

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
    const index = cart.findIndex((item) => item.id === product._id);

    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.unshift({ ...product, id: product._id, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    window.dispatchEvent(new Event("storage"));

    toast.success(`${product.productName} added to cart!`);
  };

  useEffect(() => {
    fetchComfortShoes();
    updateCartCount();
    const handleStorageChange = () => updateCartCount();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      <div className="bg-dark"><Header2 /></div>
      <div className="collection_section layout_padding">
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
        <div className="container">
          <h1 className="new_text"><strong>Comfort Shoes Collection</strong></h1>
          <p className="consectetur_text ml">Walk all day with ease and cushion-soft support.</p>
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

export default ComfortShoes;
