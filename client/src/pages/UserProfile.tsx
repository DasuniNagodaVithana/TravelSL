import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UserProfile.css'
const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      axios.get(`http://localhost:3001/profile?userId=${userId}`)
        .then(response => {
          if (response.data.Status === 'Success') {
            setUserData(response.data.user);
          } else {
            setError('Failed to fetch user data.');
          }
        })
        .catch(err => {
          console.error(err);
          setError('An error occurred while fetching user data.');
        });
    } else {
      setError('No user ID found in session.');
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSave = () => {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      axios.put('http://localhost:3001/profile', { userId, ...userData })
        .then(response => {
          if (response.data.Status === 'Success') {
            setSuccessMessage('Profile updated successfully.');
            setIsEditing(false);
          } else {
            setError('Failed to update profile.');
          }
        })
        .catch(err => {
          console.error(err);
          setError('An error occurred while updating the profile.');
        });
    }
  };

  return (
    <div className="user-profile-container">
      <h2 className="text-center">User Profile</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      {successMessage && <p className="text-success text-center">{successMessage}</p>}
      <div className="user-profile-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            disabled
            className="form-control disabled-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="form-control"
          />
        </div>
        <div className="buttons-container">
          {!isEditing ? (
            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
          ) : (
            <div>
              <button className="btn btn-success" onClick={handleSave}>Save Changes</button>
              <button className="btn btn-secondary ml-2" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
