/**
 * Company Recommendation Service
 * Simulated async service layer structured to connect to FastAPI backend & MongoDB database.
 * 
 * Future API integrations:
 * - GET /api/v1/recommendations/companies (FastAPI ML match engine)
 * - GET /api/v1/companies/:id
 * - POST /api/v1/user/saved-companies/:id
 */

import { companiesData, studentProfile } from '../utils/companyRecommendationData';

// Helper to simulate delay
const delay = (ms = 400) => new Promise((resolve) => window.setTimeout(resolve, ms));

/**
 * Fetch recommended companies based on filters, search, and sorting.
 */
export async function getCompanyRecommendations({
  search = '',
  typeFilter = 'All',
  sortBy = 'recommended',
  savedOnly = false,
  savedIds = [],
} = {}) {
  await delay(450);

  let filtered = [...companiesData];

  // 1. Saved filter
  if (savedOnly) {
    filtered = filtered.filter((c) => savedIds.includes(c.id));
  }

  // 2. Type filter
  if (typeFilter && typeFilter !== 'All') {
    if (typeFilter === 'Remote') {
      filtered = filtered.filter(
        (c) => c.workMode === 'Remote' || c.companyType === 'Remote' || c.location.toLowerCase().includes('remote')
      );
    } else {
      filtered = filtered.filter((c) => c.companyType === typeFilter);
    }
  }

  // 3. Search query filter (matches company name, required skills, matched skills, location, or suitable roles)
  if (search.trim()) {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter((c) => {
      const matchName = c.name.toLowerCase().includes(q);
      const matchType = c.companyType.toLowerCase().includes(q);
      const matchLocation = c.location.toLowerCase().includes(q);
      const matchSkills = c.requiredSkills.some((s) => s.toLowerCase().includes(q));
      const matchRoles = c.suitableRoles.some((r) => r.toLowerCase().includes(q));
      return matchName || matchType || matchLocation || matchSkills || matchRoles;
    });
  }

  // 4. Sorting
  if (sortBy === 'recommended') {
    filtered.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return b.matchPercentage - a.matchPercentage;
    });
  } else if (sortBy === 'match') {
    filtered.sort((a, b) => b.matchPercentage - a.matchPercentage);
  } else if (sortBy === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'package') {
    filtered.sort((a, b) => b.packageValue - a.packageValue);
  }

  return {
    companies: filtered,
    totalCount: companiesData.length,
    matchedCount: filtered.length,
    studentProfile,
  };
}

/**
 * Fetch a single company's details by ID.
 */
export async function getCompanyById(id) {
  await delay(300);
  const company = companiesData.find((c) => c.id === id);
  if (!company) {
    throw new Error(`Company with ID ${id} not found.`);
  }
  return company;
}

/**
 * Get student recommendation profile context.
 */
export async function getStudentRecommendationProfile() {
  await delay(200);
  return studentProfile;
}

/**
 * Toggle saved/bookmarked company ID array in localStorage for client persistence.
 */
export function getSavedCompanyIds() {
  try {
    const stored = localStorage.getItem('skilltrace_saved_companies');
    if (stored) return JSON.parse(stored);
  } catch (err) {
    console.error('Failed to parse saved companies from localStorage', err);
  }
  // Default pre-saved companies for realistic demo experience
  return ['comp-1', 'comp-2'];
}

export function saveCompanyIdsToStorage(ids) {
  try {
    localStorage.setItem('skilltrace_saved_companies', JSON.stringify(ids));
  } catch (err) {
    console.error('Failed to save companies to localStorage', err);
  }
}
