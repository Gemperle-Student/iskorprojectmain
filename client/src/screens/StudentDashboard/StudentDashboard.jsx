import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  BookOpen, 
  GraduationCap, 
  TrendingUp, 
  Target, 
  Calendar,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  LogOut
} from 'lucide-react';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [classes, setClasses] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    subject: '',
    teacher: '',
    schedule: ''
  });

  // ... existing code ...

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-left">
          <h1>Welcome back, {user?.name || 'Student'}!</h1>
          <p>Track your academic progress and performance</p>
        </div>
        <div className="header-right">
          <div className="user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0) || 'S'}
            </div>
            <div className="user-details">
              <span className="user-name">{user?.name || 'Student'}</span>
              <span className="user-role">Student</span>
            </div>
            <button 
              className="menu-button"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreVertical size={20} />
            </button>
          </div>
          {showMenu && (
            <div className="menu-dropdown">
              <button onClick={handleLogout}>
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <BookOpen size={24} />
            </div>
            <div className="stat-info">
              <h3>Total Classes</h3>
              <p>{classes.length}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <GraduationCap size={24} />
            </div>
            <div className="stat-info">
              <h3>Average Grade</h3>
              <p>{calculateAverageGrade()}%</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <TrendingUp size={24} />
            </div>
            <div className="stat-info">
              <h3>Progress</h3>
              <p>{calculateOverallProgress()}%</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Target size={24} />
            </div>
            <div className="stat-info">
              <h3>Goals Met</h3>
              <p>{calculateGoalsMet()}%</p>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card performance-chart">
            <h2>Performance Overview</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="grade" 
                    stroke="#8884d8" 
                    name="Grade"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="#82ca9d" 
                    name="Attendance"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="dashboard-card grade-distribution">
            <h2>Grade Distribution</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="dashboard-card recent-activities">
            <h2>Recent Activities</h2>
            <div className="activities-list">
              {recentActivities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-icon">
                    {activity.type === 'grade' && <GraduationCap size={16} />}
                    {activity.type === 'attendance' && <Calendar size={16} />}
                    {activity.type === 'goal' && <Target size={16} />}
                  </div>
                  <div className="activity-content">
                    <p>{activity.description}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-card upcoming-events">
            <h2>Upcoming Events</h2>
            <div className="events-list">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="event-item">
                  <div className="event-date">
                    <span className="day">{event.date.split(' ')[0]}</span>
                    <span className="month">{event.date.split(' ')[1]}</span>
                  </div>
                  <div className="event-content">
                    <h4>{event.title}</h4>
                    <p>{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="classes-section">
          <div className="section-header">
            <h2>My Classes</h2>
          </div>
          <div className="classes-grid">
            {classes.map((cls) => (
              <div key={cls.id} className="class-card">
                <div className="class-header">
                  <h3>{cls.name}</h3>
                  <div className="class-actions">
                    <button 
                      className="action-button"
                      onClick={() => handleEditClass(cls)}
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="action-button"
                      onClick={() => handleDeleteClick(cls)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="class-info">
                  <p><strong>Subject:</strong> {cls.subject}</p>
                  <p><strong>Teacher:</strong> {cls.teacher}</p>
                  <p><strong>Schedule:</strong> {cls.schedule}</p>
                </div>
                <div className="class-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${cls.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{cls.progress}% Complete</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Delete Class</h3>
            <p>Are you sure you want to delete this class? This action cannot be undone.</p>
            <div className="modal-actions">
              <button 
                className="cancel-button"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="delete-button"
                onClick={handleDeleteClass}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Class Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Class</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Class Name</label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  value={editFormData.subject}
                  onChange={(e) => setEditFormData({ ...editFormData, subject: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Teacher</label>
                <input
                  type="text"
                  value={editFormData.teacher}
                  onChange={(e) => setEditFormData({ ...editFormData, teacher: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Schedule</label>
                <input
                  type="text"
                  value={editFormData.schedule}
                  onChange={(e) => setEditFormData({ ...editFormData, schedule: e.target.value })}
                  required
                />
              </div>
              <div className="modal-actions">
                <button 
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="save-button"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard; 