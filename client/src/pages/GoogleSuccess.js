import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GoogleSuccess = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const hasLoggedIn = useRef(false); // prevent repeat login

  useEffect(() => {
    if (hasLoggedIn.current) return;

    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    if (token) {
      const user = JSON.parse(atob(token.split('.')[1]));
      console.log("Decoded user:", user);
      login(user, token); // should store user + token
      hasLoggedIn.current = true;
      navigate('/select-role');
    } else {
      navigate('/login');
    }
  }, [location.search, login, navigate]);

  return <p style={{ fontWeight: 'bold', color: '#007bff' }}>Logging you in via Google...</p>;

};

export default GoogleSuccess;
