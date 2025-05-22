import React, { useState, useEffect } from "react"; 
import Axios from "axios"; 

function MyOrders() {
  const [orders, setOrders] = useState([]); 
  const user = JSON.parse(localStorage.getItem("user")); // Get user data from localStorage

  useEffect(() => { 
    if (user) {  
      // Fetch orders for the user from the backend 
      Axios.get(`http://localhost:9000/api/orders/user/${user.email}`) 
        .then((response) => { 
          // Set the orders in state 
          setOrders(response.data); 
        })
        .catch((error) => { 
          console.error("Failed to fetch orders:", error);
        }); 
    }
  }, [user]); 

  if (!orders || orders.length === 0) {  
    return ( 
      <div>  
        <h3>No orders found.</h3>  
      </div> 
    ); 
  }
 
  return (
    <div>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders to display.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <p>Order ID: {order._id}</p> 
              <p>Status: {order.status}</p> 
              <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p> 
              {/* Add other details you want to display */} 
            </li> 
          ))}
        </ul> 
      )} 
    </div>  
  ); 
} 

export default MyOrders;
