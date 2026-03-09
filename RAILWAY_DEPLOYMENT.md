# VenueLink — Railway Deployment Tracker

> Tracks all progress, decisions, and remaining work for deploying VenueLink to Railway.

---

## Live URLs

| Service | URL |
|---------|-----|
| **Frontend** | `https://venuelink.up.railway.app` |
| **Backend API** | `https://venuelink-backend-production.up.railway.app` |
| **API Health** | `https://venuelink-backend-production.up.railway.app/api/health` |
| **API Docs** | `https://venuelink-backend-production.up.railway.app/api/docs` |

---

## Architecture

| Service | Type | Details |
|---------|------|---------|
| **PostgreSQL** | Railway managed plugin | Provisioned via dashboard, US East |
| **Backend API** | Docker container | FastAPI + uvicorn, root dir `/backend`, Dockerfile builder, Metal build |
| **Frontend** | Docker container (Nginx) | Vite build → Nginx static serve, root dir `/`, Dockerfile at `frontend/Dockerfile`, Metal build |

**Region:** US East (`us-east4-eqdc4a`)

**Auto-deploy:** Both services auto-deploy on push to `main`

**Networking:**
- Frontend public domain: `venuelink.up.railway.app`
- Backend public domain: `venuelink-backend-production.up.railway.app`
- Backend internal domain: `venuelink.railway.internal` (used by other Railway services)
- Backend CORS allows: `https://venuelink.up.railway.app`
- Frontend calls backend via `VITE_API_BASE_URL` (no dev proxy in prod)
- Backend uses internal (private) `DATABASE_URL` from Postgres plugin

---

## Environment Variables

### Backend Service (`venuelink-backend`)

| Variable | Status | Value / Source |
|----------|--------|----------------|
| `DATABASE_URL` | SET | Referenced from Postgres plugin (internal URL, auto-converted to `asyncpg` scheme at startup) |
| `SECRET_KEY` | SET | Generated via `openssl rand -hex 32` |
| `ENVIRONMENT` | SET | `production` |
| `CORS_ORIGINS` | SET | `https://venuelink.up.railway.app` |
| `CLERK_SECRET_KEY` | SET | `sk_test_...` (dev key — swap to `sk_live_` for go-live) |
| `CLERK_PUBLISHABLE_KEY` | SET | `pk_test_...` (dev key — swap to `pk_live_` for go-live) |
| `CLERK_WEBHOOK_SECRET` | **TODO** | Needed for Clerk webhook verification (see TODOs below) |
| `CLERK_PEM_PUBLIC_KEY` | **TODO** | Needed for JWT verification (see TODOs below) |

### Frontend Service (`venuelink-frontend`)

| Variable | Status | Value / Source |
|----------|--------|----------------|
| `VITE_API_BASE_URL` | SET | `https://venuelink-backend-production.up.railway.app` |
| `VITE_CLERK_PUBLISHABLE_KEY` | SET | `pk_test_...` (dev key — swap to `pk_live_` for go-live) |

> **Note:** Frontend vars are build-time only (Vite bakes them into the JS bundle). Changing them requires a redeploy.

---

## Railway Service Config

### Backend Settings
- **Builder:** Dockerfile
- **Dockerfile Path:** `Dockerfile` (relative to root dir `/backend`)
- **Root Directory:** `/backend`
- **Watch Paths:** `backend/**`
- **Healthcheck:** `/api/health`
- **Serverless:** Enabled (scales to zero when idle — disable for production if cold starts are an issue)
- **Restart Policy:** On failure
- **Start Command:** Handled by Dockerfile CMD (`alembic upgrade head && uvicorn ...`)

### Frontend Settings
- **Builder:** Dockerfile
- **Dockerfile Path:** `frontend/Dockerfile` (relative to repo root)
- **Root Directory:** `/` (repo root — needs access to `shared/`)
- **Watch Paths:** `frontend/**`, `shared/**`
- **Serverless:** Optional
- **Start Command:** Handled by Dockerfile CMD (`nginx -g daemon off`)

### PostgreSQL
- **Plugin:** Railway managed PostgreSQL
- **Region:** US East
- **Connection:** Internal URL auto-linked to backend `DATABASE_URL`

---

## TODOs

### Clerk Webhook Setup (required for user sync)
The backend has a webhook endpoint at `/webhooks/clerk` that syncs Clerk user events (signup, role changes) to the database. This needs to be wired up:

1. Go to **Clerk Dashboard** → **Webhooks** → **Add Endpoint**
2. Set endpoint URL to: `https://venuelink-backend-production.up.railway.app/webhooks/clerk`
3. Subscribe to events: `user.created`, `user.updated`, `user.deleted`
4. Copy the **Signing Secret** (`whsec_...`) from Clerk
5. Add to Railway backend variables: `CLERK_WEBHOOK_SECRET` = the signing secret
6. Backend will auto-redeploy with the new variable

### Clerk PEM Public Key (required for JWT auth)
Used by the backend to verify Clerk JWTs on authenticated API requests:

1. Go to **Clerk Dashboard** → **API Keys** → scroll to **Advanced**
2. Copy the **PEM Public Key** (starts with `-----BEGIN PUBLIC KEY-----`)
3. Add to Railway backend variables: `CLERK_PEM_PUBLIC_KEY` = the full PEM key
4. Backend will auto-redeploy

### Clerk Production Keys (required for go-live)
Currently using development/test keys. Before real users access the app:

1. Create a **Clerk Production instance** (separate from development)
2. On Railway backend, swap:
   - `CLERK_SECRET_KEY` → `sk_live_...`
   - `CLERK_PUBLISHABLE_KEY` → `pk_live_...`
3. On Railway frontend, swap:
   - `VITE_CLERK_PUBLISHABLE_KEY` → `pk_live_...` (triggers rebuild)
4. Update the webhook endpoint URL in the new Clerk production instance
5. **Important:** Users created in Clerk dev won't exist in Clerk prod — they'll need to sign up again

### Custom Domains (optional)
If you want `app.venuelink.com` / `api.venuelink.com` instead of Railway URLs:

1. In Railway, go to each service → **Settings** → **Networking** → **Custom Domain**
2. Add your domain and configure DNS (CNAME record pointing to Railway)
3. Update backend `CORS_ORIGINS` to include the new frontend domain
4. Update frontend `VITE_API_BASE_URL` to the new backend domain (triggers rebuild)
5. Update Clerk webhook endpoint URL to new backend domain

### Production Hardening (optional)
- [ ] Disable serverless on backend if cold start latency is unacceptable
- [ ] Set up monitoring/alerts in Railway dashboard
- [ ] Review bundle size — frontend is 867KB uncompressed (267KB gzipped), consider code splitting
- [ ] Test full booking flow end-to-end in production
- [ ] Set up error tracking (e.g., Sentry)

---

## Completed Work

### Phase 1: Dockerfiles & Config
- [x] `backend/Dockerfile` — multi-stage: Poetry 2.3.2 export → pip install in Python 3.11-slim (388MB)
- [x] `backend/.dockerignore` — excludes tests, caches, env files
- [x] `backend/app/core/config.py` — `model_validator` auto-converts `postgresql://` → `postgresql+asyncpg://`
- [x] `frontend/Dockerfile` — multi-stage: Node 20 build with `ARG` for Vite vars → Nginx Alpine (98MB)
- [x] `frontend/nginx.conf` — SPA fallback, gzip, immutable asset caching, `$PORT` envsubst
- [x] `.dockerignore` — added `.env` exclusion
- [x] Both images verified building locally

### Phase 2: Railway Setup
- [x] Railway project created (Empty Project)
- [x] PostgreSQL provisioned (US East)
- [x] Backend service created and deployed
- [x] Frontend service created and deployed
- [x] All current env vars configured
- [x] CORS cross-wired between services
- [x] Health check verified: `/api/health` returns `{"status":"healthy","service":"venuelink-api"}`

---

## Decisions & Notes

### DATABASE_URL Translation
Railway provides `postgresql://`. SQLAlchemy async requires `postgresql+asyncpg://`. The backend `config.py` `model_validator` auto-converts at startup — no manual rewriting needed.

### Frontend Build Args
Vite env vars must be declared as `ARG` in the Dockerfile so Railway can pass them at build time. Without this, `import.meta.env.VITE_*` resolves to `undefined` in the bundle.

### Frontend Build Context
The frontend imports from `@venuelink/shared` via path alias. The Docker build context must be the repo root (`/`), not `frontend/`. The Dockerfile is at `frontend/Dockerfile`.

### Migration Strategy
`alembic upgrade head` runs inline before uvicorn starts in the Dockerfile CMD. Idempotent and safe — runs on every deploy.

### Serverless
Backend has serverless enabled. Saves costs when idle but introduces cold start delay (~2-5s) on first request after sleeping. Disable for production.

---

## Progress Log

| Date | What |
|------|------|
| 2026-03-08 | Created deployment plan and tracker |
| 2026-03-08 | Phase 1 complete: Dockerfiles, nginx.conf, config.py DATABASE_URL fix, local builds verified |
| 2026-03-08 | Railway project created, Postgres provisioned, backend service configured with env vars |
| 2026-03-08 | Backend deployed successfully — `https://venuelink-backend-production.up.railway.app` |
| 2026-03-08 | Frontend deployed successfully — `https://venuelink.up.railway.app` |
| 2026-03-08 | Fixed frontend Dockerfile: added `ARG` declarations for `VITE_*` build-time env vars |
| 2026-03-08 | CORS configured, full deployment complete. Both services live and communicating. |
