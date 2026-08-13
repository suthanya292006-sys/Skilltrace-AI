/**
 * SkillTrace AI - Notification Service
 * Async service layer structured for future FastAPI + MongoDB REST backend integration.
 * 
 * Future REST Endpoints:
 * - GET /api/v1/notifications (Fetch notification list with filters)
 * - PATCH /api/v1/notifications/:id/read (Mark notification as read)
 * - PATCH /api/v1/notifications/read-all (Mark all notifications as read)
 * - DELETE /api/v1/notifications/:id (Delete notification)
 * - DELETE /api/v1/notifications/clear (Clear all notifications)
 */

import { initialNotifications } from '../utils/notificationData';

const STORAGE_KEY = 'skilltrace_notifications_store';

const delay = (ms = 300) => new Promise((resolve) => window.setTimeout(resolve, ms));

function getStoredNotifications() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (err) {
    console.error('Failed to parse notifications from localStorage:', err);
  }
  return initialNotifications;
}

function saveStoredNotifications(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save notifications to localStorage:', err);
  }
}

/**
 * Fetch notifications with category filter.
 */
export async function getNotifications({ category = 'All', readStatus = 'All' } = {}) {
  await delay(250);
  let list = getStoredNotifications();

  // Category filter
  if (category && category !== 'All') {
    list = list.filter((n) => n.category === category);
  }

  // Read status filter
  if (readStatus === 'unread') {
    list = list.filter((n) => !n.read);
  } else if (readStatus === 'read') {
    list = list.filter((n) => n.read);
  }

  const allList = getStoredNotifications();
  const unreadCount = allList.filter((n) => !n.read).length;

  return {
    notifications: list,
    totalCount: allList.length,
    unreadCount,
    categoryCount: list.length,
  };
}

/**
 * Toggle single notification read status.
 */
export async function markNotificationAsRead(id) {
  await delay(150);
  const list = getStoredNotifications();
  const item = list.find((n) => n.id === id);
  if (item) {
    item.read = true;
    saveStoredNotifications(list);
  }
  const unreadCount = list.filter((n) => !n.read).length;
  return { success: true, unreadCount, list };
}

/**
 * Mark all notifications as read.
 */
export async function markAllNotificationsAsRead() {
  await delay(200);
  const list = getStoredNotifications();
  list.forEach((n) => {
    n.read = true;
  });
  saveStoredNotifications(list);
  return { success: true, unreadCount: 0, list };
}

/**
 * Delete single notification.
 */
export async function deleteNotification(id) {
  await delay(150);
  let list = getStoredNotifications();
  list = list.filter((n) => n.id !== id);
  saveStoredNotifications(list);
  const unreadCount = list.filter((n) => !n.read).length;
  return { success: true, unreadCount, list };
}

/**
 * Clear all notifications.
 */
export async function clearAllNotifications() {
  await delay(200);
  saveStoredNotifications([]);
  return { success: true, unreadCount: 0, list: [] };
}
