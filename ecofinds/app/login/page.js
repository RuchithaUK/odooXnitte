"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../globals.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Later: add backend API call
    console.log("Logging in:", email, password);
    router.push("/"); // redirect to home after login
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="cta-btn">Login</button>
      </form>
      <p>
        Don’t have an account?{" "}
        <span className="link" onClick={() => router.push("/signup")}>
          Sign up
        </span>
      </p>
    </div>
  );
}
