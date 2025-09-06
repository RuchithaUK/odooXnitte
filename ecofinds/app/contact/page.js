"use client";
import React, { useState } from "react";
import "../globals.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We’ll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <h1>📩 Contact Us</h1>
      <p>
        Have questions, feedback, or ideas? We’d love to hear from you!  
        Fill out the form below or reach us through our details.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Message:</label>
        <textarea
          name="message"
          placeholder="Type your message..."
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" className="cta-btn">
          Send Message
        </button>
      </form>

      <section className="contact-info">
        <h2>📍 Our Info</h2>
        <p>Email: support@ecofinds.com</p>
        <p>Phone: +91 98765 43210</p>
        <p>Location: EcoFinds HQ, New Delhi, India</p>
      </section>
    </div>
  );
}
