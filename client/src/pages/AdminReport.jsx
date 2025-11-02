import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminReports.css";

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
  const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/reports/reports`);
        console.log("Fetched reports:", res.data); 
        setReports(res.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleRemoveJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to remove this job?")) return;

    try {
  await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/reports/admin/jobs/${jobId}`);
      setReports((prev) => prev.filter((r) => r.reportedJob?._id !== jobId));
      alert("Job removed successfully!");
    } catch (error) {
      console.error("Error removing job:", error);
      alert("Failed to remove job.");
    }
  };

  if (loading) return <p>Loading reports...</p>;

  return (
    <div className="admin-reports">
      <h1>🚨 Reported Jobs</h1>
      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <div className="reports-list">
          {reports.map((report) => (
            <div key={report._id} className="report-card">
              <h3>{report.reportedJob?.title || "Unknown Job"}</h3>
              <p><strong>Reported By:</strong> {report.reporter?.email || "Anonymous"}</p>
              <p><strong>Role:</strong> {report.role}</p>
              <p><strong>Reason:</strong> {report.reason}</p>
              <p><strong>Status:</strong> {report.status}</p>
              <p><strong>Date:</strong> {new Date(report.createdAt).toLocaleString()}</p>
              <button
                className="remove-btn"
                onClick={() => handleRemoveJob(report.reportedJob?._id)}
              >
                🗑 Remove Job
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReports;