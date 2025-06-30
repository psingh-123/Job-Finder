// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="navbar__logo">
//         <Link to="/">JobFinder</Link>
//       </div>
//       <div className="navbar__links">
//         <Link to="/">Home</Link>
//         <Link to="/signup">Sign Up</Link>
//         <Link to="/login">Login</Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';
// import { useAuth } from '../utils/auth.js'; 

// const Navbar = () => {
//   const { currentUser } = useAuth(); 
//   return (
//     <nav className="navbar">
//       <div className="navbar__logo">
//         <Link to="/">JobFinder</Link>
//       </div>
//       <div className="navbar__links">
//         <Link to="/">Home</Link>
//         {currentUser ? (
//           <div className="user-profile">
//             <Link to="/profile" className="user-circle">
//               {currentUser.displayName 
//                 ? currentUser.displayName.charAt(0).toUpperCase() +
//                   (currentUser.displayName.split(' ')[1]?.charAt(0).toUpperCase() || '')
//                 : 'US'}
//             </Link>
//           </div>
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
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [userInitials, setUserInitials] = useState('');

  useEffect(() => {
    // Example: Getting user info from localStorage
    const user = JSON.parse(localStorage.getItem('user')); // e.g. { name: 'Prashant Singh' }

    if (user?.name) {
      const initials = user.name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase();
      setUserInitials(initials);
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">JobFinder</Link>
      </div>
      {/* <div className="navbar__links">
        <Link to="/">Home</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>

        {userInitials && (
          <div className="navbar__user-icon" title="Profile">
            {userInitials}
          </div>
        )}
      </div> */}

      <div className="navbar__links">
  <Link to="/">Home</Link>
  {userInitials ? (
    <div className="navbar__user-icon" title="Profile">{userInitials}</div>
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
