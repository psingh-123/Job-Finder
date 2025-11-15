import React, { useState } from "react";
import ReportUserForm from "./ReportUserForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApplicantsList = ({ applicants }) => {
  const [activeReportEmail, setActiveReportEmail] = useState(null);

  const toggleReportForm = (email) => {
    if (activeReportEmail === email) {
      setActiveReportEmail(null);
    } else {
      setActiveReportEmail(email);
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      {applicants.map((user) => (
        <div key={user.email} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #eee", borderRadius: "5px" }}>
          <p style={{ margin: "0 0 8px 0" }}>
            {user.name} ({user.email})
          </p>

          {/* Toggle button for report form */}
          <button 
            onClick={() => toggleReportForm(user.email)}
            style={{
              padding: "4px 8px",
              background: activeReportEmail === user.email ? "#dc3545" : "#ff6b6b",
              color: "white",
              borderRadius: "3px",
              border: "none",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold"
            }}
          >
            {activeReportEmail === user.email ? "Close Report" : "Report User"}
          </button>

          {/* Show form only for THIS user */}
          {activeReportEmail === user.email && (
            <div style={{ marginTop: "10px" }}>
              <ReportUserForm
                reportedEmail={user.email}
                onClose={() => setActiveReportEmail(null)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ApplicantsList;