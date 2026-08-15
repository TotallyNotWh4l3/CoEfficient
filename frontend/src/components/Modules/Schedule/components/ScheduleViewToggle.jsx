import { Calendar, Clock } from "lucide-react";

export default function ScheduleViewToggle({ viewMode, onChange }) {
    return (
        <div className="sch-view-toggle">
            <button
                className={`sch-view-toggle-btn${viewMode === "absolute" ? " active" : ""}`}
                onClick={() => onChange("absolute")}
            >
                <Calendar className="icon-xs" />
                <span>Absolute</span>
            </button>
            <button
                className={`sch-view-toggle-btn${viewMode === "relative" ? " active" : ""}`}
                onClick={() => onChange("relative")}
            >
                <Clock className="icon-xs" />
                <span>Relative</span>
            </button>
        </div>
    );
}
