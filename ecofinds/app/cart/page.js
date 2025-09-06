"use client";
import React, { useState } from "react";
import Link from "next/link";
import "../globals.css";

export default function CartPage() {
  // Example cart data (later we'll replace with backend)
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Eco Water Bottle", price: 20, quantity: 1, image: "/placeholder.png", category: "Eco-friendly" },
    { id: 2, name: "Reusable Bag", price: 10, quantity: 2, image: "/placeholder.png", category: "Reusable" },
    { id: 3, name: "Bamboo Toothbrush", price: 5, quantity: 3, image: "/placeholder.png", category: "Sustainable" },
  ]);

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Calculate savings (example: 15% off eco-friendly items)
  const savings = Math.round(subtotal * 0.15);
  const total = subtotal - savings;

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>🛒 Your Cart</h1>
        <p className="cart-subtitle">Review your eco-friendly selections</p>
      </div>

      <div className="cart-content">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Discover amazing eco-friendly products to add to your cart!</p>
            <Link href="/" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Cart Items Section */}
            <div className="cart-items-section">
              <div className="items-header">
                <h2>Items ({cartItems.length})</h2>
                <Link href="/" className="continue-link">Continue Shopping</Link>
              </div>
              
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-category">{item.category}</p>
                      <p className="item-price">${item.price}</p>
                    </div>
                    
                    <div className="quantity-controls">
                      <label>Quantity:</label>
                      <div className="quantity-input">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="qty-btn"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          min="1"
                          onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                          className="qty-input"
                        />
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="qty-btn"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="item-total">
                      <p className="total-price">${item.price * item.quantity}</p>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="order-summary">
              <h2>Order Summary</h2>
              
              <div className="summary-line">
                <span>Subtotal:</span>
                <span>${subtotal}</span>
              </div>
              
              <div className="summary-line discount">
                <span>🌱 Eco Discount (15%):</span>
                <span>-${savings}</span>
              </div>
              
              <div className="summary-line shipping">
                <span>Shipping:</span>
                <span className="free">FREE</span>
              </div>
              
              <hr className="summary-divider" />
              
              <div className="summary-line total">
                <span>Total:</span>
                <span>${total}</span>
              </div>
              
              <div className="checkout-section">
                <button className="checkout-btn">
                  Proceed to Checkout
                </button>
                
                <div className="payment-icons">
                  <span>We accept:</span>
                  <div className="icons">💳 🏧 📱</div>
                </div>
                
                <div className="security-badge">
                  <span>🔒 Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
