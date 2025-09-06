"use client";
import React, { useState } from "react";
import "./globals.css";
import Link from "next/link";
export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Dummy product data (later from backend)
  const products = [
    { id: 1, title: "Vintage Jacket", category: "Clothes", price: 1200, image: "/placeholder.png" },
    { id: 2, title: "Smartphone X", category: "Electronics", price: 8000, image: "/placeholder.png" },
    { id: 3, title: "Wooden Chair", category: "Furniture", price: 2000, image: "/placeholder.png" },
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
          onClick={() => document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' })}
        >
          Explore Products
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

      {/* Product Preview */}
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
