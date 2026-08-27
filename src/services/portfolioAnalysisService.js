import { getStoredProfileSync, savePortfolioAnalysis } from './profileService';

function formatSystemTimestamp(date = new Date()) {
  const day = date.getDate().toString().padStart(2, '0');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const hoursStr = hours.toString().padStart(2, '0');
  return `${day} ${month} ${year}, ${hoursStr}:${minutes} ${ampm}`;
}

const delay = (ms = 700) => new Promise((resolve) => window.setTimeout(resolve, ms));

/**
 * Checks if the user has entered required inputs to run analysis.
 */
export function hasRequiredAnalysisInputs(profile) {
  if (!profile) return false;
  const hasSkills = Boolean(profile.skills && profile.skills.length > 0);
  const hasProjects = Boolean(profile.projects && profile.projects.length > 0);
  const hasCerts = Boolean(profile.certifications && profile.certifications.length > 0);
  const hasResume = Boolean(profile.resume);

  return hasSkills || hasProjects || hasCerts || hasResume;
}

/**
 * Recalculate portfolio analysis dynamically using current saved user data.
 */
export async function runPortfolioAnalysis(forceRecalculate = false) {
  await delay(800);

  const profile = getStoredProfileSync();

  // Check if required user inputs exist
  if (!hasRequiredAnalysisInputs(profile)) {
    return {
      hasRequiredInputs: false,
      message: 'No portfolio data available yet. Please add your skills, projects, certifications, or resume to generate analysis.',
    };
  }

  // If previous analysis exists and forceRecalculate is false, return saved result
  if (profile.analysisResult && !forceRecalculate) {
    return {
      hasRequiredInputs: true,
      ...profile.analysisResult,
    };
  }

  // Perform dynamic calculation on user's actual data
  const skills = profile.skills || [];
  const projects = profile.projects || [];
  const certs = profile.certifications || [];
  const resume = profile.resume;

  // 1. Calculate base metrics
  const skillCount = skills.length;
  const projCount = projects.length;
  const certCount = certs.length;
  const hasResumeScore = resume ? 20 : 0;

  // Calculate score (out of 100)
  let rawScore = Math.min(100, Math.round(
    (skillCount * 6) +
    (projCount * 15) +
    (certCount * 10) +
    hasResumeScore +
    25 // Base profile score
  ));

  if (rawScore < 30) rawScore = 35 + (skillCount + projCount) * 5;

  const overallScore = Math.min(98, rawScore);
  const confidence = Math.min(99, Math.max(75, 70 + (skillCount * 2) + (projCount * 3) + (resume ? 10 : 0)));

  let category = 'Intermediate';
  if (overallScore >= 85) category = 'Excellent';
  else if (overallScore >= 70) category = 'Advanced';
  else if (overallScore >= 50) category = 'Intermediate';
  else category = 'Needs Growth';

  // Extract all technology keywords from user skills, projects, and resume
  const keywordSet = new Set();
  skills.forEach((s) => s.name && keywordSet.add(s.name));
  projects.forEach((p) => {
    const stack = Array.isArray(p.techStack)
      ? p.techStack
      : (p.techStack || '').split(',').map((t) => t.trim());
    stack.forEach((t) => t && keywordSet.add(t));
  });
  if (resume?.parsedData?.skills) {
    resume.parsedData.skills.forEach((s) => keywordSet.add(s));
  }

  const keywordsList = Array.from(keywordSet);

  // Generate technology list with calculated progress levels
  const technologies = skills.map((s) => ({
    name: s.name,
    icon: s.name.toLowerCase().replace(/[^a-z]/g, ''),
    progress: s.level === 'Advanced' || s.level === 'Expert' ? 90 : s.level === 'Intermediate' ? 75 : 55,
    level: s.level || 'Intermediate',
  }));

  // Build strengths based on real user assets
  const strengths = [];
  if (skills.length >= 3) {
    const topSkillsStr = skills.slice(0, 3).map((s) => s.name).join(', ');
    strengths.push({
      title: 'Strong Technical Core',
      description: `Solid proficiency displayed in ${topSkillsStr}.`,
      time: 'Verified Portfolio Skill',
    });
  }
  if (projects.length >= 1) {
    strengths.push({
      title: `${projects.length} Active Project${projects.length === 1 ? '' : 's'}`,
      description: `Featured project "${projects[0].title}" demonstrates practical implementation depth.`,
      time: 'Verified Project Evidence',
    });
  }
  if (certs.length >= 1) {
    strengths.push({
      title: 'Verified Accreditations',
      description: `Holds ${certs.length} certificate(s) including "${certs[0].name || certs[0].title}".`,
      time: 'Credential Verified',
    });
  }
  if (resume) {
    strengths.push({
      title: 'Resume Evidence Uploaded',
      description: `Uploaded "${resume.fileName}" with parsed structured technical signals.`,
      time: 'Resume Analyzed',
    });
  }

  if (strengths.length === 0) {
    strengths.push({
      title: 'Initial Portfolio Registered',
      description: 'You have started building your SkillTrace profile.',
      time: 'Active Profile',
    });
  }

  // Build real weaknesses/growth areas based on user data
  const weaknesses = [];
  const hasDB = skills.some((s) => /sql|mongo|postgres|database/i.test(s.name));
  const hasCloud = skills.some((s) => /aws|docker|kubernetes|cloud|gcp/i.test(s.name));
  const hasDSA = skills.some((s) => /dsa|algo|data structure|problem solving/i.test(s.name));

  if (!hasDB) {
    weaknesses.push({
      title: 'Missing Database Skill',
      description: 'Adding PostgreSQL or MongoDB experience will strengthen your backend score.',
      time: 'Recommended Next Step',
    });
  }
  if (!hasCloud) {
    weaknesses.push({
      title: 'Low Cloud & DevOps Signal',
      description: 'Adding AWS, Docker, or CI/CD deployment pipelines would expand your readiness.',
      time: 'Recommended Next Step',
    });
  }
  if (!hasDSA) {
    weaknesses.push({
      title: 'Limited DSA Benchmark',
      description: 'Completing algorithmic assessments will increase interview matching confidence.',
      time: 'Ongoing Target',
    });
  }
  if (projects.length < 2) {
    weaknesses.push({
      title: 'Need More Projects',
      description: 'Adding at least 2 full-stack projects will boost technical depth significantly.',
      time: 'Next Milestone',
    });
  }

  if (weaknesses.length === 0) {
    weaknesses.push({
      title: 'System Design Complexity',
      description: 'Focusing on distributed microservices architecture can take your score higher.',
      time: 'Advanced Goal',
    });
  }

  // Generate actionable recommendations
  const recommendations = [
    {
      title: projCount < 2 ? 'Add one complete full-stack project' : 'Document system architecture in README',
      priority: 'High',
      time: '2 weeks',
      difficulty: 'Intermediate',
      action: 'Update Projects',
    },
    {
      title: certCount < 1 ? 'Earn an industry cloud or web certification' : 'Publish live demo URL for your flagship project',
      priority: 'Medium',
      time: '3 weeks',
      difficulty: 'Intermediate',
      action: 'Add Certificate',
    },
  ];

  // Dynamic Radar Data
  const progVal = Math.min(95, Math.max(40, skillCount * 12 + projCount * 8));
  const projVal = Math.min(95, Math.max(35, projCount * 25));
  const docVal = Math.min(95, Math.max(40, projects.some((p) => p.githubUrl || p.liveUrl) ? 85 : 50));
  const certVal = Math.min(95, Math.max(30, certCount * 30));
  const overallVal = overallScore;

  const radarData = {
    labels: ['Programming', 'Projects', 'Documentation', 'Certifications', 'Overall Fit'],
    values: [progVal, projVal, docVal, certVal, overallVal],
  };

  const barData = {
    labels: ['Resume', 'Projects', 'GitHub', 'Certificates', 'Skills'],
    values: [
      resume ? 90 : 30,
      Math.min(95, projCount * 30),
      projects.some((p) => p.githubUrl) ? 85 : 40,
      Math.min(95, certCount * 35),
      Math.min(95, skillCount * 15),
    ],
  };

  const currentTimestamp = formatSystemTimestamp(new Date());

  const result = {
    hasRequiredInputs: true,
    lastUpdated: currentTimestamp,
    overallScore,
    confidence,
    category,
    technicalDepth: {
      score: Math.min(96, Math.max(50, progVal)),
      description: `Implementation depth evaluated across ${skillCount} skills and ${projCount} project(s).`,
      status: category,
    },
    documentation: {
      score: docVal,
      description: 'Evaluation based on project descriptions, GitHub repositories, and live links.',
      status: docVal >= 75 ? 'Good' : 'Basic',
    },
    innovation: {
      score: Math.min(92, Math.max(45, projVal + 10)),
      description: 'Practical engineering patterns demonstrated across entered portfolio evidence.',
      comment: 'Your tech stack choices show clear product execution.',
    },
    readiness: {
      score: overallScore,
      description: overallScore >= 75 ? 'Ready for engineering internships and developer roles.' : 'Building foundation for junior developer roles.',
      status: overallScore >= 75 ? 'Industry Ready' : 'Developing',
    },
    keywords: keywordsList,
    technologies,
    strengths,
    weaknesses,
    recommendations,
    radarData,
    barData,
  };

  // Save calculated result for the current user
  await savePortfolioAnalysis(result);

  return result;
}

/**
 * Fetch portfolio analysis for currently logged-in user.
 */
export async function getPortfolioAnalysis() {
  return runPortfolioAnalysis(false);
}
