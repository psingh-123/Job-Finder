import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`https://naukari-dhundo.onrender.com/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProfile(res.data); // full user object with email, phone, etc.
      } catch (err) {
        console.error('Failed to load profile', err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <p>Loading profile...</p>;


  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      
      <div className="profile-field">
        <label>Name</label>
        <input type="text" value={profile.name || ''} readOnly />
      </div>

      <div className="profile-field">
        <label>Email</label>
        <input type="email" value={profile.email || ''} readOnly />
      </div>

      <div className="profile-field">
        <label>Role</label>
        <select value={profile.role || ''} disabled>
          <option value="poster">Job Poster</option>
          <option value="seeker">Job Seeker</option>
        </select>
      </div>
    </div>
  );
};

export default Profile;
