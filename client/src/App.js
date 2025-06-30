import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { getUserFromToken } from './utils/auth';
import SelectRole from './pages/SelectRole';
import PosterDashboard from './pages/PosterDashboard';
import SeekerDashboard from './pages/SeekerDashboard';
import Footer from './components/Footer';

function App() {
  const user = getUserFromToken();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Optional home route */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/select-role" element={<SelectRole />} />

        <Route path="/dashboard/poster" element={<PosterDashboard />} />
        <Route path="/dashboard/seeker" element={<SeekerDashboard />} />

        <Route path="/dashboard" element={
          user?.role === 'poster' 
            ? <Navigate to="/dashboard/poster" />
            : user?.role === 'seeker'
            ? <Navigate to="/dashboard/seeker" />
            : <Navigate to="/login" />
        } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
