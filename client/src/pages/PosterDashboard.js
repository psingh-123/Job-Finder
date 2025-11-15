// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import './PosterDashboard.css';
// import ReportAbuse from '../components/ReportUserForm'; // ✅ Import ReportAbuse

// const PosterDashboard = () => {
//   const [jobs, setJobs] = useState([]);
//   const [message, setMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     category: '',
//     customCategory: '',
//     phone: '',
//     amount: '',
//     city: '',
//     state: '',
//     pincode: '',
//     house: '',
//   });

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = async () => {
//     try {
//       const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/jobs/poster-dashboard`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       setJobs(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handlePostJob = async (e) => {
//     e.preventDefault();
//     if (isSubmitting) return;

//     setIsSubmitting(true);

//     const fullAddress = `${formData.house}, ${formData.city}, ${formData.state}, ${formData.pincode}`;
//     const jobData = {
//       title: formData.title,
//       description: formData.description,
//       category: formData.category === 'Other' ? formData.customCategory : formData.category,
//       location: fullAddress,
//       phone: formData.phone,
//       city: formData.city,
//       amount:formData.amount
//     };

//     try {
//       await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/jobs/post`, jobData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       setMessage('Job posted successfully!');
//       setFormData({
//         title: '',
//         description: '',
//         category: '',
//         customCategory: '',
//         phone: '',
//         amount: '',
//         city: '',
//         state: '',
//         pincode: '',
//         house: '',
//       });
//       fetchJobs();
//     } catch (err) {
//       setMessage(err.response?.data?.error || 'Failed to post job');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDelete = async (jobId) => {
//     if (!window.confirm('Are you sure you want to delete this job?')) return;

//     try {
//       await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/jobs/${jobId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       fetchJobs();
//     } catch (err) {
//       console.error('Delete failed', err);
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <h2 className="heading">Post Job</h2>
//       {isSubmitting && <p className="loading-message">Posting job, please wait...</p>}
//       {isSubmitting && <div className="spinner"></div>}
//       {message && <p className="message">{message}</p>}

//       <form className="job-form" onSubmit={handlePostJob}>
//         <input
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           placeholder="Job Title"
//           required
//         />
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           placeholder="Job Description"
//           required
//         />
//         <select name="category" value={formData.category} onChange={handleChange} required>
//           <option value="">Select Category</option>
//           <option value="Plumber">Plumber</option>
//           <option value="Tutor">Tutor</option>
//           <option value="Electrician">Electrician</option>
//           <option value="Delivery">Delivery</option>
//           <option value="Cleaner">Cleaner</option>
//           <option value="Cook">Cook</option>
//           <option value="Other">Other</option>
//         </select>

//         {formData.category === 'Other' && (
//           <input
//             type="text"
//             name="customCategory"
//             placeholder="Enter category"
//             value={formData.customCategory}
//             onChange={handleChange}
//             required
//           />
//         )}
//         <input
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           placeholder="Phone Number"
//           required
//         />
//         <input
//           name="amount"
//           value={formData.amount}
//           onChange={handleChange}
//           placeholder="Amount (e.g., 500)"
//           required
//         />
//         <input
//           name="house"
//           value={formData.house}
//           onChange={handleChange}
//           placeholder="House No / Street Address"
//           required
//         />
//         <input
//           name="city"
//           value={formData.city}
//           onChange={handleChange}
//           placeholder="City"
//           required
//         />
//         <select name="state" value={formData.state} onChange={handleChange} required>
//           <option value="">Select State</option>
//           {[
//             'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
//             'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
//             'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
//             'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
//           ].map((state) => (
//             <option key={state} value={state}>
//               {state}
//             </option>
//           ))}
//         </select>
//         <input
//           name="pincode"
//           value={formData.pincode}
//           onChange={handleChange}
//           placeholder="Pincode"
//           required
//         />

//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Posting...' : 'Post Job'}
//         </button>
//       </form>

//       <div className="job-list">
//         {jobs.length > 0 && <h3 style={{ marginTop: '2rem' }}>Previous Posted Jobs By You</h3>}
//         {jobs.map((job) => (
//           <div key={job._id} className="job-card">
//             <h3>{job.title}</h3>
//             <p>{job.description}</p>
//             <p>
//               <strong>Category:</strong> {job.category}
//             </p>
//             <p>
//               <strong>Location:</strong> {job.location}
//             </p>
//             <p>
//               <strong>City:</strong> {job.city || 'N/A'}
//             </p>
//             <p>
//               <strong>Contact:</strong> {job.phone || 'N/A'}
//             </p>
//             <p>
//               <strong>Amount:</strong> {job.amount || 'N/A'}
//             </p>

//             <h4>Applicants:</h4>
//             {job.applicants?.length > 0 ? (
//               <ul>
//                 {job.applicants.map((applicant) => (
//                   <li key={applicant._id}>
//                     {applicant.name} ({applicant.email})
//                     {/* ✅ Report Abuse Form */}
//                     <ReportAbuse
//                       reporterEmail={localStorage.getItem('userEmail')}
//                       reportedEmail={applicant.email}
//                     />
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No applicants yet</p>
//             )}

//             <div className="job-actions">
//               <button className="delete-btn" onClick={() => handleDelete(job._id)}>
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PosterDashboard;

import { useEffect, useState } from 'react';
import axios from 'axios';
import './PosterDashboard.css';
import ReportAbuse from '../components/ReportUserForm';

const PosterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPreview, setShowPreview] = useState(false); // ✅ Added

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    customCategory: '',
    phone: '',
    amount: '',
    city: '',
    state: '',
    pincode: '',
    house: '',
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/jobs/poster-dashboard`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    const fullAddress = `${formData.house}, ${formData.city}, ${formData.state}, ${formData.pincode}`;
    const jobData = {
      title: formData.title,
      description: formData.description,
      category: formData.category === 'Other' ? formData.customCategory : formData.category,
      location: fullAddress,
      phone: formData.phone,
      city: formData.city,
      amount: formData.amount,
    };

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/jobs/post`, jobData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setMessage('Job posted successfully!');
      setFormData({
        title: '',
        description: '',
        category: '',
        customCategory: '',
        phone: '',
        amount: '',
        city: '',
        state: '',
        pincode: '',
        house: '',
      });
      fetchJobs();
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to post job');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchJobs();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="heading">Post Job</h2>
      {isSubmitting && <p className="loading-message">Posting job, please wait...</p>}
      {isSubmitting && <div className="spinner"></div>}
      {message && <p className="message">{message}</p>}

      <form className="job-form" onSubmit={handlePostJob}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Job Title"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Job Description"
          required
        />
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Plumber">Plumber</option>
          <option value="Tutor">Tutor</option>
          <option value="Electrician">Electrician</option>
          <option value="Delivery">Delivery</option>
          <option value="Cleaner">Cleaner</option>
          <option value="Cook">Cook</option>
          <option value="Other">Other</option>
        </select>

        {formData.category === 'Other' && (
          <input
            type="text"
            name="customCategory"
            placeholder="Enter category"
            value={formData.customCategory}
            onChange={handleChange}
            required
          />
        )}

        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
        <input
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount (e.g., 500)"
          required
        />
        <input
          name="house"
          value={formData.house}
          onChange={handleChange}
          placeholder="House No / Street Address"
          required
        />
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required
        />
        <select name="state" value={formData.state} onChange={handleChange} required>
          <option value="">Select State</option>
          {[
            'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
            'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
            'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
            'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
          ].map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <input
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          placeholder="Pincode"
          required
        />

        {/* PREVIEW + POST BUTTONS */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="button" onClick={() => setShowPreview(true)}>
            Preview Job
          </button>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Posting...' : 'Post Job'}
          </button>
        </div>
      </form>

      {/* ---------------------- JOB PREVIEW POPUP ---------------------- */}
      {showPreview && (
        <div className="preview-overlay">
          <div className="preview-box">
            <h2>Job Preview</h2>

            <p><strong>Title:</strong> {formData.title}</p>
            <p><strong>Description:</strong> {formData.description}</p>

            <p>
              <strong>Category:</strong>{' '}
              {formData.category === 'Other' ? formData.customCategory : formData.category}
            </p>

            <p><strong>Amount:</strong> {formData.amount}</p>

            <p>
              <strong>Location:</strong>{' '}
              {`${formData.house}, ${formData.city}, ${formData.state}, ${formData.pincode}`}
            </p>

            <p><strong>Phone:</strong> {formData.phone}</p>

            <div className="preview-btns">
              <button onClick={() => setShowPreview(false)}>Close</button>

              <button
                onClick={() => {
                  setShowPreview(false);
                  document.querySelector('form').requestSubmit();
                }}
              >
                Post Job
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------- JOB LIST ---------------------- */}
      <div className="job-list">
        {jobs.length > 0 && <h3 style={{ marginTop: '2rem' }}>Previous Posted Jobs By You</h3>}
        {jobs.map((job) => (
          <div key={job._id} className="job-card">
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p><strong>Category:</strong> {job.category}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>City:</strong> {job.city || 'N/A'}</p>
            <p><strong>Contact:</strong> {job.phone || 'N/A'}</p>
            <p><strong>Amount:</strong> {job.amount || 'N/A'}</p>

            <h4>Applicants:</h4>
            {job.applicants?.length > 0 ? (
              <ul>
                {job.applicants.map((applicant) => (
                  <li key={applicant._id}>
                    {applicant.name} ({applicant.email})

                    <ReportAbuse
                      reporterEmail={localStorage.getItem('userEmail')}
                      reportedEmail={applicant.email}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No applicants yet</p>
            )}

            <div className="job-actions">
              <button className="delete-btn" onClick={() => handleDelete(job._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PosterDashboard;
