"use client";
import React, { useState } from "react";
import "../globals.css";

export default function CartPage() {
  // Example cart data (later we’ll replace with backend)
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Eco Water Bottle", price: 20, quantity: 1 },
    { id: 2, name: "Reusable Bag", price: 10, quantity: 2 },
    { id: 3, name: "Bamboo Toothbrush", price: 5, quantity: 3 },
  ]);

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
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

  // Calculate total
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1>Your Cart 🛒</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
              />
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}

          <div className="cart-summary">
            <h2>Total: ${total}</h2>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}
