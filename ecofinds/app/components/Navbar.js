"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Navbar.css";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
    { href: "/cart", label: "Cart" },
  ];

  return (
    <nav className="navbar">
      <div className="nav-logo">🌱 EcoFinds</div>
      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link 
              href={item.href}
              className={pathname === item.href ? "active" : ""}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
