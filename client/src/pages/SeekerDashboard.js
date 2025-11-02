import './SeekerDashboard.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SeekerDashboard = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState('');
  const [appliedJobId, setAppliedJobId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setJobs(res.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const applyToJob = async (jobId) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/jobs/apply/${jobId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setAppliedJobId(jobId);
      setMessage(res.data.message);
    } catch (err) {
      setAppliedJobId(jobId);
      setMessage(err.response?.data?.message || 'Failed to apply');
    }

    setTimeout(() => {
      setMessage('');
      setAppliedJobId(null);
    }, 3000);
  };

  const uniqueCities = [
    ...new Set(jobs.map(job => job.city).filter(Boolean))
  ];

  const filteredJobs = selectedCity
    ? jobs.filter(job => job.city?.toLowerCase() === selectedCity.toLowerCase())
    : jobs;

  if (loading) {
    return (
      <div className="seeker-dashboard">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading available jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="seeker-dashboard">
      <h2>Available Jobs</h2>
      
      <div className="city-filter">
        <label htmlFor="city-select">Filter by City:</label>
        <select
          id="city-select"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">All Cities</option>
          {uniqueCities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="no-jobs-message">
          <p>No jobs found {selectedCity ? `in ${selectedCity}` : 'at the moment'}</p>
          <p className="subtext">Please check back later or try a different city</p>
        </div>
      ) : (
        <div className="jobs-grid">
          {filteredJobs.map(job => (
            <div className="job-card" key={job._id}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>

              {/* ✅ Added Amount Section */}
              <div className="job-amount">
                <strong>Amount:</strong> ₹{job.amount || 'Not specified'}
              </div>

              <div className="job-details">
                <div className="detail-item phone">
                  <strong>Phone:</strong> {job.phone || 'N/A'}
                </div>
                <div className="detail-item location">
                  <strong>Address:</strong> {job.location || job.house || 'N/A'}
                </div>
                <div className="detail-item city">
                  <strong>City:</strong> {job.city || 'N/A'}
                </div>
              </div>

              <button 
                className="apply-button" 
                onClick={() => applyToJob(job._id)}
                disabled={appliedJobId === job._id}
              >
                {appliedJobId === job._id ? 'Applied' : 'Apply Now'}
              </button>

              {appliedJobId === job._id && message && (
                <div className="success-message">
                  {message}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeekerDashboard;
