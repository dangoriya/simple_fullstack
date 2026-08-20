# Simple Fullstack App — Next.js + FastAPI

## Quick Start (Docker)

```bash
# 1. Clone
git clone https://github.com/dilip-dangoriya/simple_fullstack.git
cd simple_fullstack

# 2. Run with Docker Compose
docker compose up --build -d

# Frontend → http://localhost:3000
# Backend  → http://localhost:8000
# API Docs → http://localhost:8000/docs
```

---

## Local Development Guides

For standalone local development without Docker:

* 🎨 **Frontend Setup (`pnpm`)**: See [`frontend/DEVELOPMENT.md`](./frontend/DEVELOPMENT.md) for Next.js and `pnpm` setup instructions.
* ⚡ **Backend Setup (`uv`)**: See [`backend/DEVELOPMENT.md`](./backend/DEVELOPMENT.md) for FastAPI and `uv` package manager setup instructions.