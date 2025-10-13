// ReportAbuseButton.jsx
import React, { useState } from "react";
import ReportAbuseForm from "./ReportAbuseForm";

const ReportAbuseButton = ({ reportedUserId, jobId }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div style={{ position: "absolute", top: "20px", left: "20px", zIndex: 1000 }}>
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          style={{
            backgroundColor: "#e74c3c",
            color: "#fff",
            padding: "8px 12px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🚨 Report Abuse
        </button>
      )}

      {showForm && (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            width: "300px",
          }}
        >
          <button
            onClick={() => setShowForm(false)}
            style={{ float: "right", cursor: "pointer", fontWeight: "bold", border: "none", background: "none" }}
          >
            ✖
          </button>
          <ReportAbuseForm reportedUserId={reportedUserId} jobId={jobId} />
        </div>
      )}
    </div>
  );
};

export default ReportAbuseButton;
