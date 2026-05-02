import axios from 'axios';
import type { ApiResponse, NotificationType } from '../types/notification';

const API_BASE_URL = 'http://20.207.122.201/evaluation-service';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchNotifications = async (
  page: number = 1,
  limit: number = 10,
  notification_type?: NotificationType
): Promise<ApiResponse> => {
  try {
    const response = await api.get('/notifications', {
      params: {
        page,
        limit,
        notification_type,
      },
    });
    return response.data;
  } catch (error) {
    console.warn("Frontend API Error (Falling back to Mock Data):", error);
    
    // Generate realistic mock data
    const allTypes: NotificationType[] = ['Event', 'Result', 'Placement'];
    const filteredTypes = notification_type ? [notification_type] : allTypes;
    
    const mockNotifications = Array.from({ length: 50 }, (_, i) => ({
      id: `mock-${i}`,
      notification_type: filteredTypes[i % filteredTypes.length],
      message: `[MOCK] ${filteredTypes[i % filteredTypes.length]} update: This is a sample notification showing how the system works without a live API token.`,
      timestamp: new Date(Date.now() - (i + (page - 1) * limit) * 3600000).toISOString(),
    })).slice(0, limit);

    return {
      notifications: mockNotifications,
      total: 50,
      page,
      limit,
    };
  }
};

export default api;
