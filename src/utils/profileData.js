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

  // Technical Skills
  skills: [
    { name: 'React.js', category: 'Frontend', level: 'Advanced' },
    { name: 'JavaScript (ES6+)', category: 'Frontend', level: 'Advanced' },
    { name: 'HTML5 & CSS3', category: 'Frontend', level: 'Advanced' },
    { name: 'TypeScript', category: 'Frontend', level: 'Intermediate' },
    { name: 'Node.js', category: 'Backend', level: 'Advanced' },
    { name: 'Express.js', category: 'Backend', level: 'Advanced' },
    { name: 'Python', category: 'Backend', level: 'Advanced' },
    { name: 'REST APIs', category: 'Backend', level: 'Advanced' },
    { name: 'PostgreSQL', category: 'Database', level: 'Intermediate' },
    { name: 'MongoDB', category: 'Database', level: 'Intermediate' },
    { name: 'Git & GitHub', category: 'Cloud & DevOps', level: 'Advanced' },
    { name: 'Docker', category: 'Cloud & DevOps', level: 'Intermediate' },
    { name: 'AWS (S3 & EC2)', category: 'Cloud & DevOps', level: 'Beginner' },
    { name: 'Data Structures & Algo', category: 'Core CS', level: 'Advanced' },
    { name: 'System Design', category: 'Core CS', level: 'Intermediate' },
  ],

  // Projects
  projects: [
    {
      id: 'proj-1',
      title: 'SkillTrace AI - Career Intelligence Platform',
      description: 'An AI-powered web platform for students to track portfolio readiness, conduct skill gap analysis, and receive personalized company recommendations.',
      techStack: ['React.js', 'MUI', 'Node.js', 'Chart.js', 'FastAPI'],
      liveUrl: 'https://skilltrace.ai/demo',
      githubUrl: 'https://github.com/aditisharma/skilltrace-ai',
      featured: true,
      impact: 'Top Flagship Project',
    },
    {
      id: 'proj-2',
      title: 'E-Commerce Microservices Engine',
      description: 'Distributed backend order processing system built using Express, Redis caching, and MongoDB with JWT token security.',
      techStack: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Docker'],
      liveUrl: 'https://shop-engine-demo.vercel.app',
      githubUrl: 'https://github.com/aditisharma/ecommerce-microservices',
      featured: true,
      impact: 'High Backend Complexity',
    },
    {
      id: 'proj-3',
      title: 'Algorithmic Stock Trend Predictor',
      description: 'Python ML model using LSTM networks to forecast tech stock volatility with interactive Matplotlib dashboard.',
      techStack: ['Python', 'Pandas', 'TensorFlow', 'Flask'],
      liveUrl: '',
      githubUrl: 'https://github.com/aditisharma/stock-trend-predictor',
      featured: false,
      impact: 'Data Science ML',
    },
  ],

  // Certifications
  certifications: [
    {
      id: 'cert-1',
      title: 'AWS Certified Developer – Associate',
      issuer: 'Amazon Web Services (AWS)',
      issueDate: 'May 2026',
      credentialId: 'AWS-DEV-908214',
      verificationUrl: 'https://aws.amazon.com/verify/AWS-DEV-908214',
    },
    {
      id: 'cert-2',
      title: 'Meta Professional Frontend Developer Specialization',
      issuer: 'Coursera / Meta',
      issueDate: 'Jan 2026',
      credentialId: 'META-FE-778910',
      verificationUrl: 'https://coursera.org/verify/META-FE-778910',
    },
    {
      id: 'cert-3',
      title: 'HackerRank Problem Solving (Advanced)',
      issuer: 'HackerRank',
      issueDate: 'Nov 2025',
      credentialId: 'HR-PS-ADV-5541',
      verificationUrl: 'https://hackerrank.com/certificates/HR-PS-ADV-5541',
    },
  ],

  // Social / Professional Links
  links: {
    github: 'https://github.com/aditisharma',
    linkedin: 'https://linkedin.com/in/aditisharma-dev',
    portfolio: 'https://aditisharma.dev',
    twitter: 'https://twitter.com/aditisharma_codes',
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
