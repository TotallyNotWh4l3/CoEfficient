// frontend/src/components/Modules/Announcement/components/AnnouncementHeader.jsx
import React from "react";
import { Megaphone, Plus, Lock, Archive, Maximize2, Minimize2, X } from "lucide-react";

/**
 * Pure header: title/count/unread badge on the left, action buttons on the
 * right. All state lives in the parent AnnouncementModule — this component
 * only renders and forwards clicks.
 */
export default function AnnouncementHeader({
    isJapanese,
    filteredCount,
    unreadCount,
    currentUser,
    onCreate,
    onOpenArchive,
    isExtended,
    onToggleExtended,
    onRemove,
}) {
    return (
        <div className="ann-header">
            <div className="ann-header-left">
                <div className="ann-header-icon">
                    <Megaphone className="icon-sm" />
                </div>
                <div>
                    <h3 className="ann-header-title">
                        {isJapanese ? "社内掲示板" : "Corporate Bulletins"}
                    </h3>
                    <p className="ann-header-subtitle">
                        {isJapanese
                            ? `進行中の通知: ${filteredCount}件`
                            : `Active notices: ${filteredCount}`}
                        {unreadCount > 0 && (
                            <span className="ann-unread-badge">
                                {isJapanese ? `未読${unreadCount}件` : `${unreadCount} unread`}
                            </span>
                        )}
                    </p>
                </div>
            </div>

            <div className="ann-header-actions">
                {currentUser ? (
                    <button className="ann-btn-primary" onClick={onCreate}>
                        <Plus className="icon-xs" />
                        <span>{isJapanese ? "新規追加" : "Create"}</span>
                    </button>
                ) : (
                    <div className="ann-viewer-badge">
                        <Lock className="icon-xxs" />
                        <span>{isJapanese ? "閲覧のみ" : "Viewer Only"}</span>
                    </div>
                )}

                <button
                    className="ann-icon-toggle"
                    onClick={onOpenArchive}
                    title={isJapanese ? "アーカイブを見る" : "View archive"}
                >
                    <Archive className="icon-xs" />
                </button>

                <button
                    className={`ann-icon-toggle ${isExtended ? "active" : ""}`}
                    onClick={onToggleExtended}
                    title={
                        isExtended
                            ? isJapanese
                                ? "コンパクト表示"
                                : "Compact View"
                            : isJapanese
                              ? "拡大表示"
                              : "Extend View"
                    }
                >
                    {isExtended ? (
                        <Minimize2 className="icon-xs" />
                    ) : (
                        <Maximize2 className="icon-xs" />
                    )}
                </button>

                <button
                    className="ann-icon-toggle"
                    onClick={onRemove}
                    title={isJapanese ? "モジュール削除" : "Remove module"}
                >
                    <X className="icon-xs" />
                </button>
            </div>
        </div>
    );
}
