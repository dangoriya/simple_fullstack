"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import GalleryHeader from "./components/gallery/GalleryHeader";
import AppCard from "./components/gallery/AppCard";
import AddAppModal from "./components/gallery/AddAppModal";
import AuthModal from "./components/auth/AuthModal";
import { SafeIcon } from "./components/IconHelper";
import { INITIAL_APPS, MOCK_USERS } from "./data/mockData";

export default function Home() {
    const [apps, setApps] = useState([]);
    const [currentUser, setCurrentUser] = useState(MOCK_USERS.user);
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    // Load initial apps from localStorage if available, or fallback to INITIAL_APPS
    useEffect(() => {
        const savedApps = localStorage.getItem("devhub_apps");
        if (savedApps) {
            try {
                setApps(JSON.parse(savedApps));
            } catch (e) {
                setApps(INITIAL_APPS);
            }
        } else {
            setApps(INITIAL_APPS);
        }
    }, []);

    // Save apps state to localStorage on changes
    const handleAddApp = (newApp) => {
        const updated = [...apps, newApp];
        setApps(updated);
        localStorage.setItem("devhub_apps", JSON.stringify(updated));
    };

    // Filter apps based on user role permission and search query
    const filteredApps = apps.filter((app) => {
        // 1. Role permission filter
        let hasAccess = false;
        if (currentUser.role === "admin-only") {
            hasAccess = true;
        } else if (currentUser.role === "normal-user") {
            hasAccess = app.access === "all" || app.access === "normal-user";
        } else {
            // guest
            hasAccess = app.access === "all";
        }

        if (!hasAccess) return false;

        // 2. Search query filter
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
            app.title.toLowerCase().includes(q) ||
            app.description.toLowerCase().includes(q)
        );
    });

    const isAdmin = currentUser.role === "admin-only";

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-[#151a28] via-[#0b0d14] to-[#0c0e17]">
            {/* Left Sidebar */}
            <Sidebar
                currentUser={currentUser}
                onOpenAuthModal={() => setIsAuthModalOpen(true)}
                isMobileOpen={isMobileNavOpen}
                onCloseMobile={() => setIsMobileNavOpen(false)}
            />

            {/* Main Application Content Area */}
            <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto w-full max-w-7xl mx-auto">
                {/* Header & Search */}
                <GalleryHeader
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
                />

                {/* Application Gallery Grid (At least 2 cards per row on mobile) */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6">
                    {filteredApps.map((app) => (
                        <AppCard key={app.id} app={app} userRole={currentUser.role} />
                    ))}

                    {/* Add New App Tile (Only allowed for Admin User) */}
                    {isAdmin && (
                        <div
                            onClick={() => setIsAddModalOpen(true)}
                            className="border-2 border-dashed border-white/20 hover:border-white/45 rounded-2xl min-h-[160px] sm:min-h-[210px] p-4 flex flex-col items-center justify-center gap-2 sm:gap-3 cursor-pointer bg-white/[0.01] hover:bg-white/[0.04] text-white/60 hover:text-white transition-all duration-250 hover:-translate-y-1"
                        >
                            <SafeIcon name="Plus" size={28} />
                            <span className="text-xs sm:text-sm font-semibold text-center">Add New App</span>
                        </div>
                    )}
                </div>

                {/* Empty Search Results Notice */}
                {filteredApps.length === 0 && (
                    <div className="text-center py-20 text-gray-400 text-sm">
                        <SafeIcon name="SearchX" size={48} className="mx-auto mb-3 opacity-50" />
                        <p>No applications found matching &quot;{searchQuery}&quot;.</p>
                    </div>
                )}
            </main>

            {/* Modals */}
            <AddAppModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAddApp={handleAddApp}
            />

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                currentRole={currentUser.role}
                onSelectUser={(user) => setCurrentUser(user)}
            />
        </div>
    );
}