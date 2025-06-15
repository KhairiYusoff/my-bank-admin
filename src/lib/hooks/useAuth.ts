import { useMutation, useQuery } from '@tanstack/react-query';
import authService, { LoginCredentials, LoginResponse } from '../api/authService';
import { useRouter } from 'next/navigation';

// Hook for login functionality
export const useLogin = () => {
  const router = useRouter();

  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: (credentials) => authService.login(credentials),
    onSuccess: (data) => {
      // Store tokens in localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      }
      
      // Redirect to dashboard after successful login
      router.push('/dashboard');
    },
  });
};

// Hook for logout functionality
export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Redirect to login page after logout
      router.push('/login');
    },
  });
};

// Hook to check if user is authenticated
export const useAuthCheck = () => {
  return useQuery({
    queryKey: ['authCheck'],
    queryFn: () => authService.checkToken(),
    retry: false,
    // Don't refetch this query too often
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for token refresh
export const useRefreshToken = () => {
  return useMutation({
    mutationFn: (refreshToken: string) => authService.refreshToken(refreshToken),
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
    },
  });
};
