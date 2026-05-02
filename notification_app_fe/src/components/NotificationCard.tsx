import React from 'react';
import { Card, CardContent, Typography, Chip, Box, Tooltip } from '@mui/material';
import type { Notification } from '../types/notification';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface NotificationCardProps {
  notification: Notification;
  isRead: boolean;
  onMarkAsRead: (id: string) => void;
  priorityEmphasize?: boolean;
}

const typeColors: Record<string, "primary" | "secondary" | "error" | "info" | "success" | "warning"> = {
  Event: 'info',
  Result: 'success',
  Placement: 'error',
};

const NotificationCard: React.FC<NotificationCardProps> = ({ notification, isRead, onMarkAsRead, priorityEmphasize }) => {
  return (
    <Card 
      onClick={() => onMarkAsRead(notification.id)}
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        transition: 'all 0.2s',
        position: 'relative',
        overflow: 'visible',
        '&:hover': { transform: 'translateY(-2px)', boxShadow: 6 },
        borderLeft: isRead ? '4px solid transparent' : '4px solid #1976d2',
        opacity: isRead ? 0.8 : 1,
        bgcolor: isRead ? '#f8f9fa' : '#ffffff',
        boxShadow: priorityEmphasize && !isRead ? '0 4px 20px rgba(25, 118, 210, 0.15)' : 1,
        border: priorityEmphasize && !isRead ? '1px solid rgba(25, 118, 210, 0.3)' : '1px solid rgba(0,0,0,0.05)',
      }}
    >
      <CardContent sx={{ '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Chip 
            label={notification.notification_type} 
            size="small" 
            color={typeColors[notification.notification_type] || 'default'}
            sx={{ 
              fontWeight: 700, 
              fontSize: '0.65rem', 
              height: '20px',
              textTransform: 'uppercase'
            }}
          />
          <Tooltip title={dayjs(notification.timestamp).format('MMMM D, YYYY h:mm A')}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
              {dayjs(notification.timestamp).fromNow()}
            </Typography>
          </Tooltip>
        </Box>
        <Typography 
          variant="body1" 
          sx={{ 
            fontWeight: isRead ? 400 : 600,
            color: isRead ? 'text.secondary' : 'text.primary',
            lineHeight: 1.5,
            fontSize: '0.95rem'
          }}
        >
          {notification.message}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
