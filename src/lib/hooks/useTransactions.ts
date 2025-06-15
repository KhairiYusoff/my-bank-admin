import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import transactionService from '../api/transactionService';

// Types for transaction data
export interface Transaction {
  id: string;
  transactionId: string;
  fromAccountNumber?: string;
  toAccountNumber?: string;
  amount: number;
  type: 'transfer' | 'deposit' | 'withdrawal' | 'airdrop';
  status: 'completed' | 'pending' | 'failed';
  description?: string;
  createdAt: string;
}

// Hook to get all transactions (admin only)
export const useAllTransactions = () => {
  return useQuery({
    queryKey: ['transactions', 'all'],
    queryFn: () => transactionService.getAllTransactions(),
  });
};

// Hook to get transactions for a specific account
export const useAccountTransactions = (accountNumber: string) => {
  return useQuery({
    queryKey: ['transactions', 'account', accountNumber],
    queryFn: () => transactionService.getAccountTransactions(accountNumber),
    enabled: !!accountNumber, // Only run the query if accountNumber is provided
  });
};

// Hook to get details for a specific transaction
export const useTransactionDetails = (transactionId: string) => {
  return useQuery({
    queryKey: ['transaction', transactionId],
    queryFn: () => transactionService.getTransactionDetails(transactionId),
    enabled: !!transactionId, // Only run the query if transactionId is provided
  });
};

// Hook to update transaction status (admin only)
export const useUpdateTransactionStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      transactionId, 
      status 
    }: { 
      transactionId: string; 
      status: 'completed' | 'pending' | 'failed' 
    }) => transactionService.updateTransactionStatus(transactionId, status),
    onSuccess: (_, variables) => {
      // Invalidate and refetch transaction details
      queryClient.invalidateQueries({ 
        queryKey: ['transaction', variables.transactionId] 
      });
      // Also invalidate the all transactions list
      queryClient.invalidateQueries({ 
        queryKey: ['transactions', 'all'] 
      });
    },
  });
};
