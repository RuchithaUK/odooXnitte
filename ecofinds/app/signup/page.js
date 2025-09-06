"use client";
import React, { useState } from "react";
import { useRo  return (
    <div className="form-container">
      <h1>Sign Up for EcoFinds</h1>

      <form onSubmit={handleSignup} className="form">{m "next/navigation";
import "../globals.css";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Input validation
    if (!username || !email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    // Username validation
    if (username.length < 3) {
      setError("Username must be at least 3 characters long");
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

    // Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    // Check if trying to use existing sample credentials
    const sampleEmails = ["customer@ecofinds.com", "seller@ecofinds.com"];
    if (sampleEmails.includes(email.toLowerCase())) {
      setError("This email is already registered. Please use the login page with sample credentials.");
      setLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo purposes, show success message and redirect
    console.log("Signing up:", username, email, password);
    alert("Account created successfully! Please use the sample credentials to login for demo purposes.");
    router.push("/login");
    
    setLoading(false);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError(""); // Clear error when user starts typing
  };

  return (
    <div className="form-container">
      <h1>Sign Up for EcoFinds</h1>
      
      {/* Demo Notice */}
      <div className="demo-notice">
        <p><strong>Demo Mode:</strong> This is a demonstration app. Please use the sample credentials on the login page to test the application.</p>
      </div>

      <form onSubmit={handleSignup} className="form">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="input-group">
          <input
            type="text"
            placeholder="Username (min. 3 characters)"
            value={username}
            onChange={handleInputChange(setUsername)}
            required
            disabled={loading}
            className={error ? 'error' : ''}
          />
        </div>

        <div className="input-group">
          <input
            type="email"
            placeholder="Email address"
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
            placeholder="Password (min. 6 characters)"
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
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
      
      <div className="form-links">
        <p>
          Already have an account?{" "}
          <span className="link" onClick={() => router.push("/login")}>
            Login
          </span>
        </p>
        
        <p>
          <span className="link" onClick={() => router.push("/user-type")}>
            ← Choose user type
          </span>
        </p>
      </div>
    </div>
  );
}
