# Stage 1: Install dependencies and build
ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-slim AS base

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy only the package.json, pnpm-lock.yaml, and turbo as dependency for caching
COPY ./pnpm-lock.yaml ./pnpm-workspace.yaml ./
COPY ./apps/api/package.json ./apps/api/
COPY ./packages/db/package.json ./packages/db/
COPY ./packages/logger/package.json ./packages/logger/
COPY ./package.json ./  

# Install all dependencies
RUN pnpm install 

# Copy the rest of the repo files
COPY . .

# Build the necessary packages and apps
RUN pnpm turbo run db:generate 
RUN pnpm turbo run build --filter=api...

# Stage 2: Final image for running the API
FROM node:${NODE_VERSION}-slim

# Set working directory
WORKDIR /app


COPY --from=base /app/apps/api/dist  /app/apps/api/dist
COPY --from=base /app/apps/api/node_modules /app/apps/api/node_modules

ENV NODE_ENV=production


# Expose the port your API will run on
EXPOSE 8000
# CMD ["sh", "-c", "tail -f /dev/null"]
CMD ["node", "/app/apps/api/dist/index.js"]
