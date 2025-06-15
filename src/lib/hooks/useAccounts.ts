import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import accountService from '../api/accountService';

// Types for account data
export interface Account {
  id: string;
  accountNumber: string;
  userId: string;
  accountType: 'savings' | 'checking';
  balance: number;
  currency: string;
  status: string;
  createdAt: string;
}

// Hook to get all accounts (admin only)
export const useAllAccounts = () => {
  return useQuery({
    queryKey: ['accounts', 'all'],
    queryFn: () => accountService.getAllAccounts(),
  });
};

// Hook to create a new account (banker only)
export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (accountData: { 
      userId: string; 
      accountType: 'savings' | 'checking'; 
      currency: string;
    }) => accountService.createAccount(accountData),
    onSuccess: () => {
      // Invalidate and refetch accounts list after mutation
      queryClient.invalidateQueries({ queryKey: ['accounts', 'all'] });
    },
  });
};

// Hook to delete an account (banker only)
export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (accountNumber: string) => accountService.deleteAccount(accountNumber),
    onSuccess: () => {
      // Invalidate and refetch accounts list after mutation
      queryClient.invalidateQueries({ queryKey: ['accounts', 'all'] });
    },
  });
};

// Hook to airdrop funds to a user (admin only)
export const useAirdropFunds = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, amount }: { userId: string; amount: number }) => 
      accountService.airdrop(userId, amount),
    onSuccess: () => {
      // Invalidate and refetch accounts list after mutation
      queryClient.invalidateQueries({ queryKey: ['accounts', 'all'] });
    },
  });
};
