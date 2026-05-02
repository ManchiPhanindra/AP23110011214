import axios from 'axios';
import { ApiResponse, Notification } from '../types/notification';

const API_URL = "http://20.207.122.201/evaluation-service/notifications";

export class ApiService {
  private static getMockNotifications(): Notification[] {
    const types: ("Event" | "Result" | "Placement")[] = ["Event", "Result", "Placement"];
    return Array.from({ length: 50 }, (_, i) => ({
      ID: `mock-${i}`,
      Type: types[i % 3],
      Message: `Sample Notification ${i}: Important update regarding ${types[i % 3].toLowerCase()}s.`,
      Timestamp: new Date(Date.now() - i * 3600000).toISOString(),
    }));
  }

  public static async fetchNotifications(token?: string): Promise<Notification[]> {
    try {
      const headers: Record<string, string> = {
        'Accept': 'application/json',
      };

      if (token && token !== 'your_api_token_here' && token.trim() !== '') {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await axios.get<ApiResponse>(API_URL, { headers });
      return response.data.notifications;
    } catch (error) {
      console.warn("API Error (Falling back to Mock Data):", error instanceof Error ? error.message : "Unauthorized");
      return this.getMockNotifications();
    }
  }
}
