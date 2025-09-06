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
    
    // Sample credential validation
    const sampleCredentials = {
      customer: { email: "customer@ecofinds.com", password: "customer123" },
      seller: { email: "seller@ecofinds.com", password: "seller123" }
    };

    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1000));

    const currentCredentials = sampleCredentials[userType];
    
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
    } else if (email && password) {
      // For demonstration, allow any valid email/password combination
      sessionStorage.setItem('userType', userType || 'customer');
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userEmail', email);
      console.log("Logged in with custom credentials:", email);
      
      // Dispatch login status change event
      window.dispatchEvent(new Event('loginStatusChanged'));
      
      router.push("/");
    } else {
      setError("Please enter both email and password");
    }
    
    setLoading(false);
  };

  const fillSampleCredentials = () => {
    if (userType === 'customer') {
      setEmail('customer@ecofinds.com');
      setPassword('customer123');
    } else if (userType === 'seller') {
      setEmail('seller@ecofinds.com');
      setPassword('seller123');
    }
    setError(""); // Clear any existing errors
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
