import React from "react";
import { useLanguage } from "../../../../hooks/useLanguage";

export default function AnnouncementFooter() {
    const lang = useLanguage();
    const t = lang.modules.announcement.footer;

    return (
        <div className="ann-footer">
            <div className="ann-footer-live">
                <div className="ann-live-dot" />
                <span>{t.liveFeed}</span>
            </div>
            <span className="ann-footer-version">v2.0 ACTIVE</span>
        </div>
    );
}
