// frontend/src/components/Modules/Announcement/components/AnnouncementFormModal.jsx
import React from "react";
import { Megaphone, X, Pin } from "lucide-react";
import { CATEGORY_CONFIG } from "../../../../constants/modules/announcementConstants";

export default function AnnouncementFormModal({
    isJapanese,
    editingId,
    formTitle,
    formContent,
    formCategories,
    formIsPinned,
    onTitleChange,
    onContentChange,
    onToggleCategory,
    onPinnedChange,
    onSubmit,
    onClose,
}) {
    return (
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
                <button className="ann-icon-btn" onClick={onClose}>
                    <X className="icon-xs" />
                </button>
            </div>

            <form onSubmit={onSubmit} className="ann-form">
                <div>
                    <label className="ann-label">{isJapanese ? "件名" : "Bulletin Title"}</label>
                    <input
                        type="text"
                        required
                        placeholder={
                            isJapanese
                                ? "緊急圧力の調整、設備連絡など"
                                : "e.g., HVAC Maintenance Scheduled"
                        }
                        value={formTitle}
                        onChange={(e) => onTitleChange(e.target.value)}
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
                                    onClick={() => onToggleCategory(id)}
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
                            onChange={(e) => onPinnedChange(e.target.checked)}
                        />
                        <Pin className="icon-xs ann-pin-icon" />
                        {isJapanese ? "上位固定" : "Pin Bulletin"}
                    </label>
                </div>

                <div className="ann-form-grow">
                    <label className="ann-label">{isJapanese ? "内容" : "Bulletin Content"}</label>
                    <textarea
                        required
                        rows={4}
                        placeholder={
                            isJapanese
                                ? "掲示内容の詳細を入力してください..."
                                : "Specify details, instructions, or emergency protocols..."
                        }
                        value={formContent}
                        onChange={(e) => onContentChange(e.target.value)}
                        className="ann-textarea"
                    />
                </div>

                <div className="ann-form-actions">
                    <button type="button" className="ann-btn-secondary" onClick={onClose}>
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
    );
}
