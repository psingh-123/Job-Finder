// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./AdminReport.css"; // Import the CSS file

// const AdminReports = () => {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(
//           `${process.env.REACT_APP_BACKEND_URL}/api/admin/reports`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         setReports(res.data.reports || res.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Failed to load reports", err);
//         setError("Failed to load reports. Please try again.");
//         setLoading(false);
//       }
//     };

//     fetchReports();
//   }, []);

//   if (loading) {
//     return (
//       <div className="admin-reports-container">
//         <h2>📢 User Reports</h2>
//         <div className="loading-reports">Loading reports...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="admin-reports-container">
//         <h2>📢 User Reports</h2>
//         <div className="error-message">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-reports-container">
//       <h2>📢 User Reports</h2>

//       {reports.length === 0 ? (
//         <div className="no-reports-message">
//           No reports found.
//         </div>
//       ) : (
//         <div className="reports-list">
//           {reports.map((r) => (
//             <div key={r._id} className="report-card">
//               <p className="report-email">
//                 <strong>Reported Email:</strong> {r.reportedEmail}
//               </p>
//               <div className="report-description">
//                 <strong>Description:</strong> 
//                 <p>{r.description}</p>
//               </div>
//               <p className="report-date">
//                 {new Date(r.createdAt).toLocaleString()}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminReports;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminReport.css";

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/admin/reports`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setReports(res.data.reports || res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load reports", err);
        setError("Failed to load reports. Please try again.");
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="admin-reports-container">
        <h2>📢 User Reports</h2>
        <div className="loading-reports">Loading reports...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-reports-container">
        <h2>📢 User Reports</h2>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  // ✅ filter only valid reports (email + description)
  const validReports = reports.filter(
    (r) => r.reportedEmail && r.description
  );

  return (
    <div className="admin-reports-container">
      <h2>📢 User Reports</h2>

      {validReports.length === 0 ? (
        <div className="no-reports-message">No reports found.</div>
      ) : (
        <div className="reports-list">
          {validReports.map((r) => (
            <div key={r._id} className="report-card">
              <p className="report-email">
                <strong>Reported Email:</strong> {r.reportedEmail}
              </p>

              <div className="report-description">
                <strong>Description:</strong>
                <p>{r.description}</p>
              </div>

              <p className="report-date">
                {new Date(r.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReports;
