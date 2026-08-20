from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import datetime

app = FastAPI(title="Simple API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AppSchema(BaseModel):
    id: str
    title: str
    description: str
    link: str
    icon: str
    color: str
    access: str  # 'all' | 'normal-user' | 'admin-only'

# In-memory storage for applications
apps_db: List[dict] = [
    {
        "id": "app-1",
        "title": "AI Studio",
        "description": "LLM workbench for prompting & prototyping.",
        "link": "https://aistudio.google.com",
        "icon": "Bot",
        "color": "#10b981",
        "access": "all",
    },
    {
        "id": "app-2",
        "title": "GitHub",
        "description": "Code hosting, pull requests, and CI/CD pipelines.",
        "link": "https://github.com",
        "icon": "GitBranch",
        "color": "#6366f1",
        "access": "all",
    },
]

@app.get("/")
def root():
    return {"message": "Backend is running!", "version": "1.0.0"}

@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "timestamp": datetime.datetime.utcnow().isoformat()
    }

@app.get("/api/items")
def get_items():
    return {
        "items": [
            {"id": 1, "name": "Apple",  "price": 1.20, "emoji": "🍎"},
            {"id": 2, "name": "Banana", "price": 0.50, "emoji": "🍌"},
            {"id": 3, "name": "Cherry", "price": 3.00, "emoji": "🍒"},
            {"id": 4, "name": "Mango",  "price": 2.50, "emoji": "🥭"},
            {"id": 5, "name": "Orange", "price": 1.80, "emoji": "🍊"},
        ]
    }

@app.get("/api/items/{item_id}")
def get_item(item_id: int):
    items = {
        1: {"id": 1, "name": "Apple",  "price": 1.20, "emoji": "🍎"},
        2: {"id": 2, "name": "Banana", "price": 0.50, "emoji": "🍌"},
        3: {"id": 3, "name": "Cherry", "price": 3.00, "emoji": "🍒"},
    }
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item not found")
    return items[item_id]

# Application CRUD endpoints
@app.get("/api/apps", response_model=List[AppSchema])
def get_apps():
    return apps_db

@app.post("/api/apps", response_model=AppSchema, status_code=201)
def create_app(app_data: AppSchema):
    apps_db.append(app_data.dict())
    return app_data

@app.put("/api/apps/{app_id}", response_model=AppSchema)
def update_app(app_id: str, app_data: AppSchema):
    for idx, item in enumerate(apps_db):
        if item["id"] == app_id:
            apps_db[idx] = app_data.dict()
            return app_data
    raise HTTPException(status_code=404, detail="Application not found")

@app.delete("/api/apps/{app_id}")
def delete_app(app_id: str):
    global apps_db
    initial_len = len(apps_db)
    apps_db = [item for item in apps_db if item["id"] != app_id]
    if len(apps_db) == initial_len:
        raise HTTPException(status_code=404, detail="Application not found")
    return {"message": "Application deleted successfully", "id": app_id}