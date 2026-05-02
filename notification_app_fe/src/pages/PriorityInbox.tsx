import React, { useMemo } from 'react';
import { Typography, Box, Skeleton, Alert, Stack, Divider, Chip } from '@mui/material';
import { useNotifications } from '../hooks/useNotifications';
import NotificationCard from '../components/NotificationCard';
import StarIcon from '@mui/icons-material/Star';

const typePriority: Record<string, number> = {
  'Placement': 3,
  'Result': 2,
  'Event': 1
};

const PriorityInbox: React.FC = () => {
  // Fetch a larger set to sort locally for priority inbox, or use default limit
  const { notifications, loading, error, readIds, markAsRead } = useNotifications(1, 50);

  const prioritizedNotifications = useMemo(() => {
    return [...notifications]
      .sort((a, b) => {
        const pA = typePriority[a.notification_type] || 0;
        const pB = typePriority[b.notification_type] || 0;
        if (pA !== pB) return pB - pA;
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      })
      .slice(0, 10); // Show top 10
  }, [notifications]);

  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">Error loading priority inbox: {error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ p: 1, bgcolor: 'rgba(25, 118, 210, 0.1)', borderRadius: '12px' }}>
          <StarIcon color="primary" fontSize="large" />
        </Box>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a2027' }}>
            Priority Inbox
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Crucial updates sorted by importance: Placement &gt; Result &gt; Event
          </Typography>
        </Box>
      </Box>

      {loading ? (
        <Stack spacing={2}>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
          ))}
        </Stack>
      ) : prioritizedNotifications.length === 0 ? (
        <Alert severity="info" sx={{ borderRadius: 2 }}>No priority notifications at the moment.</Alert>
      ) : (
        <Box>
          <Divider sx={{ mb: 3 }}>
            <Chip label="Top 10 Priority Items" size="small" sx={{ fontWeight: 700 }} />
          </Divider>
          {prioritizedNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              isRead={readIds.has(notification.id)}
              onMarkAsRead={markAsRead}
              priorityEmphasize={typePriority[notification.notification_type] >= 2}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PriorityInbox;
