import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './../../components/ui/components.css';
import './Login.css';

const Login = () => {
  const [userRole, setUserRole] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would normally handle the actual login process with an API
    console.log('Form submitted:', formData, 'Role:', userRole);
    
    // Store username in localStorage
    localStorage.setItem('username', formData.username);
    
    // Set user role if needed
    if (!userRole) {
      localStorage.setItem('userRole', 'Student');
    }
    
    // Redirect to the appropriate dashboard based on role
    if (userRole === 'Student' || userRole.toLowerCase() === 'student') {
      navigate('/dashboard');
    } else if (userRole === 'Teacher' || userRole.toLowerCase() === 'teacher') {
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
              <Link to="/login" className="login-link">Login</Link>
              <Link to="/signup" className="sign-in-button">Sign in</Link>
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
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
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
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <button type="submit" className="login-button">Login</button>
            </form>
            
            <p className="signup-text">
              Don't have an account? <Link to="/signup" className="signup-link">Sign in</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login; 