/**
 * SkillTrace AI - Module 12 Profile Data Store
 * Mock dataset for Student Profile (Aditi Sharma)
 * Structured for future FastAPI + MongoDB integration.
 */

export const initialStudentProfile = {
  id: 'stu-70891',
  avatarUrl: '', // Uses initial fallback or custom URL
  fullName: 'Aditi Sharma',
  email: 'aditi.sharma@college.edu',
  phone: '+91 98765 43210',
  location: 'Bengaluru, Karnataka, India',
  bio: 'Final-year Computer Science undergraduate passionate about building scalable full-stack web applications, AI-assisted tools, and clean user interfaces.',
  
  // Academic Information
  college: 'Institute of Engineering & Technology',
  department: 'Computer Science & Engineering',
  academicYear: 'Final Year (2023 - 2027)',
  currentSemester: 'Semester 7',
  cgpa: '8.92 / 10.0',
  enrollmentNo: 'EN2023CSE098',

  // Career Goal
  careerGoal: 'Full Stack Engineer (Frontend-leaning)',
  secondaryCareerGoal: 'Software Development Engineer (SDE-1)',
  targetSalaryRange: '₹12 LPA – ₹18 LPA',

  // Primary user inputs
  skills: [],
  projects: [],
  certifications: [],
  resume: null,
  analysisResult: null,

  // Social / Professional Links
  links: {
    github: '',
    linkedin: '',
    portfolio: '',
    twitter: '',
  },
};

/**
 * Helper to calculate profile completion percentage based on field presence.
 */
export function calculateProfileCompletion(profile = initialStudentProfile) {
  let score = 0;
  const maxScore = 100;
  const missingItems = [];

  // Personal Info (20 pts)
  if (profile.fullName && profile.email && profile.phone && profile.location) {
    score += 20;
  } else {
    missingItems.push('Complete basic contact details');
  }

  // Academic Info (15 pts)
  if (profile.college && profile.department && profile.academicYear) {
    score += 15;
  } else {
    missingItems.push('Add college and academic department details');
  }

  // Career Goal (15 pts)
  if (profile.careerGoal) {
    score += 15;
  } else {
    missingItems.push('Set your primary career goal');
  }

  // Technical Skills (20 pts)
  if (profile.skills && profile.skills.length >= 5) {
    score += 20;
  } else {
    missingItems.push('Add at least 5 technical skills');
  }

  // Projects (15 pts)
  if (profile.projects && profile.projects.length >= 2) {
    score += 15;
  } else {
    missingItems.push('Add at least 2 featured projects');
  }

  // Certifications & Links (15 pts)
  if (profile.certifications && profile.certifications.length >= 1 && profile.links?.github && profile.links?.linkedin) {
    score += 15;
  } else {
    missingItems.push('Add GitHub / LinkedIn links & certifications');
  }

  return {
    percentage: Math.min(100, score),
    missingItems,
  };
}
