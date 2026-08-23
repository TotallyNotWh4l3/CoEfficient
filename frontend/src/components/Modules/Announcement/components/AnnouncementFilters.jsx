import React from "react";
import { Search, X } from "lucide-react";
import { useLanguage } from "../../../../hooks/useLanguage";
import { CATEGORY_TABS } from "../../../../constants/modules/announcementConstants";

export default function AnnouncementFilters({
    searchQuery,
    onSearchChange,
    activeTab,
    onTabChange,
}) {
    const lang = useLanguage();
    const t = lang.modules.announcement;

    return (
        <div className="ann-filters">
            <div className="ann-search">
                <Search className="ann-search-icon icon-xs" />
                <input
                    type="text"
                    placeholder={t.filters.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                {searchQuery && (
                    <button className="ann-search-clear" onClick={() => onSearchChange("")}>
                        <X className="icon-xxs" />
                    </button>
                )}
            </div>

            <div className="ann-tabs">
                {CATEGORY_TABS.map((tabKey) => (
                    <button
                        key={tabKey}
                        className={`ann-tab ${activeTab === tabKey ? "active" : ""}`}
                        onClick={() => onTabChange(tabKey)}
                    >
                        {t.categories[tabKey]}
                    </button>
                ))}
            </div>
        </div>
    );
}
