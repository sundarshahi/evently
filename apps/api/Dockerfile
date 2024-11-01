FROM node:20-alpine as build

ARG DATABASE_URL
ARG BASE_URL

WORKDIR /evently

# Install pnpm globally
RUN npm install -g pnpm

RUN set -eux;

ENV NODE_ENV="production"
ENV DATABASE_URL=${DATABASE_URL}
ENV BASE_URL=${BASE_URL}

COPY . .

RUN pnpm install

# Build prisma schema and make sure that it is linked to api node_modules
RUN pnpm --filter ./apps/api run  generate-schemas
RUN rm -rf apps/api/node_modules
RUN pnpm install 

RUN pnpm --filter ./apps/api run build    


EXPOSE 80

CMD ["pnpm", "--filter", "./apps/api", "run", "start:prod"]

