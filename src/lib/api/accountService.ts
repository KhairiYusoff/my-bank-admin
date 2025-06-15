import apiClient from './apiClient';

interface Account {
  _id: string;
  accountNumber: string;
  userId: string;
  balance: number;
  accountType: string;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface AccountResponse {
  accounts: Account[];
  total: number;
}

interface CreateAccountData {
  userId: string;
  accountType: string;
  currency: string;
}

export const accountService = {
  /**
   * Get all accounts (admin only)
   */
  getAllAccounts: async (page = 1, limit = 10): Promise<AccountResponse> => {
    const response = await apiClient.get(`/accounts/all?page=${page}&limit=${limit}`);
    return response.data;
  },

  /**
   * Get a specific account by account number
   */
  getAccountByNumber: async (accountNumber: string): Promise<Account> => {
    const response = await apiClient.get(`/admin/accounts/${accountNumber}`);
    return response.data.account;
  },

  /**
   * Create a new account for a user (banker only)
   */
  createAccount: async (accountData: CreateAccountData): Promise<Account> => {
    const response = await apiClient.post('/accounts/create', accountData);
    return response.data.account;
  },

  /**
   * Delete an account (banker only)
   */
  deleteAccount: async (accountNumber: string): Promise<{ msg: string }> => {
    const response = await apiClient.delete(`/accounts/${accountNumber}`);
    return response.data;
  },

  /**
   * Deposit funds into an account
   */
  deposit: async (accountNumber: string, amount: number): Promise<Account> => {
    const response = await apiClient.post('/accounts/deposit', { accountNumber, amount });
    return response.data.account;
  },

  /**
   * Withdraw funds from an account
   */
  withdraw: async (accountNumber: string, amount: number): Promise<Account> => {
    const response = await apiClient.post('/accounts/withdraw', { accountNumber, amount });
    return response.data.account;
  },

  /**
   * Airdrop funds to a user (admin only)
   */
  airdrop: async (userId: string, amount: number): Promise<{ msg: string }> => {
    const response = await apiClient.post('/accounts/airdrop', { userId, amount });
    return response.data;
  }
};

export default accountService;
