# ClassGPT: Your Multilingual AI Study Assistant 🌍📚

A modern monorepo-based educational AI assistant built with Next.js, NestJS, and pnpm workspaces.

## 🏗️ Architecture

This is a monorepo containing:

- **apps/frontend**: Next.js app with TypeScript and Tailwind CSS
- **apps/backend**: NestJS API server with Prisma ORM
- **packages/ui**: Shared React component library
- **packages/sdk**: Typed API client for frontend-backend communication
- **workers/queue**: BullMQ worker for async LLM processing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm 8+
- Docker and Docker Compose (for database and Redis)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MaAbumusAb/classgpt.git
   cd classgpt
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start database services**
   ```bash
   docker-compose up -d
   ```

4. **Set up environment variables**
   
   For backend:
   ```bash
   cp apps/backend/.env.example apps/backend/.env
   ```
   
   For frontend:
   ```bash
   cp apps/frontend/.env.example apps/frontend/.env
   ```
   
   For worker:
   ```bash
   cp workers/queue/.env.example workers/queue/.env
   ```

5. **Run database migrations**
   ```bash
   cd apps/backend
   pnpm prisma:generate
   pnpm prisma:migrate
   pnpm prisma:seed
   cd ../..
   ```

6. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd apps/backend
   pnpm dev

   # Terminal 2 - Frontend
   cd apps/frontend
   pnpm dev

   # Terminal 3 - Queue Worker (optional)
   cd workers/queue
   pnpm dev
   ```

7. **Open the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 📦 Monorepo Structure

```
classgpt/
├── apps/
│   ├── frontend/          # Next.js frontend app
│   │   ├── pages/         # Next.js pages
│   │   ├── components/    # React components
│   │   └── styles/        # Global styles
│   └── backend/           # NestJS backend API
│       ├── src/
│       │   ├── chats/     # Chat module
│       │   ├── auth/      # Auth module (stubbed)
│       │   └── llm-provider/ # LLM provider interface
│       └── prisma/        # Database schema and migrations
├── packages/
│   ├── ui/                # Shared UI components
│   └── sdk/               # API client SDK
├── workers/
│   └── queue/             # BullMQ worker for async jobs
├── docker-compose.yml     # Postgres + Redis services
└── pnpm-workspace.yaml    # pnpm workspace configuration
```

## 🗄️ Database Setup

### Migrations

Create a new migration:
```bash
cd apps/backend
pnpm prisma migrate dev --name your_migration_name
```

Apply migrations in production:
```bash
cd apps/backend
pnpm prisma migrate deploy
```

### Seed Data

Run the seed script to populate the database with test data:
```bash
cd apps/backend
pnpm prisma:seed
```

## 🧪 Testing

Run all tests:
```bash
pnpm test
```

Run tests for specific workspace:
```bash
cd apps/backend
pnpm test

cd apps/frontend
pnpm test
```

## 🔨 Building

Build all packages:
```bash
pnpm build
```

Build specific workspace:
```bash
cd apps/frontend
pnpm build
```

## 🎨 Code Quality

### Linting
```bash
pnpm lint
```

### Type Checking
```bash
pnpm typecheck
```

### Formatting
```bash
pnpm format        # Format code
pnpm format:check  # Check formatting
```

## 🐳 Docker

### Build Backend
```bash
docker build -f apps/backend/Dockerfile -t classgpt-backend .
```

### Build Worker
```bash
docker build -f workers/queue/Dockerfile -t classgpt-worker .
```

## 🔑 Environment Variables

### Backend (.env)
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `USE_OPENAI`: Set to 'true' to use OpenAI (requires API key)
- `OPENAI_API_KEY`: Your OpenAI API key (if using OpenAI)

### Frontend (.env)
- `NEXT_PUBLIC_API_URL`: Backend API URL

### Worker (.env)
- `REDIS_HOST`: Redis hostname
- `REDIS_PORT`: Redis port

## 🔐 Authentication

Authentication is currently stubbed with TODOs for Clerk integration. To implement:

1. Sign up at [clerk.com](https://clerk.com)
2. Add Clerk keys to environment variables
3. Implement the auth guard in `apps/backend/src/auth/`
4. Add Clerk provider to frontend

## 📝 Available Scripts

Root level:
- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all packages and apps
- `pnpm lint` - Lint all workspaces
- `pnpm test` - Run tests in all workspaces
- `pnpm typecheck` - Type check all workspaces
- `pnpm clean` - Clean build outputs

## 🌟 Features

- **TypeScript** - Full type safety across the stack
- **Monorepo** - Efficient code sharing with pnpm workspaces
- **Modern UI** - Next.js 14 with Tailwind CSS
- **API** - NestJS with Prisma ORM
- **Queue** - BullMQ for background job processing
- **Database** - PostgreSQL with Prisma migrations
- **Caching** - Redis for queue and caching
- **Testing** - Jest for unit tests
- **CI/CD** - GitHub Actions workflow
- **Docker** - Containerized services

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 📧 Contact

Muhammad Auwal Aliyu (Abu Mus'ab) - aliyumuhammadauwal92@gmail.com

Project Link: https://github.com/MaAbumusAb/classgpt
