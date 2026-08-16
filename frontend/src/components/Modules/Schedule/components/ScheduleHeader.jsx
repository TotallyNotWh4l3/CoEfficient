import { Calendar, Plus, X, Tags } from "lucide-react";
import { useLanguage } from "../../../../hooks/useLanguage";
import ScheduleViewToggle from "./ScheduleViewToggle";
import ScheduleLayoutToggle from "./ScheduleLayoutToggle";

export default function ScheduleHeader({
    viewMode,
    onViewModeChange,
    layout,
    onLayoutChange,
    onAdd,
    onManageTags,
    isAdmin,
    onRemove,
}) {
    const lang = useLanguage();
    const t = lang.modules.schedule.header;

    return (
        <div className="sch-header">
            <div className="sch-header-left">
                <div className="sch-header-icon">
                    <Calendar className="icon-sm" />
                </div>
                <div>
                    <h3 className="sch-header-title">{t.title}</h3>
                    {/* <p className="sch-header-subtitle">{t.subtitle}</p> */}
                </div>
            </div>
            <div className="sch-header-actions">
                <ScheduleViewToggle viewMode={viewMode} onChange={onViewModeChange} />
                <ScheduleLayoutToggle layout={layout} onChange={onLayoutChange} />
                {isAdmin && (
                    <button className="sch-icon-toggle" onClick={onManageTags} title={t.manageTags}>
                        <Tags className="icon-xs" />
                    </button>
                )}
                <button className="sch-btn-primary" onClick={onAdd}>
                    <Plus className="icon-xs" />
                    <span>{t.addEvent}</span>
                </button>
                {onRemove && (
                    <button className="sch-icon-toggle" onClick={onRemove} title={t.removeModule}>
                        <X className="icon-xs" />
                    </button>
                )}
            </div>
        </div>
    );
}
