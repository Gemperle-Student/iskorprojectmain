import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaBook, FaCog, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import logo from '../../assets/images/logo1 1.png';
import './Dashboard.css';

// Private function for resetting data during logout
const resetAppData = () => {
  // Clear all user-related flags
  localStorage.removeItem('userRole');
  
  // Reset student data to empty array for clean testing
  localStorage.setItem('iskr_students_data', JSON.stringify([]));
  localStorage.removeItem('studentClasses');
};

const DashboardLayout = ({ children, userRole }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [classes, setClasses] = useState([]);
  
  // Function to load classes from localStorage
  const loadClasses = () => {
    if (userRole === 'Student' || localStorage.getItem('userRole')?.toLowerCase() === 'student') {
      const savedClasses = localStorage.getItem('studentClasses');
      if (savedClasses) {
        setClasses(JSON.parse(savedClasses));
      }
    }
  };
  
  useEffect(() => {
    // Check if user is logged in and has a role
    const role = localStorage.getItem('userRole');
    if (!role) {
      localStorage.setItem('userRole', 'Student');
    }
    
    // Initial load of classes
    loadClasses();
    
    // Listen for class updates
    const handleClassUpdate = () => {
      loadClasses();
    };
    
    // Add event listener for class updates
    window.addEventListener('classesUpdated', handleClassUpdate);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('classesUpdated', handleClassUpdate);
    };
  }, [navigate, userRole]);

  // Get user initials for profile display
  const getUserInitials = () => {
    const username = localStorage.getItem('username');
    if (username) {
      // Get first letter of first and last name (if available)
      const parts = username.split(' ');
      if (parts.length > 1) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      // If just one name, get first 2 letters
      return username.substring(0, 2).toUpperCase();
    }
    return userRole === 'Teacher' ? 'TC' : 'ST';
  };

  const handleLogout = () => {
    // Reset all application data for a clean testing experience
    resetAppData();
    
    // Redirect to home page
    navigate('/');
  };

  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <Link to="/" className="logo-container dashboard-logo">
          <img 
            src={logo} 
            alt="Iskor" 
            className="dashboard-logo-image"
          />
        </Link>
        <div className="profile-section">
          <div className="profile-icon">
            <span className="user-initials">{getUserInitials()}</span>
          </div>
        </div>
      </header>
      
      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <nav className="sidebar-nav">
            <div className="sidebar-inner">
              <ul className="nav-menu">
                <li className="nav-item">
                  <Link 
                    to="/dashboard" 
                    className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                  >
                    <FaHome className="nav-icon" />
                    <span>Home</span>
                  </Link>
                </li>
              </ul>
              
              {userRole === 'Student' && classes.length > 0 && (
                <>
                  <div className="sidebar-divider"></div>
                  <div className="sidebar-heading">My Classes</div>
                  <ul className="class-list">
                    {classes.map(classItem => (
                      <li key={classItem.id} className="class-item">
                        <Link 
                          to={`/dashboard/class/${classItem.id}`} 
                          className={`class-link ${location.pathname.includes(`/dashboard/class/${classItem.id}`) ? 'active' : ''}`}
                        >
                          <div 
                            className="class-indicator"
                            style={{ backgroundColor: classItem.color }}
                          ></div>
                          <span>{classItem.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="sidebar-divider"></div>
              <ul className="nav-menu bottom-menu">
                <li className="nav-item">
                  <Link 
                    to="/dashboard/settings" 
                    className={`nav-link ${isActive('/dashboard/settings') ? 'active' : ''}`}
                  >
                    <FaCog className="nav-icon" />
                    <span>Settings</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    to="/dashboard/help" 
                    className={`nav-link ${isActive('/dashboard/help') ? 'active' : ''}`}
                  >
                    <FaQuestionCircle className="nav-icon" />
                    <span>Help</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link logout-button" onClick={handleLogout}>
                    <FaSignOutAlt className="nav-icon" />
                    <span>Log out</span>
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </aside>
        
        <main className="dashboard-main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 