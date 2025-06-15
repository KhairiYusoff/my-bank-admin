import apiClient from './apiClient';

interface Transaction {
  _id: string;
  transactionType: string;
  amount: number;
  fromAccount?: string;
  toAccount?: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface TransactionResponse {
  transactions: Transaction[];
  total: number;
}

export const transactionService = {
  /**
   * Get all transactions (admin only)
   */
  getAllTransactions: async (page = 1, limit = 10): Promise<TransactionResponse> => {
    const response = await apiClient.get(`/admin/transactions?page=${page}&limit=${limit}`);
    return response.data;
  },

  /**
   * Get transactions for a specific account
   */
  getAccountTransactions: async (accountNumber: string, page = 1, limit = 10): Promise<TransactionResponse> => {
    const response = await apiClient.get(`/transactions/account/${accountNumber}?page=${page}&limit=${limit}`);
    return response.data;
  },

  /**
   * Get transactions for a specific user
   */
  getUserTransactions: async (userId: string, page = 1, limit = 10): Promise<TransactionResponse> => {
    const response = await apiClient.get(`/admin/transactions/user/${userId}?page=${page}&limit=${limit}`);
    return response.data;
  },

  /**
   * Get a specific transaction by ID
   */
  getTransactionById: async (transactionId: string): Promise<Transaction> => {
    const response = await apiClient.get(`/admin/transactions/${transactionId}`);
    return response.data.transaction;
  },

  /**
   * Update a transaction status (admin only)
   */
  updateTransactionStatus: async (transactionId: string, status: string): Promise<Transaction> => {
    const response = await apiClient.put(`/admin/transactions/${transactionId}/status`, { status });
    return response.data.transaction;
  }
};

export default transactionService;
