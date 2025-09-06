"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../globals.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get user type from sessionStorage
    const selectedUserType = sessionStorage.getItem('selectedUserType');
    if (selectedUserType) {
      setUserType(selectedUserType);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    // Input validation
    if (!email || !password) {
      setError("Please enter both email and password");
      setLoading(false);
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    // Password length validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }
    
    // Sample credential validation (ONLY these credentials are allowed)
    const sampleCredentials = {
      customer: { email: "customer@ecofinds.com", password: "customer123" },
      seller: { email: "seller@ecofinds.com", password: "seller123" }
    };

    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1000));

    const currentCredentials = sampleCredentials[userType];
    
    // Strict validation - only allow exact matches
    if (currentCredentials && email === currentCredentials.email && password === currentCredentials.password) {
      // Store user info in sessionStorage
      sessionStorage.setItem('userType', userType);
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userEmail', email);
      console.log(`Successfully logged in as ${userType}:`, email);
      
      // Dispatch login status change event
      window.dispatchEvent(new Event('loginStatusChanged'));
      
      // Redirect to home page
      router.push("/");
    } else {
      // Invalid credentials - show generic error message
      setError("Invalid email or password. Please check your credentials and try again.");
    }
    
    setLoading(false);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError(""); // Clear error when user starts typing
  };

  return (
    <div className="form-container">
      <div className="login-header">
        <h1>Login to EcoFinds</h1>
        {userType && (
          <div className="user-type-indicator">
            <p>Signing in as: <strong>{userType === 'customer' ? 'Customer' : 'Seller'}</strong></p>
          </div>
        )}
      </div>

      <form onSubmit={handleLogin} className="form">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleInputChange(setEmail)}
            required
            disabled={loading}
            className={error ? 'error' : ''}
          />
        </div>
        
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange(setPassword)}
            required
            disabled={loading}
            className={error ? 'error' : ''}
          />
        </div>
        
        <button 
          type="submit" 
          className={`cta-btn ${loading ? 'loading' : ''}`}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <div className="form-links">
        <p>
          Don&apos;t have an account?{" "}
          <span className="link" onClick={() => router.push("/signup")}>
            Sign up
          </span>
        </p>
        
        <p>
          <span className="link" onClick={() => router.push("/user-type")}>
            ← Choose different user type
          </span>
        </p>
      </div>
    </div>
  );
}
