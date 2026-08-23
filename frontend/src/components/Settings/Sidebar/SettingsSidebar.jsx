import "./settings-sidebar.css";

import { SETTINGS_PAGES } from "../../../constants/interface";

export default function SettingsSidebar({ currentPage, onPageChange, isAdmin }) {
    const visiblePages = SETTINGS_PAGES.filter((page) => !page.adminOnly || isAdmin);

    return (
        <aside className="settings-sidebar">
            <nav className="settings-sidebar__navigation">
                {visiblePages.map((page) => {
                    const Icon = page.icon;

                    return (
                        <button
                            key={page.id}
                            type="button"
                            className={
                                currentPage === page.id
                                    ? "settings-sidebar__button settings-sidebar__button--active"
                                    : "settings-sidebar__button"
                            }
                            title={page.title}
                            onClick={() => onPageChange(page.id)}
                        >
                            <Icon className="settings-sidebar__icon" size={22} />
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}
