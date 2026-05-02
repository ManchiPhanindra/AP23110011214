export type NotificationType = "Placement" | "Result" | "Event";

export interface Notification {
  ID: string;
  Type: NotificationType;
  Message: string;
  Timestamp: string;
}

export interface ApiResponse {
  notifications: Notification[];
}

export const PRIORITY_WEIGHTS: Record<NotificationType, number> = {
  "Placement": 3,
  "Result": 2,
  "Event": 1,
};
