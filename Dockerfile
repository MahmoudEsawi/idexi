# syntax=docker/dockerfile:1

# Node 24 (Active LTS) rather than 20, which reached end of life in April 2026
# and no longer receives security patches. 24 also matches the Node version the
# lockfile was generated against and bundles npm 11, so `npm ci` validates the
# optional platform binaries (sharp, @img/*, @next/swc) consistently without a
# separate `npm install -g npm@11` step.
FROM node:24-alpine AS base
WORKDIR /app
# Keeps the build offline-friendly and quiet; Next.js otherwise phones home.
ENV NEXT_TELEMETRY_DISABLED=1

# ---- deps: install dependencies only (cached until package files change) ----
FROM base AS deps
# .npmrc is copied alongside the manifests on purpose. It pins
# `include=optional`, and without it here that setting would not apply to the
# `npm ci` below, which is precisely the install that resolves the Linux/musl
# native binaries this image needs.
COPY package.json package-lock.json .npmrc ./
# Cache mount keeps the npm cache across builds, so repeat builds skip the
# network entirely. Requires BuildKit, enabled by the syntax directive above.
RUN --mount=type=cache,target=/root/.npm npm ci

# ---- dev: hot-reloading development server (used by docker compose) ----
# Source is bind-mounted at runtime by compose, so nothing is copied in here.
FROM deps AS dev
ENV NODE_ENV=development
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ---- builder: build the Next.js app ----
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- runner: minimal production image ----
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

# Node 24 has global fetch, so the check needs no extra packages on Alpine.
HEALTHCHECK --interval=30s --timeout=3s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
