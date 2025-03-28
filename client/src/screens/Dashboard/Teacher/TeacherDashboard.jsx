import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaSearch, FaTimes, FaKey, FaList, FaEdit } from 'react-icons/fa';
import DashboardLayout from '../DashboardLayout';
import { getScoresByTeacher, updateScore } from '../../../services/scoreService';
import { 
  generateClassAccessCode, 
  getActiveAccessCodes, 
  deleteAccessCode 
} from '../../../services/codeGeneratorService';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', id: '' });
  const [summary, setSummary] = useState({
    total: 0,
    good: 0,
    moderate: 0,
    bad: 0,
    ungraded: 0
  });
  const [modalError, setModalError] = useState('');
  
  // Class Subject state
  const [classSubject, setClassSubject] = useState(() => {
    // Try to load saved class subject from localStorage
    const savedSubject = localStorage.getItem('classSubject');
    return savedSubject || 'Introduction to Computer Science';
  });
  const [showSubjectEditModal, setShowSubjectEditModal] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  
  // Code generation state
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [activeCodes, setActiveCodes] = useState({});
  const [showActiveCodesModal, setShowActiveCodesModal] = useState(false);
  
  // Score weights state
  const [showWeightsModal, setShowWeightsModal] = useState(false);
  const [weights, setWeights] = useState(() => {
    // Try to load saved weights from localStorage
    const savedWeights = localStorage.getItem('scoreWeights');
    return savedWeights ? JSON.parse(savedWeights) : {
      quizAvg: 30,
      midterm: 30,
      preFinal: 40
    };
  });
  const [tempWeights, setTempWeights] = useState({
    quizAvg: 30,
    midterm: 30,
    preFinal: 40
  });

  /**
   * Get all active access codes and update state
   */
  const loadActiveCodes = () => {
    const codes = getActiveAccessCodes();
    setActiveCodes(codes);
  };

  useEffect(() => {
    // Check if user is logged in as a teacher
    const role = localStorage.getItem('userRole');
    if (role !== 'Teacher') {
      navigate('/role-select');
      return;
    }
    
    // Load all students
    const loadStudents = async () => {
      try {
        setLoading(true);
        
        // Load students from service
        console.log('Loading student data');
        const data = await getScoresByTeacher();
        
        // Transform data to include quizScores array
        const transformedData = data.map(student => {
          // Create quizScores array
          const quizScores = [
            student.quiz1 !== undefined ? student.quiz1 : null,
            student.quiz2 !== undefined ? student.quiz2 : null,
            student.quiz3 !== undefined ? student.quiz3 : null,
            student.midterm !== undefined ? student.midterm : null,
            student.prefinal !== undefined ? student.prefinal : null
          ];
          
          // Calculate weighted score
          const midterm = quizScores[3];
          const preFinal = quizScores[4];
          const weightedScore = calculateWeightedScore(quizScores, midterm, preFinal);
          
          // Determine status based on weighted score or set to ungraded
          const hasAnyScore = quizScores.some(score => score !== null);
          const status = hasAnyScore && weightedScore !== null 
            ? determineStatus(weightedScore) 
            : 'ungraded';
          
          return {
            ...student,
            quizScores,
            weightedScore,
            status
          };
        });
        
        setStudents(transformedData);
        updateSummaryStats(transformedData);
        
        // Load active codes
        loadActiveCodes();
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading students:', err);
        setError('Failed to load students. Please try again.');
        setLoading(false);
      }
    };

    loadStudents();
  }, [navigate]);

  const updateSummaryStats = (studentData) => {
    const summaryData = {
      total: studentData.length,
      good: studentData.filter(student => student.status === 'good').length,
      moderate: studentData.filter(student => student.status === 'moderate').length,
      bad: studentData.filter(student => student.status === 'bad').length,
      ungraded: studentData.filter(student => student.status === 'ungraded').length
    };
    setSummary(summaryData);
  };

  /**
   * Determine status based on score
   * @param {number} score The score value (0-100)
   * @returns {string} Status ("good", "moderate", or "bad")
   */
  const determineStatus = (score) => {
    if (score >= 70) return "good";
    if (score >= 40) return "moderate";
    return "bad";
  };

  /**
   * Calculate weighted score based on quiz average, midterm, and pre-final
   * @param {Array} quizScores Array containing quiz scores
   * @param {number} midterm Midterm score
   * @param {number} preFinal Pre-final score
   * @returns {number|null} Weighted score or null if not enough data
   */
  const calculateWeightedScore = (quizScores, midterm, preFinal) => {
    // Extract quiz scores (first 3 elements) and filter out nulls
    const validQuizScores = quizScores.slice(0, 3).filter(score => score !== null);
    
    // Calculate quiz average if we have any valid quiz scores
    const quizAvg = validQuizScores.length > 0
      ? validQuizScores.reduce((sum, score) => sum + score, 0) / validQuizScores.length
      : null;
    
    // Return null if we don't have at least one component score
    if (quizAvg === null && midterm === null && preFinal === null) {
      return null;
    }
    
    // For calculation purposes, treat missing scores as 0
    const safeQuizAvg = quizAvg !== null ? quizAvg : 0;
    const safeMidterm = midterm !== null ? midterm : 0;
    const safePreFinal = preFinal !== null ? preFinal : 0;
    
    // Calculate weighted total using the current weights
    const quizWeight = weights.quizAvg / 100;
    const midtermWeight = weights.midterm / 100;
    const preFinalWeight = weights.preFinal / 100;
    
    return Math.round((safeQuizAvg * quizWeight) + (safeMidterm * midtermWeight) + (safePreFinal * preFinalWeight));
  };

  const handleQuizScoreChange = (studentId, index, value) => {
    const numericValue = value === '' ? null : parseInt(value, 10);
    
    if (numericValue !== null && (isNaN(numericValue) || numericValue < 0 || numericValue > 999)) {
      return;
    }
    
    setStudents(prevStudents => 
      prevStudents.map(student => {
        if (student.id === studentId) {
          // Create a copy of quizScores
          const updatedQuizScores = [...student.quizScores];
          updatedQuizScores[index] = numericValue;
          
          // Calculate new weighted score
          const midterm = updatedQuizScores[3];
          const preFinal = updatedQuizScores[4];
          const weightedScore = calculateWeightedScore(updatedQuizScores, midterm, preFinal);
          
          // Check if this student was previously ungraded
          const wasUngraded = student.status === 'ungraded';
          
          // Check if student has at least one grade now
          const hasAnyScore = updatedQuizScores.some(score => score !== null);
          
          // Determine new status
          let newStatus = student.status;
          if (hasAnyScore) {
            if (weightedScore !== null) {
              newStatus = determineStatus(weightedScore);
            }
          } else {
            newStatus = 'ungraded';
          }
          
          return {
            ...student,
            quizScores: updatedQuizScores,
            weightedScore,
            status: newStatus
          };
        }
        return student;
      })
    );
  };

  // Function to handle score change (via the Edit Score button)
  const handleScoreChange = async (studentId, currentScore) => {
    // In a real app, this would show a modal or inline editing interface
    // For this demo, we'll use a prompt with the current exam score
    const score = prompt("Enter exam score (0-100):", currentScore || '');
    
    if (score === null) return; // User cancelled
    
    const numericScore = score === '' ? null : parseInt(score, 10);
    
    // Validate score
    if (numericScore !== null && (isNaN(numericScore) || numericScore < 0 || numericScore > 100)) {
      alert("Please enter a valid score between 0 and 100");
      return;
    }
    
    // Update score locally
    setStudents(prevStudents => 
      prevStudents.map(student => {
        if (student.id === studentId) {
          // Get the updated quizScores
          const updatedQuizScores = [...student.quizScores];
          
          // Calculate weighted score using the main scoring formula
          const midterm = updatedQuizScores[3];
          const preFinal = updatedQuizScores[4];
          const weightedScore = calculateWeightedScore(updatedQuizScores, midterm, preFinal);
          
          // Determine new status
          const hasAnyScore = updatedQuizScores.some(score => score !== null);
          let newStatus = 'ungraded';
          
          if (hasAnyScore && weightedScore !== null) {
            newStatus = determineStatus(weightedScore);
          }
          
          return {
            ...student,
            score: numericScore,
            weightedScore,
            status: newStatus
          };
        }
        return student;
      })
    );
    
    // In a real app, this would save to backend
    await new Promise(resolve => setTimeout(resolve, 300));
  };

  const openResetConfirmModal = (student) => {
    setSelectedStudent(student);
    setShowConfirmModal(true);
  };

  const openDeleteConfirmModal = (student, e) => {
    e.stopPropagation();
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };

  const resetStudentScore = async () => {
    if (!selectedStudent) return;
    
    try {
      // Update state with reset scores
      setStudents(prevStudents => 
        prevStudents.map(student => {
          if (student.id === selectedStudent.id) {
            return {
              ...student,
              score: null,
              quizScores: [null, null, null, null, null],
              weightedScore: null,
              status: 'ungraded'
            };
          }
          return student;
        })
      );
      
      // Close the modal
      setShowConfirmModal(false);
      setSelectedStudent(null);
      
      // In a real app, we'd make an API call here
    } catch (err) {
      setError('Failed to reset scores. Please try again.');
    }
  };
  
  const deleteStudent = () => {
    if (!selectedStudent) return;
    
    // Remove student from the list
    const updatedStudents = students.filter(student => student.id !== selectedStudent.id);
    setStudents(updatedStudents);
    
    // Update summary
    updateSummaryStats(updatedStudents);
    
    // Close the modal
    setShowDeleteModal(false);
    setSelectedStudent(null);
  };

  const openAddStudentModal = () => {
    setNewStudent({ name: '', id: '' });
    setShowAddModal(true);
  };

  const handleAddStudentChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({ ...prev, [name]: value }));
  };

  const addNewStudent = async () => {
    // Validate inputs
    if (!newStudent.name.trim()) {
      setModalError("Student name is required");
      return;
    }
    
    if (!newStudent.id.trim()) {
      setModalError("Student ID is required");
      return;
    }
    
    // Check if ID already exists
    if (students.some(student => student.id === newStudent.id)) {
      setModalError("A student with this ID already exists");
      return;
    }
    
    // Create new student object
    const studentToAdd = {
      id: newStudent.id,
      name: newStudent.name,
      score: null,
      quizScores: [null, null, null, null, null], // For quiz1, quiz2, quiz3, midterm, prefinal
      weightedScore: null,
      status: 'ungraded'
    };
    
    // Update students array
    const updatedStudents = [...students, studentToAdd];
    setStudents(updatedStudents);
    
    // Update summary stats
    updateSummaryStats(updatedStudents);
    
    // Reset modal state
    setNewStudent({ name: '', id: '' });
    setModalError('');
    setShowAddModal(false);
  };

  // Filter students based on search term and status filter
  const filteredStudents = students
    .filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      student.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(student => 
      statusFilter === '' || student.status === statusFilter
    );

  // Update summary when students change
  useEffect(() => {
    updateSummaryStats(students);
  }, [students]);

  const openWeightsModal = () => {
    // Initialize temp weights with current weights
    setTempWeights({...weights});
    setShowWeightsModal(true);
  };
  
  const handleWeightChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseInt(value, 10);
    
    if (isNaN(numericValue) || numericValue < 0 || numericValue > 100) {
      return;
    }
    
    setTempWeights({
      ...tempWeights,
      [name]: numericValue
    });
  };
  
  const saveWeights = () => {
    // Check if weights sum to 100%
    const sum = tempWeights.quizAvg + tempWeights.midterm + tempWeights.preFinal;
    
    if (sum !== 100) {
      alert(`Weights must add up to 100%. Current sum: ${sum}%`);
      return;
    }
    
    // Update weights
    setWeights(tempWeights);
    
    // Save to localStorage
    localStorage.setItem('scoreWeights', JSON.stringify(tempWeights));
    
    // Recalculate all student scores with new weights
    setStudents(prevStudents => 
      prevStudents.map(student => {
        const quizScores = student.quizScores;
        const midterm = student.quizScores[3];
        const preFinal = student.quizScores[4];
        const weightedScore = calculateWeightedScore(quizScores, midterm, preFinal);
        
        // Update status based on new weighted score
        const hasAnyScore = quizScores.some(score => score !== null);
        const status = hasAnyScore && weightedScore !== null 
          ? determineStatus(weightedScore) 
          : 'ungraded';
        
        return {
          ...student,
          weightedScore,
          status
        };
      })
    );
    
    // Close modal
    setShowWeightsModal(false);
  };

  /**
   * Generate an access code for a specific student to import their scores
   */
  const generateAccessCode = () => {
    if (!selectedStudent) {
      alert('Please select a student first by clicking on a row in the table');
      return;
    }
    
    // Get class info
    const classId = "class-" + Date.now();
    const className = classSubject; // Use the dynamic class subject
    
    // Collect the student's scores
    const studentScores = {};
    
    // Use quizScores array to collect scores
    if (selectedStudent.quizScores[0] !== null) studentScores.quiz1 = selectedStudent.quizScores[0];
    if (selectedStudent.quizScores[1] !== null) studentScores.quiz2 = selectedStudent.quizScores[1];
    if (selectedStudent.quizScores[2] !== null) studentScores.quiz3 = selectedStudent.quizScores[2];
    if (selectedStudent.quizScores[3] !== null) studentScores.midterm = selectedStudent.quizScores[3];
    if (selectedStudent.quizScores[4] !== null) studentScores.finalExam = selectedStudent.quizScores[4];
    
    // Calculate the final score with weights
    const quizWeight = weights.quizAvg / 3; // Divide equally among 3 quizzes
    const midtermWeight = weights.midterm;
    const finalWeight = weights.preFinal;
    
    // Prepare student data with scores and weights
    const scoreData = {
      finalScore: selectedStudent.weightedScore || 0,
      scores: {
        quiz1: { score: studentScores.quiz1 || 0, weight: quizWeight },
        quiz2: { score: studentScores.quiz2 || 0, weight: quizWeight },
        quiz3: { score: studentScores.quiz3 || 0, weight: quizWeight },
        midterm: { score: studentScores.midterm || 0, weight: midtermWeight },
        finalExam: { score: studentScores.finalExam || 0, weight: finalWeight }
      },
      notes: "Student's progress notes can be added here."
    };
    
    // Generate the code
    const code = generateClassAccessCode(
      classId, 
      className, 
      selectedStudent.id, 
      selectedStudent.name,
      scoreData
    );
    
    setGeneratedCode(code);
    setShowCodeModal(true);
    
    // Update active codes list
    loadActiveCodes();
  };
  
  /**
   * Delete an access code
   */
  const handleDeleteCode = (code) => {
    if (window.confirm(`Are you sure you want to delete code ${code}?`)) {
      deleteAccessCode(code);
      loadActiveCodes();
    }
  };
  
  /**
   * Copy code to clipboard
   */
  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
      .then(() => {
        alert('Code copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy code: ', err);
      });
  };

  // When a student row is clicked, select that student
  const selectStudent = (student) => {
    setSelectedStudent(student);
  };

  /**
   * Open the subject edit modal
   */
  const openSubjectEditModal = () => {
    setNewSubject(classSubject);
    setShowSubjectEditModal(true);
  };

  /**
   * Handle subject form submission
   */
  const handleSubjectSubmit = (e) => {
    e.preventDefault();
    if (!newSubject.trim()) {
      setModalError('Subject name cannot be empty');
      return;
    }
    
    // Update class subject
    setClassSubject(newSubject);
    // Save to localStorage for persistence
    localStorage.setItem('classSubject', newSubject);
    // Close modal
    setShowSubjectEditModal(false);
    setModalError('');
  };

  if (loading) {
    return (
      <DashboardLayout userRole="Teacher">
        <div className="loading-screen">Loading student data...</div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout userRole="Teacher">
        <div className="error-screen">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="Teacher">
      <div className="teacher-dashboard">
        {/* Dashboard Header with Summary Cards */}
        <div className="dashboard-header-section">
          <div className="class-heading">
            <div className="class-title-container">
              <div className="class-title">{classSubject}</div>
              <button 
                className="edit-subject-btn"
                onClick={openSubjectEditModal}
                title="Edit Subject"
              >
                <FaEdit size={16} />
              </button>
            </div>
            <div className="header-with-actions">
              <h1 className="dashboard-title">Class Performance Dashboard</h1>
              <div className="header-buttons">
                <button 
                  className="generate-code-btn"
                  onClick={() => {
                    if (!selectedStudent) {
                      alert('Please select a student first by clicking on a row in the table');
                    } else {
                      generateAccessCode();
                    }
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Generate Access Code
                </button>
                <button 
                  className="view-codes-btn"
                  onClick={() => setShowActiveCodesModal(true)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Active Codes
                </button>
                <button 
                  className="customize-weights-btn"
                  onClick={openWeightsModal}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  Customize Weights
                </button>
                <button 
                  className="add-student-btn"
                  onClick={openAddStudentModal}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14m-7-7h14" />
                  </svg>
                  Add Student
                </button>
              </div>
            </div>
          </div>
          
          <div className="status-summary">
            <div className="summary-card total">
              <div className="summary-value">{summary.total}</div>
              <div className="summary-label">Total Students</div>
            </div>
            <div className="summary-card good">
              <div className="summary-value">{summary.good}</div>
              <div className="summary-label">Good Standing</div>
            </div>
            <div className="summary-card moderate">
              <div className="summary-value">{summary.moderate}</div>
              <div className="summary-label">Moderate</div>
            </div>
            <div className="summary-card bad">
              <div className="summary-value">{summary.bad}</div>
              <div className="summary-label">Needs Improvement</div>
            </div>
            <div className="summary-card ungraded">
              <div className="summary-value">{summary.ungraded}</div>
              <div className="summary-label">Not Graded</div>
            </div>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="table-controls">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search students by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search students"
            />
            
            <div className="filter-buttons">
              <button 
                className={`filter-button ${statusFilter === '' ? 'active' : ''}`}
                onClick={() => setStatusFilter('')}
              >
                All Students
              </button>
              <button 
                className={`filter-button good ${statusFilter === 'good' ? 'active' : ''}`}
                onClick={() => setStatusFilter('good')}
              >
                Good Standing
              </button>
              <button 
                className={`filter-button moderate ${statusFilter === 'moderate' ? 'active' : ''}`}
                onClick={() => setStatusFilter('moderate')}
              >
                Moderate
              </button>
              <button 
                className={`filter-button bad ${statusFilter === 'bad' ? 'active' : ''}`}
                onClick={() => setStatusFilter('bad')}
              >
                Needs Improvement
              </button>
              <button 
                className={`filter-button ungraded ${statusFilter === 'ungraded' ? 'active' : ''}`}
                onClick={() => setStatusFilter('ungraded')}
              >
                Not Graded
              </button>
              {(searchTerm || statusFilter) && (
                <button 
                  className="clear-filter-button"
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('');
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Student Table or No Results Message */}
        {filteredStudents.length === 0 ? (
          <div className="no-results">
            {students.length === 0 ? (
              <>
                <h2>Welcome to your Teacher Dashboard!</h2>
                <p>You don't have any students yet. Get started by adding your first student.</p>
                <button 
                  className="add-student-btn"
                  onClick={openAddStudentModal}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14m-7-7h14" />
                  </svg>
                  Add Your First Student
                </button>
              </>
            ) : (
              <>
                <p>No students match your search criteria.</p>
                <button 
                  className="clear-filter-button"
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('');
                  }}
                >
                  Clear Filters
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="class-table-container">
            <table className="class-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Quiz 1</th>
                  <th>Quiz 2</th>
                  <th>Quiz 3</th>
                  <th>Midterm</th>
                  <th>Pre-Final</th>
                  <th>Final Score</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr 
                    key={student.id} 
                    className={`${selectedStudent && selectedStudent.id === student.id ? 'selected-student' : ''}`}
                    onClick={() => selectStudent(student)}
                  >
                    <td className="student-id-col">{student.id}</td>
                    <td className="student-col">{student.name}</td>
                    <td className="score-col">
                      <input
                        type="number"
                        min="0"
                        max="999"
                        value={student.quizScores[0] !== null ? student.quizScores[0] : ''}
                        onChange={(e) => handleQuizScoreChange(student.id, 0, e.target.value)}
                        aria-label={`${student.name}'s Quiz 1 score`}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td className="score-col">
                      <input
                        type="number"
                        min="0"
                        max="999"
                        value={student.quizScores[1] !== null ? student.quizScores[1] : ''}
                        onChange={(e) => handleQuizScoreChange(student.id, 1, e.target.value)}
                        aria-label={`${student.name}'s Quiz 2 score`}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td className="score-col">
                      <input
                        type="number"
                        min="0"
                        max="999"
                        value={student.quizScores[2] !== null ? student.quizScores[2] : ''}
                        onChange={(e) => handleQuizScoreChange(student.id, 2, e.target.value)}
                        aria-label={`${student.name}'s Quiz 3 score`}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td className="score-col">
                      <input
                        type="number"
                        min="0"
                        max="999"
                        value={student.quizScores[3] !== null ? student.quizScores[3] : ''}
                        onChange={(e) => handleQuizScoreChange(student.id, 3, e.target.value)}
                        aria-label={`${student.name}'s Midterm score`}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td className="score-col">
                      <input
                        type="number"
                        min="0"
                        max="999"
                        value={student.quizScores[4] !== null ? student.quizScores[4] : ''}
                        onChange={(e) => handleQuizScoreChange(student.id, 4, e.target.value)}
                        aria-label={`${student.name}'s Pre-Final score`}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td className="score-col final-score">
                      {student.weightedScore !== null ? (
                        <>
                          {student.weightedScore}
                          <div className="progress-container">
                            <div 
                              className={`progress-bar status-${student.status}`}
                              style={{ width: `${Math.min(100, student.weightedScore)}%` }}
                            ></div>
                          </div>
                        </>
                      ) : (
                        "--"
                      )}
                    </td>
                    <td className="status-col">
                      <span className={`status-badge status-${student.status}`}>
                        {student.status === 'good' && 'Good Standing'}
                        {student.status === 'moderate' && 'Moderate'}
                        {student.status === 'bad' && 'Needs Improvement'}
                        {student.status === 'ungraded' && 'Not Graded'}
                      </span>
                    </td>
                    <td className="actions-col">
                      <div className="action-buttons">
                        <button 
                          className="reset-score-btn" 
                          title="Reset Score"
                          onClick={(e) => {
                            e.stopPropagation();
                            openResetConfirmModal(student);
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </button>
                        <button 
                          className="delete-student-btn" 
                          title="Delete Student"
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteConfirmModal(student, e);
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Dashboard Footer with Score Info */}
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
            Final Score is calculated as: {weights.quizAvg}% Quiz Avg + {weights.midterm}% Midterm + {weights.preFinal}% Pre-Final
          </div>
        </div>
        
        {/* Confirmation Modal for Reset */}
        {showConfirmModal && selectedStudent && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Confirm Reset</h3>
              <p>
                Are you sure you want to reset all scores for <strong>{selectedStudent.name}</strong>?
              </p>
              <p className="error-message">
                This action will clear all scores and mark the student as "Not Graded". This cannot be undone.
              </p>
              <div className="modal-actions">
                <button 
                  className="btn-cancel"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn-danger"
                  onClick={resetStudentScore}
                >
                  Reset Scores
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Confirmation Modal for Delete */}
        {showDeleteModal && selectedStudent && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Confirm Delete</h3>
              <p>
                Are you sure you want to delete <strong>{selectedStudent.name}</strong>?
              </p>
              <p className="error-message">
                This action cannot be undone. All student data will be permanently removed.
              </p>
              <div className="modal-actions">
                <button 
                  className="btn-cancel"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn-danger"
                  onClick={deleteStudent}
                >
                  Delete Student
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Add Student Modal */}
        {showAddModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Add New Student</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                addNewStudent();
              }}>
                <div className="form-group">
                  <label htmlFor="studentName">Student Name</label>
                  <input
                    id="studentName"
                    type="text"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                    placeholder="Enter student name"
                    autoFocus
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="studentId">Student ID</label>
                  <input
                    id="studentId"
                    type="text"
                    value={newStudent.id}
                    onChange={(e) => setNewStudent({...newStudent, id: e.target.value})}
                    placeholder="Enter student ID"
                  />
                </div>
                
                {modalError && <div className="error-message">{modalError}</div>}
                
                <div className="form-group helper-text">
                  New students will start with no scores
                </div>
                
                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={() => {
                    setShowAddModal(false);
                    setNewStudent({ name: '', id: '' });
                    setModalError('');
                  }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-save">
                    Add Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Weights Customization Modal */}
        {showWeightsModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Customize Score Weights</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                saveWeights();
              }}>
                <p className="weights-instructions">
                  Adjust the percentages for each component. The total must equal 100%.
                </p>
                
                <div className="form-group">
                  <label htmlFor="quizAvg">Quiz Average</label>
                  <div className="weight-input-group">
                    <input
                      id="quizAvg"
                      name="quizAvg"
                      type="number"
                      min="0"
                      max="100"
                      value={tempWeights.quizAvg}
                      onChange={handleWeightChange}
                    />
                    <span className="weight-percentage">%</span>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="midterm">Midterm</label>
                  <div className="weight-input-group">
                    <input
                      id="midterm"
                      name="midterm"
                      type="number"
                      min="0"
                      max="100"
                      value={tempWeights.midterm}
                      onChange={handleWeightChange}
                    />
                    <span className="weight-percentage">%</span>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="preFinal">Pre-Final</label>
                  <div className="weight-input-group">
                    <input
                      id="preFinal"
                      name="preFinal"
                      type="number"
                      min="0"
                      max="100"
                      value={tempWeights.preFinal}
                      onChange={handleWeightChange}
                    />
                    <span className="weight-percentage">%</span>
                  </div>
                </div>
                
                <div className="weight-total">
                  Total: {tempWeights.quizAvg + tempWeights.midterm + tempWeights.preFinal}%
                  {tempWeights.quizAvg + tempWeights.midterm + tempWeights.preFinal !== 100 && 
                    <span className="weight-warning"> (must equal 100%)</span>
                  }
                </div>
                
                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={() => setShowWeightsModal(false)}>
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn-save"
                    disabled={tempWeights.quizAvg + tempWeights.midterm + tempWeights.preFinal !== 100}
                  >
                    Save Weights
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Generated Code Modal */}
        {showCodeModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Student Access Code Generated</h3>
              <p className="code-instructions">
                Share this code with <strong>{selectedStudent?.name}</strong>. They can use it to import their scores.
              </p>
              
              <div className="access-code-display">
                <span className="code">{generatedCode}</span>
                <button 
                  className="copy-code-btn"
                  onClick={copyCodeToClipboard}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy
                </button>
              </div>
              
              <p className="code-expiry">
                This code will expire in 7 days. It can only be used by this specific student.
              </p>
              
              <div className="modal-actions">
                <button className="btn-primary" onClick={() => setShowCodeModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Active Codes Modal */}
        {showActiveCodesModal && (
          <div className="modal-overlay">
            <div className="modal-content active-codes-modal">
              <h3>Active Student Access Codes</h3>
              
              {!activeCodes || activeCodes.length === 0 ? (
                <p className="no-codes-message">
                  No active access codes found. Select a student and generate a code to share.
                </p>
              ) : (
                <div className="active-codes-list">
                  {activeCodes.map((data) => {
                    const expiryDate = new Date(data.expiryDate);
                    const formattedDate = expiryDate.toLocaleDateString();
                    
                    return (
                      <div className="active-code-item" key={data.code}>
                        <div className="code-info">
                          <div className="code-value">{data.code}</div>
                          <div className="student-name-code">For: {data.studentName}</div>
                          <div className="code-expiry">Expires: {formattedDate}</div>
                        </div>
                        <button 
                          className="delete-code-btn"
                          onClick={() => handleDeleteCode(data.code)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
              
              <div className="modal-actions">
                <button className="btn-primary" onClick={() => setShowActiveCodesModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Subject Modal */}
        {showSubjectEditModal && (
          <div className="modal-overlay">
            <div className="modal-container">
              <div className="modal-header">
                <h2>Edit Class Subject</h2>
                <button 
                  className="close-button"
                  onClick={() => {
                    setShowSubjectEditModal(false);
                    setModalError('');
                  }}
                >
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleSubjectSubmit}>
                <div className="modal-content">
                  <p className="modal-description">
                    Enter the subject name for this class. This will be displayed in the dashboard and shared with students.
                  </p>
                  <div className="form-group">
                    <label htmlFor="subject">Subject Title</label>
                    <input 
                      type="text" 
                      id="subject" 
                      placeholder="e.g., Introduction to Computer Science"
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      maxLength={50}
                      required
                      autoFocus
                    />
                    <div className="char-count">{newSubject.length}/50 characters</div>
                  </div>
                  
                  {modalError && <div className="error-message">{modalError}</div>}
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="cancel-button"
                    onClick={() => {
                      setShowSubjectEditModal(false);
                      setModalError('');
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="save-button">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard; 