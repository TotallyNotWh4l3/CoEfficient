// frontend/src/components/Modules/Announcement/AnnouncementCard.jsx
import React, { useState } from "react";
import {
    Megaphone,
    Search,
    Plus,
    Trash2,
    Pin,
    User,
    Calendar,
    ChevronRight,
    X,
    Bell,
    CheckCircle2,
    Lock,
    Maximize2,
    Minimize2,
    Archive,
    Pencil,
} from "lucide-react";
import useAnnouncements from "../../../hooks/useAnnouncements";
import AnnouncementArchiveModal from "./AnnouncementArchiveModal";
import { useDashboard } from "../../../hooks/useDashboard";
import { useSettings } from "../../../hooks/useSettings";
import { useAuth } from "../../../hooks/useAuth";
import {
    CATEGORY_TABS,
    CATEGORY_CONFIG,
    TAB_LABELS,
    getPrimaryCategory,
    formatTimestamp,
} from "../../../constants/modules/announcementConstants";
import "./AnnouncementCard.css";

/**
 * Matches the same contract every other module gets from ModuleRenderer:
 * only a `module` object is passed in (see WeatherModuleContainer for the
 * sibling pattern). Language, user, and layout mode are all derived here
 * instead of prop-drilled.
 *
 * `module` shape (see defaultDashboard.js):
 * {
 *   id, type: 'announcement',
 *   settings: { title, view: 'compact' | 'extended' },
 *   layout: { w, h },
 * }
 */
export default function AnnouncementCard({ module }) {
    const { removeModule, updateModuleSettings } = useDashboard();
    const { settings } = useSettings();
    const { user } = useAuth();

    const isJapanese = settings?.preferences?.language === "ja";
    // users table only has id/username/role — there's no `name` column.
    const currentUser = user ? { id: user.id, name: user.username, role: user.role } : null;

    const isExtended = module.settings?.view === "extended";
    const setIsExtended = (next) =>
        updateModuleSettings(module.id, "view", next ? "extended" : "compact");
    const onRemove = () => removeModule(module.id);

    const {
        announcements,
        isLoading,
        error,
        createAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
    } = useAnnouncements({ recentOnly: !isExtended, live: true });

    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [selectedItem, setSelectedItem] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showArchiveModal, setShowArchiveModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [successToast, setSuccessToast] = useState("");

    const [formTitle, setFormTitle] = useState("");
    const [formContent, setFormContent] = useState("");
    const [formCategories, setFormCategories] = useState(["general"]);
    const [formIsPinned, setFormIsPinned] = useState(false);

    const role = (currentUser?.role || "").toLowerCase();
    const isAdmin = role === "admin";
    const isManagerOrAbove = role === "manager" || isAdmin;
    const canModify = (item) => isAdmin || item.authorId === currentUser?.id;

    const showToast = (msg) => {
        setSuccessToast(msg);
        setTimeout(() => setSuccessToast(""), 3000);
    };

    const resetForm = () => {
        setFormTitle("");
        setFormContent("");
        setFormCategories(["general"]);
        setFormIsPinned(false);
        setEditingId(null);
    };

    const openEdit = (item, e) => {
        e.stopPropagation();
        setEditingId(item.id);
        setFormTitle(item.title);
        setFormContent(item.content);
        setFormCategories(item.categories);
        setFormIsPinned(item.isPinned);
        setShowCreateModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formTitle.trim() || !formContent.trim()) return;

        const payload = {
            title: formTitle,
            titleJa: formTitle,
            content: formContent,
            contentJa: formContent,
            categories: formCategories,
            isPinned: formCategories.includes("urgent") ? true : formIsPinned,
        };

        try {
            if (editingId) {
                await updateAnnouncement(editingId, payload);
                showToast(isJapanese ? "更新しました。" : "Bulletin updated.");
            } else {
                await createAnnouncement(payload);
                showToast(isJapanese ? "正常に公開されました！" : "Announcement published!");
            }
            resetForm();
            setShowCreateModal(false);
        } catch (err) {
            showToast(isJapanese ? "保存に失敗しました。" : "Failed to save.");
        }
    };

    const handleDelete = async (id, e) => {
        if (e) e.stopPropagation();
        try {
            await deleteAnnouncement(id);
            showToast(isJapanese ? "削除されました。" : "Bulletin removed.");
        } catch {
            showToast(isJapanese ? "削除に失敗しました。" : "Failed to delete.");
        }
    };

    const toggleExtended = () => {
        setIsExtended(!isExtended);
    };

    const filtered = announcements.filter((item) => {
        const itemCats = item.categories || ["general"];
        const matchesTab = activeTab === "all" || itemCats.includes(activeTab);
        const q = searchQuery.toLowerCase();
        const title = (isJapanese ? item.titleJa || item.title : item.title).toLowerCase();
        const content = (isJapanese ? item.contentJa || item.content : item.content).toLowerCase();
        return matchesTab && (title.includes(q) || content.includes(q));
    });

    return (
        <div className="ann-card" style={{ minHeight: isExtended ? "650px" : "320px" }}>
            <div className="ann-glow ann-glow-top" />
            <div className="ann-glow ann-glow-bottom" />

            {/* Header */}
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
                                ? `進行中の通知: ${filtered.length}件`
                                : `Active notices: ${filtered.length}`}
                        </p>
                    </div>
                </div>

                <div className="ann-header-actions">
                    {currentUser ? (
                        <button
                            className="ann-btn-primary"
                            onClick={() => {
                                resetForm();
                                setShowCreateModal(true);
                            }}
                        >
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
                        onClick={() => setShowArchiveModal(true)}
                        title={isJapanese ? "アーカイブを見る" : "View archive"}
                    >
                        <Archive className="icon-xs" />
                    </button>

                    <button
                        className={`ann-icon-toggle ${isExtended ? "active" : ""}`}
                        onClick={toggleExtended}
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

            {/* Body */}
            <div className="ann-body">
                <div className="ann-filters">
                    <div className="ann-search">
                        <Search className="ann-search-icon icon-xs" />
                        <input
                            type="text"
                            placeholder={isJapanese ? "件名や内容で検索..." : "Filter bulletins..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button className="ann-search-clear" onClick={() => setSearchQuery("")}>
                                <X className="icon-xxs" />
                            </button>
                        )}
                    </div>

                    <div className="ann-tabs">
                        {CATEGORY_TABS.map((tabKey) => (
                            <button
                                key={tabKey}
                                className={`ann-tab ${activeTab === tabKey ? "active" : ""}`}
                                onClick={() => setActiveTab(tabKey)}
                            >
                                {isJapanese ? TAB_LABELS[tabKey].ja : TAB_LABELS[tabKey].en}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="ann-list" style={{ maxHeight: isExtended ? "480px" : "none" }}>
                    {isLoading && (
                        <p className="ann-empty-text">
                            {isJapanese ? "読み込み中..." : "Loading..."}
                        </p>
                    )}
                    {error && <p className="ann-empty-text ann-error-text">{error}</p>}

                    {!isLoading &&
                        filtered.length > 0 &&
                        filtered.map((item) => {
                            const itemCats = item.categories || ["general"];
                            const primCat = getPrimaryCategory(itemCats);
                            const cfg = CATEGORY_CONFIG[primCat];
                            const Icon = cfg.icon;
                            const title = isJapanese ? item.titleJa || item.title : item.title;
                            const desc = isJapanese ? item.contentJa || item.content : item.content;
                            const stamp = formatTimestamp(item.createdAt, isJapanese);

                            return (
                                <div
                                    key={item.id}
                                    className={`ann-item ${cfg.className}`}
                                    onClick={() => setSelectedItem(item)}
                                >
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
                                                    <span
                                                        key={cat}
                                                        className={`ann-tag ${CATEGORY_CONFIG[cat].className}`}
                                                    >
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
                                            {canModify(item) && (
                                                <>
                                                    <button
                                                        className="ann-item-action"
                                                        onClick={(e) => openEdit(item, e)}
                                                        title={isJapanese ? "編集" : "Edit"}
                                                    >
                                                        <Pencil className="icon-xxs" />
                                                    </button>
                                                    <button
                                                        className="ann-item-action ann-item-action-danger"
                                                        onClick={(e) => handleDelete(item.id, e)}
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
                        })}

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
            </div>

            {/* Footer */}
            <div className="ann-footer">
                <div className="ann-footer-live">
                    <div className="ann-live-dot" />
                    <span>{isJapanese ? "リアルタイム更新" : "Live Feed Synced"}</span>
                </div>
                <span className="ann-footer-version">v2.0 ACTIVE</span>
            </div>

            {/* Toast */}
            {successToast && (
                <div className="ann-toast">
                    <CheckCircle2 className="icon-xs" />
                    <span>{successToast}</span>
                </div>
            )}

            {/* Detail overlay */}
            {selectedItem && (
                <div className="ann-overlay">
                    <div className="ann-overlay-header">
                        <div className="ann-tag-row">
                            {(selectedItem.categories || ["general"]).map((cat) => {
                                const cfg = CATEGORY_CONFIG[cat];
                                const Icon = cfg.icon;
                                return (
                                    <span key={cat} className={`ann-badge ${cfg.className}`}>
                                        <Icon className="icon-xxs" />
                                        {cat}
                                    </span>
                                );
                            })}
                        </div>
                        <button className="ann-icon-btn" onClick={() => setSelectedItem(null)}>
                            <X className="icon-xs" />
                        </button>
                    </div>

                    <div className="ann-overlay-body">
                        {selectedItem.isPinned && (
                            <div className="ann-pinned-flag">
                                <Pin className="icon-xs" />
                                <span>{isJapanese ? "最優先掲示" : "Pinned Bulletin"}</span>
                            </div>
                        )}
                        <h4 className="ann-detail-title">
                            {isJapanese
                                ? selectedItem.titleJa || selectedItem.title
                                : selectedItem.title}
                            {selectedItem.isEdited && (
                                <span className="ann-flag">
                                    [{isJapanese ? "編集済み" : "Edited"}]
                                </span>
                            )}
                        </h4>

                        <div className="ann-detail-meta">
                            <span>
                                <User className="icon-xxs" />
                                {selectedItem.author}
                            </span>
                            <span>•</span>
                            <span>
                                <Calendar className="icon-xxs" />
                                {formatTimestamp(selectedItem.createdAt, isJapanese)}
                            </span>
                        </div>

                        <p className="ann-detail-content">
                            {isJapanese
                                ? selectedItem.contentJa || selectedItem.content
                                : selectedItem.content}
                        </p>
                    </div>

                    <div className="ann-overlay-footer">
                        <button className="ann-btn-secondary" onClick={() => setSelectedItem(null)}>
                            {isJapanese ? "閉じる" : "Close Reader"}
                        </button>
                    </div>
                </div>
            )}

            {/* Create / Edit overlay */}
            {showCreateModal && (
                <div className="ann-overlay ann-overlay-form">
                    <div className="ann-overlay-header">
                        <span className="ann-overlay-title">
                            <Megaphone className="icon-sm" />
                            {editingId
                                ? isJapanese
                                    ? "アナウンス編集"
                                    : "Edit Bulletin"
                                : isJapanese
                                  ? "新規アナウンス投稿"
                                  : "Compose Bulletin"}
                        </span>
                        <button
                            className="ann-icon-btn"
                            onClick={() => {
                                setShowCreateModal(false);
                                resetForm();
                            }}
                        >
                            <X className="icon-xs" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="ann-form">
                        <div>
                            <label className="ann-label">
                                {isJapanese ? "件名" : "Bulletin Title"}
                            </label>
                            <input
                                type="text"
                                required
                                placeholder={
                                    isJapanese
                                        ? "緊急圧力の調整、設備連絡など"
                                        : "e.g., HVAC Maintenance Scheduled"
                                }
                                value={formTitle}
                                onChange={(e) => setFormTitle(e.target.value)}
                                className="ann-input"
                            />
                        </div>

                        <div>
                            <label className="ann-label">
                                {isJapanese
                                    ? "カテゴリー・タグ選択 (複数選択可)"
                                    : "Select Tags / Categories (Select Multiple)"}
                            </label>
                            <div className="ann-tag-picker">
                                {Object.entries(CATEGORY_CONFIG).map(([id, cfg]) => {
                                    const isSel = formCategories.includes(id);
                                    return (
                                        <button
                                            type="button"
                                            key={id}
                                            onClick={() => {
                                                let updated;
                                                if (isSel) {
                                                    if (formCategories.length === 1) return;
                                                    updated = formCategories.filter(
                                                        (c) => c !== id,
                                                    );
                                                } else {
                                                    updated = [...formCategories, id];
                                                }
                                                if (updated.includes("urgent"))
                                                    setFormIsPinned(true);
                                                setFormCategories(updated);
                                            }}
                                            className={`ann-tag-pick ${cfg.className} ${isSel ? "selected" : ""}`}
                                        >
                                            {isJapanese ? cfg.ja : cfg.en}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="ann-pin-row">
                            <span className="ann-pin-hint">
                                {formCategories.includes("urgent")
                                    ? isJapanese
                                        ? "※ 「要対応」タグ追加のため自動的に最優先固定されます"
                                        : "※ Auto-pinned: 'Urgent' takes top priority"
                                    : isJapanese
                                      ? "重要な連絡として最上部に固定表示する"
                                      : "Pin this bulletin to the top of the feed"}
                            </span>
                            <label className="ann-checkbox-label">
                                <input
                                    type="checkbox"
                                    disabled={formCategories.includes("urgent")}
                                    checked={formCategories.includes("urgent") || formIsPinned}
                                    onChange={(e) => setFormIsPinned(e.target.checked)}
                                />
                                <Pin className="icon-xs ann-pin-icon" />
                                {isJapanese ? "上位固定" : "Pin Bulletin"}
                            </label>
                        </div>

                        <div className="ann-form-grow">
                            <label className="ann-label">
                                {isJapanese ? "内容" : "Bulletin Content"}
                            </label>
                            <textarea
                                required
                                rows={4}
                                placeholder={
                                    isJapanese
                                        ? "掲示内容の詳細を入力してください..."
                                        : "Specify details, instructions, or emergency protocols..."
                                }
                                value={formContent}
                                onChange={(e) => setFormContent(e.target.value)}
                                className="ann-textarea"
                            />
                        </div>

                        <div className="ann-form-actions">
                            <button
                                type="button"
                                className="ann-btn-secondary"
                                onClick={() => {
                                    setShowCreateModal(false);
                                    resetForm();
                                }}
                            >
                                {isJapanese ? "キャンセル" : "Cancel"}
                            </button>
                            <button type="submit" className="ann-btn-primary">
                                {editingId
                                    ? isJapanese
                                        ? "更新する"
                                        : "Update"
                                    : isJapanese
                                      ? "公開する"
                                      : "Publish"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Archive browser overlay */}
            {showArchiveModal && (
                <AnnouncementArchiveModal
                    isJapanese={isJapanese}
                    isManagerOrAbove={isManagerOrAbove}
                    onClose={() => setShowArchiveModal(false)}
                    onRestored={() =>
                        showToast(isJapanese ? "復元しました。" : "Bulletin restored.")
                    }
                />
            )}
        </div>
    );
}
