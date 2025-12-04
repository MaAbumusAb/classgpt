# ClassGPT: Your Multilingual AI Study Assistant 🌍📚

## ✨ Vision Statement

**ClassGPT** is an innovative AI-powered educational assistant dedicated to making quality learning accessible and culturally relevant for learners in Nigeria and beyond. Our core mission is to **bridge educational language barriers** by providing AI-driven explanations, quizzes, and summaries directly in local languages, starting with **Hausa** and **Arabic**, alongside English.

## 🏗️ Architecture

ClassGPT is now built as a modern, scalable monorepo with the following structure:

- **Frontend**: Next.js + TypeScript + Tailwind CSS
- **Backend**: NestJS + Prisma + PostgreSQL
- **Worker**: BullMQ queue worker for async processing
- **Packages**: Shared UI components and SDK
- **Infrastructure**: Docker Compose for local development

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **pnpm** 8+
- **Docker** and **Docker Compose** (for local development)
- **Git** for version control

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MaAbumusAb/classgpt.git
   cd classgpt
   ```

2. **Install pnpm** (if not already installed):

   ```bash
   npm install -g pnpm
   ```

3. **Install dependencies:**

   ```bash
   pnpm install
   ```

4. **Set up environment variables:**

   ```bash
   # Backend
   cp apps/backend/.env.example apps/backend/.env
   
   # Frontend
   cp apps/frontend/.env.example apps/frontend/.env
   
   # Worker
   cp workers/queue/.env.example workers/queue/.env
   ```

   Edit the `.env` files as needed. For local development with Docker, the defaults should work.

### Running with Docker Compose (Recommended)

Start all services (PostgreSQL, Redis, backend, and worker):

```bash
docker-compose up -d
```

The services will be available at:
- **Backend API**: http://localhost:3001
- **Frontend** (run separately): http://localhost:3000

To run the frontend locally:

```bash
pnpm dev:frontend
```

### Running in Development Mode (Without Docker)

1. **Start PostgreSQL and Redis:**

   ```bash
   docker-compose up -d postgres redis
   ```

2. **Run database migrations:**

   ```bash
   pnpm db:migrate
   ```

3. **Seed the database (optional):**

   ```bash
   pnpm db:seed
   ```

4. **Start all services in development mode:**

   ```bash
   # Terminal 1: Backend
   pnpm dev:backend
   
   # Terminal 2: Frontend
   pnpm dev:frontend
   
   # Terminal 3: Worker (optional)
   cd workers/queue && pnpm dev
   ```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## 📦 Monorepo Structure

```
classgpt/
├── apps/
│   ├── frontend/          # Next.js frontend application
│   └── backend/           # NestJS backend API with Prisma
├── packages/
│   ├── ui/                # Shared React UI components
│   └── sdk/               # TypeScript SDK for API client
├── workers/
│   └── queue/             # BullMQ worker for async tasks
├── .github/
│   └── workflows/         # CI/CD workflows
├── docker-compose.yml     # Docker Compose configuration
├── pnpm-workspace.yaml    # pnpm workspace configuration
└── package.json           # Root package.json with scripts
```

## 🧪 Development Scripts

```bash
# Install all dependencies
pnpm install

# Run all apps in development mode
pnpm dev

# Run specific app
pnpm dev:frontend
pnpm dev:backend

# Build all packages
pnpm build

# Lint all code
pnpm lint

# Type check all code
pnpm typecheck

# Run all tests
pnpm test

# Database operations
pnpm db:migrate     # Run Prisma migrations
pnpm db:seed        # Seed the database

# Docker operations
pnpm docker:up      # Start Docker services
pnpm docker:down    # Stop Docker services
```

## 🌟 Features

### Current Implementation

- **Multilingual Chat Interface**: Interactive chat UI with support for multiple languages
- **AI-Powered Responses**: Mock LLM adapter (can be swapped with OpenAI or other providers)
- **User Management**: Basic user and chat management with Prisma
- **Async Processing**: BullMQ worker for background tasks
- **Type-Safe API**: Full TypeScript support across frontend and backend
- **Component Library**: Reusable UI components with Tailwind CSS

### Planned Features

- **Clerk Authentication**: User authentication and authorization
- **OpenAI Integration**: Real LLM responses (set `USE_OPENAI=true`)
- **Advanced Multilingual Support**: Hausa, Arabic, and Pidgin
- **Offline Capabilities**: PWA with offline support
- **Mobile Apps**: Native iOS and Android applications

## 🔐 Environment Variables

### Backend (`apps/backend/.env`)

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/classgpt?schema=public"
USE_OPENAI=false
OPENAI_API_KEY=""
PORT=3001
FRONTEND_URL="http://localhost:3000"
# TODO: Add Clerk keys when implementing auth
CLERK_SECRET_KEY=""
```

### Frontend (`apps/frontend/.env`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
# TODO: Add Clerk keys when implementing auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
```

### Worker (`workers/queue/.env`)

```env
REDIS_HOST=localhost
REDIS_PORT=6379
USE_OPENAI=false
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm --filter @classgpt/backend test
pnpm --filter @classgpt/frontend test

# Run tests with coverage
pnpm --filter @classgpt/backend test:cov
```

## 📚 Documentation

- [DOCUMENTATION.md](./DOCUMENTATION.md) - Detailed project documentation
- See individual package READMEs for more specific information

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 📧 Contact

- **Muhammad Auwal Aliyu (Abu Mus'ab)** - aliyumuhammadauwal92@gmail.com
- **Project Link**: https://github.com/MaAbumusAb/classgpt

## 🙏 Acknowledgments

- Powered by LLaMA 3 and OpenAI
- Built with Next.js, NestJS, and Prisma
- UI styled with Tailwind CSS
