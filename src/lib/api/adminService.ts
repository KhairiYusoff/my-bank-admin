import apiClient from './apiClient';

interface ActivityLog {
  _id: string;
  userId: string;
  action: string;
  description: string;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}

interface ActivityLogResponse {
  logs: ActivityLog[];
  total: number;
}

interface SystemStats {
  userCount: number;
  accountCount: number;
  transactionCount: number;
  activeUsers: number;
  totalDeposits: number;
  totalWithdrawals: number;
}

export const adminService = {
  /**
   * Get system activity logs (admin only)
   */
  getActivityLogs: async (page = 1, limit = 10): Promise<ActivityLogResponse> => {
    const response = await apiClient.get(`/admin/activity-logs?page=${page}&limit=${limit}`);
    return response.data;
  },

  /**
   * Get system statistics (admin only)
   */
  getSystemStats: async (): Promise<SystemStats> => {
    const response = await apiClient.get('/admin/stats');
    return response.data;
  },

  /**
   * Get recent activities for dashboard (admin only)
   */
  getRecentActivities: async (limit = 5): Promise<ActivityLog[]> => {
    const response = await apiClient.get(`/admin/recent-activities?limit=${limit}`);
    return response.data.activities;
  },

  /**
   * Get pending applications (admin/banker only)
   */
  getPendingApplications: async (page = 1, limit = 10): Promise<any> => {
    const response = await apiClient.get(`/admin/pending-applications?page=${page}&limit=${limit}`);
    return response.data;
  },

  /**
   * Approve or reject a user application (admin/banker only)
   */
  processApplication: async (userId: string, status: 'approved' | 'rejected', reason?: string): Promise<any> => {
    const response = await apiClient.put(`/admin/process-application/${userId}`, { status, reason });
    return response.data;
  }
};

export default adminService;
