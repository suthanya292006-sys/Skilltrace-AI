// Settings service for managing user preferences and application settings
// Stores settings in localStorage with seamless backend integration capability

const SETTINGS_STORAGE_KEY = 'skilltrace_user_settings';

const defaultSettings = {
  account: {
    fullName: 'Aditi Sharma',
    email: 'aditi.sharma@institution.edu',
    phone: '+91 98765 43210',
    department: 'Computer Science & Engineering',
    bio: 'Passionate CS undergrad specializing in Full Stack Web Development and AI/ML algorithms.',
    emailPreferences: {
      marketing: false,
      weeklyDigest: true,
      productUpdates: true,
    },
  },
  notifications: {
    assessmentReminders: true,
    assessmentResults: true,
    newAssessments: true,
    careerMatches: true,
    marketTrends: false,
    interviewAlerts: true,
    companyEligibility: true,
    placementPredictionUpdates: true,
    securityAlerts: true,
    systemUpdates: false,
    emailNotificationsMaster: true,
  },
  appearance: {
    theme: 'light', // 'light' | 'dark'
    density: 'comfortable', // 'comfortable' | 'compact'
  },
  privacy: {
    profileVisibility: 'public', // 'public' | 'recruiters' | 'private'
    aiIndexing: true,
    anonymousPlacementStats: true,
    searchEngineIndexing: false,
  },
  application: {
    language: 'en', // 'en' | 'hi' | 'es' | 'fr' | 'de'
    autoSave: true,
  },
  activeSessions: [
    {
      id: 'sess-1',
      device: 'Chrome on Windows 11',
      location: 'Bengaluru, India',
      ip: '103.24.12.89',
      lastActive: 'Active Now',
      isCurrent: true,
    },
    {
      id: 'sess-2',
      device: 'Safari on iPhone 15 Pro',
      location: 'Bengaluru, India',
      ip: '49.37.102.14',
      lastActive: '2 hours ago',
      isCurrent: false,
    },
    {
      id: 'sess-3',
      device: 'Firefox on macOS Sonoma',
      location: 'New Delhi, India',
      ip: '115.240.88.19',
      lastActive: '3 days ago',
      isCurrent: false,
    },
  ],
};

export const getStoredSettings = () => {
  try {
    const data = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!data) return defaultSettings;
    return { ...defaultSettings, ...JSON.parse(data) };
  } catch (err) {
    console.error('Error loading settings from localStorage:', err);
    return defaultSettings;
  }
};

export const saveUserSettings = (updatedSettings) => {
  try {
    const current = getStoredSettings();
    const merged = { ...current, ...updatedSettings };
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(merged));
    return merged;
  } catch (err) {
    console.error('Error saving settings to localStorage:', err);
    throw err;
  }
};

export const updateAccountInfo = async (accountData) => {
  const settings = getStoredSettings();
  settings.account = { ...settings.account, ...accountData };
  return saveUserSettings(settings);
};

export const updatePassword = async ({ currentPassword, newPassword }) => {
  if (!currentPassword) {
    throw new Error('Current password is required.');
  }
  if (newPassword.length < 8) {
    throw new Error('New password must be at least 8 characters long.');
  }
  return { success: true, message: 'Password updated successfully!' };
};

export const updateNotificationSettings = async (notificationsData) => {
  const settings = getStoredSettings();
  settings.notifications = { ...settings.notifications, ...notificationsData };
  return saveUserSettings(settings);
};

export const updateAppearanceSettings = async (appearanceData) => {
  const settings = getStoredSettings();
  settings.appearance = { ...settings.appearance, ...appearanceData };
  return saveUserSettings(settings);
};

export const updatePrivacySettings = async (privacyData) => {
  const settings = getStoredSettings();
  settings.privacy = { ...settings.privacy, ...privacyData };
  return saveUserSettings(settings);
};

export const updateApplicationSettings = async (appData) => {
  const settings = getStoredSettings();
  settings.application = { ...settings.application, ...appData };
  return saveUserSettings(settings);
};

export const terminateOtherSessions = async () => {
  const settings = getStoredSettings();
  settings.activeSessions = settings.activeSessions.filter((s) => s.isCurrent);
  saveUserSettings(settings);
  return settings.activeSessions;
};

export const resetAllSettings = async () => {
  localStorage.removeItem(SETTINGS_STORAGE_KEY);
  return defaultSettings;
};
