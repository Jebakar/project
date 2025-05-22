import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [addressInfo, setAddressInfo] = useState({
    address: "",
    city: "",
    zip: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [notes, setNotes] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Retrieve cart and user information from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    calculateTotal(storedCart);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.email) {
      setUserInfo((prev) => ({ ...prev, email: storedUser.email }));
    }
  }, []);

  const calculateTotal = (cartItems) => {
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userInfo.name) newErrors.name = "Full Name is required";
    const phoneRegex = /^[0-9]{10}$/;
    if (!userInfo.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(userInfo.phone)) {
      newErrors.phone = "Please enter a valid phone number (10 digits)";
    }
    if (!addressInfo.address) newErrors.address = "Address is required";
    if (!addressInfo.city) newErrors.city = "City is required";
    if (!addressInfo.zip) newErrors.zip = "Zip code is required";
    if (!addressInfo.country) newErrors.country = "Country is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handlePlaceOrder = async () => {
  if (!validateForm()) return;

  const formattedItems = cart.map(item => ({
    name: item.productName || item.name || "Unnamed Product",
    price: item.price,
    quantity: item.quantity,
    image: item.image,
  }));

  const order = {
    userEmail: userInfo.email,
    userInfo,
    addressInfo,
    paymentMethod,
    notes,
    items: formattedItems,
    total,
    createdAt: new Date().toISOString(),
  };

  try {
    const response = await axios.post("http://localhost:9000/api/orders", order);
    console.log("Order placed successfully:", response.data);
    localStorage.removeItem("cart");
    setCart([]);
    setTotal(0);
    setShowModal(true);
  } catch (err) {
    console.error("Order submission failed:", err.response ? err.response.data : err.message);
    alert("Failed to place order. Please try again.");
  }
};

  

  const handleClose = () => {
    setShowModal(false);
    navigate("/"); // Redirect to home after order placement
  };

  return (
    <div className="container my-5">
      <h2>Checkout</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty. <a href="/">Go back to shopping</a></p>
      ) : (
        <>
          <div className="row">
            <div className="col-md-7">
              <h4>Contact Information</h4>
              <input
                className="form-control mb-2"
                placeholder="Full Name"
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
              />
              {errors.name && <small className="text-danger">{errors.name}</small>}

              <input
                className="form-control mb-2"
                placeholder="Email"
                type="email"
                value={userInfo.email}
                disabled
              />

              <input
                className="form-control mb-3"
                placeholder="Phone"
                value={userInfo.phone}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, phone: e.target.value })
                }
              />
              {errors.phone && <small className="text-danger">{errors.phone}</small>}

              <h4>Shipping Address</h4>
              <textarea
                className="form-control mb-2"
                placeholder="Street Address"
                value={addressInfo.address}
                onChange={(e) =>
                  setAddressInfo({ ...addressInfo, address: e.target.value })
                }
              />
              {errors.address && <small className="text-danger">{errors.address}</small>}

              <input
                className="form-control mb-2"
                placeholder="City"
                value={addressInfo.city}
                onChange={(e) =>
                  setAddressInfo({ ...addressInfo, city: e.target.value })
                }
              />
              {errors.city && <small className="text-danger">{errors.city}</small>}

              <input
                className="form-control mb-2"
                placeholder="Zip Code"
                value={addressInfo.zip}
                onChange={(e) =>
                  setAddressInfo({ ...addressInfo, zip: e.target.value })
                }
              />
              {errors.zip && <small className="text-danger">{errors.zip}</small>}

              <input
                className="form-control mb-3"
                placeholder="Country"
                value={addressInfo.country}
                onChange={(e) =>
                  setAddressInfo({ ...addressInfo, country: e.target.value })
                }
              />
              {errors.country && <small className="text-danger">{errors.country}</small>}

              <h4>Payment Method</h4>
              <select
                className="form-control mb-3"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="cod">Cash on Delivery</option>
                <option value="card">Credit Card</option>
              </select>

              <h4>Order Notes (Optional)</h4>
              <textarea
                className="form-control mb-3"
                placeholder="Add any notes about your order..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="col-md-5">
              <h4>Order Summary</h4>
              <ul className="list-group mb-3">
                {cart.map((item, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between">
                    <div>
                      {item.productName} × {item.quantity}
                    </div>
                    <div>${(item.price * item.quantity).toFixed(2)}</div>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Total</strong>
                  <strong>${total.toFixed(2)}</strong>
                </li>
              </ul>
              <button className="btn btn-success w-100" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          </div>
        </>
      )}

      {/* Success Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Placed!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your order has been placed successfully. Thank you!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Checkout;
