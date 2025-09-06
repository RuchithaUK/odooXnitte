"use client";
import React, { useState, useEffect } from "react";
import "./globals.css";
import Link from "next/link";
export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // Check if user is logged in and get user type
    const storedUserType = sessionStorage.getItem('userType');
    setUserType(storedUserType);
  }, []);

  // Dummy product data (later from backend)
  const products = [
    { id: 1, title: "Vintage Jacket", category: "Clothes", price: 1200, image: "/placeholder-image.svg" },
    { id: 2, title: "Smartphone X", category: "Electronics", price: 8000, image: "/placeholder-image.svg" },
    { id: 3, title: "Wooden Chair", category: "Furniture", price: 2000, image: "/placeholder-image.svg" },
  ];

  const filteredProducts = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>🌱 Welcome to EcoFinds</h1>
        <p>
          Your one-stop platform to discover eco-friendly and sustainable
          second-hand products that help protect our planet.
        </p>
        <button 
          className="cta-btn"
          onClick={() => {
            const targetSection = userType === 'seller' ? 'seller-benefits-section' : 'products-section';
            document.getElementById(targetSection)?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {userType === 'seller' ? 'Discover Benefits' : 'Explore Products'}
        </button>
      </section>

      {/* Problem Statement */}
      <section className="problem">
        <h2>Why EcoFinds?</h2>
        <p>
          Many consumers want to live sustainably, but finding reliable
          second-hand products is hard. Greenwashing and lack of awareness
          often lead to confusion. <br />
          <strong>EcoFinds solves this</strong> by connecting people with trusted,
          verified alternatives and extending product lifecycles.
        </p>
      </section>

      {/* Features */}
      <section className="features">
        <h2>Our Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>♻️ Verified Products</h3>
            <p>Find trusted and sustainable pre-owned items.</p>
          </div>
          <div className="feature-card">
            <h3>💰 Affordable Options</h3>
            <p>Balance eco-friendly choices with affordability.</p>
          </div>
          <div className="feature-card">
            <h3>📍 Local Discovery</h3>
            <p>Discover sellers and small businesses near you.</p>
          </div>
          <div className="feature-card">
            <h3>🌍 Community Driven</h3>
            <p>Read and share reviews from eco-conscious buyers.</p>
          </div>
        </div>
      </section>

      {/* Product Preview or Seller Benefits */}
      {userType === 'seller' ? (
        <section className="seller-benefits" id="seller-benefits-section">
          <h2>Why Sell with EcoFinds?</h2>
          <p className="benefits-subtitle">Join thousands of sellers making a positive impact while earning money</p>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🌱</div>
              <h3>Environmental Impact</h3>
              <p>Help reduce waste by giving products a second life. Every item you sell prevents waste from reaching landfills.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">💰</div>
              <h3>Earn Extra Income</h3>
              <p>Turn your unused items into cash. Set your own prices and keep more of what you earn with our low fees.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">🤝</div>
              <h3>Eco-Conscious Community</h3>
              <p>Connect with like-minded buyers who value sustainability and appreciate quality second-hand products.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">📱</div>
              <h3>Easy Listing Process</h3>
              <p>Simple, intuitive tools to photograph, describe, and list your items. Get selling in just minutes.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">🔒</div>
              <h3>Secure Transactions</h3>
              <p>Safe payment processing and buyer protection give you peace of mind with every sale.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">📊</div>
              <h3>Sales Analytics</h3>
              <p>Track your performance with detailed insights about your listings, views, and sales trends.</p>
            </div>
          </div>

          <div className="seller-cta-section">
            <h3>Ready to Start Selling?</h3>
            <p>List your first item today and join the sustainable marketplace revolution</p>
            <div className="seller-cta-buttons">
              <Link href="/products" className="primary-seller-btn">List Your First Item</Link>
              <Link href="/my-listings" className="secondary-seller-btn">View My Listings</Link>
            </div>
          </div>

          <div className="seller-stats">
            <div className="stat-item">
              <h4>10,000+</h4>
              <p>Active Sellers</p>
            </div>
            <div className="stat-item">
              <h4>50,000+</h4>
              <p>Items Sold</p>
            </div>
            <div className="stat-item">
              <h4>₹2M+</h4>
              <p>Total Earnings</p>
            </div>
            <div className="stat-item">
              <h4>95%</h4>
              <p>Seller Satisfaction</p>
            </div>
          </div>
        </section>
      ) : (
        <section className="products" id="products-section">
          <h2>Explore Products</h2>

          {/* Search & Filter */}
          <div className="controls">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="categories">
              {["All", "Clothes", "Electronics", "Furniture"].map((cat) => (
                <button
                  key={cat}
                  className={category === cat ? "active" : ""}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="product-grid">
            {filteredProducts.map((p) => (
              <div className="product-card" key={p.id}>
                <img src={p.image} alt={p.title} />
                <h3>{p.title}</h3>
                <p>₹{p.price}</p>
                <small>{p.category}</small>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="cta">
        <h2>Join the Movement 🌏</h2>
        <p>
          Be part of the eco-friendly revolution. Shop consciously, live
          sustainably, and make a difference.
        </p>
        <Link href="/user-type">
          <button className="cta-btn">Get Started</button>
        </Link>
      </section>
    </div>
  );
}
