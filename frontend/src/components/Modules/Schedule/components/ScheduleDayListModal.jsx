import { X, Plus, ChevronRight } from "lucide-react";
import { formatDisplayDate } from "../utils/scheduleHelpers";

export default function ScheduleDayListModal({ dateStr, events, onClose, onAdd, onSelectEvent }) {
    const sorted = [...events].sort((a, b) => a.eventTime.localeCompare(b.eventTime));

    return (
        <div className="sch-overlay" onClick={onClose}>
            <div className="sch-overlay-panel" onClick={(e) => e.stopPropagation()}>
                <div className="sch-overlay-header">
                    <span className="sch-overlay-title">{formatDisplayDate(dateStr)}</span>
                    <button className="sch-icon-btn" onClick={onClose}>
                        <X className="icon-xs" />
                    </button>
                </div>

                <div className="sch-daylist">
                    {sorted.length === 0 ? (
                        <p className="sch-empty-text">No events scheduled.</p>
                    ) : (
                        sorted.map((ev) => (
                            <button
                                key={ev.id}
                                className="sch-daylist-row"
                                onClick={() => onSelectEvent(ev)}
                            >
                                <span className="sch-daylist-time">{ev.eventTime}</span>
                                <span className="sch-daylist-title">{ev.title}</span>
                                <ChevronRight className="icon-xs sch-chevron" />
                            </button>
                        ))
                    )}
                </div>

                <div className="sch-overlay-footer">
                    <button className="sch-btn-primary" onClick={() => onAdd(dateStr)}>
                        <Plus className="icon-xs" />
                        <span>Add Event</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
