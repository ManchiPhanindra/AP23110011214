import React, { useState } from 'react';
import { Typography, Box, Skeleton, Alert, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNotifications } from '../hooks/useNotifications';
import NotificationCard from '../components/NotificationCard';
import type { NotificationType } from '../types/notification';
import type { SelectChangeEvent } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const FilterPage: React.FC = () => {
  const [filterType, setFilterType] = useState<NotificationType | ''>('');
  const { notifications, loading, error, readIds, markAsRead } = useNotifications(1, 50, filterType || undefined);

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilterType(event.target.value as NotificationType | '');
  };

  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">Error loading filtered notifications: {error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a2027', mb: 1 }}>
            Explore Categories
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Filter notifications by their specific type.
          </Typography>
        </Box>
        <FormControl sx={{ minWidth: 200 }} size="medium">
          <InputLabel id="type-filter-label">Notification Type</InputLabel>
          <Select
            labelId="type-filter-label"
            id="type-filter"
            value={filterType}
            label="Notification Type"
            onChange={handleFilterChange}
            startAdornment={<FilterListIcon sx={{ mr: 1, color: 'text.secondary' }} />}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value=""><em>All Types</em></MenuItem>
            <MenuItem value="Event">Event</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Stack spacing={2}>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
          ))}
        </Stack>
      ) : notifications.length === 0 ? (
        <Alert severity="info" sx={{ borderRadius: 2 }}>
          No {filterType} notifications found.
        </Alert>
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
        </Box>
      )}
    </Box>
  );
};

export default FilterPage;
