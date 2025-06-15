// User Types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Account Types
export interface Account {
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

// Transaction Types
export interface Transaction {
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

// Activity Log Types
export interface ActivityLog {
  _id: string;
  userId: string;
  action: string;
  description: string;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}

// Authentication Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user?: User;
}

// Pagination Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Dashboard Types
export interface SystemStats {
  userCount: number;
  accountCount: number;
  transactionCount: number;
  activeUsers: number;
  totalDeposits: number;
  totalWithdrawals: number;
}
