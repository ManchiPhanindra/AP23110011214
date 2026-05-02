import { useState, useEffect, useCallback } from 'react';
import type { Notification, NotificationType } from '../types/notification';
import { fetchNotifications } from '../services/api';

export const useNotifications = (page: number = 1, limit: number = 10, type?: NotificationType) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  // Load read IDs from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('readNotifications');
    if (stored) {
      try {
        setReadIds(new Set(JSON.parse(stored)));
      } catch (e) {
        console.error('Failed to parse readNotifications from localStorage', e);
      }
    }
  }, []);

  const markAsRead = useCallback((id: string) => {
    setReadIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      localStorage.setItem('readNotifications', JSON.stringify(Array.from(next)));
      return next;
    });
  }, []);

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNotifications(page, limit, type);
      // Resilience for different API structures
      if (Array.isArray(data)) {
        setNotifications(data);
        setTotal(data.length);
      } else if (data && data.notifications) {
        setNotifications(data.notifications);
        setTotal(data.total || data.notifications.length);
      } else {
        setNotifications([]);
        setTotal(0);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  }, [page, limit, type]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  return { notifications, total, loading, error, readIds, markAsRead, refresh: loadNotifications };
};
