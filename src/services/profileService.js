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
function saveStoredProfile(profile) {
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
  await delay(200);
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
