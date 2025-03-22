import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

// Private function for resetting data during logout
const resetAppData = () => {
  // Clear all user-related flags
  localStorage.removeItem('userRole');
  localStorage.removeItem('teacherHasLoggedInBefore');
  
  // Reset student data to empty array for clean testing
  localStorage.setItem('iskr_students_data', JSON.stringify([]));
};

const DashboardLayout = ({ children, userRole }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in and has a role
    const role = localStorage.getItem('userRole');
    if (!role) {
      navigate('/role-select');
    }
  }, [navigate]);

  // Get user initials for profile display
  const getUserInitials = () => {
    // For a real app, this would come from the user's name in the database
    // For demo purposes, we'll use a placeholder based on role
    return userRole === 'Teacher' ? 'TC' : 'ST';
  };

  const handleLogout = () => {
    // Reset all application data for a clean testing experience
    resetAppData();
    
    // Redirect to home page
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <Link to="/" className="logo-text">isk<span className="logo-dot">9</span>r</Link>
        <div className="profile-section">
          <div className="profile-icon">
            <span className="user-initials">{getUserInitials()}</span>
          </div>
        </div>
      </header>
      
      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <nav className="sidebar-nav">
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  <i className="icon-home">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </i>
                  <span>Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard/classroom" className="nav-link">
                  <i className="icon-classroom">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </i>
                  <span>Classroom</span>
                </Link>
              </li>
            </ul>
            <div className="sidebar-divider"></div>
            <ul className="nav-menu bottom-menu">
              <li className="nav-item">
                <Link to="/dashboard/settings" className="nav-link">
                  <i className="icon-settings">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                  </i>
                  <span>Settings</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard/help" className="nav-link">
                  <i className="icon-help">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </i>
                  <span>Help</span>
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link logout-button" onClick={handleLogout}>
                  <i className="icon-logout">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                  </i>
                  <span>Log out</span>
                </button>
              </li>
            </ul>
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