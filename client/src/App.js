import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { getUserFromToken } from './utils/auth';
import Profile from './pages/Profile';
import SelectRole from './pages/SelectRole';
import GoogleSuccess from './pages/GoogleSuccess';
import PosterDashboard from './pages/PosterDashboard';
import SeekerDashboard from './pages/SeekerDashboard';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const user = getUserFromToken();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
         <Route path="/google-success" element={<GoogleSuccess />} />
         <Route path="/profile" element={<Profile />} />
        <Route path="/select-role" element={<SelectRole />} />
        <Route path="/dashboard/poster" element={<PosterDashboard />} />
        <Route path="/dashboard/seeker" element={<SeekerDashboard />} />

        <Route
          path="/dashboard"
          element={
            user?.role === 'poster' ? (
              <Navigate to="/dashboard/poster" />
            ) : user?.role === 'seeker' ? (
              <Navigate to="/dashboard/seeker" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
