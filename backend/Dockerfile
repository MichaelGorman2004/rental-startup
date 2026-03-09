# ──────────────────────────────────────────────
# Stage 1: Build — install dependencies via Poetry
# ──────────────────────────────────────────────
FROM python:3.11-slim AS builder

WORKDIR /build

# Install poetry in an isolated location
ENV POETRY_HOME="/opt/poetry" \
    POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_CREATE=false

RUN pip install --no-cache-dir poetry==2.3.2 poetry-plugin-export==1.9.0

# Copy dependency manifests first (Docker layer caching)
COPY pyproject.toml poetry.lock ./

# Export production dependencies to requirements.txt
# This avoids needing poetry in the final image
RUN poetry export --without=dev --format=requirements.txt --output=requirements.txt

# ──────────────────────────────────────────────
# Stage 2: Runtime — slim production image
# ──────────────────────────────────────────────
FROM python:3.11-slim AS runtime

WORKDIR /app

# Install only the system libraries required by asyncpg at runtime
RUN apt-get update && \
    apt-get install -y --no-install-recommends libpq5 && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies from exported requirements
COPY --from=builder /build/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy application source and alembic config
COPY alembic.ini ./
COPY alembic/ ./alembic/
COPY app/ ./app/

# Railway injects PORT at runtime (defaults to 8000 for local testing)
ENV PORT=8000

# Run migrations then start the server
# alembic upgrade head is idempotent — safe to run on every deploy
CMD alembic upgrade head && \
    uvicorn app.main:app --host 0.0.0.0 --port ${PORT}
