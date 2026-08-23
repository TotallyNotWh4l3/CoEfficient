import { useLanguage } from "../../../../hooks/useLanguage";

export default function ScheduleLayoutToggle({ layout, onChange }) {
    const lang = useLanguage();
    const t = lang.modules.schedule.layoutToggle;

    return (
        <div className="sch-layout-toggle">
            <button
                className={`sch-layout-toggle-btn${layout === "month" ? " active" : ""}`}
                onClick={() => onChange("month")}
            >
                {t.month}
            </button>
            <button
                className={`sch-layout-toggle-btn${layout === "week" ? " active" : ""}`}
                onClick={() => onChange("week")}
            >
                {t.week}
            </button>
        </div>
    );
}
