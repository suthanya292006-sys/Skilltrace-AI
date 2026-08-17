// SkillTrace AI - Authentication Service
// Manages local account storage, session persistence, credential verification, and user state.
// Designed for seamless integration with FastAPI + MongoDB REST endpoints.

const STORAGE_KEY_USERS = 'skilltrace_registered_users';
const STORAGE_KEY_SESSION = 'skilltrace_active_session';

// Pre-seeded demo accounts for instant testing & multi-user demonstration
const defaultDemoUsers = [
  {
    id: 'usr-101',
    fullName: 'Suthanya',
    email: 'suthanya@gmail.com',
    password: 'password123',
    department: 'Computer Science & Engineering',
    college: 'Institute of Engineering & Technology',
    createdAt: '2026-08-15',
    initials: 'S',
    role: 'student',
  },
  {
    id: 'usr-102',
    fullName: 'Keiko',
    email: 'keiko@gmail.com',
    password: 'password123',
    department: 'Information Technology',
    college: 'School of Technology & Innovation',
    createdAt: '2026-08-16',
    initials: 'K',
    role: 'student',
  },
  {
    id: 'usr-103',
    fullName: 'Aditi Sharma',
    email: 'aditi.sharma@college.edu',
    password: 'password123',
    department: 'Computer Science & Engineering',
    college: 'Institute of Engineering & Technology',
    createdAt: '2026-08-01',
    initials: 'AS',
    role: 'student',
  },
];

export function getInitials(name) {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function getStoredUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(defaultDemoUsers));
      return defaultDemoUsers;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading registered users from localStorage:', err);
    return defaultDemoUsers;
  }
}

export function saveStoredUsers(users) {
  try {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  } catch (err) {
    console.error('Error saving registered users to localStorage:', err);
  }
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SESSION);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading active session:', err);
    return null;
  }
}

export function saveCurrentSession(user) {
  try {
    if (!user) {
      localStorage.removeItem(STORAGE_KEY_SESSION);
    } else {
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(user));
    }
  } catch (err) {
    console.error('Error setting active session:', err);
  }
}

export async function loginUser({ email, password }) {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const trimmed = (email || '').trim();

  // Admin Account check: Username "manager" or "manager@skilltrace.ai" with password "SkillTrace@2026"
  if (
    (trimmed === 'manager' || trimmed.toLowerCase() === 'manager@skilltrace.ai') &&
    password === 'SkillTrace@2026'
  ) {
    const adminSession = {
      id: 'usr-admin-01',
      fullName: 'System Administrator',
      username: 'manager',
      email: 'manager@skilltrace.ai',
      department: 'Central Administration',
      college: 'SkillTrace AI Campus Portal',
      createdAt: '2026-01-01',
      initials: 'AD',
      role: 'admin',
      token: `demo-admin-token-${Date.now()}`,
    };
    saveCurrentSession(adminSession);
    return adminSession;
  }

  const trimmedEmail = trimmed.toLowerCase();
  const users = getStoredUsers();

  const foundUser = users.find(
    (u) => u.email.toLowerCase() === trimmedEmail || (u.username && u.username.toLowerCase() === trimmedEmail)
  );

  if (!foundUser) {
    throw new Error('No account found with this email or username. Please check your credentials.');
  }

  if (foundUser.password !== password) {
    throw new Error('Incorrect password. Please verify your credentials and try again.');
  }

  const sessionUser = {
    ...foundUser,
    initials: getInitials(foundUser.fullName),
    token: `demo-token-${foundUser.id}-${Date.now()}`,
  };

  saveCurrentSession(sessionUser);
  return sessionUser;
}

export async function loginAdmin({ username, password }) {
  await new Promise((resolve) => setTimeout(resolve, 350));
  const trimmed = (username || '').trim();

  if (
    (trimmed === 'manager' || trimmed.toLowerCase() === 'manager@skilltrace.ai') &&
    password === 'SkillTrace@2026'
  ) {
    const adminSession = {
      id: 'usr-admin-01',
      fullName: 'System Administrator',
      username: 'manager',
      email: 'manager@skilltrace.ai',
      department: 'Central Administration',
      college: 'SkillTrace AI Campus Portal',
      createdAt: '2026-01-01',
      initials: 'AD',
      role: 'admin',
      token: `demo-admin-token-${Date.now()}`,
    };
    saveCurrentSession(adminSession);
    return adminSession;
  }

  throw new Error('Invalid Admin credentials. Access denied. (Username: manager / Password required)');
}

export async function registerUser({ fullName, email, password, confirmPassword }) {
  await new Promise((resolve) => setTimeout(resolve, 450));

  const trimmedName = (fullName || '').trim();
  const trimmedEmail = (email || '').trim().toLowerCase();

  if (!trimmedName) {
    throw new Error('Full name is required.');
  }

  if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    throw new Error('Valid email address is required.');
  }

  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  if (password !== confirmPassword) {
    throw new Error('Passwords do not match. Please verify your entries.');
  }

  const users = getStoredUsers();
  const existing = users.find((u) => u.email.toLowerCase() === trimmedEmail);

  if (existing) {
    throw new Error('An account with this email already exists. Please log in instead.');
  }

  const newUser = {
    id: `usr-${Date.now()}`,
    fullName: trimmedName,
    email: trimmedEmail,
    password,
    department: 'Computer Science & Engineering',
    college: 'Institute of Engineering & Technology',
    createdAt: new Date().toISOString().split('T')[0],
    initials: getInitials(trimmedName),
    role: 'student',
  };

  users.push(newUser);
  saveStoredUsers(users);

  const sessionUser = {
    ...newUser,
    token: `demo-token-${newUser.id}-${Date.now()}`,
  };

  saveCurrentSession(sessionUser);
  return sessionUser;
}

export async function logoutUser() {
  await new Promise((resolve) => setTimeout(resolve, 150));
  saveCurrentSession(null);
}

export function updateUserProfileSession(updatedFields) {
  const current = getCurrentUser();
  if (!current) return null;

  const users = getStoredUsers();
  const idx = users.findIndex((u) => u.id === current.id || u.email === current.email);

  const merged = {
    ...current,
    ...updatedFields,
    initials: getInitials(updatedFields.fullName || current.fullName),
  };

  if (idx !== -1) {
    users[idx] = { ...users[idx], ...updatedFields };
    saveStoredUsers(users);
  }

  saveCurrentSession(merged);
  return merged;
}
