# VenueLink

> Connect. Book. Celebrate. — The platform connecting college organizations with local bars and event venues.

## Prerequisites

- **Node.js** >= 18
- **npm** >= 9
- **Python** >= 3.11
- **Poetry** >= 1.7 ([Install Poetry](https://python-poetry.org/docs/#installation))
- **Docker & Docker Compose** (for PostgreSQL)

## Installation

```bash
git clone <repository-url>
cd rental-startup

# Install dependencies
npm install
cd backend && poetry install && cd ..

# Copy environment files and add your keys (see docs/REPO.md for required vars)
cp frontend/.env.example frontend/.env
# Create backend/.env with DATABASE_URL, CLERK_PEM_PUBLIC_KEY (see docs/REPO.md)
```

## Run

```bash
npm run dev
```

Starts the database (Docker), backend (FastAPI), and frontend (Vite). On first run, apply migrations: `cd backend && poetry run alembic upgrade head`.

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Full stack (DB + Backend + Frontend) |
| `npm run dev:frontend` | Frontend only |
| `npm run dev:backend` | Backend only |
| `npm run db:up` | Database only |
| `npm run lint` | Lint frontend and backend |
| `npm run type-check` | Type check TypeScript and Python |
| `npm run format` | Format with Prettier and Black |
| `npm run test` | Run all tests |

## Project Structure

```
rental-startup/
├── frontend/     # React + TypeScript + Vite
├── backend/      # FastAPI + SQLAlchemy + PostgreSQL
├── shared/       # @venuelink/shared - TypeScript types & constants
└── docs/         # Documentation
```

## Documentation

- **[docs/REPO.md](docs/REPO.md)** — Project status, architecture, structure, environment config
- **[tasks.md](tasks.md)** — Task list and roadmap
- **[FRONTEND_RULES.md](FRONTEND_RULES.md)** — Frontend conventions
- **[BACKEND_RULES.md](BACKEND_RULES.md)** — Backend conventions
- **[docs/ui-mockup.html](docs/ui-mockup.html)** — UI mockups
