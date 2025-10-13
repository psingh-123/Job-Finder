// // import React from 'react';

// // const AdminDashboard = () => {
// //   return (
// //     <div className="admin-dashboard-container">
// //       <h1>Admin Dashboard</h1>
// //       <p>Welcome, Admin! Here you can manage users, jobs, and site settings.</p>

// //       {/* Example admin controls */}
// //       <div className="admin-controls">
// //         <button>View All Users</button>
// //         <button>Manage Jobs</button>
// //         <button>Site Analytics</button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
//       <p className="text-gray-600 mb-6">
//         Welcome, Admin! Here you can manage users, jobs, and site settings.
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div
//           className="p-6 bg-white shadow rounded-xl hover:shadow-lg cursor-pointer"
//           onClick={() => navigate("/admin/users")}
//         >
//           <h2 className="text-xl font-semibold mb-2">👥 View All Users</h2>
//           <p className="text-gray-500">See and manage registered users.</p>
//         </div>

//         <div
//           className="p-6 bg-white shadow rounded-xl hover:shadow-lg cursor-pointer"
//           onClick={() => navigate("/admin/jobs")}
//         >
//           <h2 className="text-xl font-semibold mb-2">💼 Manage Jobs</h2>
//           <p className="text-gray-500">View, edit, or delete job postings.</p>
//         </div>

//         <div className="p-6 bg-white shadow rounded-xl">
//           <h2 className="text-xl font-semibold mb-2">📊 Site Analytics</h2>
//           <p className="text-gray-500">Coming soon...</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
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

        <div className="card inactive">
          <h2>📊 Site Analytics</h2>
          <p>Coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
