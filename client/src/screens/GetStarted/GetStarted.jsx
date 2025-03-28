import React from 'react';
import { Link } from 'react-router-dom';
import './../../components/ui/components.css';
import logo from '../../assets/images/logo1 1.png';
import './GetStarted.css';

const GetStarted = () => {
  return (
    <div className="get-started">
      <header className="header large-header">
        <div className="container">
          <div className="header-content">
            <a href="/" className="logo-container">
              <img 
                src={logo} 
                alt="Iskor" 
                style={{ 
                  height: '170px', 
                  width: 'auto',
                  display: 'block',
                  backgroundColor: 'transparent',
                  padding: '0',
                  margin: '-45px 0', /* Increased negative margin to compensate for larger size */
                  objectFit: 'contain',
                  mixBlendMode: 'darken'
                }}
              />
            </a>
            <nav className="nav">
              <ul className="nav-list">
                <li><a href="/">Home</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#about">About</a></li>
              </ul>
            </nav>
            <div className="auth-buttons">
              <Link to="/role-select" className="login-link">Login</Link>
              <Link to="/role-select" className="sign-in-button">Sign in</Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <h1>Track<br />Your Score.</h1>
                <p>Iskor is a web-based application that allows students to monitor, analyze, and manage their academic scores and performance. It serves as a centralized platform where students can track, and review their grades, test scores, and other academic metrics.</p>
                <div className="hero-buttons">
                  <Link to="/role-select" className="join-button">Join now</Link>
                  <Link to="/#features" className="learn-more-button">Learn more</Link>
                </div>
              </div>
              <div className="hero-image">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="Students working together" 
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <div className="container">
            <div className="about-content">
              <div className="about-image">
                <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Classroom setting" />
              </div>
              <div className="about-text">
                <h2>About Iskor</h2>
                <p>We're dedicated to transforming education through technology. Our platform helps educators make data-driven decisions while saving time on administrative tasks.</p>
                <div className="about-columns">
                  <div className="about-column">
                    <h3>Our Mission</h3>
                    <p>To empower educators with tools that enhance student learnings outcomes.</p>
                  </div>
                  <div className="about-column">
                    <h3>Our Vision</h3>
                    <p>Creating a future where every student reaches their full potential.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="features" id="features">
          <div className="container">
            <div className="section-header">
              <h2>Powerful Features</h2>
              <p>Everything you need to track and improve student performance</p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Real-Time Progress Tracking</h3>
                <p>Monitor student performance as it happens with instant updates and notifications.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Comprehensive Analytics</h3>
                <p>Gain insights through detailed reports and visual data representations.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20V10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 20V4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 20v-4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Performance Metrics</h3>
                <p>Track key performance indicators and identify areas of improvement.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Activity Monitoring</h3>
                <p>Keep track of student engagement and participation in real-time.</p>
              </div>
            </div>
            <div className="workspace-image">
              <img src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" alt="Workspace with laptop" />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <a href="/" className="logo-container" style={{marginBottom: '24px'}}>
                <img 
                  src={logo} 
                  alt="Iskor" 
                  style={{ 
                    height: '160px', 
                    width: 'auto',
                    display: 'block',
                    backgroundColor: 'transparent',
                    padding: '0',
                    margin: '0',
                    objectFit: 'contain',
                    mixBlendMode: 'darken'
                  }}
                />
              </a>
              <p className="footer-description">
                A modern platform for students to track academic progress and improve performance.
              </p>
              <div className="footer-social">
                <a href="#" className="social-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="#" className="social-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </a>
                <a href="#" className="social-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href="#" className="social-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="footer-links-container">
              <div className="footer-links-column">
                <h4 className="footer-heading">Company</h4>
                <ul className="footer-links-list">
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#careers">Careers</a></li>
                  <li><a href="#blog">Blog</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>
              
              <div className="footer-links-column">
                <h4 className="footer-heading">Product</h4>
                <ul className="footer-links-list">
                  <li><a href="#features">Features</a></li>
                  <li><a href="#pricing">Pricing</a></li>
                  <li><a href="#integrations">Integrations</a></li>
                  <li><a href="#updates">Updates</a></li>
                </ul>
              </div>
              
              <div className="footer-links-column">
                <h4 className="footer-heading">Resources</h4>
                <ul className="footer-links-list">
                  <li><a href="#docs">Documentation</a></li>
                  <li><a href="#guides">Guides</a></li>
                  <li><a href="#api">API Reference</a></li>
                  <li><a href="#support">Support</a></li>
                </ul>
              </div>
              
              <div className="footer-links-column">
                <h4 className="footer-heading">Legal</h4>
                <ul className="footer-links-list">
                  <li><a href="#privacy">Privacy Policy</a></li>
                  <li><a href="#terms">Terms of Service</a></li>
                  <li><a href="#cookies">Cookie Policy</a></li>
                  <li><a href="#security">Security</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-copyright">
              © {new Date().getFullYear()} Iskor. All rights reserved.
            </div>
            <div className="footer-bottom-links">
              <a href="#" className="footer-language-selector">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span>English (US)</span>
              </a>
              <a href="#accessibility">Accessibility</a>
              <a href="#sitemap">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GetStarted;
