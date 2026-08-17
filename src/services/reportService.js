/**
 * Report Service
 * Async service layer connecting to user session & structured for FastAPI REST backend integration.
 */

import { primaryReportsData, reportHistoryData, studentInfo } from '../utils/reportsData';
import { getCurrentUser } from './authService';

const delay = (ms = 350) => new Promise((resolve) => window.setTimeout(resolve, ms));

/**
 * Fetch the 4 primary report cards for Career Intelligence dashboard.
 */
export async function getPrimaryReports() {
  await delay(350);
  const activeUser = getCurrentUser();

  const student = {
    ...studentInfo,
    name: activeUser?.fullName || studentInfo.name,
    email: activeUser?.email || studentInfo.email,
    department: activeUser?.department || studentInfo.department,
    college: activeUser?.college || studentInfo.college,
  };

  return {
    student,
    reports: primaryReportsData,
  };
}

/**
 * Fetch single detailed report by ID or type key.
 */
export async function getReportById(reportIdOrType) {
  await delay(300);
  if (primaryReportsData[reportIdOrType]) {
    return primaryReportsData[reportIdOrType];
  }

  const found = Object.values(primaryReportsData).find((r) => r.id === reportIdOrType);
  if (found) return found;

  throw new Error(`Report "${reportIdOrType}" not found.`);
}

/**
 * Fetch report history log with search, type, and status filtering.
 */
export async function getReportHistory({ search = '', typeFilter = 'All', statusFilter = 'All' } = {}) {
  await delay(250);

  let filtered = [...reportHistoryData];

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
    totalCount: reportHistoryData.length,
    filteredCount: filtered.length,
  };
}

/**
 * Simulate generating a fresh AI Report.
 */
export async function generateReport({ reportType = 'portfolio-analysis', depth = 'Standard' } = {}) {
  await delay(1200);

  const baseReport = primaryReportsData[reportType] || primaryReportsData['portfolio-analysis'];
  const newScore = Math.min(99, Math.max(75, baseReport.score + Math.floor(Math.random() * 5) - 2));

  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const formattedDate = `${now.toLocaleString('default', { month: 'short' })} ${now.getDate()}, ${now.getFullYear()} · ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  const newHistoryItem = {
    id: `rep-gen-${Date.now()}`,
    title: `${depth === 'Deep Dive' ? 'Deep-Dive ' : ''}${baseReport.title}`,
    type: reportType,
    typeName: reportType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    score: newScore,
    status: 'Completed',
    generatedDate: dateStr,
    formattedDate: formattedDate,
    size: '3.4 MB',
  };

  reportHistoryData.unshift(newHistoryItem);

  return {
    success: true,
    report: {
      ...baseReport,
      score: newScore,
      lastGenerated: `${now.toLocaleString('default', { month: 'short' })} ${now.getDate()}, ${now.getFullYear()}`,
      generatedTimeAgo: 'Just now',
    },
    historyEntry: newHistoryItem,
  };
}

/**
 * Delete a report from history log.
 */
export async function deleteHistoryReport(id) {
  await delay(200);
  const idx = reportHistoryData.findIndex((item) => item.id === id);
  if (idx !== -1) {
    reportHistoryData.splice(idx, 1);
  }
  return { success: true };
}
