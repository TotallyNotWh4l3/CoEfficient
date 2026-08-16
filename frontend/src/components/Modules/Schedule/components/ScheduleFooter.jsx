import { useLanguage } from "../../../../hooks/useLanguage";

export default function ScheduleFooter() {
    const lang = useLanguage();
    const t = lang.modules.schedule.footer;

    return (
        <div className="sch-footer">
            <div className="sch-footer-live">
                <span className="sch-live-dot" />
                <span>{t.liveSync}</span>
            </div>
        </div>
    );
}
