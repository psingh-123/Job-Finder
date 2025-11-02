import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReportUserForm = () => {
  const [reportedEmail, setReportedEmail] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reportedEmail || !description) {
      toast.error("❌ All fields are required");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("⚠️ Not authorized, no token found. Please login first.");
        setIsSubmitting(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/reports",
        { reportedEmail, description },
        config
      );

      // Success message with longer duration
      toast.success("✅ Report submitted successfully! Our team will review it shortly.", {
        autoClose: 5000,
        position: "top-center",
      });
      
      console.log("Report response:", data);

      // Clear form
      setReportedEmail("");
      setDescription("");
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error(
        error.response?.data?.message || "❌ Failed to submit the report. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "1rem" }}>
      <h2>Report User</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Reported User Email</label>
          <input
            type="email"
            value={reportedEmail}
            onChange={(e) => setReportedEmail(e.target.value)}
            placeholder="Enter reported user's email"
            style={{ width: "100%", padding: "0.5rem" }}
            disabled={isSubmitting}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue"
            style={{ width: "100%", padding: "0.5rem", minHeight: "100px" }}
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            backgroundColor: isSubmitting ? "#6c757d" : "#007bff",
            color: "#fff",
            padding: "0.6rem 1rem",
            border: "none",
            borderRadius: "5px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            opacity: isSubmitting ? 0.6 : 1,
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit Report"}
        </button>
      </form>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ReportUserForm;