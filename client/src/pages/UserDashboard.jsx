import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // adjust path if needed
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    // Example: Fetch applied jobs from backend if available
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`https://naukari-dhundo.onrender.com/api/jobs/applied`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setAppliedJobs(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchJobs();
  }, []);

  if (!user) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Not Logged In</h2>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome, {user.name || "User"} 👋
          </h2>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="mb-4">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role || "Seeker"}
          </p>
        </div>

        <hr className="my-4" />

        <div>
          <h3 className="text-xl font-semibold mb-3">Your Applied Jobs</h3>
          {appliedJobs.length === 0 ? (
            <p className="text-gray-600">You haven’t applied to any jobs yet.</p>
          ) : (
            <ul className="space-y-2">
              {appliedJobs.map((job) => (
                <li
                  key={job._id}
                  className="border rounded-lg p-3 hover:shadow-md transition"
                >
                  <h4 className="font-semibold">{job.title}</h4>
                  <p className="text-gray-600">{job.company}</p>
                  <p className="text-sm text-gray-500">
                    Status: {job.status || "Pending"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
