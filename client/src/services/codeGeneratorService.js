/**
 * Class Access Code Generator Service
 * 
 * This service provides functions to generate and validate unique access codes
 * for class enrollment. Codes are stored in localStorage for simplicity.
 */

// Storage key for access codes
const CLASS_ACCESS_CODES_KEY = 'classAccessCodes';

/**
 * Generate a random 6-character alphanumeric code
 * @param {string} classId - ID of the class
 * @param {string} className - Name of the class
 * @param {string} studentId - ID of the student 
 * @param {string} studentName - Name of the student
 * @param {object} scoreData - Student's score data
 * @returns {string} The generated access code
 */
export const generateClassAccessCode = (classId, className, studentId, studentName, scoreData) => {
  // Generate a random code
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';  // Removed I, O, 0, 1 to avoid confusion
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  // Create expiry date (7 days from now)
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);
  
  // Create student data with scores
  const studentData = {
    id: studentId,
    name: studentName,
    finalScore: scoreData.finalScore || 0,
    scores: scoreData.scores || {},
    notes: scoreData.notes || null
  };
  
  // Create the code data object
  const codeData = {
    code,
    classId,
    className,
    studentId,
    studentName,
    studentData,
    expiryDate: expiryDate.toISOString(),
    issuedAt: new Date().toISOString()
  };
  
  // Save the code to localStorage
  const activeCodes = getActiveAccessCodes();
  activeCodes.push(codeData);
  localStorage.setItem(CLASS_ACCESS_CODES_KEY, JSON.stringify(activeCodes));
  
  return code;
};

/**
 * Get all active access codes
 * @returns {Array} List of active access codes
 */
export const getActiveAccessCodes = () => {
  const activeCodes = localStorage.getItem(CLASS_ACCESS_CODES_KEY);
  if (!activeCodes) {
    return [];
  }
  
  // Parse the stored codes
  const codes = JSON.parse(activeCodes);
  
  // Filter out expired codes
  const now = new Date();
  const validCodes = codes.filter(codeData => {
    const expiryDate = new Date(codeData.expiryDate);
    return expiryDate > now;
  });
  
  // Update localStorage with only valid codes
  if (validCodes.length !== codes.length) {
    localStorage.setItem(CLASS_ACCESS_CODES_KEY, JSON.stringify(validCodes));
  }
  
  return validCodes;
};

/**
 * Delete an access code
 * @param {string} code - Access code to delete
 * @returns {Array} Updated list of active codes
 */
export const deleteAccessCode = (code) => {
  const activeCodes = getActiveAccessCodes();
  const updatedCodes = activeCodes.filter(codeData => codeData.code !== code);
  localStorage.setItem(CLASS_ACCESS_CODES_KEY, JSON.stringify(updatedCodes));
  return updatedCodes;
};

/**
 * Validate a class access code
 * @param {string} code - Access code to validate
 * @returns {object|null} Class data if valid, null otherwise
 */
export const validateClassAccessCode = (code) => {
  const activeCodes = getActiveAccessCodes();
  
  // Find the code in active codes
  const codeData = activeCodes.find(codeData => codeData.code === code);
  
  if (!codeData) {
    return null; // Code not found or expired
  }
  
  // Return the class data associated with the code
  return {
    classId: codeData.classId,
    className: codeData.className,
    studentData: codeData.studentData
  };
};

/**
 * Get a demo access code for testing (with sample student data)
 * @returns {string} A demo access code
 */
export const getDemoAccessCode = () => {
  const demoClassId = "demo-" + Date.now();
  
  // Sample student scores data
  const sampleScores = {
    finalScore: 78.5,
    scores: {
      quiz1: { score: 85, weight: 15 },
      quiz2: { score: 72, weight: 15 },
      midterm: { score: 76, weight: 30 },
      finalExam: { score: 80, weight: 40 }
    },
    notes: "Good progress, but need to improve on midterm material."
  };
  
  return generateClassAccessCode(
    demoClassId, 
    "Demo Class", 
    "student-001", 
    "Demo Student", 
    sampleScores
  );
}; 