FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app

# Copy workspace files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./
COPY workers/queue/package.json ./workers/queue/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY workers/queue ./workers/queue
COPY tsconfig.base.json ./

# Build
WORKDIR /app/workers/queue
RUN pnpm build

CMD ["node", "dist/index.js"]
