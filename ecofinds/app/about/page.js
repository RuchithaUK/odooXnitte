"use client";
import React from "react";
import "../globals.css";

export default function AboutPage() {
  return (
    <div className="about-container">
      <h1>About EcoFinds 🌍</h1>
      <p>
        EcoFinds is a platform dedicated to helping people make sustainable
        choices with ease. Our mission is to connect individuals with verified,
        eco-friendly products that truly make a difference for our planet.
      </p>

      <section className="mission">
        <h2>🌱 Our Mission</h2>
        <p>
          Many consumers want to live sustainably but struggle with
          greenwashing and lack of awareness. EcoFinds bridges this gap by
          showcasing **authentic, affordable, and accessible eco-products**.
        </p>
      </section>

      <section className="values">
        <h2>💡 Our Values</h2>
        <ul>
          <li>✅ Transparency – No greenwashing, only verified products.</li>
          <li>🌍 Sustainability – Helping protect our planet with every choice.</li>
          <li>👥 Community – Reviews and recommendations from real users.</li>
          <li>💰 Affordability – Eco-friendly doesn’t have to be expensive.</li>
        </ul>
      </section>

      <section className="team">
        <h2>👨‍💻 Our Team</h2>
        <p>
          We are a group of passionate students and developers working together
          to create a positive impact by merging technology with sustainability.
        </p>
      </section>
    </div>
  );
}
