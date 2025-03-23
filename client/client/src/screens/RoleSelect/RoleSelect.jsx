import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './../../components/ui/components.css';
import './RoleSelect.css';

export const RoleSelect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRole, setSelectedRole] = useState('');

  // Parse query parameters to check if the user came from the signup page
  const queryParams = new URLSearchParams(location.search);
  const fromPath = queryParams.get('from') || '';

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    localStorage.setItem('userRole', role);
    
    // Navigate to the corresponding page based on fromPath
    if (fromPath === 'signup') {
      navigate('/signup');
    } else if (fromPath === 'login') {
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="role-select-page">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo-text">isk<span className="logo-dot">9</span>r</Link>
            <nav className="nav">
              <ul className="nav-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/#features">Features</Link></li>
                <li><Link to="/#about">About</Link></li>
              </ul>
            </nav>
            <div className="auth-buttons">
              <Link to="/role-select?from=login" className="login-link">Login</Link>
              <Link to="/role-select?from=signup" className="sign-in-button">Sign in</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="role-select-main">
        <div className="role-select-container">
          <h1 className="role-heading">Select Your Role</h1>
          <p className="role-subheading">Choose the role that best describes you</p>
          
          <div className="role-options">
            <div 
              className={`role-card ${selectedRole === 'Student' ? 'selected' : ''}`} 
              onClick={() => handleRoleSelect('Student')}
            >
              <div className="role-icon">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M40 8L8 24L40 40L72 24L40 8Z" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 32V52L40 64L60 52V32" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 24V48" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M40 40V64" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="8" cy="52" r="4" fill="#4F46E5"/>
                  <path d="M30 18L50 28" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h2 className="role-title">Student</h2>
              <p className="role-description">Access your courses, assignments, and track your progress</p>
            </div>

            <div 
              className={`role-card ${selectedRole === 'Teacher' ? 'selected' : ''}`} 
              onClick={() => handleRoleSelect('Teacher')}
            >
              <div className="role-icon">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="12" y="16" width="56" height="48" rx="4" stroke="#4F46E5" strokeWidth="3"/>
                  <path d="M12 28H68" stroke="#4F46E5" strokeWidth="3"/>
                  <path d="M24 40L32 48L44 36" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M52 40H60" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M52 52H60" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M28 8V16" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M52 8V16" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
              <h2 className="role-title">Teacher</h2>
              <p className="role-description">Manage your classes, create assignments, and track student performance</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}; 