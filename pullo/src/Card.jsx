// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function Card() {
//   const [cart, setCart] = useState([]);
//   const [total, setTotal] = useState(0);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const navigate = useNavigate();

//   useEffect(() => {
//     const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(cartItems);
//     calculateTotal(cartItems); 
//   }, []); 

//   const calculateTotal = (items) => { 
//     const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     setTotal(totalPrice); 
//   };

//   const updateCart = (newCart) => { 
//     setCart(newCart); 
//     localStorage.setItem("cart", JSON.stringify(newCart));
//     calculateTotal(newCart); 
//   };

//   const handleQuantityChange = (uniqueKey, delta) => {  
//     const updatedCart = cart.map((item) => { 
//       const key = item.id || item.name; 
//       if (key === uniqueKey) { 
//         const newQty = item.quantity + delta; 
//         return { ...item, quantity: Math.max(1, newQty) };
//       }
//       return item;
//     });
//     updateCart(updatedCart);  
//   }; 

//   const handleRemoveItem = (uniqueKey) => { 
//     const updatedCart = cart.filter((item) => (item.id || item.name) !== uniqueKey);
//     updateCart(updatedCart);  
//   }; 

//   const handleProceedToCheckout = () => {  
//     if (!user) { 
//       navigate("/signin"); 
//     } else { 
//       navigate("/checkout");  
//     } 
//   }; 

//   return ( 
//     <div className="container my-5"> 
//       <h2 className="mb-4">Shopping Cart</h2> 

//       {cart.length === 0 ? ( 
//         <p>Your cart is empty. <a href="/">Go back to shopping</a></p> 
//       ) : ( 
//         <> 
//           <div className="table-responsive"> 
//             <table className="table table-bordered align-middle text-center"> 
//               <thead className="table-dark"> 
//                 <tr> 
//                   <th>Image</th> 
//                   <th>Name</th> 
//                   <th>Price</th> 
//                   <th>Quantity</th> 
//                   <th>Total</th> 
//                   <th>Remove</th> 
//                 </tr>
//               </thead>
//               <tbody> 
//                 {cart.map((item) => { 
//                   const key = item.id || item.name; 
//                   return (
//                     <tr key={key}>
//                       <td>
//                         <img
//                         src={`http://localhost:9000/${item.image}`} 
//                         alt={item.name}
//                         style={{
//                         width: "80px",
//                         height: "80px",
//                         objectFit: "contain", 
//                         borderRadius: "8px"
//                        }} 
//                       />
//                       </td> 
//                       <td>{item.productName}</td> 
//                       <td>${item.price?.toFixed(2)}</td> 
//                       <td style={{ minWidth: "120px" }}> 
//                         <div className="d-flex justify-content-center align-items-center gap-2">
//                           <button
//                             onClick={() => handleQuantityChange(key, -1)} 
//                             className="btn btn-outline-secondary btn-sm"
//                             style={{ width: "32px", height: "32px", padding: "0" }}
//                             disabled={item.quantity <= 1} 
//                           >
//                             −
//                           </button>  
//                           <span style={{ width: "32px", textAlign: "center" }}>{item.quantity}</span>
//                           <button 
//                             onClick={() => handleQuantityChange(key, 1)}
//                             className="btn btn-outline-secondary btn-sm"
//                             style={{ width: "32px", height: "32px", padding: "0" }}  
//                           > 
//                             +
//                           </button> 
//                         </div> 
//                       </td>
//                       <td>${(item.price * item.quantity).toFixed(2)}</td> 
//                       <td>
//                         <button
//                           onClick={() => handleRemoveItem(key)} 
//                           className="btn btn-outline-danger btn-sm"
//                         >
//                           Remove
//                         </button> 
//                       </td> 
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           <div className="d-flex justify-content-between align-items-center mt-4">
//             <h4>Total: ${total.toFixed(2)}</h4>
//             <button onClick={handleProceedToCheckout} className="btn btn-primary">
//               Proceed to Checkout
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Card;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Card() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartItems);
    calculateTotal(cartItems);
  }, []);

  const calculateTotal = (items) => {
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalPrice);
  };

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    calculateTotal(newCart);
  };

  const handleQuantityChange = (_id, delta) => {
    const updatedCart = cart.map((item) =>
      item._id === _id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    updateCart(updatedCart); 
  };

  const handleRemoveItem = (_id) => {
    const updatedCart = cart.filter((item) => item._id !== _id);
    updateCart(updatedCart);
  };

  const handleProceedToCheckout = () => {
    if (!user) {
      navigate("/signin");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>
          Your cart is empty. <a href="/">Go back to shopping</a>
        </p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-bordered align-middle text-center">
              <thead className="table-dark">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={`http://localhost:9000/${item.image}`}
                        alt={item.productName}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "contain",
                          borderRadius: "8px",
                        }}
                      />
                    </td>
                    <td>{item.productName}</td>
                    <td>${item.price?.toFixed(2)}</td>
                    <td style={{ minWidth: "120px" }}>
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(item._id, -1)}
                          className="btn btn-outline-secondary btn-sm"
                          style={{ width: "32px", height: "32px", padding: "0" }}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span style={{ width: "32px", textAlign: "center" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item._id, 1)}
                          className="btn btn-outline-secondary btn-sm"
                          style={{ width: "32px", height: "32px", padding: "0" }}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4>Total: ${total.toFixed(2)}</h4>
            <button onClick={handleProceedToCheckout} className="btn btn-primary">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
