import './SeekerDashboard.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SeekerDashboard = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState('');
  const [appliedJobId, setAppliedJobId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axios.get('http://localhost:5000/api/jobs', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setJobs(res.data);
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

  return (
    <div>
      <h2>Available Jobs</h2>
      <div className="city-filter">
        <label htmlFor="city-select"><strong>Filter by City:</strong> </label>
        <select
          id="city-select"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">All</option>
          {uniqueCities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {filteredJobs.length === 0 ? (
        <p>No jobs found for selected city.</p>
      ) : (
        filteredJobs.map(job => (
          <div className="job-card" key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p><strong>Phone:</strong> {job.phone || 'N/A'}</p>
            <p><strong>Address:</strong> {job.location}</p>
            <p><strong>City:</strong> {job.city || 'N/A'}</p>
            <button className="apply-button" onClick={() => applyToJob(job._id)}>Apply</button>

            {appliedJobId === job._id && message && (
              <div className="success-message">
                ✅ {message}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default SeekerDashboard;
