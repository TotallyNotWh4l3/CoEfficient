import React, { useState, useMemo } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import useSchedule from "../../../hooks/useSchedule";
import { useDashboard } from "../../../hooks/useDashboard";
import { useAuth } from "../../../hooks/useAuth";
import ScheduleHeader from "./components/ScheduleHeader";
import ScheduleCalendarGrid from "./components/ScheduleCalendarGrid";
import ScheduleDayListModal from "./components/ScheduleDayListModal";
import ScheduleDetailModal from "./components/ScheduleDetailModal";
import ScheduleEventFormModal from "./components/ScheduleEventFormModal";
import ScheduleFooter from "./components/ScheduleFooter";
import { formatDateStr } from "./utils/scheduleHelpers";
import "./schedule-module.css";

export default function ScheduleModule({ module }) {
    const { removeModule } = useDashboard();
    const { user } = useAuth();
    const onRemove = () => removeModule(module.id);

    const { events, isLoading, error, reload, createEvent, updateEvent, deleteEvent } = useSchedule(
        {
            scope: "all",
            live: true,
        },
    );

    const [anchorDate, setAnchorDate] = useState(new Date());
    const [dayListDate, setDayListDate] = useState(null); // 'YYYY-MM-DD' | null
    const [selectedEvent, setSelectedEvent] = useState(null); // event | null (detail modal)
    const [formState, setFormState] = useState(null); // { mode: 'add'|'edit', initialValues, editingId? } | null

    const todayStr = formatDateStr(new Date());

    const eventsByDay = useMemo(() => {
        const map = {};
        for (const ev of events) {
            if (!map[ev.eventDate]) map[ev.eventDate] = [];
            map[ev.eventDate].push(ev);
        }
        return map;
    }, [events]);

    // --- Navigation ---
    const goPrev = () => {
        const next = new Date(anchorDate);
        next.setMonth(anchorDate.getMonth() - 1);
        setAnchorDate(next);
    };
    const goNext = () => {
        const next = new Date(anchorDate);
        next.setMonth(anchorDate.getMonth() + 1);
        setAnchorDate(next);
    };
    const goToday = () => setAnchorDate(new Date());

    // --- Flow: calendar day click -> day list ---
    const openDayList = (dateStr) => setDayListDate(dateStr);
    const closeDayList = () => setDayListDate(null);

    // --- Flow: day list row click -> detail ---
    const openDetail = (ev) => {
        setSelectedEvent(ev);
        setDayListDate(null);
    };
    const closeDetail = () => setSelectedEvent(null);

    // --- Flow: header/day-list "Add Event" -> form (add mode) ---
    const openAddForm = (dateStr) => {
        setFormState({
            mode: "add",
            initialValues: { title: "", description: "", eventDate: dateStr, eventTime: "09:00" },
        });
        setDayListDate(null);
    };

    // --- Flow: detail "Edit" -> form (edit mode) ---
    const openEditForm = () => {
        if (!selectedEvent) return;
        setFormState({
            mode: "edit",
            editingId: selectedEvent.id,
            authorName: selectedEvent.author,
            initialValues: {
                title: selectedEvent.title,
                description: selectedEvent.description || "",
                eventDate: selectedEvent.eventDate,
                eventTime: selectedEvent.eventTime,
            },
        });
        setSelectedEvent(null);
    };
    const closeForm = () => setFormState(null);

    // --- CRUD handlers ---
    const handleFormSubmit = async (values) => {
        try {
            if (formState.mode === "edit") {
                await updateEvent(formState.editingId, values);
            } else {
                await createEvent(values);
            }
            closeForm();
        } catch (err) {
            console.error("[ScheduleModule] Save failed:", err);
        }
    };

    const handleDetailDelete = async () => {
        if (!selectedEvent) return;
        if (!window.confirm("Delete this event?")) return;
        try {
            await deleteEvent(selectedEvent.id);
            closeDetail();
        } catch (err) {
            console.error("[ScheduleModule] Delete failed:", err);
        }
    };

    const handleFormDelete = async () => {
        if (!formState?.editingId) return;
        await deleteEvent(formState.editingId);
        closeForm();
    };

    return (
        <div className="sch-card">
            <div className="sch-glow sch-glow-top" />

            <ScheduleHeader onAdd={() => openAddForm(todayStr)} onRemove={onRemove} />

            <div className="sch-body">
                {isLoading ? (
                    <div className="sch-empty-state">
                        <RefreshCw className="icon-sm sch-spin" />
                        <p className="sch-empty-text">Loading schedule…</p>
                    </div>
                ) : error ? (
                    <div className="sch-empty-state">
                        <AlertCircle className="icon-sm sch-error-text" />
                        <p className="sch-empty-title sch-error-text">Failed to load schedule</p>
                        <p className="sch-empty-text">{error}</p>
                        <button className="sch-btn-secondary" onClick={reload}>
                            Retry
                        </button>
                    </div>
                ) : (
                    <ScheduleCalendarGrid
                        anchorDate={anchorDate}
                        onPrev={goPrev}
                        onNext={goNext}
                        onToday={goToday}
                        eventsByDay={eventsByDay}
                        onDayClick={openDayList}
                    />
                )}
            </div>

            <ScheduleFooter />

            {dayListDate && (
                <ScheduleDayListModal
                    dateStr={dayListDate}
                    events={eventsByDay[dayListDate] || []}
                    onClose={closeDayList}
                    onAdd={openAddForm}
                    onSelectEvent={openDetail}
                />
            )}

            {selectedEvent && (
                <ScheduleDetailModal
                    event={selectedEvent}
                    currentUser={user}
                    onClose={closeDetail}
                    onEdit={openEditForm}
                    onDelete={handleDetailDelete}
                />
            )}

            {formState && (
                <ScheduleEventFormModal
                    mode={formState.mode}
                    initialValues={formState.initialValues}
                    authorName={formState.authorName}
                    onClose={closeForm}
                    onSubmit={handleFormSubmit}
                    onDelete={formState.mode === "edit" ? handleFormDelete : undefined}
                />
            )}
        </div>
    );
}
