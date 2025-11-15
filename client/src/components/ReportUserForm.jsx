import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReportUserForm = ({ reportedEmail, onClose = () => {} }) => {
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      toast.error("❌ Please describe the issue");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/reports`,
        { reportedEmail, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("✅ Report submitted successfully");
      setDescription("");
      
      setTimeout(() => {
        onClose();
      }, 500);

    } catch (err) {
      toast.error("❌ Failed to submit report");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {/* Header Row */}
      <div style={{
        padding: "10px 12px",
        background: "#f8f9fa",
        borderBottom: "1px solid #dee2e6",
        fontWeight: "bold",
        fontSize: "14px"
      }}>
        Report: {reportedEmail}
      </div>

      {/* Description Row */}
      <div style={{ padding: "12px" }}>
        <textarea
          placeholder="Describe the issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            minHeight: "80px",
            padding: "8px",
            border: "1px solid #ced4da",
            borderRadius: "4px",
            resize: "vertical",
            fontSize: "14px",
            fontFamily: "inherit"
          }}
        />
      </div>

      {/* Buttons Row */}
      <div style={{
        padding: "10px 12px",
        background: "#f8f9fa",
        borderTop: "1px solid #dee2e6",
        display: "flex",
        gap: "10px",
        justifyContent: "flex-end"
      }}>
        <button
          type="button"
          onClick={onClose}
          style={{
            padding: "6px 16px",
            background: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "14px",
            cursor: "pointer",
            fontWeight: "500"
          }}
        >
          Cancel
        </button>
        
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{
            padding: "6px 16px",
            background: isSubmitting ? "#6c757d" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "14px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            fontWeight: "500"
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default ReportUserForm;