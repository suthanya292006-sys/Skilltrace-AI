/**
 * SkillTrace AI - Student Profile Service
 * Async service layer structured for future FastAPI + MongoDB REST backend integration.
 * 
 * Future REST Endpoints:
 * - GET /api/v1/users/me (Fetch active student profile)
 * - PUT /api/v1/users/me (Update profile fields)
 * - POST /api/v1/users/me/skills (Add technical skill)
 * - DELETE /api/v1/users/me/skills/:name (Remove technical skill)
 * - POST /api/v1/users/me/projects (Add portfolio project)
 * - POST /api/v1/users/me/certifications (Add certification)
 */

import { initialStudentProfile, calculateProfileCompletion } from '../utils/profileData';

const STORAGE_KEY = 'skilltrace_student_profile';

const delay = (ms = 350) => new Promise((resolve) => window.setTimeout(resolve, ms));

/**
 * Helper to get persisted profile from localStorage or initialize with initialStudentProfile.
 */
function getStoredProfile() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (err) {
    console.error('Failed to parse student profile from localStorage:', err);
  }
  return initialStudentProfile;
}

/**
 * Helper to save profile to localStorage.
 */
function saveStoredProfile(profile) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save student profile to localStorage:', err);
  }
}

/**
 * Fetch student profile.
 */
export async function getStudentProfile() {
  await delay(300);
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
  await delay(400);
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
  await delay(250);
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
  await delay(200);
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
  await delay(350);
  const profile = getStoredProfile();
  const newProject = {
    id: `proj-${Date.now()}`,
    ...projectObj,
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
 * Add a new certification.
 */
export async function addStudentCertification(certObj) {
  await delay(300);
  const profile = getStoredProfile();
  const newCert = {
    id: `cert-${Date.now()}`,
    ...certObj,
  };
  profile.certifications.unshift(newCert);
  saveStoredProfile(profile);

  return {
    success: true,
    certifications: profile.certifications,
    completion: calculateProfileCompletion(profile),
  };
}
