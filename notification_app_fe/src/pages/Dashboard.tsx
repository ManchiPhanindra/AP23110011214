import React, { useState } from 'react';
import { Typography, Pagination, Box, Skeleton, Alert, Stack } from '@mui/material';
import { useNotifications } from '../hooks/useNotifications';
import NotificationCard from '../components/NotificationCard';

const Dashboard: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { notifications, total, loading, error, readIds, markAsRead } = useNotifications(page, limit);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">Error loading notifications: {error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a2027', mb: 1 }}>
          All Notifications
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Stay updated with everything happening on campus.
        </Typography>
      </Box>

      {loading ? (
        <Stack spacing={2}>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
          ))}
        </Stack>
      ) : notifications.length === 0 ? (
        <Alert severity="info" sx={{ borderRadius: 2 }}>No notifications found at the moment.</Alert>
      ) : (
        <Box>
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              isRead={readIds.has(notification.id)}
              onMarkAsRead={markAsRead}
            />
          ))}
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Pagination 
              count={Math.ceil(total / limit)} 
              page={page} 
              onChange={handlePageChange} 
              color="primary" 
              size="large"
              sx={{ '& .MuiPaginationItem-root': { fontWeight: 600 } }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
