# Backend Development Guide (`uv`)

This guide covers local development setup using [`uv`](https://github.com/astral-sh/uv), an extremely fast Python package and environment manager written in Rust.

---

## 1. Prerequisites

Install `uv` on your local system:

### Linux / macOS:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Windows (PowerShell):
```powershell
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### via Pip (Alternative):
```bash
pip install uv
```

---

## 2. Local Setup & Virtual Environment

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Create a virtual environment**:
   ```bash
   uv venv
   ```
   *This creates a `.venv` directory instantly.*

3. **Activate the virtual environment**:
   - **Linux / macOS**:
     ```bash
     source .venv/bin/activate
     ```
   - **Windows (PowerShell)**:
     ```powershell
     .venv\Scripts\activate
     ```

4. **Install dependencies**:
   ```bash
   uv pip install -r requirements.txt
   ```

---

## 3. Running Development Server

Run FastAPI hot-reloading server locally using `uv`:

```bash
uv run uvicorn main:app --reload --port 8000
```

---

## 4. Managing Dependencies

- **Add a new package**:
  ```bash
  uv pip install <package-name>
  ```
- **Update `requirements.txt`**:
  ```bash
  uv pip freeze > requirements.txt
  ```

---

## 5. Production & Docker

Production Docker builds automatically use `uv` via multi-stage binary copying (`COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/`) for lightning-fast container dependency installation.
