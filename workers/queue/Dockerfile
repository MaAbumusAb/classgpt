FROM node:18-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Build stage
FROM base AS builder

WORKDIR /app

# Copy workspace files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./
COPY tsconfig.base.json ./

# Copy worker
COPY workers/queue ./workers/queue

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build the worker
RUN pnpm --filter @classgpt/queue-worker build

# Production stage
FROM base AS runner

WORKDIR /app

# Copy workspace config
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-workspace.yaml ./

# Copy built worker
COPY --from=builder /app/workers/queue/dist ./workers/queue/dist
COPY --from=builder /app/workers/queue/node_modules ./workers/queue/node_modules
COPY --from=builder /app/workers/queue/package.json ./workers/queue/

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

WORKDIR /app/workers/queue

CMD ["node", "dist/index.js"]
