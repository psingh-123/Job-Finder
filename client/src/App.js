import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SelectRole from './pages/SelectRole';
import GoogleSuccess from './pages/GoogleSuccess';
import PosterDashboard from './pages/PosterDashboard';
import SeekerDashboard from './pages/SeekerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import AdminUsers from "./pages/AdminUsers";
import AdminJobs from "./pages/AdminJobs";
import NotAuthorized from './pages/NotAuthorized';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import { useAuth } from "./context/AuthContext";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const { user } = useAuth(); // ✅ use context

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
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <AdminUsers />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/jobs"
        element={
          <AdminRoute>
            <AdminJobs />
          </AdminRoute>
        }
      />

        <Route path="/not-authorized" element={<NotAuthorized />} />

        <Route
          path="/dashboard"
          element={
            user?.role === "poster" ? (
              <Navigate to="/dashboard/poster" />
            ) : user?.role === "seeker" ? (
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
