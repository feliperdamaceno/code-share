# ---- Stage: Base ----
FROM node:22-alpine AS base
WORKDIR /app

RUN apk add --no-cache make
RUN corepack enable && corepack prepare pnpm@latest --activate

# ---- Stage: Build ----
FROM base AS build
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps ./apps
COPY packages ./packages
COPY Makefile ./

RUN pnpm install
RUN make build

# ---- Stage: Runtime ----
FROM node:22-alpine AS runtime
WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/server ./apps/server
COPY --from=build /app/apps/server/mock ./mock
COPY --from=build /app/apps/server/static ./static

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 4000

CMD ["node", "apps/server/dist/cmd/main.js"]