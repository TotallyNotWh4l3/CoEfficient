// frontend/src/components/Modules/Announcement/components/AnnouncementItem.jsx
import React from "react";
import { Pin, User, Calendar, ChevronRight, Pencil, Trash2 } from "lucide-react";
import {
    CATEGORY_CONFIG,
    getPrimaryCategory,
    formatTimestamp,
} from "../../../../constants/modules/announcementConstants";

export default function AnnouncementItem({
    item,
    isJapanese,
    canModify,
    onSelect,
    onEdit,
    onDelete,
}) {
    const itemCats = item.categories || ["general"];
    const primCat = getPrimaryCategory(itemCats);
    const cfg = CATEGORY_CONFIG[primCat];
    const Icon = cfg.icon;
    const title = isJapanese ? item.titleJa || item.title : item.title;
    const desc = isJapanese ? item.contentJa || item.content : item.content;
    const stamp = formatTimestamp(item.createdAt, isJapanese);
    const modifiable = canModify(item);

    return (
        <div
            className={`ann-item ${cfg.className} ${!item.isRead ? "ann-item-unread" : ""}`}
            onClick={onSelect}
        >
            {!item.isRead && (
                <div className="ann-unread-dot" title={isJapanese ? "未読" : "Unread"} />
            )}
            {item.isPinned && (
                <div className="ann-pin-indicator">
                    <Pin className="icon-xxs" />
                </div>
            )}

            <div className="ann-item-main">
                <div className={`ann-item-icon ${cfg.className}`}>
                    <Icon className="icon-sm" />
                </div>
                <div className="ann-item-body">
                    <h4 className="ann-item-title">
                        {title}
                        {item.isEdited && (
                            <span className="ann-flag">
                                [{isJapanese ? "編集済み" : "Edited"}]
                            </span>
                        )}
                    </h4>
                    <div className="ann-tag-row">
                        {itemCats.map((cat) => (
                            <span key={cat} className={`ann-tag ${CATEGORY_CONFIG[cat].className}`}>
                                {cat}
                            </span>
                        ))}
                    </div>
                    <p className="ann-item-desc">{desc}</p>
                </div>
            </div>

            <div className="ann-item-footer">
                <div className="ann-item-meta-group">
                    <span className="ann-item-meta">
                        <User className="icon-xxs" />
                        {item.author}
                    </span>
                    <span>•</span>
                    <span className="ann-item-meta">
                        <Calendar className="icon-xxs" />
                        {stamp}
                    </span>
                </div>

                <div className="ann-item-controls">
                    {modifiable && (
                        <>
                            <button
                                className="ann-item-action"
                                onClick={(e) => onEdit(item, e)}
                                title={isJapanese ? "編集" : "Edit"}
                            >
                                <Pencil className="icon-xxs" />
                            </button>
                            <button
                                className="ann-item-action ann-item-action-danger"
                                onClick={(e) => onDelete(item.id, e)}
                                title={isJapanese ? "削除" : "Delete"}
                            >
                                <Trash2 className="icon-xxs" />
                            </button>
                        </>
                    )}
                    <ChevronRight className="icon-xs ann-chevron" />
                </div>
            </div>
        </div>
    );
}
