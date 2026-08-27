/**
 * SkillTrace AI - Student Profile Service
 * Dynamic user profile store with multi-user isolation & LocalStorage persistence.
 * Structured for future FastAPI + MongoDB REST backend integration.
 */

import { initialStudentProfile, calculateProfileCompletion } from '../utils/profileData';
import { getCurrentUser, getInitials } from './authService';

const getStorageKey = () => {
  const user = getCurrentUser();
  const userKey = user?.email ? user.email.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'default';
  return `skilltrace_student_profile_${userKey}`;
};

const delay = (ms = 250) => new Promise((resolve) => window.setTimeout(resolve, ms));

/**
 * Helper to get persisted profile from localStorage or create dynamically for logged-in user.
 */
function getStoredProfile() {
  const user = getCurrentUser();
  const key = getStorageKey();

  try {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
  } catch (err) {
    console.error('Failed to parse student profile from localStorage:', err);
  }

  // Create personalized profile template if no stored profile exists for this user
  const personalized = {
    ...initialStudentProfile,
    id: user?.id || `stu-${Date.now()}`,
    fullName: user?.fullName || 'Suthanya',
    email: user?.email || 'suthanya@gmail.com',
    initials: user?.initials || getInitials(user?.fullName || 'Suthanya'),
    department: user?.department || 'Computer Science & Engineering',
    college: user?.college || 'Institute of Engineering & Technology',
    createdAt: user?.createdAt || 'Aug 2026',
  };

  saveStoredProfile(personalized);
  return personalized;
}

/**
 * Helper to save profile to localStorage.
 */
export function saveStoredProfile(profile) {
  try {
    const key = getStorageKey();
    localStorage.setItem(key, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save student profile to localStorage:', err);
  }
}

/**
 * Fetch student profile.
 */
export async function getStudentProfile() {
  await delay(200);
  const profile = getStoredProfile();
  const completion = calculateProfileCompletion(profile);
  return {
    profile,
    completion,
  };
}

/**
 * Update student profile fields.
 */
export async function updateStudentProfile(updatedFields) {
  await delay(300);
  const current = getStoredProfile();
  const updated = {
    ...current,
    ...updatedFields,
    links: {
      ...current.links,
      ...(updatedFields.links || {}),
    },
  };

  saveStoredProfile(updated);
  const completion = calculateProfileCompletion(updated);

  return {
    success: true,
    profile: updated,
    completion,
  };
}

/**
 * Add a new technical skill.
 */
export async function addStudentSkill(skillObj) {
  await delay(200);
  const profile = getStoredProfile();
  const exists = profile.skills.some((s) => s.name.toLowerCase() === skillObj.name.toLowerCase());

  if (!exists) {
    profile.skills.push(skillObj);
    saveStoredProfile(profile);
  }

  return {
    success: true,
    skills: profile.skills,
    completion: calculateProfileCompletion(profile),
  };
}

/**
 * Remove a technical skill.
 */
export async function removeStudentSkill(skillName) {
  await delay(150);
  const profile = getStoredProfile();
  profile.skills = profile.skills.filter((s) => s.name !== skillName);
  saveStoredProfile(profile);

  return {
    success: true,
    skills: profile.skills,
    completion: calculateProfileCompletion(profile),
  };
}

/**
 * Add a new project.
 */
export async function addStudentProject(projectObj) {
  await delay(250);
  const profile = getStoredProfile();
  if (!profile.projects) profile.projects = [];
  const newProject = {
    id: `proj-${Date.now()}`,
    title: projectObj.title || '',
    description: projectObj.description || '',
    techStack: projectObj.techStack || '',
    githubUrl: projectObj.githubUrl || projectObj.githubLink || projectObj.link || '',
    liveUrl: projectObj.liveUrl || projectObj.liveDemoLink || '',
    image: projectObj.image || projectObj.projectImage || '',
    createdAt: new Date().toISOString(),
  };
  profile.projects.unshift(newProject);
  saveStoredProfile(profile);

  return {
    success: true,
    projects: profile.projects,
    completion: calculateProfileCompletion(profile),
  };
}

/**
 * Update an existing project.
 */
export async function updateStudentProject(projectId, updatedFields) {
  await delay(250);
  const profile = getStoredProfile();
  if (!profile.projects) profile.projects = [];
  const idx = profile.projects.findIndex((p) => p.id === projectId);
  if (idx !== -1) {
    profile.projects[idx] = {
      ...profile.projects[idx],
      ...updatedFields,
      githubUrl: updatedFields.githubUrl || updatedFields.githubLink || updatedFields.link || profile.projects[idx].githubUrl,
      liveUrl: updatedFields.liveUrl || updatedFields.liveDemoLink || profile.projects[idx].liveUrl,
      image: updatedFields.image || updatedFields.projectImage || profile.projects[idx].image,
    };
    saveStoredProfile(profile);
  }

  return {
    success: true,
    projects: profile.projects,
    completion: calculateProfileCompletion(profile),
  };
}

/**
 * Delete a project.
 */
export async function deleteStudentProject(projectId) {
  await delay(150);
  const profile = getStoredProfile();
  if (!profile.projects) profile.projects = [];
  profile.projects = profile.projects.filter((p) => p.id !== projectId);
  saveStoredProfile(profile);

  return {
    success: true,
    projects: profile.projects,
    completion: calculateProfileCompletion(profile),
  };
}

/**
 * Add a new certification.
 */
export async function addStudentCertification(certObj) {
  await delay(200);
  const profile = getStoredProfile();
  if (!profile.certifications) profile.certifications = [];
  const newCert = {
    id: `cert-${Date.now()}`,
    name: certObj.name || certObj.title || '',
    title: certObj.name || certObj.title || '',
    issuer: certObj.issuer || certObj.organization || '',
    organization: certObj.issuer || certObj.organization || '',
    issueDate: certObj.issueDate || certObj.year || '',
    year: certObj.issueDate || certObj.year || '',
    credentialId: certObj.credentialId || '',
    credentialLink: certObj.credentialLink || certObj.verificationUrl || '',
    verificationUrl: certObj.credentialLink || certObj.verificationUrl || '',
    fileUrl: certObj.fileUrl || certObj.certificateFile || '',
    createdAt: new Date().toISOString(),
  };
  profile.certifications.unshift(newCert);
  saveStoredProfile(profile);

  return {
    success: true,
    certifications: profile.certifications,
    completion: calculateProfileCompletion(profile),
  };
}

/**
 * Update an existing certification.
 */
export async function updateStudentCertification(certId, updatedFields) {
  await delay(200);
  const profile = getStoredProfile();
  if (!profile.certifications) profile.certifications = [];
  const idx = profile.certifications.findIndex((c) => c.id === certId);
  if (idx !== -1) {
    profile.certifications[idx] = {
      ...profile.certifications[idx],
      ...updatedFields,
      name: updatedFields.name || updatedFields.title || profile.certifications[idx].name,
      title: updatedFields.name || updatedFields.title || profile.certifications[idx].title,
      issuer: updatedFields.issuer || updatedFields.organization || profile.certifications[idx].issuer,
      organization: updatedFields.issuer || updatedFields.organization || profile.certifications[idx].organization,
      issueDate: updatedFields.issueDate || updatedFields.year || profile.certifications[idx].issueDate,
      year: updatedFields.issueDate || updatedFields.year || profile.certifications[idx].year,
      credentialId: updatedFields.credentialId !== undefined ? updatedFields.credentialId : profile.certifications[idx].credentialId,
      credentialLink: updatedFields.credentialLink || updatedFields.verificationUrl || profile.certifications[idx].credentialLink,
      verificationUrl: updatedFields.credentialLink || updatedFields.verificationUrl || profile.certifications[idx].verificationUrl,
      fileUrl: updatedFields.fileUrl || updatedFields.certificateFile || profile.certifications[idx].fileUrl,
    };
    saveStoredProfile(profile);
  }

  return {
    success: true,
    certifications: profile.certifications,
    completion: calculateProfileCompletion(profile),
  };
}

/**
 * Delete a certification.
 */
export async function deleteStudentCertification(certId) {
  await delay(150);
  const profile = getStoredProfile();
  if (!profile.certifications) profile.certifications = [];
  profile.certifications = profile.certifications.filter((c) => c.id !== certId);
  saveStoredProfile(profile);

  return {
    success: true,
    certifications: profile.certifications,
    completion: calculateProfileCompletion(profile),
  };
}

/**
 * Save resume details for current user.
 */
export async function saveStudentResume(resumeObj) {
  await delay(200);
  const profile = getStoredProfile();
  profile.resume = resumeObj;
  saveStoredProfile(profile);
  return { success: true, profile };
}

/**
 * Remove stored resume.
 */
export async function removeStudentResume() {
  await delay(150);
  const profile = getStoredProfile();
  profile.resume = null;
  saveStoredProfile(profile);
  return { success: true, profile };
}

/**
 * Save computed portfolio analysis result.
 */
export async function savePortfolioAnalysis(analysisData) {
  const profile = getStoredProfile();
  profile.analysisResult = analysisData;
  saveStoredProfile(profile);
  return analysisData;
}

/**
 * Synchronous profile fetch helper.
 */
export function getStoredProfileSync() {
  return getStoredProfile();
}

