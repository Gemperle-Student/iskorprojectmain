import {
    ActivityIcon,
    BarChartBigIcon,
    FacebookIcon,
    GithubIcon,
    InstagramIcon,
    LineChartIcon,
    LinkedinIcon,
    PieChartIcon,
  } from "lucide-react";
  import React from "react";
  import { Button } from "../../components/ui/button1";
  import { Card, CardContent } from "../../components/ui/card";
  import { Separator } from "../../components/ui/separator";
  import logo from '../../assets/images/logo1 1.png';
  import './LandingPage.css';
  
  const Landingpage = () => {
    console.log('Logo path:', logo);
    // Navigation links data
    const navLinks = [
      { title: "Home", href: "#" },
      { title: "Features", href: "#features" },
      { title: "About", href: "#about" },
    ];
  
    // Feature cards data
    const featureCards = [
      {
        icon: <LineChartIcon />,
        title: "Real-Time Progress Tracking",
        description:
          "Monitor student performance as it happens with instant updates and notifications.",
      },
      {
        icon: <PieChartIcon />,
        title: "Comprehensive Analytics",
        description:
          "Gain insights through detailed reports and visual data representations.",
      },
      {
        icon: <BarChartBigIcon />,
        title: "Performance Metrics",
        description:
          "Track key performance indicators and identify areas of improvement.",
      },
      {
        icon: <ActivityIcon />,
        title: "Activity Monitoring",
        description:
          "Keep track of student engagement and participation in real-time.",
      },
    ];
  
    // Footer links data
    const footerLinks = {
      about: [
        { title: "About", href: "#about" },
        { title: "Features", href: "#features" },
        { title: "Home", href: "#" },
      ],
      legal: [
        { title: "Legal", href: "#" },
        { title: "Privacy Policy", href: "#" },
        { title: "Terms of service", href: "#" },
      ],
    };
  
    // Social media links
    const socialLinks = [
      { icon: <FacebookIcon />, href: "#" },
      { icon: <GithubIcon />, href: "#" },
      { icon: <InstagramIcon />, href: "#" },
      { icon: <LinkedinIcon />, href: "#" },
    ];
  
    return (
      <div className="landing-page">
        <div className="container">
          {/* Hero Section */}
          <section className="hero">
            <header className="header">
              <div className="header-content">
                <div className="logo">
                <a href="#">
                     <img src={logo} alt="Iskor" className="logo-image" />
                              </a>
                </div>
  
                <nav className="nav">
                  <ul className="nav-list">
                    {navLinks.map((link, index) => (
                      <li key={index}>
                        <a href={link.href}>{link.title}</a>
                      </li>
                    ))}
                  </ul>
                </nav>
  
                <div className="auth-buttons">
                  <a href="#login" className="login-link">Login</a>
                  <Button className="sign-in-button">Sign in</Button>
                </div>
              </div>
              <Separator className="header-separator" />
            </header>
  
            <div className="hero-content">
              <div className="hero-text">
                <h1>Track <br />Your Score.</h1>
  
                <p>
                  Iskor is a web-based application that allows students to
                  monitor, analyze, and manage their academic scores and
                  performance. It serves as a centralized platform where students
                  can track, and review their grades, test scores, and other
                  academic metrics.
                </p>
  
                <div className="hero-buttons">
                  <Button className="join-button">Join now</Button>
                  <Button variant="outline" className="learn-more-button">Learn more</Button>
                </div>
              </div>
  
              <div className="hero-image">
                <img
                  alt="Iskor Dashboard Screenshot"
                  src="https://c.animaapp.com/m8jl5xp7VAdhAz/img/screenshot-2025-03-16-100400-1.png"
                />
              </div>
            </div>
          </section>
  
          {/* Features Section */}
          <section id="features" className="features">
            <div className="section-header">
              <h2>Powerful Tools for Success</h2>
              <p>Everything you need to track, analyze, and improve student performance in one comprehensive platform</p>
            </div>
  
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <LineChartIcon size={28} />
                </div>
                <h3>Real-Time Progress Tracking</h3>
                <p>Monitor achievements as they happen with instant updates, intuitive visualizations, and customizable dashboards that make tracking progress effortless.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <PieChartIcon size={28} />
                </div>
                <h3>Advanced Analytics Suite</h3>
                <p>Unlock powerful insights through comprehensive reports, interactive data visualizations, and trend analysis tools that reveal opportunities for improvement.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <BarChartBigIcon size={28} />
                </div>
                <h3>Performance Intelligence</h3>
                <p>Leverage data-driven insights with precision metrics that highlight strengths, pinpoint improvement areas, and generate actionable recommendations.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <ActivityIcon size={28} />
                </div>
                <h3>Engagement Monitoring</h3>
                <p>Track student participation with comprehensive activity logs, interaction metrics, and engagement analytics that help optimize the learning experience.</p>
              </div>
            </div>
  
            <div className="workspace-image">
              <img
                alt="Iskor Dashboard Interface"
                src="https://c.animaapp.com/m8jl5xp7VAdhAz/img/2-25.png"
              />
            </div>
          </section>
  
          <Separator />
  
          {/* About Section */}
          <section id="about" className="about">
            <div className="about-content">
              <div className="about-image">
                <img
                  alt="About Iskor"
                  src="https://c.animaapp.com/m8jl5xp7VAdhAz/img/3-1.png"
                />
              </div>
  
              <div className="about-text">
                <h2>About Iskor</h2>
                <p>
                  We're dedicated to transforming education through technology.
                  Our platform helps educators make data-driven decisions while
                  saving time on administrative tasks.
                </p>
                <div className="about-columns">
                  <div className="about-column">
                    <h3>Our Mission</h3>
                    <p>
                      To empower educators with tools that enhance student learning outcomes.
                    </p>
                  </div>
  
                  <div className="about-column">
                    <h3>Our Vision</h3>
                    <p>
                      Creating a future where every student reaches their full potential.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
  
          {/* Footer */}
          <footer className="footer">
            <div className="footer-main">
              <div className="footer-brand">
              <div className="footer-logo">
      <a href="#">
       <img src={logo} alt="Iskor" className="logo-image" />
       </a>
      </div>
                <p className="footer-description">
                  Empowering students and educators with analytics and tracking tools for improved academic performance.
                </p>
                <div className="footer-social">
                  {socialLinks.map((social, index) => (
                    <a key={index} href={social.href} className="social-icon">
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
              <div className="footer-links-container">
                <div className="footer-links">
                  <h4 className="footer-heading">About</h4>
                  <ul className="footer-links-list">
                    {footerLinks.about.map((link, index) => (
                      <li key={index}>
                        <a href={link.href}>{link.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
  
                <div className="footer-links">
                  <h4 className="footer-heading">Legal</h4>
                  <ul className="footer-links-list">
                    {footerLinks.legal.map((link, index) => (
                      <li key={index}>
                        <a href={link.href}>{link.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p className="footer-copyright">© 2025 Iskor. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    );
  };
  
  export default Landingpage;
  