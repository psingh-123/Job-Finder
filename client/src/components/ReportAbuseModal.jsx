import { useState } from "react";
import axios from "axios";
import "./ReportAbuseModal.css";

const ReportAbuseModal = ({ show, onClose, reportedUser, reportedJob, role }) => {
  const [seekerEmail, setSeekerEmail] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    // Basic email validation
    if (!seekerEmail || !seekerEmail.includes('@')) {
      setMessage("❌ Please enter a valid email address");
      return;
    }
    
    if (!reason.trim()) {
      setMessage("❌ Please describe the issue");
      return;
    }

    setLoading(true);
    setMessage("");

    console.log("Token:", localStorage.getItem("token"));

    try {
      const res = await axios.post(
        "http://localhost:5000/api/reports",
        { 
          reportedUser, 
          reportedJob, 
          role, 
          seekerEmail, 
          reason 
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("✅ Report submitted successfully!");
      setSeekerEmail("");
      setReason("");
    } catch (error) {
      setMessage("❌ Failed to submit report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Report Abuse</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="seekerEmail">Seeker Email Address *</label>
            <input
              id="seekerEmail"
              type="email"
              value={seekerEmail}
              onChange={(e) => setSeekerEmail(e.target.value)}
              placeholder="Enter seeker's email address"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="reason">Describe the Issue *</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please describe the issue in detail..."
              required
              rows="5"
            ></textarea>
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Report"}
          </button>
          {message && <p className="message">{message}</p>}
        </form>
        <button className="close-btn" onClick={onClose}>
          ✖ Close
        </button>
      </div>
    </div>
  );
};

export default ReportAbuseModal;