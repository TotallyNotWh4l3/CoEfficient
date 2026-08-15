import { useState } from "react";
import { X, Trash2, Clock } from "lucide-react";
import ScheduleTagPicker from "./ScheduleTagPicker";

export default function ScheduleEventFormModal({
    mode,
    initialValues,
    authorName,
    tags,
    onClose,
    onSubmit,
    onDelete,
}) {
    const [form, setForm] = useState(initialValues);
    const [submitting, setSubmitting] = useState(false);

    const toggleTag = (tagId) => {
        setForm((f) => {
            const has = f.tags.includes(tagId);
            return { ...f, tags: has ? f.tags.filter((t) => t !== tagId) : [...f.tags, tagId] };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title.trim() || !form.eventDate || !form.eventTime) return;
        setSubmitting(true);
        try {
            await onSubmit(form);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Delete this event?")) return;
        setSubmitting(true);
        try {
            await onDelete();
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="sch-overlay" onClick={onClose}>
            <div className="sch-overlay-panel" onClick={(e) => e.stopPropagation()}>
                <div className="sch-overlay-header">
                    <span className="sch-overlay-title">
                        {mode === "edit" ? "Edit Event" : "New Event"}
                    </span>
                    <button className="sch-icon-btn" onClick={onClose}>
                        <X className="icon-xs" />
                    </button>
                </div>

                <form className="sch-form" onSubmit={handleSubmit}>
                    <div>
                        <label className="sch-label">Title *</label>
                        <input
                            className="sch-input"
                            type="text"
                            required
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            placeholder="e.g., Team standup"
                        />
                    </div>

                    <div>
                        <label className="sch-label">Subtitle</label>
                        <input
                            className="sch-input"
                            type="text"
                            value={form.subtitle}
                            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                            placeholder="Optional short subtitle"
                        />
                    </div>

                    <div className="sch-form-row">
                        <div>
                            <label className="sch-label">Date *</label>
                            <input
                                className="sch-input"
                                type="date"
                                required
                                value={form.eventDate}
                                onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="sch-label">Time *</label>
                            <input
                                className="sch-input"
                                type="time"
                                required
                                value={form.eventTime}
                                onChange={(e) => setForm({ ...form, eventTime: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="sch-label">Tags</label>
                        <ScheduleTagPicker
                            tags={tags}
                            selectedTags={form.tags}
                            onToggle={toggleTag}
                        />
                        {form.tags.length > 0 && (
                            <p className="sch-tag-priority-hint">
                                First tag ({form.tags[0]}) determines the event's color.
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="sch-label">Description</label>
                        <textarea
                            className="sch-textarea"
                            rows={3}
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            placeholder="Optional details…"
                        />
                    </div>

                    {mode === "edit" && authorName && (
                        <p className="sch-meta-line">
                            <Clock className="icon-xxs" /> Added by {authorName}
                        </p>
                    )}

                    <div className="sch-form-actions">
                        {mode === "edit" && onDelete ? (
                            <button
                                type="button"
                                className="sch-btn-danger"
                                onClick={handleDelete}
                                disabled={submitting}
                            >
                                <Trash2 className="icon-xs" />
                                <span>Delete</span>
                            </button>
                        ) : (
                            <div />
                        )}
                        <div className="sch-form-actions-right">
                            <button type="button" className="sch-btn-secondary" onClick={onClose}>
                                Cancel
                            </button>
                            <button type="submit" className="sch-btn-primary" disabled={submitting}>
                                {mode === "edit" ? "Save Changes" : "Add Event"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
