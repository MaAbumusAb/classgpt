FROM node:18-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy workspace files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/sdk/package.json ./packages/sdk/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/backend ./apps/backend
COPY packages/sdk ./packages/sdk
COPY tsconfig.base.json ./

# Generate Prisma client
WORKDIR /app/apps/backend
RUN pnpm prisma:generate

# Build
RUN pnpm build

# Production image
FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app

# Copy built files
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/node_modules ./node_modules
COPY --from=builder /app/apps/backend/package.json ./

# Copy Prisma files
COPY --from=builder /app/apps/backend/prisma ./prisma

EXPOSE 3001

CMD ["node", "dist/main.js"]
