// frontend/src/components/Modules/Announcement/components/AnnouncementList.jsx
import React from "react";
import { Bell } from "lucide-react";
import AnnouncementItem from "./AnnouncementItem";

export default function AnnouncementList({
    isJapanese,
    isExtended,
    isLoading,
    error,
    filtered,
    canModify,
    onSelectItem,
    onEditItem,
    onDeleteItem,
}) {
    return (
        <div className="ann-list" style={{ maxHeight: isExtended ? "480px" : "none" }}>
            {isLoading && (
                <p className="ann-empty-text">{isJapanese ? "読み込み中..." : "Loading..."}</p>
            )}
            {error && <p className="ann-empty-text ann-error-text">{error}</p>}

            {!isLoading &&
                filtered.length > 0 &&
                filtered.map((item) => (
                    <AnnouncementItem
                        key={item.id}
                        item={item}
                        isJapanese={isJapanese}
                        canModify={canModify}
                        onSelect={() => onSelectItem(item)}
                        onEdit={(it, e) => onEditItem(it, e)}
                        onDelete={(id, e) => onDeleteItem(id, e)}
                    />
                ))}

            {!isLoading && filtered.length === 0 && (
                <div className="ann-empty-state">
                    <div className="ann-empty-icon">
                        <Bell className="icon-sm" />
                    </div>
                    <h5 className="ann-empty-title">
                        {isJapanese ? "通知はありません" : "No bulletins found"}
                    </h5>
                    <p className="ann-empty-text">
                        {isJapanese
                            ? "該当するお知らせがありません。検索キーワードやカテゴリーフィルタをお試しください。"
                            : "No alerts match the active parameters. Re-adjust your search or category buttons."}
                    </p>
                </div>
            )}
        </div>
    );
}
