import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './../../components/ui/components.css';
import './Login.css';

export const Login = () => {
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get the user role from localStorage
    const role = localStorage.getItem('userRole');
    if (!role) {
      // If no role is selected, redirect to role selection
      navigate('/role-select?from=login');
    } else {
      setUserRole(role);
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would normally handle the actual login process with an API
    console.log('Form submitted:', formData, 'Role:', userRole);
    
    // Redirect to the appropriate dashboard based on role
    if (userRole === 'Student') {
      navigate('/dashboard/student');
    } else if (userRole === 'Teacher') {
      navigate('/dashboard/teacher');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-page">
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

      <main className="login-main">
        <div className="login-container">
          <div className="login-card">
            <h1 className="login-title">Welcome back!</h1>
            <p className="login-subtitle">Log in your {userRole} account now</p>
            
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  className="form-input"
                  placeholder=""
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  className="form-input"
                  placeholder=""
                  required
                />
              </div>
              
              <button type="submit" className="login-button">Login</button>
            </form>
            
            <div className="login-divider">
              <span className="divider-line"></span>
              <span className="divider-text">or</span>
              <span className="divider-line"></span>
            </div>
            
            <button className="google-login-button">
              <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
              Log in with Google
            </button>
            
            <p className="signup-text">
              Don't have an account? <Link to="/role-select?from=signup" className="signup-link">Sign in</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login; 