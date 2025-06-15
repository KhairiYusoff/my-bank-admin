import apiClient from './apiClient';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface UserResponse {
  users: User[];
  total: number;
}

export const userService = {
  /**
   * Get all users (admin only)
   */
  getAllUsers: async (page = 1, limit = 10): Promise<UserResponse> => {
    const response = await apiClient.get(`/admin/users?page=${page}&limit=${limit}`);
    return response.data;
  },

  /**
   * Get a specific user by ID
   */
  getUserById: async (userId: string): Promise<User> => {
    const response = await apiClient.get(`/admin/users/${userId}`);
    return response.data.user;
  },

  /**
   * Update a user's status (approve, reject, suspend)
   */
  updateUserStatus: async (userId: string, status: string): Promise<User> => {
    const response = await apiClient.put(`/admin/users/${userId}/status`, { status });
    return response.data.user;
  },

  /**
   * Update a user's role
   */
  updateUserRole: async (userId: string, role: string): Promise<User> => {
    const response = await apiClient.put(`/admin/users/${userId}/role`, { role });
    return response.data.user;
  },

  /**
   * Get user activity logs
   */
  getUserActivityLogs: async (userId: string, page = 1, limit = 10): Promise<any> => {
    const response = await apiClient.get(`/admin/users/${userId}/activity?page=${page}&limit=${limit}`);
    return response.data;
  }
};

export default userService;
