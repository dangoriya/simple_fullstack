"use client";

import React from "react";
import { SafeIcon } from "../IconHelper";

// Helper function to convert Hex color to RGBA
function hexToRgba(hex, alpha = 1) {
    if (!hex) return `rgba(56, 189, 248, ${alpha})`;
    let c = hex.replace("#", "");
    if (c.length === 3) {
        c = c.split("").map((x) => x + x).join("");
    }
    const num = parseInt(c, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function AppCard({ app, userRole }) {
    const mainColor = app.color || "#10b981";

    // Dynamic style variables for gradient effect
    const cardStyle = {
        "--card-border": hexToRgba(mainColor, 0.3),
        "--card-gradient": `radial-gradient(circle at 20% 20%, ${hexToRgba(mainColor, 0.28)} 0%, rgba(17, 20, 32, 0.95) 70%)`,
        "--card-glow": hexToRgba(mainColor, 0.35),
    };

    return (
        <div
            className="app-card-container relative rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[160px] sm:min-h-[210px] overflow-hidden"
            style={cardStyle}
        >
            {userRole === "admin-only" && app.access !== "all" && (
                <span className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-black/40 border border-white/15 text-gray-300">
                    {app.access === "admin-only" ? "Admin" : "Users"}
                </span>
            )}

            <div>
                <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 border border-white/15"
                    style={{
                        backgroundColor: hexToRgba(mainColor, 0.18),
                        color: mainColor,
                    }}
                >
                    <SafeIcon name={app.icon} size={22} className="sm:hidden" />
                    <SafeIcon name={app.icon} size={26} className="hidden sm:block" />
                </div>
                <h3 className="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2 leading-tight">
                    {app.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-white/70 leading-normal sm:leading-relaxed mb-4 line-clamp-2">
                    {app.description}
                </p>
            </div>

            <a
                href={app.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold hover:underline w-fit transition-opacity hover:opacity-85"
                style={{ color: mainColor }}
            >
                Launch <SafeIcon name="ExternalLink" size={13} />
            </a>
        </div>
    );
}
