import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./AdminAnalytics.css";

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/analytics`, {
          withCredentials: true,
        });
        console.log("Analytics Data:", res.data);
        setAnalytics(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return (
    <div className="admin-analytics">
      <div className="loading">Loading analytics...</div>
    </div>
  );
  
  if (!analytics) return (
    <div className="admin-analytics">
      <div className="error">No data available.</div>
    </div>
  );

  return (
    <div className="admin-analytics">
      <h1>📊 Site Analytics</h1>

      <div className="summary-cards">
        <div className="card blue">
          <h2>{analytics.totalUsers}</h2>
          <p>Total Users</p>
        </div>
        <div className="card green">
          <h2>{analytics.totalJobs}</h2>
          <p>Total Jobs</p>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h2>Monthly User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.userStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#4F46E5" 
                name="Users" 
                strokeWidth={3}
                dot={{ fill: '#4F46E5', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#4F46E5' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h2>Monthly Job Postings</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.jobStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#10B981" 
                name="Jobs" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#10B981' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;