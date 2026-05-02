export type NotificationType = 'Event' | 'Result' | 'Placement';

export interface Notification {
  id: string;
  notification_type: NotificationType;
  message: string;
  timestamp: string;
}

export interface ApiResponse {
  notifications: Notification[];
  total: number;
  page: number;
  limit: number;
}
