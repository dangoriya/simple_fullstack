from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import datetime

app = FastAPI(title="Simple API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Item not found")
    return items[item_id]