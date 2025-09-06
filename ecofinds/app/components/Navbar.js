"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import "./Navbar.css"; // we'll style separately

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Check login status on component mount
    const checkLoginStatus = () => {
      const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
      const type = sessionStorage.getItem('userType') || '';
      const email = sessionStorage.getItem('userEmail') || '';
      
      setIsLoggedIn(loggedIn);
      setUserType(type);
      setUserEmail(email);
    };

    checkLoginStatus();

    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkLoginStatus);
    
    // Custom event for same-tab login status changes
    window.addEventListener('loginStatusChanged', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('loginStatusChanged', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('selectedUserType');
    
    // Update state
    setIsLoggedIn(false);
    setUserType("");
    setUserEmail("");
    
    // Dispatch custom event
    window.dispatchEvent(new Event('loginStatusChanged'));
    
    // Redirect to home
    router.push("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">🌱 EcoFinds</div>
      <ul className="nav-links">
        <li><Link href="/" className={pathname === '/' ? 'active' : ''}>Home</Link></li>
        <li><Link href="/about" className={pathname === '/about' ? 'active' : ''}>About</Link></li>
        <li><Link href="/products" className={pathname === '/products' ? 'active' : ''}>Products</Link></li>
        <li><Link href="/contact" className={pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
        {isLoggedIn && userType === 'customer' && (
          <li><Link href="/cart" className={pathname === '/cart' ? 'active' : ''}>Cart</Link></li>
        )}
        {isLoggedIn && userType === 'seller' && (
          <li><Link href="/my-listings" className={pathname === '/my-listings' ? 'active' : ''}>My Listings</Link></li>
        )}
        {!isLoggedIn && (
          <li><Link href="/cart" className={pathname === '/cart' ? 'active' : ''}>Cart</Link></li>
        )}
        {isLoggedIn ? (
          <li className="user-info">
            <span className="user-greeting">
              Hello, {userType === 'customer' ? 'Customer' : 'Seller'}!
            </span>
            <Link href="/user-profile" className={`user-profile-link ${pathname === '/user-profile' ? 'active' : ''}`}>
              👤 User
            </Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        ) : (
          <li><Link href="/user-type" className={pathname === '/user-type' || pathname === '/login' ? 'active' : ''}>Login</Link></li>
        )}
      </ul>
    </nav>
  );
}
