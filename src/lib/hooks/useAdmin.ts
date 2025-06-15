import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import adminService from '../api/adminService';

// Types for admin operations
export interface PendingApplication {
  id: string;
  userId: string;
  name: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface StaffCreationData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'banker';
}

// Hook to get all pending applications
export const usePendingApplications = () => {
  return useQuery({
    queryKey: ['admin', 'pendingApplications'],
    queryFn: () => adminService.getPendingApplications(),
  });
};

// Hook to approve a customer's application
export const useApproveApplication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userId: string) => adminService.approveApplication(userId),
    onSuccess: () => {
      // Invalidate and refetch pending applications list
      queryClient.invalidateQueries({ 
        queryKey: ['admin', 'pendingApplications'] 
      });
      // Also invalidate customers list as it may have changed
      queryClient.invalidateQueries({ 
        queryKey: ['customers'] 
      });
    },
  });
};

// Hook to verify a customer
export const useVerifyCustomer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userId: string) => adminService.verifyCustomer(userId),
    onSuccess: () => {
      // Invalidate and refetch customers list
      queryClient.invalidateQueries({ 
        queryKey: ['customers'] 
      });
    },
  });
};

// Hook to create a staff account (admin only)
export const useCreateStaff = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (staffData: StaffCreationData) => 
      adminService.createStaff(staffData),
    onSuccess: () => {
      // Invalidate and refetch any relevant queries
      // Note: We may not have a specific query for staff members yet
    },
  });
};
