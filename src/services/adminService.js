// Admin Service for managing Admin Dashboard state, CRUD operations, and analytics data
// Architected for seamless integration with FastAPI + MongoDB + ML API endpoints:
// - GET  /api/v1/admin/dashboard-stats -> Fetch high level metrics
// - GET  /api/v1/admin/students        -> Query, search & filter student records
// - PATCH /api/v1/admin/students/{id}   -> Toggle account status
// - POST /api/v1/admin/companies       -> Create/update hiring partner
// - DELETE /api/v1/admin/companies/{id}-> Delete hiring partner
// - POST /api/v1/admin/assessments     -> Create/update skill assessment
// - DELETE /api/v1/admin/assessments/{id}-> Delete skill assessment
// - POST /api/v1/admin/careers         -> Create/update career path
// - DELETE /api/v1/admin/careers/{id}  -> Delete career path

const ADMIN_STORAGE_KEY = 'skilltrace_admin_state';

const initialAdminData = {
  stats: {
    totalStudents: 1284,
    activeStudents: 1042,
    portfoliosAnalyzed: 956,
    assessmentsCompleted: 3410,
    careerRecommendations: 2890,
    placementPredictions: 1150,
  },
  students: [
    {
      id: 'STD-1001',
      name: 'Aditi Sharma',
      email: 'aditi.sharma@institution.edu',
      department: 'CSE',
      cgpa: 8.9,
      readinessScore: 88,
      status: 'Active',
      joinedDate: '2024-08-15',
      assessedSkills: ['React', 'Node.js', 'Python', 'System Design', 'Docker'],
      placementProbability: 92,
      portfolioStatus: 'Analyzed',
      assessmentStatus: 'Completed',
      githubUrl: 'https://github.com/aditi-sharma',
      completedTestsCount: 6,
      topCareerMatch: 'Full-Stack Software Engineer',
    },
    {
      id: 'STD-1002',
      name: 'Rohan Verma',
      email: 'rohan.v@institution.edu',
      department: 'ECE',
      cgpa: 7.8,
      readinessScore: 74,
      status: 'Active',
      joinedDate: '2024-09-01',
      assessedSkills: ['C++', 'Embedded Systems', 'Python', 'RTOS'],
      placementProbability: 78,
      portfolioStatus: 'Analyzed',
      assessmentStatus: 'In Progress',
      githubUrl: 'https://github.com/rohan-v',
      completedTestsCount: 3,
      topCareerMatch: 'Embedded & IoT Systems Engineer',
    },
    {
      id: 'STD-1003',
      name: 'Priya Nair',
      email: 'priya.nair@institution.edu',
      department: 'CSE',
      cgpa: 9.4,
      readinessScore: 95,
      status: 'Active',
      joinedDate: '2024-07-20',
      assessedSkills: ['Python', 'PyTorch', 'FastAPI', 'MLOps', 'TensorFlow', 'SQL'],
      placementProbability: 96,
      portfolioStatus: 'Analyzed',
      assessmentStatus: 'Completed',
      githubUrl: 'https://github.com/priya-nair-ai',
      completedTestsCount: 8,
      topCareerMatch: 'AI / Machine Learning Specialist',
    },
    {
      id: 'STD-1004',
      name: 'Karan Malhotra',
      email: 'karan.m@institution.edu',
      department: 'IT',
      cgpa: 6.9,
      readinessScore: 62,
      status: 'Inactive',
      joinedDate: '2024-10-05',
      assessedSkills: ['HTML/CSS', 'JavaScript', 'SQL'],
      placementProbability: 60,
      portfolioStatus: 'Pending',
      assessmentStatus: 'Pending',
      githubUrl: 'https://github.com/karan-m',
      completedTestsCount: 1,
      topCareerMatch: 'Web Front-End Developer',
    },
    {
      id: 'STD-1005',
      name: 'Sneha Patel',
      email: 'sneha.p@institution.edu',
      department: 'CSE',
      cgpa: 8.4,
      readinessScore: 82,
      status: 'Active',
      joinedDate: '2024-08-10',
      assessedSkills: ['Java', 'Spring Boot', 'SQL', 'Docker', 'Kubernetes'],
      placementProbability: 85,
      portfolioStatus: 'Analyzed',
      assessmentStatus: 'Completed',
      githubUrl: 'https://github.com/sneha-patel',
      completedTestsCount: 5,
      topCareerMatch: 'Backend & Java Developer',
    },
    {
      id: 'STD-1006',
      name: 'Vikram Singh',
      email: 'vikram.s@institution.edu',
      department: 'EEE',
      cgpa: 7.2,
      readinessScore: 68,
      status: 'Suspended',
      joinedDate: '2024-11-12',
      assessedSkills: ['Matlab', 'Python', 'C++'],
      placementProbability: 64,
      portfolioStatus: 'Pending',
      assessmentStatus: 'Pending',
      githubUrl: 'https://github.com/vikram-s',
      completedTestsCount: 2,
      topCareerMatch: 'Control Systems Analyst',
    },
    {
      id: 'STD-1007',
      name: 'Ananya Gupta',
      email: 'ananya.g@institution.edu',
      department: 'CSE',
      cgpa: 9.1,
      readinessScore: 91,
      status: 'Active',
      joinedDate: '2024-08-01',
      assessedSkills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Python'],
      placementProbability: 94,
      portfolioStatus: 'Analyzed',
      assessmentStatus: 'Completed',
      githubUrl: 'https://github.com/ananya-devops',
      completedTestsCount: 7,
      topCareerMatch: 'Cloud & DevOps Solutions Architect',
    },
    {
      id: 'STD-1008',
      name: 'Tarun Kumar',
      email: 'tarun.k@institution.edu',
      department: 'IT',
      cgpa: 7.6,
      readinessScore: 71,
      status: 'Active',
      joinedDate: '2024-09-15',
      assessedSkills: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
      placementProbability: 76,
      portfolioStatus: 'Analyzed',
      assessmentStatus: 'In Progress',
      githubUrl: 'https://github.com/tarun-k',
      completedTestsCount: 4,
      topCareerMatch: 'Full-Stack Software Engineer',
    },
  ],
  assessments: [
    {
      id: 'ASM-01',
      title: 'Full-Stack Web Engineering',
      category: 'Technical',
      timeLimitMinutes: 45,
      questionCount: 20,
      attempts: 420,
      avgScore: 78,
      passRate: 84,
      difficulty: 'Intermediate',
      questions: [
        {
          id: 'Q1',
          question: 'What is the primary purpose of React.useMemo hook?',
          options: [
            'To trigger side effects after every component render cycle',
            'To memoize the result of a calculation between re-renders',
            'To store mutable references without causing component re-renders',
            'To provide global state context across deep tree components',
          ],
          correctOption: 1,
          points: 5,
        },
        {
          id: 'Q2',
          question: 'Which HTTP request method is defined as idempotent according to REST specifications?',
          options: ['POST', 'PUT', 'PATCH', 'CONNECT'],
          correctOption: 1,
          points: 5,
        },
        {
          id: 'Q3',
          question: 'What does CSS flex-grow: 1 signify inside a Flexbox layout container?',
          options: [
            'Forces item to shrink proportionally when container shrinks',
            'Allows item to expand and occupy remaining available space inside container',
            'Sets the initial fixed pixel basis for flex item width',
            'Disables responsive layout recalculation for target element',
          ],
          correctOption: 1,
          points: 5,
        },
      ],
    },
    {
      id: 'ASM-02',
      title: 'Data Structures & Algorithms Core',
      category: 'Aptitude',
      timeLimitMinutes: 60,
      questionCount: 25,
      attempts: 650,
      avgScore: 69,
      passRate: 72,
      difficulty: 'Advanced',
      questions: [
        {
          id: 'Q101',
          question: 'What is the worst-case time complexity of QuickSort algorithm?',
          options: ['O(N log N)', 'O(N^2)', 'O(N)', 'O(log N)'],
          correctOption: 1,
          points: 5,
        },
        {
          id: 'Q102',
          question: 'Which data structure supports O(1) average time complexity for insert, search, and delete?',
          options: ['Binary Search Tree', 'Hash Map / Hash Table', 'Max Heap', 'Doubly Linked List'],
          correctOption: 1,
          points: 5,
        },
      ],
    },
    {
      id: 'ASM-03',
      title: 'Python Data Science & ML Foundations',
      category: 'Domain',
      timeLimitMinutes: 50,
      questionCount: 20,
      attempts: 310,
      avgScore: 82,
      passRate: 88,
      difficulty: 'Intermediate',
      questions: [
        {
          id: 'Q201',
          question: 'What is the main objective of feature scaling (e.g. StandardScaler) in Machine Learning?',
          options: [
            'To convert categorical variables into numerical dummy indicators',
            'To normalize feature magnitudes so high-range values do not dominate model weights',
            'To handle missing NaN values in tabular datasets',
            'To compress high-dimensional feature spaces into principal components',
          ],
          correctOption: 1,
          points: 5,
        },
      ],
    },
    {
      id: 'ASM-04',
      title: 'Corporate Soft Skills & Leadership',
      category: 'Soft Skills',
      timeLimitMinutes: 30,
      questionCount: 15,
      attempts: 580,
      avgScore: 89,
      passRate: 94,
      difficulty: 'Beginner',
      questions: [
        {
          id: 'Q301',
          question: 'Which strategy is recommended for resolving cross-functional team conflicts effectively?',
          options: [
            'Avoiding discussion until deadlines pass',
            'Active listening, identifying shared project goals, and collaborative problem solving',
            'Escalating directly to senior executives without internal alignment',
            'Imposing rigid decision mandates without team consensus',
          ],
          correctOption: 1,
          points: 5,
        },
      ],
    },
  ],
  companies: [
    {
      id: 'COMP-101',
      name: 'Google',
      industry: 'Big Tech / Cloud',
      companyType: 'MNC',
      minCgpa: 8.5,
      packageLpa: 32.5,
      requiredSkills: ['System Design', 'Algorithms', 'Distributed Systems', 'Python'],
      status: 'Hiring Active',
      applicationsCount: 240,
    },
    {
      id: 'COMP-102',
      name: 'Microsoft',
      industry: 'Software & Cloud',
      companyType: 'MNC',
      minCgpa: 8.0,
      packageLpa: 28.0,
      requiredSkills: ['C#', 'Azure', 'Data Structures', 'React'],
      status: 'Hiring Active',
      applicationsCount: 310,
    },
    {
      id: 'COMP-103',
      name: 'Flipkart',
      industry: 'E-Commerce Tech',
      companyType: 'Product',
      minCgpa: 7.5,
      packageLpa: 22.0,
      requiredSkills: ['Java', 'Spring Boot', 'Microservices', 'Kafka'],
      status: 'Upcoming Drive',
      applicationsCount: 185,
    },
    {
      id: 'COMP-104',
      name: 'Razorpay',
      industry: 'FinTech',
      companyType: 'Startup',
      minCgpa: 7.5,
      packageLpa: 20.0,
      requiredSkills: ['Go', 'React', 'Node.js', 'System Architecture'],
      status: 'Hiring Active',
      applicationsCount: 145,
    },
    {
      id: 'COMP-105',
      name: 'TCS Innovation Labs',
      industry: 'IT Services & Consulting',
      companyType: 'Service',
      minCgpa: 6.5,
      packageLpa: 7.5,
      requiredSkills: ['Java', 'SQL', 'Web Technologies'],
      status: 'Completed',
      applicationsCount: 520,
    },
  ],
  careers: [
    {
      id: 'CAR-01',
      title: 'Full-Stack Software Engineer',
      category: 'Software Engineering',
      avgSalaryLpa: 18.5,
      growthRate: '+24% YoY',
      demandLevel: 'High',
      description: 'Architects and builds modern responsive web interfaces and resilient scalable microservices.',
      requiredSkills: ['React', 'Node.js', 'TypeScript', 'Docker', 'System Design'],
    },
    {
      id: 'CAR-02',
      title: 'AI / Machine Learning Specialist',
      category: 'Data & AI',
      avgSalaryLpa: 24.0,
      growthRate: '+38% YoY',
      demandLevel: 'Very High',
      description: 'Designs, trains, evaluates, and deploys deep neural models and generative AI systems.',
      requiredSkills: ['Python', 'PyTorch', 'Scikit-Learn', 'FastAPI', 'MLOps'],
    },
    {
      id: 'CAR-03',
      title: 'Cloud & DevOps Solutions Architect',
      category: 'Cloud Infrastructure',
      avgSalaryLpa: 21.0,
      growthRate: '+28% YoY',
      demandLevel: 'High',
      description: 'Manages automated CI/CD pipelines, Kubernetes clusters, and multi-cloud security.',
      requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
    },
    {
      id: 'CAR-04',
      title: 'Data Engineer & Analytics Specialist',
      category: 'Data Science',
      avgSalaryLpa: 16.5,
      growthRate: '+20% YoY',
      demandLevel: 'Medium-High',
      description: 'Constructs ETL pipelines, big data warehouses, and automated real-time analytics engines.',
      requiredSkills: ['SQL', 'Python', 'Spark', 'Snowflake', 'Airflow'],
    },
  ],
  analytics: {
    studentGrowth: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      values: [420, 580, 710, 850, 960, 1080, 1190, 1284],
    },
    assessmentPerformance: {
      categories: ['Full-Stack', 'DSA', 'Data Science', 'Soft Skills', 'DevOps'],
      scores: [78, 69, 82, 89, 74],
    },
    careerPopularity: {
      labels: ['Full-Stack', 'AI/ML', 'Cloud DevOps', 'Data Engineering', 'Cybersecurity'],
      counts: [42, 28, 15, 10, 5],
    },
    skillDemand: {
      labels: ['Python', 'React', 'Docker', 'SQL', 'System Design', 'AWS'],
      demandPercent: [92, 88, 81, 78, 74, 69],
    },
    placementReadiness: {
      ranges: ['<60%', '60-70%', '70-80%', '80-90%', '>90%'],
      studentCounts: [45, 120, 340, 560, 219],
    },
  },
};

export const getAdminState = () => {
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!raw) return initialAdminData;
    const parsed = JSON.parse(raw);

    // Dynamic stats computation to reflect actual student changes
    const currentStudents = parsed.students || initialAdminData.students;
    const activeCount = currentStudents.filter((s) => s.status === 'Active').length;

    return {
      ...initialAdminData,
      ...parsed,
      stats: {
        ...initialAdminData.stats,
        ...(parsed.stats || {}),
        activeStudents: activeCount > 0 ? activeCount : initialAdminData.stats.activeStudents,
      },
    };
  } catch (err) {
    console.error('Error fetching admin state from localStorage:', err);
    return initialAdminData;
  }
};

export const saveAdminState = (state) => {
  try {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(state));
    return state;
  } catch (err) {
    console.error('Error saving admin state:', err);
    throw err;
  }
};

export const resetAdminState = () => {
  try {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    return initialAdminData;
  } catch (err) {
    console.error('Error resetting admin state:', err);
    return initialAdminData;
  }
};

// Student Operations
export const toggleStudentStatus = async (studentId) => {
  await new Promise((resolve) => setTimeout(resolve, 250));
  const state = getAdminState();
  const index = state.students.findIndex((s) => s.id === studentId);

  if (index !== -1) {
    const currentStatus = state.students[index].status;
    state.students[index].status = currentStatus === 'Active' ? 'Inactive' : 'Active';

    // Update active count metric
    const activeCount = state.students.filter((s) => s.status === 'Active').length;
    state.stats.activeStudents = activeCount;

    saveAdminState(state);
  }
  return state.students;
};

// Assessment Operations
export const saveAssessment = async (assessmentData) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const state = getAdminState();

  if (assessmentData.id) {
    const idx = state.assessments.findIndex((a) => a.id === assessmentData.id);
    if (idx !== -1) {
      state.assessments[idx] = { ...state.assessments[idx], ...assessmentData };
    }
  } else {
    const newAss = {
      ...assessmentData,
      id: `ASM-${String(state.assessments.length + 1).padStart(2, '0')}`,
      attempts: 0,
      avgScore: 0,
      passRate: 0,
      questions: assessmentData.questions || [],
    };
    state.assessments.unshift(newAss);
  }

  // Update assessment count stat
  state.stats.assessmentsCompleted = (state.stats.assessmentsCompleted || 3400) + 1;
  saveAdminState(state);
  return state.assessments;
};

export const deleteAssessment = async (assessmentId) => {
  await new Promise((resolve) => setTimeout(resolve, 250));
  const state = getAdminState();
  state.assessments = state.assessments.filter((a) => a.id !== assessmentId);
  saveAdminState(state);
  return state.assessments;
};

// Company Operations
export const saveCompany = async (companyData) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const state = getAdminState();

  if (companyData.id) {
    const idx = state.companies.findIndex((c) => c.id === companyData.id);
    if (idx !== -1) {
      state.companies[idx] = { ...state.companies[idx], ...companyData };
    }
  } else {
    const newComp = {
      ...companyData,
      id: `COMP-${100 + state.companies.length + 1}`,
      applicationsCount: 0,
    };
    state.companies.unshift(newComp);
  }

  saveAdminState(state);
  return state.companies;
};

export const deleteCompany = async (companyId) => {
  await new Promise((resolve) => setTimeout(resolve, 250));
  const state = getAdminState();
  state.companies = state.companies.filter((c) => c.id !== companyId);
  saveAdminState(state);
  return state.companies;
};

// Career Operations
export const saveCareer = async (careerData) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const state = getAdminState();

  if (careerData.id) {
    const idx = state.careers.findIndex((c) => c.id === careerData.id);
    if (idx !== -1) {
      state.careers[idx] = { ...state.careers[idx], ...careerData };
    }
  } else {
    const newCareer = {
      ...careerData,
      id: `CAR-${String(state.careers.length + 1).padStart(2, '0')}`,
    };
    state.careers.unshift(newCareer);
  }

  saveAdminState(state);
  return state.careers;
};

export const deleteCareer = async (careerId) => {
  await new Promise((resolve) => setTimeout(resolve, 250));
  const state = getAdminState();
  state.careers = state.careers.filter((c) => c.id !== careerId);
  saveAdminState(state);
  return state.careers;
};
