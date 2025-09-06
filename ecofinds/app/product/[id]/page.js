"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../../globals.css";

export default function ProductDetails({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(true);

  // All products data (same as in other components)
  const allProducts = [
    { id: 1, title: "Vintage Jacket", category: "Clothes", price: 1200, image: "/images/products/Vintage_Jacket.png", description: "A stylish vintage leather jacket in excellent condition. This jacket has been carefully maintained and shows minimal signs of wear. Perfect for casual outings and adds a classic touch to any wardrobe. The leather is soft and supple, with original hardware intact." },
    { id: 2, title: "Smartphone X", category: "Electronics", price: 8000, image: "/images/products/Smartphone_X.png", description: "Latest smartphone with advanced features and great camera quality. This device comes with original packaging and accessories. Features include high-resolution display, long-lasting battery, and cutting-edge processor for smooth performance." },
    { id: 3, title: "Wooden Chair", category: "Furniture", price: 2000, image: "/images/products/WoodenChair.png", description: "Handcrafted wooden chair perfect for any home decor. Made from solid oak wood with excellent craftsmanship. The chair features ergonomic design for comfort and durability. Ideal for dining room, study, or office use." },
    { id: 4, title: "Designer Handbag", category: "Clothes", price: 1500, image: "/images/products/DesignerHandbag.png", description: "Elegant designer handbag in premium leather. This authentic piece features multiple compartments for organization and comes with authenticity certificate. Perfect for both casual and formal occasions." },
    { id: 5, title: "Gaming Laptop", category: "Electronics", price: 45000, image: "/images/products/GamingLaptop.png", description: "High-performance gaming laptop with latest graphics card. Equipped with powerful processor, ample RAM, and fast SSD storage. Perfect for gaming, video editing, and intensive computing tasks." },
    { id: 6, title: "Coffee Table", category: "Furniture", price: 3500, image: "/images/products/CoffeeTable.png", description: "Modern glass coffee table for your living room. Features tempered glass top with sturdy metal legs. Easy to clean and adds contemporary elegance to any space." },
    // Seller listings
    { id: 7, title: "Vintage Leather Boots", category: "Clothes", price: 2500, image: "/images/VintageLeatherBoots.jpeg", description: "Well-maintained vintage leather boots, perfect for casual wear. These boots are made from genuine leather and have been properly conditioned. They show minimal wear and have comfortable cushioned insoles." },
    { id: 8, title: "Wireless Headphones", category: "Electronics", price: 3500, image: "/images/WirelessHeadphone.jpeg", description: "High-quality wireless headphones with noise cancellation. Features premium sound quality, long battery life, and comfortable over-ear design. Includes original charging case and accessories." },
    { id: 9, title: "Antique Desk Lamp", category: "Furniture", price: 1800, image: "/images/AntiqueDesklamp.jpeg", description: "Beautiful antique brass desk lamp, fully functional. This vintage piece adds character to any workspace. Features adjustable arm and original electrical components that have been safety tested." },
  ];

  useEffect(() => {
    // Check user login status
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const type = sessionStorage.getItem('userType') || '';
    
    setIsLoggedIn(loggedIn);
    setUserType(type);

    // Find the product by ID
    const productId = parseInt(params.id);
    const foundProduct = allProducts.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
    }
    
    setLoading(false);
  }, [params.id]); // allProducts is static, no need to include

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert("Please login to add items to cart!");
      router.push("/user-type");
      return;
    }
    
    if (userType !== 'customer') {
      alert("Only customers can add items to cart!");
      return;
    }
    
    alert(`Added ${product.title} to cart! (In future, will update cart state)`);
  };

  const handleBackClick = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="product-details-page">
        <div className="loading-container">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-page">
        <div className="error-container">
          <h2>Product Not Found</h2>
          <p>The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/products">
            <button className="cta-btn">Browse Products</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        {/* Back Button */}
        <button onClick={handleBackClick} className="back-btn">
          ← Back
        </button>

        {/* Product Details */}
        <div className="product-details-content">
          <div className="product-image-large">
            <Image 
              src={product.image} 
              alt={product.title}
              width={500}
              height={400}
              className="object-cover"
            />
          </div>
          
          <div className="product-info-detailed">
            <div className="product-header">
              <h1>{product.title}</h1>
              <div className="product-category-badge">
                {product.category}
              </div>
            </div>
            
            <div className="product-price-large">
              ₹{product.price.toLocaleString()}
            </div>
            
            <div className="product-description-full">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
            
            <div className="product-actions-detailed">
              {isLoggedIn && userType === 'customer' && (
                <button 
                  onClick={handleAddToCart}
                  className="add-to-cart-btn-large"
                >
                  🛒 Add to Cart
                </button>
              )}
              
              {isLoggedIn && userType === 'seller' && (
                <div className="seller-info">
                  <p>You&apos;re viewing this as a seller. Only customers can purchase items.</p>
                </div>
              )}
              
              {!isLoggedIn && (
                <div className="login-prompt">
                  <p>Please login to purchase this item</p>
                  <Link href="/user-type">
                    <button className="login-btn">Login</button>
                  </Link>
                </div>
              )}
            </div>
            
            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <span className="meta-value">{product.category}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Product ID:</span>
                <span className="meta-value">#{product.id.toString().padStart(4, '0')}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Condition:</span>
                <span className="meta-value">Excellent</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
