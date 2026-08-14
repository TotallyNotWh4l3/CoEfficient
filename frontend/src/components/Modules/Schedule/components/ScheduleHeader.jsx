import { Calendar, Plus, X } from "lucide-react";

export default function ScheduleHeader({ onAdd, onRemove }) {
    return (
        <div className="sch-header">
            <div className="sch-header-left">
                <div className="sch-header-icon">
                    <Calendar className="icon-sm" />
                </div>
                <div>
                    <h3 className="sch-header-title">Schedule</h3>
                    <p className="sch-header-subtitle">Team events &amp; important dates</p>
                </div>
            </div>
            <div className="sch-header-actions">
                <button className="sch-btn-primary" onClick={onAdd}>
                    <Plus className="icon-xs" />
                    <span>Add Event</span>
                </button>
                {onRemove && (
                    <button className="sch-icon-toggle" onClick={onRemove} title="Remove module">
                        <X className="icon-xs" />
                    </button>
                )}
            </div>
        </div>
    );
}
