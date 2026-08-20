import React from "react";
import {
    Bot,
    GitBranch,
    Cloud,
    Database,
    BarChart3,
    Code2,
    Terminal,
    Globe,
    ShieldCheck,
    Cpu,
    Sparkles,
    Layers,
    AppWindow,
    LayoutDashboard,
    ExternalLink,
    Search,
    SearchX,
    Plus,
    X,
    UserCheck,
    ChevronRight,
    User,
    Mail,
    Menu,
    PanelLeftClose
} from "lucide-react";

const ICON_MAP = {
    Bot,
    GitBranch,
    Cloud,
    Database,
    BarChart3,
    Code2,
    Terminal,
    Globe,
    ShieldCheck,
    Cpu,
    Sparkles,
    Layers,
    AppWindow,
    LayoutDashboard,
    ExternalLink,
    Search,
    SearchX,
    Plus,
    X,
    UserCheck,
    ChevronRight,
    User,
    Mail,
    Menu,
    PanelLeftClose
};

export function SafeIcon({ name, size = 20, className = "", style = {} }) {
    const Component = ICON_MAP[name] || AppWindow;
    return <Component size={size} className={className} style={style} />;
}
