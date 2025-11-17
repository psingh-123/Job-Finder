// import './SeekerDashboard.css';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const SeekerDashboard = () => {
//   const [selectedCity, setSelectedCity] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [searchText, setSearchText] = useState('');
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [jobs, setJobs] = useState([]);
//   const [message, setMessage] = useState('');
//   const [appliedJobId, setAppliedJobId] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await axios.get(
//           `${process.env.REACT_APP_BACKEND_URL}/api/jobs`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//           }
//         );
//         setJobs(res.data);
//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []);

//   const applyToJob = async (jobId) => {
//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/api/jobs/apply/${jobId}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         }
//       );
//       setAppliedJobId(jobId);
//       setMessage(res.data.message);
//     } catch (err) {
//       setAppliedJobId(jobId);
//       setMessage(err.response?.data?.message || 'Failed to apply');
//     }

//     setTimeout(() => {
//       setMessage('');
//       setAppliedJobId(null);
//     }, 3000);
//   };

//   // Unique City Filters
//   const uniqueCities = [...new Set(jobs.map((job) => job.city).filter(Boolean))];

//   // Unique Categories
//   const uniqueCategories = [
//     ...new Set(jobs.map((job) => job.category).filter(Boolean)),
//   ];

//   // Autocomplete Suggestions
//   const titleSuggestions = jobs
//     .map((job) => job.title)
//     .filter((t) => t && t.toLowerCase().includes(searchText.toLowerCase()))
//     .slice(0, 5);

//   // 🔍 MAIN FILTER LOGIC
//   const filteredJobs = jobs.filter((job) => {
//     const cityMatch = selectedCity ? job.city === selectedCity : true;
//     const categoryMatch = selectedCategory ? job.category === selectedCategory : true;
//     const searchMatch = searchText
//       ? job.title?.toLowerCase().includes(searchText.toLowerCase())
//       : true;

//     return cityMatch && categoryMatch && searchMatch;
//   });

//   if (loading) {
//     return (
//       <div className="seeker-dashboard">
//         <div className="loading-state">
//           <div className="loading-spinner"></div>
//           <p>Loading available jobs...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="seeker-dashboard">
//       <h2>Find Your Next Job</h2>

//       {/* 🔍 SEARCH BAR */}
//       <div className="job-search-bar">
//         <input
//           type="text"
//           placeholder="Search jobs…"
//           value={searchText}
//           onChange={(e) => {
//             setSearchText(e.target.value);
//             setShowSuggestions(true);
//           }}
//           onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
//         />

//         {showSuggestions && searchText && (
//           <ul className="suggestions-box">
//             {titleSuggestions.length === 0 ? (
//               <li className="no-suggestion">No matching titles</li>
//             ) : (
//               titleSuggestions.map((title, i) => (
//                 <li
//                   key={i}
//                   onClick={() => {
//                     setSearchText(title);
//                     setShowSuggestions(false);
//                   }}
//                 >
//                   {title}
//                 </li>
//               ))
//             )}
//           </ul>
//         )}
//       </div>

//       {/* 🔍 CATEGORY + CITY FILTERS */}
//       <div className="filters-row">
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           <option value="">All Categories</option>
//           {uniqueCategories.map((cat, i) => (
//             <option key={i} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>

//         <select
//           value={selectedCity}
//           onChange={(e) => setSelectedCity(e.target.value)}
//         >
//           <option value="">All Cities</option>
//           {uniqueCities.map((city, i) => (
//             <option key={i} value={city}>
//               {city}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* JOB LIST */}
//       {filteredJobs.length === 0 ? (
//         <div className="no-jobs-message">
//           <p>No matching jobs found.</p>
//         </div>
//       ) : (
//         <div className="jobs-grid">
//           {filteredJobs.map((job) => (
//             <div className="job-card" key={job._id}>
//               <h3>{job.title}</h3>
//               <p>{job.description}</p>

//               <div className="job-amount">
//                 <strong>Amount:</strong> ₹{job.amount || 'Not specified'}
//               </div>

//               <div className="job-details">
//                 <div><strong>Phone:</strong> {job.phone || 'N/A'}</div>
//                 <div><strong>Address:</strong> {job.location || job.house}</div>
//                 <div><strong>City:</strong> {job.city}</div>
//                 <div><strong>Category:</strong> {job.category || 'N/A'}</div>
//               </div>

//               <button
//                 className="apply-button"
//                 onClick={() => applyToJob(job._id)}
//                 disabled={appliedJobId === job._id}
//               >
//                 {appliedJobId === job._id ? 'Applied' : 'Apply Now'}
//               </button>

//               {appliedJobId === job._id && message && (
//                 <div className="success-message">{message}</div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SeekerDashboard;
import './SeekerDashboard.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SeekerDashboard = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchText, setSearchText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [sortOption, setSortOption] = useState('');

  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState('');
  const [appliedJobId, setAppliedJobId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/jobs`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );
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
      const res = await axios.post(
        `https://naukari-dhundo.onrender.com/api/jobs/apply/${jobId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
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

  // Unique Filters
  const uniqueCities = [...new Set(jobs.map((job) => job.city).filter(Boolean))];
  const uniqueCategories = [
    ...new Set(jobs.map((job) => job.category).filter(Boolean)),
  ];

  // Autocomplete Suggestions
  const titleSuggestions = jobs
    .map((job) => job.title)
    .filter((t) => t && t.toLowerCase().includes(searchText.toLowerCase()))
    .slice(0, 5);

  // MAIN FILTER + SORT LOGIC
  let filteredJobs = jobs.filter((job) => {
    const cityMatch = selectedCity ? job.city === selectedCity : true;
    const categoryMatch = selectedCategory
      ? job.category === selectedCategory
      : true;
    const searchMatch = searchText
      ? job.title?.toLowerCase().includes(searchText.toLowerCase())
      : true;

    return cityMatch && categoryMatch && searchMatch;
  });

  // ⭐ APPLY SORTING ⭐
  if (sortOption === 'highPay') {
    filteredJobs.sort((a, b) => (b.amount || 0) - (a.amount || 0));
  } else if (sortOption === 'lowPay') {
    filteredJobs.sort((a, b) => (a.amount || 0) - (b.amount || 0));
  } else if (sortOption === 'latest') {
    filteredJobs.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } else if (sortOption === 'oldest') {
    filteredJobs.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }

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
      <h2>Find Your Next Job</h2>

      {/* 🔍 SEARCH BAR */}
      <div className="job-search-bar">
        <input
          type="text"
          placeholder="Search jobs…"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setShowSuggestions(true);
          }}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />

        {showSuggestions && searchText && (
          <ul className="suggestions-box">
            {titleSuggestions.length === 0 ? (
              <li className="no-suggestion">No matching titles</li>
            ) : (
              titleSuggestions.map((title, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setSearchText(title);
                    setShowSuggestions(false);
                  }}
                >
                  {title}
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      {/* FILTERS + SORTING */}
      <div className="filters-row">
        {/* Category */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* City */}
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">All Cities</option>
          {uniqueCities.map((city, i) => (
            <option key={i} value={city}>
              {city}
            </option>
          ))}
        </select>

        {/* ⭐ SORTING DROPDOWN ⭐ */}
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Sort By</option>
          <option value="highPay">Highest Pay</option>
          <option value="lowPay">Lowest Pay</option>
          <option value="latest">Latest Posted</option>
          <option value="oldest">Oldest Posted</option>
        </select>
      </div>

      {/* JOB LIST */}
      {filteredJobs.length === 0 ? (
        <div className="no-jobs-message">
          <p>No matching jobs found.</p>
        </div>
      ) : (
        <div className="jobs-grid">
          {filteredJobs.map((job) => (
            <div className="job-card" key={job._id}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>

              <div className="job-amount">
                <strong>Amount:</strong> ₹{job.amount || 'Not specified'}
              </div>

              <div className="job-details">
                <div><strong>Phone:</strong> {job.phone || 'N/A'}</div>
                <div><strong>Address:</strong> {job.location || job.house}</div>
                <div><strong>City:</strong> {job.city}</div>
                <div><strong>Category:</strong> {job.category || 'N/A'}</div>
              </div>

              <button
                className="apply-button"
                onClick={() => applyToJob(job._id)}
                disabled={appliedJobId === job._id}
              >
                {appliedJobId === job._id ? 'Applied' : 'Apply Now'}
              </button>

              {appliedJobId === job._id && message && (
                <div className="success-message">{message}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeekerDashboard;
