import { useState } from "react";

import "./settings.css";

import { SETTINGS_PAGES } from "../../constants/interface";

import SettingsSidebar from "./Sidebar/SettingsSidebar";
import SettingsContent from "./Content/SettingsContent";
import { X } from "lucide-react";

export default function Settings({ onClose, closing }) {
    const [currentPage, setCurrentPage] = useState(SETTINGS_PAGES[0].id);

    return (
        <div className={`settings ${closing ? "settings--closing" : ""}`}>
            <button
                className="settings__close-button"
                type="button"
                aria-label="Close Settings"
                onClick={onClose}
            >
                <X />
            </button>

            <SettingsSidebar currentPage={currentPage} onPageChange={setCurrentPage} />

            <SettingsContent currentPage={currentPage} />
        </div>
    );
}
