import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import userService from '../api/userService';

// Types for user data
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  lastLogin?: string;
}

// Hook to get all customers
export const useCustomers = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: () => userService.getAllCustomers(),
  });
};

// Hook to get user activity
export const useUserActivity = (userId: string) => {
  return useQuery({
    queryKey: ['userActivity', userId],
    queryFn: () => userService.getUserActivity(userId),
    enabled: !!userId, // Only run the query if userId is provided
  });
};

// Hook to update user status
export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: string }) => 
      userService.updateUserStatus(userId, status),
    onSuccess: () => {
      // Invalidate and refetch customers list after mutation
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};

// Hook to update user role
export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: string }) => 
      userService.updateUserRole(userId, role),
    onSuccess: () => {
      // Invalidate and refetch customers list after mutation
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};
