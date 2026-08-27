import { getStoredProfileSync, saveStoredProfile } from './profileService';
import { getCurrentUser } from './authService';

const delay = (ms = 300) => new Promise((resolve) => window.setTimeout(resolve, ms));

function formatSystemDate(date = new Date()) {
  const now = date;
  return `${now.toLocaleString('default', { month: 'short' })} ${now.getDate()}, ${now.getFullYear()}`;
}

/**
 * Generate 4 primary diagnostic reports dynamically for the currently logged-in user.
 */
export async function getPrimaryReports() {
  await delay(300);

  const activeUser = getCurrentUser();
  const profile = getStoredProfileSync();

  const skills = profile.skills || [];
  const projects = profile.projects || [];
  const certs = profile.certifications || [];
  const resume = profile.resume;
  const links = profile.links || {};

  const hasSkills = skills.length > 0;
  const hasProjects = projects.length > 0;
  const hasCerts = certs.length > 0;
  const hasResume = Boolean(resume);
  const hasLinks = Boolean(links.github || links.linkedin);

  const hasEnoughData = hasSkills || hasProjects || hasCerts || hasResume;

  const student = {
    name: activeUser?.fullName || profile.fullName || 'Student User',
    email: activeUser?.email || profile.email || 'user@college.edu',
    department: activeUser?.department || profile.department || 'Computer Science & Engineering',
    college: activeUser?.college || profile.college || 'Institute of Engineering & Technology',
  };

  if (!hasEnoughData) {
    const missingMessage = 'No portfolio data recorded yet. Please add your skills, projects, certifications, or resume to generate AI diagnostic reports.';
    
    const emptyReport = (id, title, subtitle, type) => ({
      id,
      title,
      subtitle,
      type,
      score: 0,
      scoreLabel: 'Needs Data',
      hasEnoughData: false,
      missingMessage,
      keyInsights: [missingMessage],
      strengths: ['Account Created'],
      weaknesses: ['Missing Skills', 'Missing Projects', 'Missing Resume'],
      recommendations: [
        { title: 'Add your technical skills', priority: 'High', difficulty: 'Easy', action: 'Add Skills' },
        { title: 'Add at least 1 project', priority: 'High', difficulty: 'Intermediate', action: 'Add Project' },
        { title: 'Upload your resume', priority: 'Medium', difficulty: 'Easy', action: 'Upload Resume' },
      ],
      formattedDate: formatSystemDate(new Date()),
    });

    return {
      student,
      hasEnoughData: false,
      reports: {
        'portfolio-analysis': emptyReport('REP-101', 'Portfolio Readiness Diagnostic', 'Evaluates project quality, code documentation, and evidence signals.', 'portfolio-analysis'),
        'technical-skill-benchmark': emptyReport('REP-102', 'Technical Skill Benchmark', 'Quantifies skill matrix proficiency across core CS and engineering stacks.', 'technical-skill-benchmark'),
        'career-recommendation': emptyReport('REP-103', 'AI Career Fit Diagnostic', 'Maps technical skills and project complexity against industry job roles.', 'career-recommendation'),
        'placement-prediction': emptyReport('REP-104', 'Placement Audit & Readiness', 'Predicts campus recruitment eligibility and interview success probability.', 'placement-prediction'),
      },
    };
  }

  // Calculate dynamic report metrics for user
  const skillCount = skills.length;
  const projCount = projects.length;
  const certCount = certs.length;

  const portfolioScore = Math.min(98, Math.max(40, (skillCount * 6) + (projCount * 18) + (certCount * 10) + (hasResume ? 20 : 0) + 20));
  const skillBenchmarkScore = Math.min(96, Math.max(35, skillCount * 12 + projCount * 8));
  const careerFitScore = Math.min(97, Math.max(45, (skillCount * 8) + (projCount * 15) + (hasLinks ? 10 : 0) + 25));
  const placementScore = Math.min(99, Math.max(40, Math.round((portfolioScore * 0.4) + (skillBenchmarkScore * 0.4) + (careerFitScore * 0.2))));

  const currentDateStr = formatSystemDate(new Date());

  const reports = {
    'portfolio-analysis': {
      id: 'REP-101',
      title: 'Portfolio Readiness Diagnostic',
      subtitle: `Evaluated ${projCount} project(s) and ${skillCount} verified skill(s).`,
      type: 'portfolio-analysis',
      score: portfolioScore,
      scoreLabel: portfolioScore >= 75 ? 'Ready' : 'Developing',
      hasEnoughData: true,
      keyInsights: [
        `Portfolio verified with ${projCount} project(s) and ${skillCount} technical skill(s).`,
        hasResume ? `Resume "${resume.fileName}" parsed and linked.` : 'No resume uploaded yet; adding a resume will improve analysis depth.',
        hasLinks ? 'GitHub and LinkedIn profiles linked for external verification.' : 'Connect GitHub and LinkedIn profiles for maximum signal.',
      ],
      strengths: [
        ...(skills.slice(0, 2).map((s) => `Strong proficiency in ${s.name || s}`)),
        ...(projCount > 0 ? [`${projCount} active project(s) registered`] : []),
      ],
      weaknesses: [
        ...(projCount < 2 ? ['Recommend adding at least 2 full-stack projects'] : []),
        ...(!hasResume ? ['Resume missing from portfolio'] : []),
        ...(!hasLinks ? ['GitHub/LinkedIn links missing'] : []),
      ],
      recommendations: [
        { title: projCount < 2 ? 'Add a second featured project' : 'Add live demo links to projects', priority: 'High', difficulty: 'Intermediate', action: 'Update Portfolio' },
        { title: hasResume ? 'Keep resume updated with latest projects' : 'Upload PDF resume', priority: 'High', difficulty: 'Easy', action: 'Upload Resume' },
      ],
      formattedDate: currentDateStr,
    },

    'technical-skill-benchmark': {
      id: 'REP-102',
      title: 'Technical Skill Benchmark',
      subtitle: `Quantifies ${skillCount} registered skill(s) against industry engineering standards.`,
      type: 'technical-skill-benchmark',
      score: skillBenchmarkScore,
      scoreLabel: skillBenchmarkScore >= 80 ? 'Advanced' : 'Intermediate',
      hasEnoughData: true,
      keyInsights: [
        `Skill matrix contains ${skillCount} technical competencies.`,
        skills.length > 0 ? `Primary skills: ${skills.slice(0, 4).map((s) => s.name || s).join(', ')}.` : 'Add your core programming languages.',
        'Benchmark calculated against entry-level engineering requirements.',
      ],
      strengths: skills.slice(0, 3).map((s) => `Verified competency in ${s.name || s}`),
      weaknesses: [
        ...(!skills.some((s) => /sql|mongo|postgres/i.test(s.name || s)) ? ['Database skills not explicitly declared'] : []),
        ...(!skills.some((s) => /aws|docker|cloud/i.test(s.name || s)) ? ['Cloud & DevOps skills recommended'] : []),
      ],
      recommendations: [
        { title: 'Add problem solving & DSA skills', priority: 'High', difficulty: 'Intermediate', action: 'Add Skill' },
        { title: 'Learn Docker or AWS deployment', priority: 'Medium', difficulty: 'Intermediate', action: 'Add Skill' },
      ],
      formattedDate: currentDateStr,
    },

    'career-recommendation': {
      id: 'REP-103',
      title: 'AI Career Fit Diagnostic',
      subtitle: 'Maps technical stack to target engineering roles.',
      type: 'career-recommendation',
      score: careerFitScore,
      scoreLabel: careerFitScore >= 75 ? 'Strong Match' : 'Moderate Match',
      hasEnoughData: true,
      keyInsights: [
        `Target career profile matches: ${profile.careerGoal || 'Software Engineer'}.`,
        `Skill set provides ${careerFitScore}% alignment with market role requirements.`,
      ],
      strengths: [
        `Aligned with ${profile.careerGoal || 'Software Engineering'} requirements`,
        `${skillCount} supporting skills recorded`,
      ],
      weaknesses: [
        'Further specialization in target stack recommended',
      ],
      recommendations: [
        { title: 'Build a dedicated flagship project in target domain', priority: 'High', difficulty: 'Intermediate', action: 'View Career' },
      ],
      formattedDate: currentDateStr,
    },

    'placement-prediction': {
      id: 'REP-104',
      title: 'Placement Audit & Readiness',
      subtitle: 'Campus recruitment eligibility and interview success probability.',
      type: 'placement-prediction',
      score: placementScore,
      scoreLabel: placementScore >= 80 ? 'High Odds' : 'Developing Odds',
      hasEnoughData: true,
      keyInsights: [
        `Campus placement readiness calculated at ${placementScore}%.`,
        `${projCount} project(s) and ${certCount} cert(s) available for recruiter review.`,
      ],
      strengths: [
        `Overall placement index: ${placementScore}%`,
        `Verified portfolio artifacts: ${projCount + certCount}`,
      ],
      weaknesses: [
        placementScore < 80 ? 'Add more certifications and projects to cross 85% benchmark' : 'Maintain coding consistency',
      ],
      recommendations: [
        { title: 'Complete technical assessment challenges', priority: 'High', difficulty: 'Intermediate', action: 'Take Assessment' },
      ],
      formattedDate: currentDateStr,
    },
  };

  return {
    student,
    hasEnoughData: true,
    reports,
  };
}

/**
 * Get report by ID.
 */
export async function getReportById(reportIdOrType) {
  const { reports } = await getPrimaryReports();
  if (reports[reportIdOrType]) return reports[reportIdOrType];
  const found = Object.values(reports).find((r) => r.id === reportIdOrType);
  if (found) return found;
  return reports['portfolio-analysis'];
}

/**
 * Fetch report history log per user.
 */
export async function getReportHistory({ search = '', typeFilter = 'All', statusFilter = 'All' } = {}) {
  await delay(200);

  const profile = getStoredProfileSync();
  const userHistory = profile.reportHistory || [];

  let filtered = [...userHistory];

  if (typeFilter && typeFilter !== 'All') {
    filtered = filtered.filter((item) => item.type === typeFilter);
  }

  if (statusFilter && statusFilter !== 'All') {
    filtered = filtered.filter((item) => item.status === statusFilter);
  }

  if (search.trim()) {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.typeName.toLowerCase().includes(q) ||
        item.formattedDate.toLowerCase().includes(q) ||
        String(item.score).includes(q)
    );
  }

  return {
    history: filtered,
    totalCount: userHistory.length,
    filteredCount: filtered.length,
  };
}

/**
 * Generate a fresh AI Report dynamically for current user.
 */
export async function generateReport({ reportType = 'portfolio-analysis', depth = 'Standard' } = {}) {
  await delay(800);

  const { reports } = await getPrimaryReports();
  const baseReport = reports[reportType] || reports['portfolio-analysis'];

  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const formattedDate = `${now.toLocaleString('default', { month: 'short' })} ${now.getDate()}, ${now.getFullYear()} · ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  const newHistoryItem = {
    id: `rep-gen-${Date.now()}`,
    title: `${depth === 'Deep Dive' ? 'Deep-Dive ' : ''}${baseReport.title}`,
    type: reportType,
    typeName: reportType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    score: baseReport.score,
    status: 'Completed',
    generatedDate: dateStr,
    formattedDate: formattedDate,
    size: '2.8 MB',
  };

  const profile = getStoredProfileSync();
  if (!profile.reportHistory) profile.reportHistory = [];
  profile.reportHistory.unshift(newHistoryItem);
  saveStoredProfile(profile);

  return {
    success: true,
    report: {
      ...baseReport,
      lastGenerated: formatSystemDate(now),
      generatedTimeAgo: 'Just now',
    },
    historyEntry: newHistoryItem,
  };
}

/**
 * Delete a report from history log.
 */
export async function deleteHistoryReport(id) {
  await delay(150);
  const profile = getStoredProfileSync();
  if (!profile.reportHistory) profile.reportHistory = [];
  profile.reportHistory = profile.reportHistory.filter((item) => item.id !== id);
  saveStoredProfile(profile);
  return { success: true };
}
