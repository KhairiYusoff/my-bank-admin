# My Bank Admin Portal

An administrative dashboard for the My Bank banking system, built with Next.js and Docker.

## Features

- **User Management**: View, approve, and manage bank users
- **Account Management**: Create, view, and manage bank accounts
- **Transaction Monitoring**: Track and monitor all banking transactions
- **System Administration**: View system statistics and activity logs
- **Role-based Access Control**: Secure admin-only functionality

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **State Management**: TanStack Query (React Query v5)
- **Authentication**: JWT
- **API Integration**: Axios
- **Containerization**: Docker

## Prerequisites

- Docker and Docker Compose
- Git

## Getting Started

### Clone the Repository

```bash
git clone <repository-url>
cd my-bank-admin
```

### Environment Setup

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### Running with Docker

Build and start the application using Docker Compose:

```bash
# Build and start containers in foreground (see logs)
docker-compose up --build

# Build and start containers in background
docker-compose up --build -d

# Stop containers
docker-compose down

# View logs if running in background
docker-compose logs -f
```

The application will be available at http://localhost:3005.

## Development

### Project Structure

```
my-bank-admin/
├── src/
│   ├── app/                 # Next.js App Router structure
│   │   ├── (auth)/          # Authentication routes
│   │   ├── dashboard/       # Admin dashboard
│   │   └── ...
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # Basic UI elements
│   │   └── ...
│   ├── lib/                 # Utility functions
│   │   ├── api/             # API integration
│   │   └── ...
│   ├── types/               # TypeScript types
│   └── ...
└── ...
```

### API Integration with React Query

The admin portal integrates with the My Bank API using React Query (TanStack Query) for efficient server state management. This implementation:

- Separates server state from UI components
- Provides automatic caching and background refetching
- Handles loading and error states consistently
- Optimizes network requests

#### Service Structure

API integration is organized into service modules:

- `authService`: Authentication and token management
- `userService`: User management operations
- `accountService`: Account management operations
- `transactionService`: Transaction monitoring
- `adminService`: Admin-specific operations

#### React Query Hooks

Each service is wrapped with custom React Query hooks for easy consumption in components:

- **Authentication**: `useLogin`, `useLogout`, `useAuthCheck`, `useRefreshToken`
- **User Management**: `useCustomers`, `useUserActivity`, `useUpdateUserStatus`, `useUpdateUserRole`
- **Account Management**: `useAllAccounts`, `useCreateAccount`, `useDeleteAccount`, `useAirdropFunds`
- **Transaction Management**: `useAllTransactions`, `useAccountTransactions`, `useTransactionDetails`, `useUpdateTransactionStatus`
- **Admin Operations**: `usePendingApplications`, `useApproveApplication`, `useVerifyCustomer`, `useCreateStaff`

## Multi-Repo Orchestration

This admin portal is designed to work with the My Bank API in a multi-repo architecture. Here's how to orchestrate the two repositories:

### Repository Structure

```
maybank/
├── repo/
│   ├── my-bank-api/        # Backend API (Node.js/Express)
│   └── my-bank-admin/      # Admin Portal (Next.js)
```

### Development Workflow

1. **Start the API server first**:
   ```bash
   cd my-bank-api
   npm install
   npm run dev
   ```

2. **Then start the admin portal**:
   ```bash
   cd my-bank-admin
   npm install
   npm run dev
   ```

3. **Or use Docker Compose for both**:
   Create a root-level docker-compose.yml that references both projects.

### Environment Configuration

Ensure the admin portal's `.env.local` points to the correct API URL:
```
NEXT_PUBLIC_API_URL=http://localhost:5001/api  # For local development
```

### API Contract

The admin portal expects the API to follow the contract defined in the service modules. Any changes to API endpoints should be reflected in both repositories.

## Deployment

The application is containerized with Docker, making it easy to deploy to any environment that supports Docker containers.

### Individual Deployment

Each repository can be deployed independently as long as the environment variables are configured correctly.

### Combined Deployment

For production, consider using orchestration tools like Docker Swarm or Kubernetes to manage both services together.

## License

[MIT](LICENSE)
