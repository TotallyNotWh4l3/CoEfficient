// frontend/src/components/Modules/Announcement/components/AnnouncementFooter.jsx
import React from "react";

export default function AnnouncementFooter({ isJapanese }) {
    return (
        <div className="ann-footer">
            <div className="ann-footer-live">
                <div className="ann-live-dot" />
                <span>{isJapanese ? "リアルタイム更新" : "Live Feed Synced"}</span>
            </div>
            <span className="ann-footer-version">v2.0 ACTIVE</span>
        </div>
    );
}
