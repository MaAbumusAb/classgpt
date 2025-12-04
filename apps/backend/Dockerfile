FROM node:18-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Build stage
FROM base AS builder

WORKDIR /app

# Copy workspace files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./
COPY tsconfig.base.json ./

# Copy backend app
COPY apps/backend ./apps/backend

# Install dependencies
RUN pnpm install --frozen-lockfile

# Generate Prisma client
RUN cd apps/backend && pnpm prisma:generate

# Build the backend
RUN pnpm --filter @classgpt/backend build

# Production stage
FROM base AS runner

WORKDIR /app

# Copy workspace config
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-workspace.yaml ./

# Copy built backend
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/backend/node_modules ./apps/backend/node_modules
COPY --from=builder /app/apps/backend/package.json ./apps/backend/
COPY --from=builder /app/apps/backend/prisma ./apps/backend/prisma

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

WORKDIR /app/apps/backend

EXPOSE 3001

CMD ["node", "dist/main.js"]
