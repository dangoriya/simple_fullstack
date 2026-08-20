"use client";

import React, { useState } from "react";
import { SafeIcon } from "../IconHelper";
import { COLOR_PRESETS, ICON_OPTIONS } from "../../data/mockData";

export default function AddAppModal({ isOpen, onClose, onAddApp }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [icon, setIcon] = useState("Bot");
    const [color, setColor] = useState("#10b981");
    const [access, setAccess] = useState("all");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !link) return;

        const newApp = {
            id: `app-${Date.now()}`,
            title,
            description: description || "Centralized launchpad application.",
            link,
            icon,
            color,
            access,
        };

        onAddApp(newApp);
        // Reset form
        setTitle("");
        setDescription("");
        setLink("");
        setIcon("Bot");
        setColor("#10b981");
        setAccess("all");
        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-[#111420] border border-white/15 rounded-2xl w-full max-w-lg p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-white">Add New Application</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors"
                    >
                        <SafeIcon name="X" size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                            Application Title *
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. AI Studio"
                            className="w-full px-3.5 py-2.5 bg-white/5 border border-white/12 focus:border-sky-400 rounded-xl text-white text-sm outline-none transition-all"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* Short Description */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                            Short Description
                        </label>
                        <textarea
                            rows={2}
                            placeholder="Briefly describe what this app does..."
                            className="w-full px-3.5 py-2.5 bg-white/5 border border-white/12 focus:border-sky-400 rounded-xl text-white text-sm outline-none transition-all resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* Link */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                            Application Link (URL) *
                        </label>
                        <input
                            type="url"
                            required
                            placeholder="https://example.com"
                            className="w-full px-3.5 py-2.5 bg-white/5 border border-white/12 focus:border-sky-400 rounded-xl text-white text-sm outline-none transition-all"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        />
                    </div>

                    {/* Choose Icon */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                            Choose Icon
                        </label>
                        <div className="grid grid-cols-6 gap-2">
                            {ICON_OPTIONS.map((opt) => (
                                <button
                                    key={opt.id}
                                    type="button"
                                    className={`aspect-square rounded-xl flex items-center justify-center transition-all ${
                                        icon === opt.id
                                            ? "bg-sky-500/20 border-2 border-sky-400 text-sky-400"
                                            : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                                    }`}
                                    onClick={() => setIcon(opt.id)}
                                    title={opt.label}
                                >
                                    <SafeIcon name={opt.id} size={20} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Choose Color */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                            Main Accent Color (Auto Gradient)
                        </label>
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-9 h-9 border-0 rounded-lg cursor-pointer bg-transparent"
                            />
                            <div className="flex flex-wrap gap-2">
                                {COLOR_PRESETS.map((p) => (
                                    <div
                                        key={p.hex}
                                        className={`w-7 h-7 rounded-full cursor-pointer border-2 transition-transform hover:scale-110 ${
                                            color.toLowerCase() === p.hex.toLowerCase()
                                                ? "border-white scale-110 shadow-lg"
                                                : "border-transparent"
                                        }`}
                                        style={{ backgroundColor: p.hex }}
                                        onClick={() => setColor(p.hex)}
                                        title={p.name}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Access Permission */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                            Access Control
                        </label>
                        <select
                            className="w-full px-3.5 py-2.5 bg-[#111420] border border-white/12 focus:border-sky-400 rounded-xl text-white text-sm outline-none"
                            value={access}
                            onChange={(e) => setAccess(e.target.value)}
                        >
                            <option value="all">All (Everyone / Guests)</option>
                            <option value="normal-user">Normal User & Admin</option>
                            <option value="admin-only">Admin Only</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold text-sm transition-all shadow-lg"
                    >
                        Create Application
                    </button>
                </form>
            </div>
        </div>
    );
}
