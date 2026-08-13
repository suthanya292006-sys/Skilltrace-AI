/**
 * SkillTrace AI - Module 13 Notification Data Store
 * Realistic notification items across 6 categories:
 * 1. AI Analysis
 * 2. Assessment
 * 3. Career Recommendation
 * 4. Placement
 * 5. Profile
 * 6. System
 */

export const notificationCategories = [
  { id: 'All', label: 'All Notifications' },
  { id: 'AI Analysis', label: 'AI Analysis', color: '#0F9D8C' },
  { id: 'Assessment', label: 'Assessment', color: '#3B82F6' },
  { id: 'Career Recommendation', label: 'Career Recommendation', color: '#8B5CF6' },
  { id: 'Placement', label: 'Placement', color: '#F5A623' },
  { id: 'Profile', label: 'Profile', color: '#E4572E' },
  { id: 'System', label: 'System', color: '#667085' },
];

export const initialNotifications = [
  {
    id: 'notif-101',
    category: 'AI Analysis',
    title: 'Portfolio Analysis Completed',
    description: 'Your portfolio analysis is ready to view. Your overall readiness score is 87/100.',
    timestamp: '10 minutes ago',
    date: '2026-08-12T19:50:00Z',
    read: false,
    actionUrl: '/dashboard/portfolio-analysis',
    actionText: 'View Analysis',
  },
  {
    id: 'notif-102',
    category: 'Career Recommendation',
    title: 'New Career Recommendation',
    description: 'Your profile matches a Machine Learning Engineer & Full Stack Developer career path with 94% compatibility.',
    timestamp: '1 hour ago',
    date: '2026-08-12T19:00:00Z',
    read: false,
    actionUrl: '/career',
    actionText: 'Explore Roles',
  },
  {
    id: 'notif-103',
    category: 'Assessment',
    title: 'Assessment Result Available',
    description: 'Your latest technical assessment in React & Node.js has been evaluated. Score: 91/100.',
    timestamp: '3 hours ago',
    date: '2026-08-12T17:00:00Z',
    read: false,
    actionUrl: '/assessment',
    actionText: 'View Scorecard',
  },
  {
    id: 'notif-104',
    category: 'Placement',
    title: 'Placement Probability Updated',
    description: 'Your placement probability for Tier-1 product tech companies increased by 4% following your recent project additions.',
    timestamp: 'Yesterday',
    date: '2026-08-11T14:30:00Z',
    read: true,
    actionUrl: '/placement',
    actionText: 'View Predictor',
  },
  {
    id: 'notif-105',
    category: 'Profile',
    title: 'Profile Completion Tip',
    description: 'Add 1 more live project URL and AWS certification to achieve a 100% complete SkillTrace profile.',
    timestamp: '2 days ago',
    date: '2026-08-10T11:15:00Z',
    read: true,
    actionUrl: '/profile',
    actionText: 'Update Profile',
  },
  {
    id: 'notif-106',
    category: 'System',
    title: 'System Maintenance Scheduled',
    description: 'SkillTrace AI platform will undergo scheduled maintenance on Sunday from 02:00 AM to 04:00 AM IST.',
    timestamp: '3 days ago',
    date: '2026-08-09T09:00:00Z',
    read: true,
    actionUrl: '',
    actionText: '',
  },
  {
    id: 'notif-107',
    category: 'AI Analysis',
    title: 'Skill Gap Matrix Refreshed',
    description: '3 new targeted learning topics (Docker, Redis, Kafka) were recommended based on your target role fit.',
    timestamp: '4 days ago',
    date: '2026-08-08T16:20:00Z',
    read: true,
    actionUrl: '/skill-gap',
    actionText: 'View Skill Gaps',
  },
];
