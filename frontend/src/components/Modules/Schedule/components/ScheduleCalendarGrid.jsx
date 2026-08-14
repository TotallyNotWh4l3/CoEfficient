import { ChevronLeft, ChevronRight } from "lucide-react";
import { WEEKDAY_LABELS, getMonthGridDays, formatDateStr } from "../utils/scheduleHelpers";

export default function ScheduleCalendarGrid({
    anchorDate,
    onPrev,
    onNext,
    onToday,
    eventsByDay,
    onDayClick,
}) {
    const todayStr = formatDateStr(new Date());
    const monthDays = getMonthGridDays(anchorDate);

    return (
        <>
            <div className="sch-nav">
                <span className="sch-nav-label">
                    {anchorDate.toLocaleString("en-US", { month: "long", year: "numeric" })}
                </span>
                <div className="sch-nav-controls">
                    <button className="sch-nav-btn" onClick={onPrev}>
                        <ChevronLeft className="icon-xs" />
                    </button>
                    <button className="sch-nav-btn sch-nav-today" onClick={onToday}>
                        Today
                    </button>
                    <button className="sch-nav-btn" onClick={onNext}>
                        <ChevronRight className="icon-xs" />
                    </button>
                </div>
            </div>

            <div className="sch-grid">
                {WEEKDAY_LABELS.map((label) => (
                    <div key={label} className="sch-grid-weekday">
                        {label}
                    </div>
                ))}

                {monthDays.map((day, idx) => {
                    const dayStr = formatDateStr(day);
                    const isToday = dayStr === todayStr;
                    const isCurrentMonth = day.getMonth() === anchorDate.getMonth();
                    const dayEvents = eventsByDay[dayStr] || [];

                    return (
                        <div
                            key={idx}
                            className={`sch-grid-day${isToday ? " sch-grid-day-today" : ""}${
                                isCurrentMonth ? "" : " sch-grid-day-outside"
                            }`}
                            onClick={() => onDayClick(dayStr)}
                        >
                            <span
                                className={`sch-day-number${isToday ? " sch-day-number-today" : ""}`}
                            >
                                {day.getDate()}
                            </span>
                            <div className="sch-day-events">
                                {dayEvents.slice(0, 6).map((ev) => (
                                    <span
                                        key={ev.id}
                                        className="sch-event-dot"
                                        title={`${ev.eventTime} — ${ev.title}`}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
