"use client";

import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// ─── Simple inline styles ────────────────────────────────────────────────────
const styles = {
    container: { maxWidth: 800, margin: "40px auto", padding: "0 20px" },
    header: { textAlign: "center", marginBottom: 32 },
    title: { fontSize: 32, fontWeight: 700, color: "#1a1a2e", margin: 0 },
    subtitle: { color: "#666", marginTop: 8 },
    card: {
        background: "#fff", borderRadius: 12, padding: 24,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: 20
    },
    badge: {
        display: "inline-block", padding: "4px 12px", borderRadius: 20,
        fontSize: 13, fontWeight: 600
    },
    healthy: { background: "#d4edda", color: "#155724" },
    error: { background: "#f8d7da", color: "#721c24" },
    loading: { background: "#fff3cd", color: "#856404" },
    btn: {
        padding: "10px 24px", borderRadius: 8, border: "none",
        cursor: "pointer", fontWeight: 600, fontSize: 14,
        background: "#4361ee", color: "#fff", marginRight: 8
    },
    btnGhost: {
        padding: "10px 24px", borderRadius: 8,
        border: "2px solid #4361ee", cursor: "pointer",
        fontWeight: 600, fontSize: 14,
        background: "transparent", color: "#4361ee"
    },
    grid: {
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px,1fr))",
        gap: 16, marginTop: 16
    },
    itemCard: {
        background: "#f8f9fa", borderRadius: 10, padding: 16,
        textAlign: "center", border: "1px solid #e9ecef"
    },
    emoji: { fontSize: 40, display: "block", marginBottom: 8 },
    itemName: { fontWeight: 600, color: "#1a1a2e", marginBottom: 4 },
    itemPrice: { color: "#4361ee", fontWeight: 700 },
    sectionTitle: { fontSize: 18, fontWeight: 700, color: "#1a1a2e", marginBottom: 16 },
    urlPill: {
        fontFamily: "monospace", fontSize: 12, background: "#f0f2f5",
        padding: "2px 8px", borderRadius: 4, color: "#555"
    },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function Home() {
    const [health, setHealth] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState({ health: false, items: false });
    const [error, setError] = useState({ health: null, items: null });

    // Auto-fetch health on mount
    useEffect(() => { fetchHealth(); }, []);

    async function fetchHealth() {
        setLoading(p => ({ ...p, health: true }));
        setError(p => ({ ...p, health: null }));
        try {
            const res = await fetch(`${API_URL}/api/health`);
            const data = await res.json();
            setHealth(data);
        } catch (e) {
            setError(p => ({ ...p, health: "Cannot reach backend: " + e.message }));
        } finally {
            setLoading(p => ({ ...p, health: false }));
        }
    }

    async function fetchItems() {
        setLoading(p => ({ ...p, items: true }));
        setError(p => ({ ...p, items: null }));
        try {
            const res = await fetch(`${API_URL}/api/items`);
            const data = await res.json();
            setItems(data.items);
        } catch (e) {
            setError(p => ({ ...p, items: "Cannot reach backend: " + e.message }));
        } finally {
            setLoading(p => ({ ...p, items: false }));
        }
    }

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <main style={styles.container}>

            {/* Header */}
            <div style={styles.header}>
                <h1 style={styles.title}>🚀 Simple Fullstack App</h1>
                <p style={styles.subtitle}>
                    Next.js &nbsp;+&nbsp; FastAPI &nbsp;|&nbsp;
                    <span style={styles.urlPill}>{API_URL}</span>
                </p>
            </div>

            {/* Health Card */}
            <div style={styles.card}>
                <div style={styles.sectionTitle}>🩺 Backend Health Check</div>

                {loading.health && (
                    <span style={{ ...styles.badge, ...styles.loading }}>⏳ Checking…</span>
                )}

                {error.health && (
                    <span style={{ ...styles.badge, ...styles.error }}>❌ {error.health}</span>
                )}

                {health && !error.health && (
                    <div>
                        <span style={{ ...styles.badge, ...styles.healthy }}>✅ {health.status}</span>
                        <p style={{ margin: "12px 0 0", color: "#555", fontSize: 14 }}>
                            Last checked: <strong>{health.timestamp}</strong>
                        </p>
                    </div>
                )}

                <div style={{ marginTop: 16 }}>
                    <button style={styles.btn} onClick={fetchHealth} disabled={loading.health}>
                        {loading.health ? "Checking…" : "Re-check Health"}
                    </button>
                </div>
            </div>

            {/* Items Card */}
            <div style={styles.card}>
                <div style={styles.sectionTitle}>🛒 Items from API</div>

                {error.items && (
                    <span style={{ ...styles.badge, ...styles.error }}>❌ {error.items}</span>
                )}

                {items.length > 0 && (
                    <div style={styles.grid}>
                        {items.map(item => (
                            <div key={item.id} style={styles.itemCard}>
                                <span style={styles.emoji}>{item.emoji}</span>
                                <div style={styles.itemName}>{item.name}</div>
                                <div style={styles.itemPrice}>${item.price.toFixed(2)}</div>
                            </div>
                        ))}
                    </div>
                )}

                {items.length === 0 && !loading.items && !error.items && (
                    <p style={{ color: "#888", margin: 0 }}>Click the button to load items.</p>
                )}

                <div style={{ marginTop: 20 }}>
                    <button style={styles.btn} onClick={fetchItems} disabled={loading.items}>
                        {loading.items ? "Loading…" : "Fetch Items"}
                    </button>
                    {items.length > 0 && (
                        <button style={styles.btnGhost} onClick={() => setItems([])}>
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Footer */}
            <p style={{ textAlign: "center", color: "#aaa", fontSize: 13 }}>
                API Docs → <a href={`${API_URL}/docs`} target="_blank" rel="noreferrer"
                    style={{ color: "#4361ee" }}>{API_URL}/docs</a>
            </p>

        </main>
    );
}