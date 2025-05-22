// import React, { useEffect, useState } from "react";
// import best1 from "./images/shoes-img1.png";
// import best2 from "./images/shoes-img2.png";
// import best3 from "./images/Bset3.jpeg";
// import staricon from "./images/star-icon.png";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import Header2 from "./Header2";
// import Header from "./Header_section";
// import Footer from "./Footer";

// // Best shoes data
// const bestShoesData = [
//   { id: "b1", name: "Classic Sneakers", price: 80, image: best1 },
//   { id: "b2", name: "Urban Walkers", price: 90, image: best2 },
//   { id: "b3", name: "Retro Runners", price: 70, image: best3 },
// ]; 

// function BestShoes() {
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
//     <Header2 />  
//     </div>
//     <div className="collection_section layout_padding">
//       <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

//       <div className="container">
//         <h1 className="new_text"><strong>Best Shoes Collection</strong></h1>
//         <p className="consectetur_text ml">
//           Top picks for comfort, performance, and style. Check out our bestsellers!
//         </p>
//       </div>

//       <div className="layout_padding gallery_section">
//         <div className="container">
//           <div className="row arr">
//             {bestShoesData.map((product) => (
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
//             <Footer />
//         </div>
//     </div>
//     </>

//   );
// }

// export default BestShoes;


import React, { useEffect, useState } from "react";
import staricon from "./images/star-icon.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header2 from "./Header2";
import Footer from "./Footer";
import axios from "axios"; // ✅ Import Axios

function BestShoes() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([]);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/products/category/Best"); // ✅ Adjust URL as per backend
      setProducts(res.data.filter(p => p.category === "Best")); // ✅ Filter only best shoes
    } catch (error) {
      toast.error("Failed to load products.");
      console.error(error);
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
    fetchProducts();
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
          <h1 className="new_text"><strong>Best Shoes Collection</strong></h1>
          <p className="consectetur_text ml">
            Top picks for comfort, performance, and style. Check out our bestsellers!
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
                      <img src={`http://localhost:9000/${product.image}`} alt={product.name} /> {/* Adjust path if needed */}
                    </div>

                    <div className="star_text">
                      <div className="left_part">
                        <ul>
                          {[...Array(product.rating || 5)].map((_, i) => (
                            <li key={i}><img src={staricon} alt="star" /></li>
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

export default BestShoes;
