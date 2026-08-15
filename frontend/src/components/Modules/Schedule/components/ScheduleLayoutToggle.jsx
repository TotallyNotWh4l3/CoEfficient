export default function ScheduleLayoutToggle({ layout, onChange }) {
    return (
        <div className="sch-layout-toggle">
            <button
                className={`sch-layout-toggle-btn${layout === "month" ? " active" : ""}`}
                onClick={() => onChange("month")}
            >
                Month
            </button>
            <button
                className={`sch-layout-toggle-btn${layout === "week" ? " active" : ""}`}
                onClick={() => onChange("week")}
            >
                Week
            </button>
        </div>
    );
}
