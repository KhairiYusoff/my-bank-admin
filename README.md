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
- **State Management**: React Query
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

### API Integration

The admin portal integrates with the My Bank API using the following services:

- `authService`: Authentication and token management
- `userService`: User management operations
- `accountService`: Account management operations
- `transactionService`: Transaction monitoring
- `adminService`: Admin-specific operations

## Deployment

The application is containerized with Docker, making it easy to deploy to any environment that supports Docker containers.

## License

[MIT](LICENSE)
