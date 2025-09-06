"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../globals.css";

export default function UserProfile() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    address: "",
    bio: "",
    profileImage: ""
  });
  const [originalProfile, setOriginalProfile] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const type = sessionStorage.getItem('userType') || '';
    
    if (!loggedIn) {
      router.push('/user-type');
      return;
    }

    setIsLoggedIn(loggedIn);
    setUserType(type);

    // Load user profile from sessionStorage or set defaults
    const savedProfile = JSON.parse(sessionStorage.getItem('userProfile') || '{}');
    const defaultProfile = {
      name: savedProfile.name || "John Doe",
      email: sessionStorage.getItem('userEmail') || "user@example.com",
      age: savedProfile.age || "25",
      phone: savedProfile.phone || "+91 9876543210",
      address: savedProfile.address || "123 Green Street, Eco City",
      bio: savedProfile.bio || (type === 'seller' ? "Passionate about sustainable living and eco-friendly products." : "Love discovering unique second-hand treasures!"),
      profileImage: savedProfile.profileImage || ""
    };

    setUserProfile(defaultProfile);
    setOriginalProfile(defaultProfile);
    setImagePreview(defaultProfile.profileImage);
  }, [router]);

  const handleInputChange = (field, value) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      setIsUploading(true);
      
      // Create a FileReader to convert image to base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        setImagePreview(base64Image);
        setUserProfile(prev => ({
          ...prev,
          profileImage: base64Image
        }));
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfileImage = () => {
    setImagePreview("");
    setUserProfile(prev => ({
      ...prev,
      profileImage: ""
    }));
  };

  const handleSave = () => {
    // Save to sessionStorage
    sessionStorage.setItem('userProfile', JSON.stringify(userProfile));
    sessionStorage.setItem('userEmail', userProfile.email);
    
    setOriginalProfile(userProfile);
    setIsEditing(false);
    
    // Show success message (you could implement a toast notification here)
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setUserProfile(originalProfile);
    setImagePreview(originalProfile.profileImage);
    setIsEditing(false);
  };

  if (!isLoggedIn) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-container">
            {imagePreview ? (
              <img src={imagePreview} alt="Profile" className="profile-image" />
            ) : (
              <div className="avatar-icon">👤</div>
            )}
            {isEditing && (
              <div className="image-upload-overlay">
                <input
                  type="file"
                  id="profile-image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <label htmlFor="profile-image-upload" className="upload-btn">
                  {isUploading ? '⏳' : '📷'}
                </label>
                {imagePreview && (
                  <button className="remove-image-btn" onClick={removeProfileImage}>
                    ❌
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="profile-title">
          <h1>User Profile</h1>
          <p className="user-type-badge">{userType === 'customer' ? '🛒 Customer' : '🏪 Seller'}</p>
        </div>
        <div className="profile-actions">
          {!isEditing ? (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              ✏️ Edit Profile
            </button>
          ) : (
            <div className="edit-actions">
              <button className="save-btn" onClick={handleSave}>
                ✅ Save
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                ❌ Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>Personal Information</h2>
          <div className="profile-grid">
            <div className="profile-field">
              <label>Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={userProfile.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                />
              ) : (
                <div className="field-value">{userProfile.name}</div>
              )}
            </div>

            <div className="profile-field">
              <label>Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  value={userProfile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                />
              ) : (
                <div className="field-value">{userProfile.email}</div>
              )}
            </div>

            <div className="profile-field">
              <label>Age</label>
              {isEditing ? (
                <input
                  type="number"
                  value={userProfile.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="Enter your age"
                  min="18"
                  max="100"
                />
              ) : (
                <div className="field-value">{userProfile.age} years old</div>
              )}
            </div>

            <div className="profile-field">
              <label>Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={userProfile.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                />
              ) : (
                <div className="field-value">{userProfile.phone}</div>
              )}
            </div>

            <div className="profile-field full-width">
              <label>Address</label>
              {isEditing ? (
                <textarea
                  value={userProfile.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter your address"
                  rows="2"
                />
              ) : (
                <div className="field-value">{userProfile.address}</div>
              )}
            </div>

            <div className="profile-field full-width">
              <label>Bio</label>
              {isEditing ? (
                <textarea
                  value={userProfile.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows="3"
                />
              ) : (
                <div className="field-value">{userProfile.bio}</div>
              )}
            </div>
          </div>
        </div>

        {userType === 'seller' && (
          <div className="profile-section">
            <h2>Seller Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📦</div>
                <div className="stat-info">
                  <h3>5</h3>
                  <p>Products Listed</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <h3>₹12,500</h3>
                  <p>Total Earnings</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-info">
                  <h3>4.8</h3>
                  <p>Average Rating</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🛒</div>
                <div className="stat-info">
                  <h3>23</h3>
                  <p>Items Sold</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {userType === 'customer' && (
          <div className="profile-section">
            <h2>Purchase History</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🛍️</div>
                <div className="stat-info">
                  <h3>12</h3>
                  <p>Items Purchased</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💸</div>
                <div className="stat-info">
                  <h3>₹8,750</h3>
                  <p>Total Spent</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🌱</div>
                <div className="stat-info">
                  <h3>15kg</h3>
                  <p>CO₂ Saved</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-info">
                  <h3>5</h3>
                  <p>Reviews Given</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="profile-section">
          <h2>Account Settings</h2>
          <div className="settings-grid">
            <div className="setting-item">
              <div className="setting-info">
                <h3>🔔 Email Notifications</h3>
                <p>Get notified about new messages and updates</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h3>🌙 Dark Mode</h3>
                <p>Switch to dark theme for better viewing</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h3>📱 SMS Notifications</h3>
                <p>Receive SMS updates for important activities</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
