import apiClient from './apiClient';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  refreshToken?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export const authService = {
  /**
   * Login with email and password
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  /**
   * Logout the current user
   */
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },

  /**
   * Check if the current token is valid
   */
  checkToken: async (): Promise<boolean> => {
    try {
      await apiClient.get('/auth/check-token');
      return true;
    } catch (error) {
      return false;
    }
  },

  /**
   * Refresh the authentication token
   */
  refreshToken: async (refreshToken: string): Promise<LoginResponse> => {
    const response = await apiClient.post('/auth/refresh-token', { refreshToken });
    return response.data;
  }
};

export default authService;
