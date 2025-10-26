import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; // import the CSS

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p className="welcome-text">
        Welcome, Admin! Here you can manage users, jobs, and site settings.
      </p>

      <div className="card-grid">
        <div className="card" onClick={() => navigate("/admin/users")}>
          <h2>👥 View All Users</h2>
          <p>See and manage registered users.</p>
        </div>

        <div className="card" onClick={() => navigate("/admin/jobs")}>
          <h2>💼 Manage Jobs</h2>
          <p>View, edit, or delete job postings.</p>
        </div>

        <div className="card" onClick={() => navigate("/admin/analytics")}>
          <h2>📊 Site Analytics</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
