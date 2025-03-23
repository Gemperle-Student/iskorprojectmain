/**
 * Score Service
 * 
 * This service provides methods for working with student scores.
 * In a real application, these would communicate with an API.
 * For this demo, we're using localStorage to persist data.
 */

// Key for storing all student data in localStorage
const STUDENTS_STORAGE_KEY = 'iskr_students_data';

// Default student data structure
const DEFAULT_STUDENTS = [
  {
    id: "S001",
    name: "Keirt William Gemperle",
    score: 85,
    quiz1: 80,
    quiz2: 85,
    quiz3: 90,
    midterm: 85,
    prefinal: 85,
    status: "good"
  },
  {
    id: "S002",
    name: "Maria Rodriguez",
    score: 65,
    quiz1: 60,
    quiz2: 65,
    quiz3: 70,
    midterm: 60,
    prefinal: 70,
    status: "moderate"
  },
  {
    id: "S003",
    name: "John Smith",
    score: 35,
    quiz1: 30,
    quiz2: 40,
    quiz3: 35,
    midterm: 30,
    prefinal: 38,
    status: "bad"
  },
  {
    id: "S004",
    name: "Sarah Johnson",
    score: 92,
    quiz1: 95,
    quiz2: 90,
    quiz3: 92,
    midterm: 92,
    prefinal: 90,
    status: "good"
  },
  {
    id: "S005",
    name: "David Lee",
    score: 78,
    quiz1: 75,
    quiz2: 80,
    quiz3: 78,
    midterm: 78,
    prefinal: 79,
    status: "good"
  },
  {
    id: "S006",
    name: "Emily Chen",
    score: 54,
    quiz1: 50,
    quiz2: 55,
    quiz3: 52,
    midterm: 55,
    prefinal: 54,
    status: "moderate"
  },
  {
    id: "S007",
    name: "James Wilson",
    score: 28,
    quiz1: 25,
    quiz2: 30,
    quiz3: 32,
    midterm: 22,
    prefinal: 30,
    status: "bad"
  }
];

/**
 * Initialize the data store with default values if empty
 * @param {boolean} forceEmpty Set to true to avoid initializing with defaults
 */
const initializeDataStore = (forceEmpty = false) => {
  if (!localStorage.getItem(STUDENTS_STORAGE_KEY)) {
    if (forceEmpty) {
      localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify([]));
    } else {
      localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(DEFAULT_STUDENTS));
    }
  }
};

/**
 * Get all students data
 * @param {boolean} forceEmpty Set to true to avoid initializing with defaults
 * @returns {Array} Array of student objects
 */
export const getAllStudents = (forceEmpty = false) => {
  initializeDataStore(forceEmpty);
  return JSON.parse(localStorage.getItem(STUDENTS_STORAGE_KEY));
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
 * Update student scores in localStorage
 * @param {Array} students The updated array of students
 */
const saveStudents = (students) => {
  localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(students));
};

/**
 * Get scores for teacher dashboard
 * @returns {Array} Array of student data for teacher view
 */
export const getScoresByTeacher = () => {
  // For this demo, we'll respect the 'teacherHasLoggedInBefore' flag
  // In a real app, this would be a server-side check
  const hasLoggedInBefore = localStorage.getItem('teacherHasLoggedInBefore');
  
  // If it's the first login, return an empty array and initialize with empty data
  if (!hasLoggedInBefore) {
    // Make sure we initialize the data store with an empty array on first login
    if (!localStorage.getItem(STUDENTS_STORAGE_KEY)) {
      localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify([]));
    }
    return [];
  }
  
  // Otherwise, return the stored students (with defaults if needed)
  const students = getAllStudents();
  return students;
};

/**
 * Update a student's score
 * @param {string} studentId Student ID
 * @param {number} score The new score value (0-100)
 * @returns {Object} The updated student with new status
 */
export const updateScore = async (studentId, score) => {
  const students = getAllStudents();
  const studentIndex = students.findIndex(s => s.id === studentId);
  
  if (studentIndex === -1) {
    throw new Error(`Student with ID ${studentId} not found`);
  }
  
  // Calculate new status
  const newStatus = determineStatus(score);
  
  // Update student
  students[studentIndex] = {
    ...students[studentIndex],
    score,
    status: newStatus
  };
  
  // Save changes
  saveStudents(students);
  
  // Return updated student
  return students[studentIndex];
};

/**
 * Get formatted student data for the student dashboard
 * @param {string} studentId Optional student ID (if not provided, uses the first student)
 * @returns {Object} Formatted student data for student view
 */
export const getFormattedStudentForDashboard = (studentId) => {
  const students = getAllStudents();
  const student = studentId 
    ? students.find(s => s.id === studentId)
    : students[0];
  
  if (!student) {
    return null;
  }
  
  // Use actual values from the student record if they exist
  return {
    id: student.id,
    name: student.name,
    status: student.status,
    averageScore: student.score,
    quizScores: [
      { 
        id: "Q1", 
        name: "Quiz 1", 
        score: student.quiz1 || Math.round(student.score * 0.25), 
        total: 50 // Quizzes might have different total points
      },
      { 
        id: "Q2", 
        name: "Quiz 2", 
        score: student.quiz2 || Math.round(student.score * 0.25), 
        total: 30 // Illustrating different quiz totals
      },
      { 
        id: "Q3", 
        name: "Quiz 3", 
        score: student.quiz3 || Math.round(student.score * 0.25), 
        total: 20 // Illustrating different quiz totals
      }
    ],
    activityScores: [
      { 
        id: "M1", 
        name: "Mid-Term", 
        score: student.midterm || Math.round(student.score), 
        total: 100
      },
      { 
        id: "F1", 
        name: "Pre-Final", 
        score: student.prefinal || Math.round(student.score * 0.9), 
        total: 100
      }
    ]
  };
};

/**
 * Reset the teacher's login state (for testing purposes)
 * This allows testing the first-time login experience
 */
export const resetTeacherLoginState = () => {
  localStorage.removeItem('teacherHasLoggedInBefore');
  console.log('Teacher login state reset');
}; 