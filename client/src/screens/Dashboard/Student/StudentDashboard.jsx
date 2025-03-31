import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBookOpen, FaEllipsisV, FaTimes, FaKey, FaArrowLeft, FaChartLine, FaGraduationCap, FaArrowRight, FaCommentAlt, FaPaperPlane } from 'react-icons/fa';
import { GiNotebook } from 'react-icons/gi';
import DashboardLayout from '../DashboardLayout';
import { validateClassAccessCode } from '../../../services/codeGeneratorService';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showCodeRedemptionModal, setShowCodeRedemptionModal] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const [messageToTeacher, setMessageToTeacher] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const navigate = useNavigate();

  // Generate a random color for class headers
  const getRandomColor = () => {
    const colors = [
      '#4f46e5', // Indigo
      '#0ea5e9', // Sky
      '#06b6d4', // Cyan
      '#10b981', // Emerald
      '#8b5cf6', // Violet
      '#ec4899', // Pink
      '#f59e0b', // Amber
      '#ef4444', // Red
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Check if user is logged in as student
  useEffect(() => {
    const role = localStorage.getItem('userRole');
    // For demo, proceed even if not logged in
    if (role && role !== 'Student') {
      navigate('/role-select');
      return;
    }
    
    // Load classes from localStorage
    const savedClasses = localStorage.getItem('studentClasses');
    if (savedClasses) {
      setClasses(JSON.parse(savedClasses));
    }
    
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  // Save classes to localStorage when they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('studentClasses', JSON.stringify(classes));
    }
  }, [classes, isLoading]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (activeDropdown !== null) {
        setActiveDropdown(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeDropdown]);

  const toggleDropdown = (e, index) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const redeemAccessCode = () => {
    if (!accessCode.trim()) {
      setCodeError('Please enter an access code');
      return;
    }
    
    // Validate the access code
    const validationResult = validateClassAccessCode(accessCode.trim().toUpperCase());
    
    if (!validationResult) {
      setCodeError('Invalid or expired access code');
      return;
    }
    
    // Create a new class with the data from the code
    const { classId, className, studentData } = validationResult;
    
    // Check if we already have this class
    if (classes.some(cls => cls.id === classId)) {
      setCodeError('You already have this class in your dashboard');
      return;
    }
    
    // Create the new class object
    const newClassObj = {
      id: classId,
      name: className || `Class ${classes.length + 1}`, // Use the provided class name or default
      instructor: 'Imported Class',
      color: getRandomColor(),
      studentData: studentData, // Store just this student's data
      importedOn: new Date().toISOString()
    };
    
    // Add the new class
    setClasses(prevClasses => [...prevClasses, newClassObj]);
    
    // Close the modal
    setShowCodeRedemptionModal(false);
    
    // Show success message
    alert(`Class "${newClassObj.name}" successfully imported! Your scores are now available.`);
  };

  const viewClassDetails = (classObj) => {
    setSelectedClass(classObj);
    // Scroll to top when viewing class details
    window.scrollTo(0, 0);
  };
  
  const backToDashboard = () => {
    setSelectedClass(null);
  };
  
  // Helper function to format score with a more descriptive label
  const getScoreDescription = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Satisfactory';
    if (score >= 50) return 'Needs Improvement';
    return 'Unsatisfactory';
  };
  
  const getStatusClass = (score) => {
    if (score >= 80) return 'status-good';
    if (score >= 60) return 'status-moderate';
    return 'status-bad';
  };

  const sendMessageToTeacher = () => {
    if (!messageToTeacher.trim()) {
      alert('Please enter a message');
      return;
    }

    // In a real app, this would send the message to the backend
    // For now, we'll just simulate a successful send
    setTimeout(() => {
      setMessageSent(true);
      // Reset after 3 seconds
      setTimeout(() => {
        setMessageSent(false);
        setMessageToTeacher('');
      }, 3000);
    }, 800);
  };

  if (isLoading) {
    return (
      <DashboardLayout userRole="Student">
        <div className="loading-screen">
          <span>Loading your classes...</span>
        </div>
      </DashboardLayout>
    );
  }
  
  if (selectedClass) {
    return (
      <DashboardLayout userRole="Student">
        <div className="student-dashboard">
          <div className="class-detail-header" style={{ backgroundColor: selectedClass.color }}>
            <button className="back-button" onClick={backToDashboard}>
              <FaArrowLeft /> Back to Classes
            </button>
            <h1 className="class-detail-title">{selectedClass.name}</h1>
            <div className="class-detail-instructor">{selectedClass.instructor}</div>
          </div>
          
          {selectedClass.studentData ? (
            <div className="student-scores-container">
              <div className="score-section">
                <div className="section-header">
                  <h2><FaChartLine /> Your Performance</h2>
                </div>
                
                <div className="performance-summary">
                  <div className="summary-card">
                    <div className={`summary-value ${getStatusClass(selectedClass.studentData.finalScore)}`}>
                      {selectedClass.studentData.finalScore.toFixed(1)}%
                    </div>
                    <div className="summary-label">
                      Final Score
                      <div className="score-description">{getScoreDescription(selectedClass.studentData.finalScore)}</div>
                    </div>
                  </div>
                </div>
                
                <div className="score-breakdown-table">
                  <div className="score-table-header">
                    <h3>Score Breakdown</h3>
                    <div className="score-help-tip">
                      <strong>How to read this table:</strong> Each assessment contributes to your final grade based on its importance. The "Points Earned" column shows how many percentage points each assessment contributes to your final score.
                    </div>
                  </div>
                  <table className="score-table">
                    <thead>
                      <tr>
                        <th>Assessment</th>
                        <th>Your Score</th>
                        <th>Importance</th>
                        <th>Points Earned</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedClass.studentData.scores && Object.entries(selectedClass.studentData.scores).map(([key, value]) => (
                        <tr key={key}>
                          <td>
                            <div className="assessment-name">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                          </td>
                          <td className={getStatusClass(value.score)}>
                            <div className="score-with-status">
                              <span className="score-value">{value.score}</span>
                              <span className="score-label">{getScoreDescription(value.score)}</span>
                            </div>
                          </td>
                          <td>{value.weight}%</td>
                          <td>{(value.score * value.weight / 100).toFixed(1)}%</td>
                        </tr>
                      ))}
                      <tr className="total-row">
                        <td colSpan="2" className="total-label">Total (Your Final Grade)</td>
                        <td></td>
                        <td className={getStatusClass(selectedClass.studentData.finalScore)}>
                          {selectedClass.studentData.finalScore.toFixed(1)}%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="score-section">
                <div className="section-header">
                  <h3><FaCommentAlt /> Message Your Teacher</h3>
                </div>
                <div className="notes-content message-form">
                  {messageSent ? (
                    <div className="message-success">
                      <div className="success-icon">✓</div>
                      <p>Your message has been sent to your teacher successfully!</p>
                    </div>
                  ) : (
                    <>
                      <p className="message-instructions">
                        <FaCommentAlt style={{ marginRight: '8px' }} /> Have a question about your scores or need clarification? Send a message directly to your teacher.
                      </p>
                      <textarea 
                        placeholder="Type your message here..."
                        value={messageToTeacher}
                        onChange={(e) => setMessageToTeacher(e.target.value)}
                        className="message-textarea"
                      ></textarea>
                      <button 
                        className="send-message-btn"
                        onClick={sendMessageToTeacher}
                        disabled={!messageToTeacher.trim()}
                      >
                        <FaPaperPlane /> Send Message
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="no-scores-message">
              <div className="message-icon">
                <FaChartLine size={48} />
              </div>
              <h2>No Score Data Available</h2>
              <p>Your teacher hasn't shared any score data for this class yet.</p>
            </div>
          )}
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout userRole="Student">
      <div className="student-dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">My Classes</h1>
          <div className="dashboard-actions">
            <button className="redeem-code-btn" onClick={() => setShowCodeRedemptionModal(true)}>
              <FaKey /> Import with Code
            </button>
          </div>
        </div>
        
        {classes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <FaGraduationCap size={32} />
            </div>
            <h2>No Classes Added Yet</h2>
            <p>
              Import your classes using an access code from your teacher.
            </p>
          </div>
        ) : (
          <div className="class-grid">
            {classes.map((cls, index) => (
              <div className="class-card" key={cls.id}>
                <div className="class-card-header" style={{ backgroundColor: cls.color }}>
                  <h2 className="class-name">{cls.name}</h2>
                  
                  <div className="card-actions">
                    {cls.studentData && (
                      <span className="imported-badge">IMPORTED</span>
                    )}
                    
                    <button
                      className="dropdown-toggle"
                      onClick={(e) => toggleDropdown(e, index)}
                    >
                      <FaEllipsisV />
                    </button>
                    
                    {activeDropdown === index && (
                      <div className="dropdown-content">
                        <button
                          className="dropdown-item delete"
                          onClick={() => removeClass(cls.id)}
                        >
                          <FaTimes /> Remove Class
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="class-card-body">
                  <div className="instructor">{cls.instructor}</div>
                  
                  <div className="class-info">
                    {cls.studentData && (
                      <div className="scores-badge">
                        Scores Available
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="class-card-footer">
                  <button className="view-class-btn" onClick={() => viewClassDetails(cls)}>
                    View Class <FaArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Code Redemption Modal */}
        {showCodeRedemptionModal && (
          <div className="modal-overlay">
            <div className="modal-container">
              <div className="modal-header">
                <h3>Import Class with Code</h3>
                <button 
                  className="modal-close-btn"
                  onClick={() => setShowCodeRedemptionModal(false)}
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="modal-body">
                <p className="code-instructions">
                  Enter the access code provided by your teacher to import your class scores and track your academic progress.
                </p>
                
                <div className="form-group">
                  <label htmlFor="accessCode">Access Code</label>
                  <input
                    type="text"
                    id="accessCode"
                    placeholder="XXXXXX"
                    value={accessCode}
                    onChange={(e) => {
                      setAccessCode(e.target.value.toUpperCase());
                      setCodeError('');
                    }}
                    className="code-input"
                    maxLength={6}
                    autoFocus
                  />
                  <div className="code-hint">Enter the 6-character code from your teacher</div>
                </div>
                
                {codeError && (
                  <div className="error-message">{codeError}</div>
                )}
                
                <div className="code-info">
                  <div className="code-info-item">
                    <div className="icon-circle">
                      <FaKey />
                    </div>
                    <div className="info-text">
                      <h4>Unique to You</h4>
                      <p>This code is specifically for your scores and performance data.</p>
                    </div>
                  </div>
                  
                  <div className="code-info-item">
                    <div className="icon-circle">
                      <FaBookOpen />
                    </div>
                    <div className="info-text">
                      <h4>Class Materials</h4>
                      <p>Access your academic materials and track your progress.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowCodeRedemptionModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="submit-btn"
                  onClick={redeemAccessCode}
                >
                  Import Class
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard; 