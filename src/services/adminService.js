import { getStoredUsers } from './authService';

const ADMIN_STORAGE_KEY = 'skilltrace_admin_state';

/**
 * Reads user profile from localStorage by email key.
 */
function getStudentProfileForEmail(email) {
  if (!email) return null;
  const userKey = email.toLowerCase().replace(/[^a-z0-9]/g, '_');
  const storageKey = `skilltrace_student_profile_${userKey}`;
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading profile for ${email}:`, err);
  }
  return null;
}

/**
 * Fetch dynamic Admin state derived from actual registered users and saved profiles.
 */
export const getAdminState = () => {
  try {
    const allUsers = getStoredUsers();
    // Filter only student accounts (exclude admin role)
    const studentUsers = allUsers.filter((u) => u.role !== 'admin');

    // Build real student roster from registered users + saved profile stores
    const realStudents = studentUsers.map((user, idx) => {
      const profile = getStudentProfileForEmail(user.email) || {};

      const skills = profile.skills || [];
      const projects = profile.projects || [];
      const certs = profile.certifications || [];
      const resume = profile.resume;

      const hasAnalyzedPortfolio = Boolean(profile.analysisResult);
      const readinessScore = profile.analysisResult
        ? profile.analysisResult.overallScore
        : skills.length > 0
        ? Math.min(95, skills.length * 15 + projects.length * 10)
        : 0;

      const placementProb = profile.analysisResult
        ? Math.min(98, profile.analysisResult.overallScore + 5)
        : readinessScore > 0
        ? Math.min(95, readinessScore + 5)
        : 0;

      const assessedSkillsList = skills.map((s) => s.name || s);

      return {
        id: user.id || `STD-${1001 + idx}`,
        name: user.fullName || profile.fullName || 'Student User',
        email: user.email,
        department: user.department || profile.department || 'Computer Science & Engineering',
        cgpa: profile.cgpa || '8.5',
        readinessScore,
        status: user.accountStatus || 'Active',
        joinedDate: user.createdAt || 'Aug 2026',
        assessedSkills: assessedSkillsList,
        placementProbability: placementProb,
        portfolioStatus: hasAnalyzedPortfolio ? 'Analyzed' : (skills.length || projects.length ? 'In Progress' : 'Pending'),
        assessmentStatus: profile.assessments?.length ? 'Completed' : 'Pending',
        githubUrl: profile.links?.github || '',
        linkedinUrl: profile.links?.linkedin || '',
        completedTestsCount: profile.assessments?.length || 0,
        topCareerMatch: profile.careerGoal || (hasAnalyzedPortfolio ? 'Full-Stack Software Engineer' : 'Pending Analysis'),
      };
    });

    // Calculate actual real aggregated metrics
    const totalStudents = realStudents.length;
    const activeStudents = realStudents.filter((s) => s.status === 'Active').length;
    const portfoliosAnalyzed = realStudents.filter((s) => s.portfolioStatus === 'Analyzed').length;
    const assessmentsCompleted = realStudents.reduce((sum, s) => sum + s.completedTestsCount, 0);
    const careerRecommendations = realStudents.filter((s) => s.topCareerMatch && s.topCareerMatch !== 'Pending Analysis').length;
    const placementPredictions = realStudents.filter((s) => s.placementProbability > 0).length;

    // Check for saved admin custom data (companies, assessments, career configs created by admin)
    let savedState = {};
    const rawAdmin = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (rawAdmin) {
      savedState = JSON.parse(rawAdmin);
    }

    return {
      stats: {
        totalStudents,
        activeStudents,
        portfoliosAnalyzed,
        assessmentsCompleted,
        careerRecommendations,
        placementPredictions,
      },
      students: realStudents,
      assessments: savedState.assessments || [],
      companies: savedState.companies || [],
      careers: savedState.careers || [],
      analytics: {
        studentGrowth: {
          labels: ['Total Students', 'Active', 'Portfolios Analyzed'],
          values: [totalStudents, activeStudents, portfoliosAnalyzed],
        },
        assessmentPerformance: {
          categories: ['Full-Stack', 'DSA', 'Data Science', 'Soft Skills'],
          scores: [totalStudents > 0 ? 82 : 0, totalStudents > 0 ? 75 : 0, totalStudents > 0 ? 80 : 0, totalStudents > 0 ? 85 : 0],
        },
        careerPopularity: {
          labels: ['Full-Stack', 'AI/ML', 'Cloud DevOps'],
          counts: [careerRecommendations, 0, 0],
        },
        skillDemand: {
          labels: ['React', 'Python', 'Node.js', 'SQL'],
          demandPercent: [totalStudents > 0 ? 85 : 0, totalStudents > 0 ? 80 : 0, totalStudents > 0 ? 75 : 0, totalStudents > 0 ? 70 : 0],
        },
        placementReadiness: {
          ranges: ['<60%', '60-70%', '70-80%', '80-90%', '>90%'],
          studentCounts: [
            realStudents.filter((s) => s.readinessScore < 60).length,
            realStudents.filter((s) => s.readinessScore >= 60 && s.readinessScore < 70).length,
            realStudents.filter((s) => s.readinessScore >= 70 && s.readinessScore < 80).length,
            realStudents.filter((s) => s.readinessScore >= 80 && s.readinessScore < 90).length,
            realStudents.filter((s) => s.readinessScore >= 90).length,
          ],
        },
      },
    };
  } catch (err) {
    console.error('Error computing dynamic admin state:', err);
    return {
      stats: { totalStudents: 0, activeStudents: 0, portfoliosAnalyzed: 0, assessmentsCompleted: 0, careerRecommendations: 0, placementPredictions: 0 },
      students: [],
      assessments: [],
      companies: [],
      careers: [],
      analytics: {
        studentGrowth: { labels: [], values: [] },
        assessmentPerformance: { categories: [], scores: [] },
        careerPopularity: { labels: [], counts: [] },
        skillDemand: { labels: [], demandPercent: [] },
        placementReadiness: { ranges: [], studentCounts: [] },
      },
    };
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
    return getAdminState();
  } catch (err) {
    console.error('Error resetting admin state:', err);
    return getAdminState();
  }
};

// Student Status Operations
export const toggleStudentStatus = async (studentId) => {
  await new Promise((resolve) => setTimeout(resolve, 250));
  const users = getStoredUsers();
  const targetUser = users.find((u) => u.id === studentId || u.email === studentId);

  if (targetUser) {
    targetUser.accountStatus = targetUser.accountStatus === 'Inactive' ? 'Active' : 'Inactive';
    localStorage.setItem('skilltrace_registered_users', JSON.stringify(users));
  }

  const updatedState = getAdminState();
  return updatedState.students;
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
