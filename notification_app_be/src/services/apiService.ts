import axios from 'axios';
import { ApiResponse, Notification } from '../types/notification';

const API_URL = "http://20.207.122.201/evaluation-service/notifications";

export class ApiService {
  public static async fetchNotifications(token?: string): Promise<Notification[]> {
    try {
      const headers: Record<string, string> = {
        'Accept': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await axios.get<ApiResponse>(API_URL, { headers });
      return response.data.notifications;
    } catch (error) {
      console.error("Failed to fetch notifications from API:", error instanceof Error ? error.message : error);
      throw error;
    }
  }
}
