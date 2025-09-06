"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "../globals.css";

export default function Products() {
  const [userType, setUserType] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Product catalog for customers
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  
  // Add product form for sellers
  const [form, setForm] = useState({
    title: "",
    category: "Clothes",
    description: "",
    price: "",
    image: null,
  });

  // Sample products (same as home page)
  const products = [
    { id: 1, title: "Vintage Jacket", category: "Clothes", price: 1200, image: "/placeholder-image.svg", description: "A stylish vintage leather jacket in excellent condition." },
    { id: 2, title: "Smartphone X", category: "Electronics", price: 8000, image: "/placeholder-image.svg", description: "Latest smartphone with advanced features and great camera quality." },
    { id: 3, title: "Wooden Chair", category: "Furniture", price: 2000, image: "/placeholder-image.svg", description: "Handcrafted wooden chair perfect for any home decor." },
    { id: 4, title: "Designer Handbag", category: "Clothes", price: 1500, image: "/placeholder-image.svg", description: "Elegant designer handbag in premium leather." },
    { id: 5, title: "Gaming Laptop", category: "Electronics", price: 45000, image: "/placeholder-image.svg", description: "High-performance gaming laptop with latest graphics card." },
    { id: 6, title: "Coffee Table", category: "Furniture", price: 3500, image: "/placeholder-image.svg", description: "Modern glass coffee table for your living room." },
  ];

  const filteredProducts = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    // Check user login status and type
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const type = sessionStorage.getItem('userType') || '';
    
    setIsLoggedIn(loggedIn);
    setUserType(type);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Submitted:", form);
    alert("Product Submitted! (In future, will save to DB)");
  };

  const addToCart = (product) => {
    alert(`Added ${product.title} to cart! (In future, will update cart state)`);
  };

  // Show different content based on user type
  if (!isLoggedIn) {
    return (
      <div className="form-container">
        <h2>Please Login to Access Products</h2>
        <p>You need to be logged in to view or add products.</p>
      </div>
    );
  }

  // Show product catalog for customers
  if (userType === "customer") {
    return (
      <div className="products-page">
        <div className="products-header">
          <h1>🛍️ Browse Products</h1>
          <p>Discover amazing eco-friendly and sustainable products</p>
        </div>

        {/* Search & Filter */}
        <div className="controls">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
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
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <Link href={`/product/${product.id}`} className="product-link">
                <div className="product-image">
                  <Image 
                    src={product.image} 
                    alt={product.title}
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                </div>
                <div className="product-info">
                  <h3>{product.title}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">₹{product.price}</p>
                  <small className="product-category">{product.category}</small>
                </div>
              </Link>
              <div className="product-actions">
                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show add product form for sellers
  return (
    <div className="form-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        {/* Title */}
        <label>Product Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter product title"
          value={form.title}
          onChange={handleChange}
          required
        />

        {/* Category */}
        <label>Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option>Clothes</option>
          <option>Electronics</option>
          <option>Furniture</option>
          <option>Books</option>
        </select>

        {/* Description */}
        <label>Description</label>
        <textarea
          name="description"
          placeholder="Enter product description"
          value={form.description}
          onChange={handleChange}
          required
        />

        {/* Price */}
        <label>Price (₹)</label>
        <input
          type="number"
          name="price"
          placeholder="Enter price"
          value={form.price}
          onChange={handleChange}
          required
        />

        {/* Image */}
        <label>Product Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        <button type="submit" className="cta-btn">
          Submit Listing
        </button>
      </form>
    </div>
  );
}
