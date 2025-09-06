"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "../globals.css";

export default function MyListings() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Sample seller listings (in real app, this would come from backend)
  const [listings, setListings] = useState([
    { 
      id: 1, 
      title: "Vintage Leather Boots", 
      category: "Clothes", 
      price: 2500, 
      image: "/placeholder.png", 
      description: "Well-maintained vintage leather boots, perfect for casual wear.",
      status: "Active",
      views: 23,
      dateAdded: "2025-08-15"
    },
    { 
      id: 2, 
      title: "Wireless Headphones", 
      category: "Electronics", 
      price: 3500, 
      image: "/placeholder.png", 
      description: "High-quality wireless headphones with noise cancellation.",
      status: "Active",
      views: 45,
      dateAdded: "2025-08-20"
    },
    { 
      id: 3, 
      title: "Antique Desk Lamp", 
      category: "Furniture", 
      price: 1800, 
      image: "/placeholder.png", 
      description: "Beautiful antique brass desk lamp, fully functional.",
      status: "Sold",
      views: 67,
      dateAdded: "2025-07-30"
    },
  ]);

  useEffect(() => {
    // Check user login status and type
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const type = sessionStorage.getItem('userType') || '';
    const email = sessionStorage.getItem('userEmail') || '';
    
    setIsLoggedIn(loggedIn);
    setUserType(type);
    setUserEmail(email);
  }, []);

  const handleEdit = (id) => {
    alert(`Edit listing ${id} (In future, will open edit form)`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      setListings(listings.filter(listing => listing.id !== id));
      alert("Listing deleted successfully!");
    }
  };

  const toggleStatus = (id) => {
    setListings(listings.map(listing => 
      listing.id === id 
        ? { ...listing, status: listing.status === 'Active' ? 'Inactive' : 'Active' }
        : listing
    ));
  };

  // Check if user is logged in and is a seller
  if (!isLoggedIn) {
    return (
      <div className="form-container">
        <h2>Please Login to Access Your Listings</h2>
        <p>You need to be logged in as a seller to view your listings.</p>
        <Link href="/user-type">
          <button className="cta-btn">Login</button>
        </Link>
      </div>
    );
  }

  if (userType !== 'seller') {
    return (
      <div className="form-container">
        <h2>Seller Access Only</h2>
        <p>This page is only accessible to sellers. Customers can view the cart instead.</p>
        <Link href="/cart">
          <button className="cta-btn">Go to Cart</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="my-listings-page">
      <div className="listings-header">
        <h1>📋 My Listings</h1>
        <p>Manage your products and track their performance</p>
        <div className="header-actions">
          <Link href="/products">
            <button className="add-product-btn">+ Add New Product</button>
          </Link>
        </div>
      </div>

      <div className="listings-stats">
        <div className="stat-card">
          <h3>{listings.filter(l => l.status === 'Active').length}</h3>
          <p>Active Listings</p>
        </div>
        <div className="stat-card">
          <h3>{listings.filter(l => l.status === 'Sold').length}</h3>
          <p>Sold Items</p>
        </div>
        <div className="stat-card">
          <h3>{listings.reduce((sum, l) => sum + l.views, 0)}</h3>
          <p>Total Views</p>
        </div>
        <div className="stat-card">
          <h3>₹{listings.filter(l => l.status === 'Sold').reduce((sum, l) => sum + l.price, 0)}</h3>
          <p>Total Earnings</p>
        </div>
      </div>

      {listings.length === 0 ? (
        <div className="empty-listings">
          <h3>No Listings Yet</h3>
          <p>Start by adding your first product to the marketplace!</p>
          <Link href="/products">
            <button className="cta-btn">Add Your First Product</button>
          </Link>
        </div>
      ) : (
        <div className="listings-grid">
          {listings.map((listing) => (
            <div key={listing.id} className="listing-card">
              <div className="listing-image">
                <Image 
                  src={listing.image} 
                  alt={listing.title}
                  width={200}
                  height={150}
                  className="object-cover"
                />
                <div className={`status-badge ${listing.status.toLowerCase()}`}>
                  {listing.status}
                </div>
              </div>
              
              <div className="listing-content">
                <h3>{listing.title}</h3>
                <p className="listing-description">{listing.description}</p>
                <div className="listing-details">
                  <span className="price">₹{listing.price}</span>
                  <span className="category">{listing.category}</span>
                </div>
                <div className="listing-meta">
                  <span className="views">👁️ {listing.views} views</span>
                  <span className="date">📅 {new Date(listing.dateAdded).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="listing-actions">
                <button 
                  onClick={() => handleEdit(listing.id)}
                  className="edit-btn"
                >
                  ✏️ Edit
                </button>
                <button 
                  onClick={() => toggleStatus(listing.id)}
                  className={`status-btn ${listing.status.toLowerCase()}`}
                >
                  {listing.status === 'Active' ? '⏸️ Deactivate' : '▶️ Activate'}
                </button>
                <button 
                  onClick={() => handleDelete(listing.id)}
                  className="delete-btn"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
