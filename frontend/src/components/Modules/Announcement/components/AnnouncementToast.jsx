// frontend/src/components/Modules/Announcement/components/AnnouncementToast.jsx
import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function AnnouncementToast({ message }) {
    if (!message) return null;

    return (
        <div className="ann-toast">
            <CheckCircle2 className="icon-xs" />
            <span>{message}</span>
        </div>
    );
}
