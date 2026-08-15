// frontend/src/components/Modules/Announcement/components/AnnouncementFilters.jsx
import React from "react";
import { Search, X } from "lucide-react";
import { CATEGORY_TABS, TAB_LABELS } from "../../../../constants/modules/announcementConstants";

export default function AnnouncementFilters({
    isJapanese,
    searchQuery,
    onSearchChange,
    activeTab,
    onTabChange,
}) {
    return (
        <div className="ann-filters">
            <div className="ann-search">
                <Search className="ann-search-icon icon-xs" />
                <input
                    type="text"
                    placeholder={isJapanese ? "件名や内容で検索..." : "Filter bulletins..."}
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
                        {isJapanese ? TAB_LABELS[tabKey].ja : TAB_LABELS[tabKey].en}
                    </button>
                ))}
            </div>
        </div>
    );
}
