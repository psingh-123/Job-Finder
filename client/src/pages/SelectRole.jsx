import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SelectRole.css';

const SelectRole = () => {
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put('http://localhost:5000/api/jobs/select-role', 
        { role, location }, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      // Navigate based on role
      if (role === 'poster') {
        navigate('/dashboard/poster');
      } else {
        navigate('/dashboard/seeker');
      }
    } catch (error) {
      console.error('Error updating role', error);
    }
  };

  return (
    <div className="select-role-container">
      <h2>Select Your Role</h2>
      <form onSubmit={handleSubmit}>
        <div className="role-options">
          <label>
            <input
              type="radio"
              name="role"
              value="poster"
              checked={role === 'poster'}
              onChange={(e) => setRole(e.target.value)}
            />
            Job Poster
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="seeker"
              checked={role === 'seeker'}
              onChange={(e) => setRole(e.target.value)}
            />
            Job Seeker
          </label>
        </div>
        <input
          type="text"
          placeholder="Enter your location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default SelectRole;
