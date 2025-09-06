"use client";
import React from "react";
import { useRouter } from "next/navigation";
import "../globals.css";
import "./UserType.css";

export default function UserTypePage() {
  const router = useRouter();

  const handleUserTypeSelection = (userType) => {
    // Store user type in sessionStorage for the login page to use
    sessionStorage.setItem('selectedUserType', userType);
    router.push('/login');
  };

  return (
    <div className="user-type-container">
      <div className="user-type-content">
        <h1>Welcome to EcoFinds</h1>
        <p className="subtitle">Choose how you&apos;d like to get started</p>
        
        <div className="user-type-cards">
          <div 
            className="user-type-card customer-card"
            onClick={() => handleUserTypeSelection('customer')}
          >
            <div className="card-icon">🛍️</div>
            <h2>I&apos;m a Customer</h2>
            <p>Browse and buy eco-friendly second-hand products</p>
            <button className="select-btn">Continue as Customer</button>
          </div>

          <div 
            className="user-type-card seller-card"
            onClick={() => handleUserTypeSelection('seller')}
          >
            <div className="card-icon">💼</div>
            <h2>I&apos;m a Seller</h2>
            <p>List and sell your pre-owned items to eco-conscious buyers</p>
            <button className="select-btn">Continue as Seller</button>
          </div>
        </div>

        <div className="back-link">
          <button onClick={() => router.push('/')} className="back-btn">
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
