/**
 * Score Service
 * 
 * This service provides methods for working with student scores.
 * In a real application, these would communicate with an API.
 * We're using localStorage to persist data.
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
 * Get all students' scores as a teacher
 * @returns {Array} Array of student objects with scores
 */
export const getScoresByTeacher = () => {
  // In a real app, this would fetch from an API
  // We'll use localStorage to persist data
  const savedData = localStorage.getItem('iskr_students_data');
  
  if (savedData) {
    return JSON.parse(savedData);
  }
  
  // Default data for first login
  const defaultData = [
    {
      id: 'S1001',
      name: 'Alex Johnson',
      quiz1: 85,
      quiz2: 92,
      quiz3: 78,
      midterm: 88,
      prefinal: 91
    },
    {
      id: 'S1002',
      name: 'Jamie Smith',
      quiz1: 75,
      quiz2: 68,
      quiz3: 72,
      midterm: 71,
      prefinal: 73
    },
    {
      id: 'S1003',
      name: 'Taylor Williams',
      quiz1: 45,
      quiz2: 52,
      quiz3: 39,
      midterm: 48,
      prefinal: 42
    }
  ];
  
  // Save default data to localStorage
  localStorage.setItem('iskr_students_data', JSON.stringify(defaultData));
  
  return defaultData;
};

/**
 * Update a student's score
 * @param {string} studentId - ID of the student
 * @param {string} scoreType - Type of score (quiz1, midterm, etc.)
 * @param {number} score - New score value
 * @returns {Object} Updated student object
 */
export const updateScore = (studentId, scoreType, score) => {
  const students = getScoresByTeacher();
  
  const updatedStudents = students.map(student => {
    if (student.id === studentId) {
      return {
        ...student,
        [scoreType]: score
      };
    }
    return student;
  });
  
  // Save updated data
  localStorage.setItem('iskr_students_data', JSON.stringify(updatedStudents));
  
  // Return the updated student
  return updatedStudents.find(student => student.id === studentId);
};

/**
 * Get formatted student data for student dashboard
 * @returns {Object} Formatted student object for dashboard
 */
export const getFormattedStudentForDashboard = () => {
  // In a real app, this would authenticate the current user
  // and return their specific data
  
  const students = getScoresByTeacher();
  
  if (!students || students.length === 0) {
    return null;
  }
  
  const student = students[0];
  
  // Format data for student dashboard
  const formattedStudent = {
    id: student.id,
    name: student.name,
    status: calculateStatus(student),
    quizScores: [
      { id: 'Q1', name: 'Quiz 1', score: student.quiz1, total: 100 },
      { id: 'Q2', name: 'Quiz 2', score: student.quiz2, total: 100 },
      { id: 'Q3', name: 'Quiz 3', score: student.quiz3, total: 100 }
    ],
    activityScores: [
      { id: 'M1', name: 'Midterm Exam', score: student.midterm, total: 100 },
      { id: 'F1', name: 'Pre-Final Exam', score: student.prefinal, total: 100 }
    ]
  };
  
  return formattedStudent;
};

/**
 * Calculate the status based on all scores
 * @param {Object} student - Student object with scores
 * @returns {string} Status (good, moderate, bad)
 */
const calculateStatus = (student) => {
  // Calculate average of quiz scores
  const quizAvg = (student.quiz1 + student.quiz2 + student.quiz3) / 3;
  
  // Calculate weighted score (30% quizzes, 30% midterm, 40% pre-final)
  const weightedScore = (quizAvg * 0.3) + (student.midterm * 0.3) + (student.prefinal * 0.4);
  
  // Determine status based on weighted score
  if (weightedScore >= 70) return 'good';
  if (weightedScore >= 40) return 'moderate';
  return 'bad';
};

/**
 * Reset the teacher's login state (for testing purposes)
 * This allows testing the first-time login experience
 */
export const resetTeacherLoginState = () => {
  localStorage.removeItem('teacherHasLoggedInBefore');
  console.log('Teacher login state reset');
}; 