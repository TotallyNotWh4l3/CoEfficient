// frontend/src/constants/modules/announcementConstants.js
import { AlertTriangle, Wrench, Star, Bell, Clipboard, Info } from "lucide-react";

// Determines which category "wins" for card accent color / icon when an
// announcement has multiple tags. Urgent always wins.
export const CATEGORY_PRIORITY = [
    "urgent",
    "maintenance",
    "event",
    "announcement",
    "notice",
    "general",
];

export const CATEGORY_TABS = [
    "all",
    "urgent",
    "maintenance",
    "event",
    "announcement",
    "notice",
    "general",
];

export const CATEGORY_CONFIG = {
    urgent: {
        en: "Urgent",
        ja: "要対応",
        icon: AlertTriangle,
        className: "tag-urgent",
    },
    maintenance: {
        en: "Maintenance",
        ja: "整備/メンテ",
        icon: Wrench,
        className: "tag-maintenance",
    },
    event: {
        en: "Event",
        ja: "イベント",
        icon: Star,
        className: "tag-event",
    },
    announcement: {
        en: "Announcement",
        ja: "案内",
        icon: Bell,
        className: "tag-announcement",
    },
    notice: {
        en: "Notice",
        ja: "告示",
        icon: Clipboard,
        className: "tag-notice",
    },
    general: {
        en: "General",
        ja: "一般",
        icon: Info,
        className: "tag-general",
    },
};

export const TAB_LABELS = {
    all: { en: "All", ja: "すべて" },
    urgent: { en: "Urgent", ja: "要対応" },
    maintenance: { en: "Maintenance", ja: "整備/メンテ" },
    event: { en: "Event", ja: "イベント" },
    announcement: { en: "Announcement", ja: "案内" },
    notice: { en: "Notice", ja: "告示" },
    general: { en: "General", ja: "一般" },
};

export function getPrimaryCategory(categories) {
    if (!categories || !Array.isArray(categories) || categories.length === 0) return "general";
    for (const p of CATEGORY_PRIORITY) {
        if (categories.includes(p)) return p;
    }
    return categories[0] || "general";
}

/** Relative time if < 3 days old, otherwise the plain date — per spec. */
export function formatTimestamp(isoDate, isJapanese) {
    const then = new Date(isoDate);
    const now = new Date();
    const diffMs = now - then;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays >= 3) {
        return then.toISOString().split("T")[0];
    }
    if (diffDays >= 1) {
        return isJapanese ? `${diffDays}日前` : `${diffDays}d ago`;
    }
    if (diffHours >= 1) {
        return isJapanese ? `${diffHours}時間前` : `${diffHours}h ago`;
    }
    if (diffMins >= 1) {
        return isJapanese ? `${diffMins}分前` : `${diffMins}m ago`;
    }
    return isJapanese ? "たった今" : "Just now";
}
