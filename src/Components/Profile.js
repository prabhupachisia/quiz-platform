import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  if (!user) {
    return <h2 className="loading-text">Loading Profile...</h2>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile Page</h1>
      <p className="profile-info"><strong>Name:</strong> {user.name}</p>
      <p className="profile-info"><strong>Email:</strong> {user.email}</p>
      <p className="profile-info"><strong>Role:</strong> {user.role}</p>
    </div>
  );
};

export default Profile;
