"use client";
import React from "react";
import Link from "next/link";
import "./Navbar.css"; // we'll style separately

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">🌱 EcoFinds</div>
      <ul className="nav-links">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/products">Products</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        <li><Link href="/cart">Cart</Link></li>
      </ul>
    </nav>
  );
}
