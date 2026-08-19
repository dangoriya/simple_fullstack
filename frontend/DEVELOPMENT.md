# Frontend Local Development & Setup Guide

This document provides a step-by-step setup guide to run and test the frontend application locally on a fresh development machine.

---

## 📋 Prerequisites

- **Node.js**: v20.x (LTS recommended)
- **Package Manager**: `pnpm` v9.x (pinned for Node 20 compatibility)

---

## 🛠️ Step 1: Local Environment Setup

### 1. Install Node.js (via `nvm`)
If Node.js is not installed on your machine, install it via Node Version Manager (`nvm`):

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Reload terminal environment
source ~/.bashrc

# Install & use Node 20
nvm install 20
nvm use 20
```

### 2. Install `pnpm` v9 globally
> **Note**: `pnpm@9` must be used with Node 20 to avoid `node:sqlite` module compatibility errors introduced in pnpm v10+.

```bash
npm install -g pnpm@9 --force
```

Verify installations:
```bash
node -v   # Should output v20.x.x
pnpm -v   # Should output 9.x.x
```

---

## 🚀 Step 2: Running the Frontend Locally

### 1. Navigate to the frontend directory
```bash
cd frontend
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Environment Variables Setup (.env.local)
Create a `.env.local` file inside `frontend/` to point to your local backend URL when testing without Docker Compose network aliases:

```env
NEXT_PUBLIC_API_URL=http://localhost:8051
```

> **Note**: `.env.local` is ignored in `.gitignore` and `.dockerignore` so local URLs are never baked into production Docker builds.

### 4. Start the development server
```bash
pnpm dev
```

The application will start at `http://localhost:3000` (or `http://localhost:3001` if port 3000 is occupied).

---

## 🧹 Troubleshooting Common Issues

### Issue 1: `EACCES: permission denied, open '.next/package.json'`
**Cause**: The `.next` directory was previously generated inside a Docker container or with `sudo` permissions.

**Fix**:
```bash
rm -rf .next node_modules
pnpm install
```

### Issue 2: `ERR_UNKNOWN_BUILTIN_MODULE: node:sqlite` when running `pnpm`
**Cause**: `pnpm` v10+ was installed, which requires Node.js v22+.

**Fix**:
```bash
npm install -g pnpm@9 --force
```

### Issue 3: `Failed to proxy http://backend:8000/api/health`
**Cause**: The frontend `next.config.js` proxies API requests to `http://backend:8000` which is only resolvable inside Docker containers when the backend container is running.

**Fix**:
Either start the backend container locally via Docker Compose:
```bash
docker compose up backend
```
Or create/update `frontend/.env.local` to point to `http://localhost:8051`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8051
```
