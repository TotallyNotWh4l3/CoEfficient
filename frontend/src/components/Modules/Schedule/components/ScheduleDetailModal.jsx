import { X, Clock, User, Pencil, Trash2 } from "lucide-react";
import { canModify } from "../utils/scheduleHelpers";

export default function ScheduleDetailModal({ event, currentUser, onClose, onEdit, onDelete }) {
    const editable = canModify(currentUser, event);

    return (
        <div className="sch-overlay" onClick={onClose}>
            <div className="sch-overlay-panel" onClick={(e) => e.stopPropagation()}>
                <div className="sch-overlay-header">
                    <span className="sch-overlay-title">Event Details</span>
                    <button className="sch-icon-btn" onClick={onClose}>
                        <X className="icon-xs" />
                    </button>
                </div>

                <div className="sch-detail-body">
                    <h4 className="sch-detail-title">{event.title}</h4>

                    <div className="sch-detail-meta">
                        <span>
                            <Clock className="icon-xxs" /> {event.eventDate} at {event.eventTime}
                        </span>
                        <span>
                            <User className="icon-xxs" /> {event.author}
                        </span>
                    </div>

                    {event.description && <p className="sch-detail-desc">{event.description}</p>}

                    {!editable && (
                        <p className="sch-lock-note">
                            Only the creator or a higher-role user can edit this event.
                        </p>
                    )}
                </div>

                <div className="sch-overlay-footer sch-overlay-footer-split">
                    {editable ? (
                        <>
                            <button className="sch-btn-danger" onClick={onDelete}>
                                <Trash2 className="icon-xs" />
                                <span>Delete</span>
                            </button>
                            <button className="sch-btn-primary" onClick={onEdit}>
                                <Pencil className="icon-xs" />
                                <span>Edit</span>
                            </button>
                        </>
                    ) : (
                        <button className="sch-btn-secondary" onClick={onClose}>
                            Close
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
