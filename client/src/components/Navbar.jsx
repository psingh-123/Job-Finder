// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import './Navbar.css';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   // const [profile, setProfile] = useState(null);

//   const userInitials = user?.name
//     ?.split(' ')
//     .map(word => word[0])
//     .join('')
//     .toUpperCase();


//   useEffect(() => {
//     if (user && localStorage.getItem('token')) {
//       fetchNotifications();
//       // fetchProfile();
//     }
//   }, [location, user]);

//   const fetchNotifications = async () => {
//     try {
//       const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/notifications`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       setNotifications(res.data);
//     } catch (err) {
//       console.error('Failed to fetch notifications', err);
//     }
//   };

//   const handleNotificationToggle = async () => {
//     setShowNotifications(prev => !prev);
//     setShowProfileMenu(false);

//     if (!showNotifications) {
//       try {
//         await axios.post(
//           `${process.env.REACT_APP_BACKEND_URL}/api/notifications/mark-read`,
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//           }
//         );

//         const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/notifications`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });

//         setNotifications(res.data);
//       } catch (err) {
//         console.error('Failed to mark notifications as read', err);
//       }
//     }
//   };

//   const handleProfileToggle = () => {
//     setShowProfileMenu(prev => !prev);
//     setShowNotifications(false);
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const unreadCount = notifications.filter(n => !n.isRead).length;

//   return (
//     <nav className="navbar">
//       <div className="navbar__logo">
//         <Link to="/">JobFinder</Link>
//       </div>

//       <div className="navbar__links">
//         <Link to="/">Home</Link>

//         {user && (
//           <>
//             <Link to="/dashboard/poster" className="nav-link">Post Job</Link>
//             <Link to="/dashboard/seeker" className="nav-link">Find Jobs</Link>
//           </>
//         )}


//         {user ? (
//           <>
//             {/* 🔔 Bell Icon */}
//             <div className="notification-bell" onClick={handleNotificationToggle}>
//               <i className="fas fa-bell"></i>
//               {unreadCount > 0 && (
//                 <span className="notification-badge">{unreadCount}</span>
//               )}
//               {showNotifications && (
//                 <div className="notification-dropdown">
//                   {notifications.length === 0 ? (
//                     <p className="notification-empty">No notifications</p>
//                   ) : (
//                     notifications.map((n, i) => (
//                       <div key={i} className="notification-item">
//                         {n.message}
//                       </div>
//                     ))
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* 👤 User Initials and Logout */}
//             <div className="navbar__auth-section">
//               <div
//                 className="navbar__user-icon"
//                 title="Profile"
//                 onClick={handleProfileToggle}
//               >
//                 {userInitials || '👤'}
//               </div>

//               {showProfileMenu && (
//                 <div className="navbar__user-dropdown">
//                   <button className="navbar__dropdown-btn" onClick={() => navigate('/profile')}>
//                     Profile
//                   </button>
//                   <button className="navbar__logout-btn" onClick={handleLogout}>
//                     Logout
//                   </button>
//                 </div>
//             )}
//             </div>
//           </>
//         ) : (
//           <>
//             <Link to="/signup">Sign Up</Link>
//             <Link to="/login">Login</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const userInitials = user?.name
    ?.split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();

  useEffect(() => {
    if (user && localStorage.getItem('token')) {
      fetchNotifications();
    }
  }, [location, user]);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/notifications`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // ✅ FIXED → Always an array
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    }
  };

  const handleNotificationToggle = async () => {
    setShowNotifications(prev => !prev);
    setShowProfileMenu(false);

    if (!showNotifications) {
      try {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/notifications/mark-read`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/notifications`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        // ✅ FIXED → Always an array
        setNotifications(res.data.notifications || []);
      } catch (err) {
        console.error('Failed to mark notifications as read', err);
      }
    }
  };

  const handleProfileToggle = () => {
    setShowProfileMenu(prev => !prev);
    setShowNotifications(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // SAFE now because notifications is always an array
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">JobFinder</Link>
      </div>

      <div className="navbar__links">
        <Link to="/">Home</Link>

        {user && (
          <>
            <Link to="/dashboard/poster" className="nav-link">Post Job</Link>
            <Link to="/dashboard/seeker" className="nav-link">Find Jobs</Link>
          </>
        )}

        {user ? (
          <>
            {/* 🔔 Bell Icon */}
            <div className="notification-bell" onClick={handleNotificationToggle}>
              <i className="fas fa-bell"></i>
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
              {showNotifications && (
                <div className="notification-dropdown">
                  {notifications.length === 0 ? (
                    <p className="notification-empty">No notifications</p>
                  ) : (
                    notifications.map((n, i) => (
                      <div key={i} className="notification-item">
                        {n.message}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* 👤 Profile */}
            <div className="navbar__auth-section">
              <div
                className="navbar__user-icon"
                title="Profile"
                onClick={handleProfileToggle}
              >
                {userInitials || '👤'}
              </div>

              {showProfileMenu && (
                <div className="navbar__user-dropdown">
                  <button
                    className="navbar__dropdown-btn"
                    onClick={() => navigate('/profile')}
                  >
                    Profile
                  </button>
                  <button
                    className="navbar__logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
