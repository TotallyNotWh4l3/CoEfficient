import { useMemo } from "react";

import "./settings-content.css";

import InterfaceSettings from "../Pages/InterfaceSettings";
import ModuleSettings from "../Pages/ModuleSettings";
// import DashboardSettings from "../Pages/DashboardSettings";
// import AboutSettings from "../Pages/AboutSettings";

const PAGE_COMPONENTS = {
    interface: InterfaceSettings,
    modules: ModuleSettings,
    // dashboard: DashboardSettings,
    // about: AboutSettings,
};

export default function SettingsContent({ currentPage }) {
    const CurrentPage = PAGE_COMPONENTS[currentPage];

    return (
        <main className="settings__content">
            {CurrentPage ? (
                <CurrentPage />
            ) : (
                <div className="settings-content__empty">
                    <p>Unable to load settings content.</p>
                </div>
            )}
        </main>
    );
}
