// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminJobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");

//   const fetchJobs = async () => {
//     try {
//       const res = await axios.get("/api/admin/jobs", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setJobs(res.data);
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//       alert("Failed to fetch jobs.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Delete this job?")) {
//       try {
//         await axios.delete(`/api/admin/jobs/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setJobs(jobs.filter((job) => job._id !== id));
//         alert("Job deleted successfully!");
//       } catch (error) {
//         console.error("Delete failed:", error);
//         alert("Failed to delete job.");
//       }
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen text-gray-600">
//         Loading jobs...
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-2xl font-bold mb-6">💼 Manage Jobs</h1>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded-lg shadow-md">
//           <thead>
//             <tr className="bg-gray-200 text-gray-700 text-left">
//               <th className="py-3 px-4">Title</th>
//               <th className="py-3 px-4">Company</th>
//               <th className="py-3 px-4">Applicants</th>
//               <th className="py-3 px-4 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {jobs.map((job) => (
//               <tr key={job._id} className="border-t hover:bg-gray-50">
//                 <td className="py-3 px-4">{job.title}</td>
//                 <td className="py-3 px-4">{job.company}</td>
//                 <td className="py-3 px-4 text-center">{job.applicantsCount}</td>
//                 <td className="py-3 px-4 text-center">
//                   <button
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     onClick={() => handleDelete(job._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {jobs.length === 0 && (
//               <tr>
//                 <td colSpan="4" className="text-center py-4 text-gray-500">
//                   No job postings found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminJobs;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users. Make sure you are logged in as admin.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(users.filter((user) => user._id !== id));
        alert("User deleted successfully!");
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete user.");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="admin-users-container">
        <p>Loading users...</p>
      </div>
    );

  return (
    <div className="admin-users-container">
      <h1>👥 All Registered Users</h1>
      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name || "N/A"}</td>
                  <td>{user.email || "N/A"}</td>
                  <td>{user.role || "N/A"}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-users">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
