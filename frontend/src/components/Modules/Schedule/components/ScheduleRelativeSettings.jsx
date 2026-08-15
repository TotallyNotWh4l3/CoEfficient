import { X, Info } from "lucide-react";

export default function ScheduleRelativeSettings({ daysBefore, onChange, onClose }) {
    return (
        <div className="sch-overlay" onClick={onClose}>
            <div
                className="sch-overlay-panel sch-overlay-panel-sm"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sch-overlay-header">
                    <span className="sch-overlay-title">Relative View Settings</span>
                    <button className="sch-icon-btn" onClick={onClose}>
                        <X className="icon-xs" />
                    </button>
                </div>

                <div className="sch-relative-settings-body">
                    <p className="sch-relative-hint">
                        <Info className="icon-xxs" />
                        Showing {daysBefore} day{daysBefore === 1 ? "" : "s"} before today, and{" "}
                        {30 - daysBefore} day{30 - daysBefore === 1 ? "" : "s"} ahead (30 total).
                    </p>

                    <label className="sch-label">Days before today: {daysBefore}</label>
                    <input
                        type="range"
                        min="0"
                        max="30"
                        value={daysBefore}
                        onChange={(e) => onChange(parseInt(e.target.value, 10))}
                        className="sch-slider"
                    />

                    <div className="sch-relative-quick-actions">
                        <button className="sch-btn-secondary" onClick={() => onChange(0)}>
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
