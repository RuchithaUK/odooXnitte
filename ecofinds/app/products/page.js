"use client";
import React, { useState } from "react";
import "../globals.css";

export default function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    category: "Clothes",
    description: "",
    price: "",
    image: null,
  });

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
