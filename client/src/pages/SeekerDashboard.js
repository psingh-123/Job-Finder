import './SeekerDashboard.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SeekerDashboard = () => {
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
      await axios.post(`http://localhost:5000/api/jobs/apply/${jobId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setAppliedJobId(jobId);
      setMessage('Applied successfully');
      setTimeout(() => {
        setMessage('');
        setAppliedJobId(null);
      }, 3000);
    } catch (err) {
      setMessage('Failed to apply');
    }
  };

  return (
    <div>
      <h2>Available Jobs</h2>

      {jobs.map(job => (
        <div className="job-card" key={job._id}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <p><strong>Phone:</strong> {job.phone || 'N/A'}</p> 
          <button className="apply-button" onClick={() => applyToJob(job._id)}>Apply</button>

          {appliedJobId === job._id && message && (
            <div className="success-message">
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M13.485 1.929a1 1 0 0 1 1.414 1.414L6.414 11.828l-4.95-4.95a1 1 0 0 1 1.414-1.414l3.536 3.536 7.071-7.071z"/>
              </svg>
              {message}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SeekerDashboard;
