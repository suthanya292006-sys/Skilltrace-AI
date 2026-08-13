import { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Stack,
  Button,
  Badge,
  Skeleton,
  IconButton,
  Tooltip,
} from '@mui/material';
import { FiBell, FiCheckCircle, FiTrash2, FiRefreshCw } from 'react-icons/fi';
import NotificationItem from './NotificationItem';
import NotificationFilters from './NotificationFilters';
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  clearAllNotifications,
} from '../../services/notificationService';
import { tokens } from '../../styles/theme';

export default function NotificationPanel({ onNotificationCountChange }) {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const [unreadCountsByCategory, setUnreadCountsByCategory] = useState({});

  const fetchNotificationsData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getNotifications({ category: activeCategory });
      setNotifications(res.notifications);
      setUnreadCount(res.unreadCount);

      if (onNotificationCountChange) {
        onNotificationCountChange(res.unreadCount);
      }

      // Compute unread counts for each category
      const allRes = await getNotifications({ category: 'All' });
      const countsMap = {};
      allRes.notifications.forEach((n) => {
        if (!n.read) {
          countsMap[n.category] = (countsMap[n.category] || 0) + 1;
        }
      });
      setUnreadCountsByCategory(countsMap);
    } catch (err) {
      console.error('Failed to load notifications:', err);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, onNotificationCountChange]);

  useEffect(() => {
    fetchNotificationsData();
  }, [fetchNotificationsData]);

  const handleMarkAsRead = async (id) => {
    await markNotificationAsRead(id);
    fetchNotificationsData();
  };

  const handleMarkAllAsRead = async () => {
    await markAllNotificationsAsRead();
    fetchNotificationsData();
  };

  const handleDelete = async (id) => {
    await deleteNotification(id);
    fetchNotificationsData();
  };

  const handleClearAll = async () => {
    await clearAllNotifications();
    fetchNotificationsData();
  };

  return (
    <Card sx={{ borderRadius: 3, borderColor: tokens.line }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Panel Header */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 2.5 }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2.5,
                bgcolor: 'rgba(15,157,140,0.12)',
                color: tokens.teal,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <Badge badgeContent={unreadCount} color="error" max={99}>
                <FiBell size={20} />
              </Badge>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 18, color: tokens.ink, lineHeight: 1.2 }}>
                Notifications Center
              </Typography>
              <Typography variant="body2" sx={{ color: tokens.slate, fontSize: 13 }}>
                Stay updated on your AI analyses, assessment results, career matches, and system alerts.
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1} sx={{ alignSelf: { xs: 'flex-end', sm: 'auto' } }}>
            {unreadCount > 0 && (
              <Button
                size="small"
                variant="outlined"
                startIcon={<FiCheckCircle size={14} />}
                onClick={handleMarkAllAsRead}
                sx={{ borderColor: tokens.line, color: tokens.tealDark, fontWeight: 600, fontSize: 12 }}
              >
                Mark All Read
              </Button>
            )}

            {notifications.length > 0 && (
              <Tooltip title="Clear All Notifications">
                <IconButton size="small" onClick={handleClearAll} sx={{ border: `1px solid ${tokens.line}` }}>
                  <FiTrash2 size={16} color={tokens.danger} />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title="Refresh Notifications">
              <IconButton size="small" onClick={fetchNotificationsData} sx={{ border: `1px solid ${tokens.line}` }}>
                <FiRefreshCw size={16} color={tokens.slate} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        {/* Category Filters */}
        <NotificationFilters
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          unreadCountByCategory={unreadCountsByCategory}
        />

        {/* Notification List or Loading or Empty State */}
        {loading ? (
          <Stack spacing={2}>
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton key={idx} variant="rounded" height={80} sx={{ borderRadius: 2.5 }} />
            ))}
          </Stack>
        ) : notifications.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 6,
              px: 2,
              bgcolor: 'background.default',
              borderRadius: 3,
              border: `1px dashed ${tokens.line}`,
              my: 1,
            }}
          >
            <FiBell size={44} color={tokens.slate} style={{ opacity: 0.4, marginBottom: 12 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: tokens.ink, mb: 0.5 }}>
              No Notifications Found
            </Typography>
            <Typography variant="body2" sx={{ color: tokens.slate, maxWidth: 360, mx: 'auto', mb: 2 }}>
              {activeCategory === 'All'
                ? "You're all caught up! There are no active notifications at the moment."
                : `No notifications found under the "${activeCategory}" category.`}
            </Typography>
            {activeCategory !== 'All' && (
              <Button size="small" variant="outlined" onClick={() => setActiveCategory('All')} sx={{ borderColor: tokens.line, color: tokens.ink }}>
                View All Categories
              </Button>
            )}
          </Box>
        ) : (
          <Stack spacing={1.5}>
            {notifications.map((n) => (
              <NotificationItem
                key={n.id}
                notification={n}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
              />
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
