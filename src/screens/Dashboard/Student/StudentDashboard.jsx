import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import { getFormattedStudentForDashboard } from '../../../services/scoreService';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [hiddenItems, setHiddenItems] = useState([]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportItem, setReportItem] = useState(null);
  const [reportMessage, setReportMessage] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  useEffect(() => {
    // Check if user is logged in as a student
    const role = localStorage.getItem('userRole');
    if (role !== 'Student') {
      navigate('/role-select');
      return;
    }
    
    // Fetch student data
    try {
      const data = getFormattedStudentForDashboard();
      setStudentData(data);
    } catch (err) {
      setError('Error fetching student data. Please try again.');
      console.error('Error fetching student data:', err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Close dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenuId(null);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'good':
        return 'status-good';
      case 'moderate':
        return 'status-moderate';
      case 'bad':
        return 'status-bad';
      default:
        return '';
    }
  };

  const getProgressBarColor = (score, total) => {
    const percentage = Math.min(100, (score / total) * 100);
    if (percentage >= 70) return 'good';
    if (percentage >= 40) return 'moderate';
    return 'bad';
  };

  const getScoreProgress = (score, total) => {
    // Cap the progress at 100% to handle scores above the total
    return Math.min(100, (score / total) * 100);
  };

  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  const toggleDropdown = (e, id) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const hideItem = (id) => {
    setHiddenItems([...hiddenItems, id]);
    setOpenMenuId(null);
  };

  const openReportModal = (item) => {
    setReportItem(item);
    setReportMessage('');
    setShowReportModal(true);
    setOpenMenuId(null);
  };

  const submitReport = (e) => {
    e.preventDefault();
    // In a real app, we would send this to the backend
    console.log('Reporting issue with:', reportItem, reportMessage);
    setReportSuccess(true);
    
    // Auto close after success
    setTimeout(() => {
      setShowReportModal(false);
      setReportSuccess(false);
    }, 2000);
  };

  if (loading) {
    return (
      <DashboardLayout userRole="Student">
        <div className="loading-screen">Loading student data...</div>
      </DashboardLayout>
    );
  }

  if (error || !studentData) {
    return (
      <DashboardLayout userRole="Student">
        <div className="error-screen">
          <h2>Error</h2>
          <p>{error || 'Student data not found. Please contact your administrator for assistance.'}</p>
        </div>
      </DashboardLayout>
    );
  }

  const filteredQuizScores = studentData.quizScores.filter(quiz => 
    !hiddenItems.includes(quiz.id)
  );

  const filteredActivityScores = studentData.activityScores.filter(activity => 
    !hiddenItems.includes(activity.id)
  );

  // Calculate weighted final score
  const quizScores = studentData.quizScores.map(quiz => Math.min(100, (quiz.score / quiz.total) * 100));
  const quizAverage = quizScores.reduce((sum, score) => sum + score, 0) / quizScores.length;
  
  const midtermScore = Math.min(100, (studentData.activityScores.find(a => a.id === 'M1')?.score || 0) / 100 * 100);
  const prefinalScore = Math.min(100, (studentData.activityScores.find(a => a.id === 'F1')?.score || 0) / 100 * 100);
  
  const weightedFinalScore = Math.round((quizAverage * 0.3) + (midtermScore * 0.3) + (prefinalScore * 0.4));

  return (
    <DashboardLayout userRole="Student">
      <div className="student-dashboard">
        <div className="student-profile">
          <div 
            className="profile-picture"
            data-initials={getInitials(studentData.name)}
          ></div>
          <div>
            <h1 className="student-name">{studentData.name}</h1>
            <div className="student-id">Student ID: {studentData.id}</div>
          </div>
        </div>

        <div className="status-card">
          <h2 className="section-title">Current Status</h2>
          <div className={`status-value ${getStatusColor(studentData.status)}`}>
            {studentData.status === 'good' ? 'Good Standing' : 
             studentData.status === 'moderate' ? 'Moderate' : 'Needs Improvement'}
          </div>
          <div className="average-score">
            <span>Final Score:</span> {weightedFinalScore}
          </div>
          <div className="score-breakdown">
            <p>Final Score = 30% Quiz Average + 30% Midterm + 40% Pre-Final</p>
          </div>
        </div>

        <div className="scores-section">
          <div className="scores-section-header">
            <h2 className="section-title">Quiz Scores</h2>
          </div>
          <div className="scores-container">
            {filteredQuizScores.map(quiz => (
              <div key={quiz.id} className="score-card">
                <div className="score-header">
                  <span className="score-name">{quiz.name}</span>
                  <button 
                    className="action-menu-btn" 
                    aria-label="Quiz options"
                    onClick={(e) => toggleDropdown(e, quiz.id)}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="2.5" r="1.5" />
                      <circle cx="8" cy="8" r="1.5" />
                      <circle cx="8" cy="13.5" r="1.5" />
                    </svg>
                  </button>
                  {openMenuId === quiz.id && (
                    <div className="dropdown-menu">
                      <button onClick={() => hideItem(quiz.id)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                        Hide Quiz
                      </button>
                      <button onClick={() => openReportModal(quiz)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Report Issue
                      </button>
                    </div>
                  )}
                </div>
                <div className="score-value">
                  {quiz.score}
                </div>
                <div className="progress-container">
                  <div 
                    className={`progress-bar ${getProgressBarColor(quiz.score, quiz.total)}`}
                    style={{ width: `${getScoreProgress(quiz.score, quiz.total)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="scores-section">
          <div className="scores-section-header">
            <h2 className="section-title">Exam Scores</h2>
          </div>
          <div className="scores-container">
            {filteredActivityScores.map(activity => (
              <div key={activity.id} className="score-card">
                <div className="score-header">
                  <span className="score-name">{activity.name}</span>
                  <button 
                    className="action-menu-btn" 
                    aria-label="Activity options"
                    onClick={(e) => toggleDropdown(e, activity.id)}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="2.5" r="1.5" />
                      <circle cx="8" cy="8" r="1.5" />
                      <circle cx="8" cy="13.5" r="1.5" />
                    </svg>
                  </button>
                  {openMenuId === activity.id && (
                    <div className="dropdown-menu">
                      <button onClick={() => hideItem(activity.id)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                        Hide Exam
                      </button>
                      <button onClick={() => openReportModal(activity)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Report Issue
                      </button>
                    </div>
                  )}
                </div>
                <div className="score-value">
                  {activity.score}
                </div>
                <div className="progress-container">
                  <div 
                    className={`progress-bar ${getProgressBarColor(activity.score, activity.total)}`}
                    style={{ width: `${getScoreProgress(activity.score, activity.total)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-footer">
          <div className="score-info">
            <div className="info-item">
              <span className="info-label">Good Standing:</span> 70-100
            </div>
            <div className="info-item">
              <span className="info-label">Moderate:</span> 40-69
            </div>
            <div className="info-item">
              <span className="info-label">Needs Improvement:</span> 0-39
            </div>
          </div>
          <div className="help-text">
            Contact your teacher for any questions about your scores
          </div>
        </div>
        
        {/* Report Issue Modal */}
        {showReportModal && reportItem && (
          <div className="modal-overlay">
            <div className="modal-container">
              <div className="modal-header">
                <h3>Report Issue with {reportItem.name}</h3>
                <button 
                  className="modal-close-btn"
                  onClick={() => setShowReportModal(false)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={submitReport}>
                <div className="modal-body">
                  {reportSuccess ? (
                    <div className="success-message">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <p>Your report has been submitted. Your teacher will review it soon.</p>
                    </div>
                  ) : (
                    <>
                      <p>Please describe the issue with your {reportItem.name} score:</p>
                      <textarea
                        value={reportMessage}
                        onChange={(e) => setReportMessage(e.target.value)}
                        placeholder="Describe the issue..."
                        rows={4}
                        required
                      ></textarea>
                    </>
                  )}
                </div>
                {!reportSuccess && (
                  <div className="modal-footer">
                    <button 
                      type="button"
                      className="cancel-btn"
                      onClick={() => setShowReportModal(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="submit-btn"
                      disabled={!reportMessage.trim()}
                    >
                      Submit Report
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard; 