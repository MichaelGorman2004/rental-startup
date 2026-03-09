# ──────────────────────────────────────────────
# Stage 1: Build — compile TypeScript and bundle with Vite
# ──────────────────────────────────────────────
# NOTE: Build context must be the REPO ROOT so shared/ is accessible.
#   docker build -f frontend/Dockerfile .
FROM node:20-alpine AS builder

WORKDIR /build

# Copy workspace root config and lockfile (layer caching)
COPY package.json package-lock.json ./

# Copy package manifests for workspaces
COPY frontend/package.json frontend/
COPY shared/package.json shared/

# Install all workspace dependencies
RUN npm ci

# Copy shared source (needed by frontend at build time)
COPY shared/ shared/

# Copy frontend source
COPY frontend/ frontend/

# Build the frontend — VITE_* env vars are baked in at this step
WORKDIR /build/frontend
RUN npm run build

# ──────────────────────────────────────────────
# Stage 2: Runtime — serve static files with Nginx
# ──────────────────────────────────────────────
FROM nginx:stable-alpine AS runtime

# Remove default Nginx site
RUN rm /etc/nginx/conf.d/default.conf

# Copy our Nginx config (uses envsubst for PORT)
COPY frontend/nginx.conf /etc/nginx/templates/default.conf.template

# Copy built static files from builder stage
COPY --from=builder /build/frontend/dist /usr/share/nginx/html

# Railway injects PORT at runtime (defaults to 80 for local testing)
ENV PORT=80

# Nginx's docker image auto-runs envsubst on .template files at startup,
# substituting ${PORT} before starting Nginx
EXPOSE ${PORT}

CMD ["nginx", "-g", "daemon off;"]
