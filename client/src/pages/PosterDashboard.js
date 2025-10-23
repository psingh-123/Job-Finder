import { useEffect, useState } from 'react';
import axios from 'axios';
import ReportAbuseModal from "../components/ReportAbuseModal";
import './PosterDashboard.css';

const PosterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReport, setShowReport] = useState(false);


  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    customCategory:'',
    phone: '',
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
      const res = await axios.get('http://localhost:5000/api/jobs/poster-dashboard', {
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
  };

  try {
    await axios.post('http://localhost:5000/api/jobs/post', jobData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setMessage('Job posted successfully!');
    setFormData({
      title: '',
      description: '',
      category: '',
      customCategory: '',
      phone: '',
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
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchJobs();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div className="dashboard-container">
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={() => setShowReport(true)}
            style={{
              backgroundColor: "#ff4d4d",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            Report Abuse
          </button>
        </div>

        <ReportAbuseModal
          show={showReport}
          onClose={() => setShowReport(false)}
          role="poster"
          reportedUser={null}
          reportedJob={null}
        />

      <h2 className="heading">Post Job</h2>
      {isSubmitting && <p className="loading-message">Posting job, please wait...</p>}
      {isSubmitting && <div className="spinner"></div>}
      {message && <p className="message">{message}</p>}

      <form className="job-form" onSubmit={handlePostJob}>
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Job Description" required />
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
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />
        <input name="house" value={formData.house} onChange={handleChange} placeholder="House No / Street Address" required />
        <input name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
        <select name="state" value={formData.state} onChange={handleChange} required>
          <option value="">Select State</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
           <option value="Arunachal Pradesh">Arunachal Pradesh</option>
           <option value="Assam">Assam</option>
           <option value="Bihar">Bihar</option>
           <option value="Chhattisgarh">Chhattisgarh</option>
           <option value="Goa">Goa</option>
           <option value="Gujarat">Gujarat</option>
           <option value="Haryana">Haryana</option>
           <option value="Himachal Pradesh">Himachal Pradesh</option>
           <option value="Jharkhand">Jharkhand</option>
           <option value="Karnataka">Karnataka</option>
           <option value="Kerala">Kerala</option>
           <option value="Madhya Pradesh">Madhya Pradesh</option>
           <option value="Maharashtra">Maharashtra</option>
           <option value="Manipur">Manipur</option>
           <option value="Meghalaya">Meghalaya</option>
           <option value="Mizoram">Mizoram</option>
           <option value="Nagaland">Nagaland</option>
           <option value="Odisha">Odisha</option>
           <option value="Punjab">Punjab</option>
           <option value="Rajasthan">Rajasthan</option>
           <option value="Sikkim">Sikkim</option>
           <option value="Tamil Nadu">Tamil Nadu</option>
           <option value="Telangana">Telangana</option>
           <option value="Tripura">Tripura</option>
           <option value="Uttar Pradesh">Uttar Pradesh</option>
           <option value="Uttarakhand">Uttarakhand</option>
           <option value="West Bengal">West Bengal</option>
         </select>
        <input name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" required />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Posting...' : 'Post Job'}  
        </button>

      </form>

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
            <h4>Applicants:</h4>
            {job.applicants?.length > 0 ? (
              <ul>
                {job.applicants.map(applicant => (
                  <li key={applicant._id}>{applicant.name} ({applicant.email})</li>
                ))}
              </ul>
            ) : (
              <p>No applicants yet</p>
            )}
            <div className="job-actions">
              <button className="delete-btn" onClick={() => handleDelete(job._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PosterDashboard;
