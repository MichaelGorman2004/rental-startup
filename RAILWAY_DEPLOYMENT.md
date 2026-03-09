# VenueLink — Railway Deployment Tracker

> Tracks all progress, decisions, and remaining work for deploying VenueLink to Railway.

---

## Architecture

| Service | Type | Details |
|---------|------|---------|
| **PostgreSQL** | Railway managed plugin | Provisioned via Railway dashboard, US East |
| **Backend API** | Docker container | FastAPI + uvicorn, root dir `/backend`, Dockerfile builder |
| **Frontend** | Docker container (Nginx) | Vite build → Nginx static serve, root dir `/`, Dockerfile at `frontend/Dockerfile` |

**Networking:**
- Railway assigns each service a `*.railway.app` domain
- Backend CORS must allow the frontend domain
- Frontend talks to backend via `VITE_API_BASE_URL` (no dev proxy in prod)
- Backend uses internal (private) `DATABASE_URL` from Postgres plugin

---

## Environment Variables

### Backend Service

| Variable | Status | Value / Source |
|----------|--------|----------------|
| `DATABASE_URL` | SET (linked) | Referenced from Postgres plugin (internal URL) |
| `SECRET_KEY` | SET | Generated via `openssl rand -hex 32` |
| `ENVIRONMENT` | SET | `production` |
| `CLERK_SECRET_KEY` | SET | `sk_test_...` (dev key for now) |
| `CLERK_PUBLISHABLE_KEY` | SET | `pk_test_...` (dev key for now) |
| `CORS_ORIGINS` | **TODO** | Set to frontend Railway URL once frontend is deployed |
| `CLERK_WEBHOOK_SECRET` | **TODO** | Needed for Clerk webhook verification — get from Clerk dashboard when setting up webhook endpoint |
| `CLERK_PEM_PUBLIC_KEY` | **TODO** | Needed for JWT verification — get from Clerk dashboard (API Keys → Advanced → PEM public key) |

### Frontend Service (build-time only)

| Variable | Status | Value / Source |
|----------|--------|----------------|
| `VITE_API_BASE_URL` | **TODO** | Set to backend Railway URL once backend is deployed |
| `VITE_CLERK_PUBLISHABLE_KEY` | **TODO** | `pk_test_...` (same key as backend's `CLERK_PUBLISHABLE_KEY`) |

---

## Remaining Steps to Fully Functional

### Backend (in progress)
- [ ] Wait for first backend deploy to succeed
- [ ] Verify `/api/health` returns `{"status": "healthy"}` via the Railway public URL
- [ ] Note the backend URL for frontend config

### Frontend (not started)
- [ ] Create frontend service in Railway (GitHub repo, root dir `/`, Dockerfile path `frontend/Dockerfile`)
- [ ] Set `VITE_API_BASE_URL` to backend Railway URL
- [ ] Set `VITE_CLERK_PUBLISHABLE_KEY` to `pk_test_d29uZHJvdXMtcmFtLTE5LmNsZXJrLmFjY291bnRzLmRldiQ`
- [ ] Generate domain for frontend service
- [ ] Deploy frontend and verify app loads in browser

### Cross-wiring (after both services are up)
- [ ] Set backend `CORS_ORIGINS` to the frontend Railway URL (triggers backend redeploy)
- [ ] Verify frontend can make API calls to backend (no CORS errors)

### Clerk Production Setup (for go-live)
- [ ] Create Clerk **production** instance (separate from development)
- [ ] Swap `CLERK_SECRET_KEY` and `CLERK_PUBLISHABLE_KEY` to `sk_live_...` / `pk_live_...` on backend
- [ ] Swap `VITE_CLERK_PUBLISHABLE_KEY` to `pk_live_...` on frontend (triggers rebuild)
- [ ] Set up Clerk webhook endpoint pointing to `https://<backend-url>/webhooks/clerk`
- [ ] Copy webhook signing secret to backend `CLERK_WEBHOOK_SECRET`
- [ ] Copy PEM public key to backend `CLERK_PEM_PUBLIC_KEY`

### Production Hardening (optional, post-launch)
- [ ] Configure custom domains (if applicable)
- [ ] Disable serverless on backend if cold starts are an issue
- [ ] Review and tighten CORS for production domains only
- [ ] Test full booking flow end-to-end
- [ ] Set up monitoring/alerts in Railway

---

## Task Checklist (completed)

### Phase 1: Dockerfiles & Config

- [x] **1.1** Create `backend/Dockerfile` (multi-stage: poetry export → pip install in slim image) — 388MB
- [x] **1.2** Update backend `config.py` — `model_validator` auto-swaps `postgresql://` → `postgresql+asyncpg://`
- [x] **1.3** Create `frontend/Dockerfile` (multi-stage: Node build → Nginx Alpine serve) — 98MB
- [x] **1.4** Create `frontend/nginx.conf` (SPA fallback, gzip, asset caching, `$PORT` envsubst)
- [x] **1.5** Verify both Dockerfiles build locally with `docker build`

### Phase 2: Railway Project Setup

- [x] **2.1** Create Railway project (Empty Project)
- [x] **2.2** Provision PostgreSQL plugin (US East)
- [x] **2.3** Create backend service — repo connected, root dir `/backend`, Dockerfile builder, Metal build, serverless enabled, healthcheck `/api/health`, watch path `backend/**`
- [ ] **2.4** Create frontend service
- [x] **2.5** Backend env vars set (DATABASE_URL linked, SECRET_KEY, ENVIRONMENT, Clerk test keys)

---

## Decisions & Notes

### DATABASE_URL Translation
Railway provides `postgresql://user:pass@host:port/db`. SQLAlchemy async requires `postgresql+asyncpg://...`. The backend `config.py` `model_validator` auto-detects and replaces the scheme at startup.

### Frontend Build Context
The frontend imports from `@venuelink/shared` (path alias to `../shared/src`). The Docker build context must be the repo root (`/`). The Dockerfile path is `frontend/Dockerfile`.

### Migration Strategy
Migrations run inline before the server starts (`alembic upgrade head && uvicorn ...`). Idempotent and safe for Railway's deploy model.

### Vite Env Vars
`VITE_*` vars are embedded at build time. Changing them requires a redeploy/rebuild — they cannot be swapped at runtime.

### Clerk Keys
Currently using **development/test** Clerk keys (`sk_test_`, `pk_test_`). These work for testing but must be swapped to production keys (`sk_live_`, `pk_live_`) before going live. Clerk dev and prod instances are separate — users created in dev won't exist in prod.

### Serverless
Backend has serverless enabled (scales to zero when idle). Good for dev/staging to save costs. Disable for production if cold start latency is unacceptable.

---

## Progress Log

| Date | What |
|------|------|
| 2026-03-08 | Created deployment plan and tracker |
| 2026-03-08 | Phase 1 complete: Dockerfiles, nginx.conf, config.py DATABASE_URL fix, local builds verified |
| 2026-03-08 | Railway project created, Postgres provisioned, backend service configured with env vars, awaiting first deploy |
